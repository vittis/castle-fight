import { GamePlayer } from "./GamePlayer";
import { GridManager } from "./GridManager";
import { ServerPlayer } from "./ServerPlayer";
import { AStar } from "./lib/AStar";
import { EuclideanHeuristic } from "./lib/Heuristics/EuclideanHeuristic";
import { GameConfig } from "./GameConfig";
import { Castle } from "./building/Castle";
import { Barracks } from "./building/Barracks";
import { Entity } from "./Entity";
import { Tile } from "./Tile";
import { GameServer } from "./GameServer";
import { Soldado } from "./unit/soldado";
import { Archer } from "./unit/Archer";
import { Unit } from "./Unit";

export class GameCore {
    id : number;
    host : GamePlayer;
    client  : GamePlayer;

    gridManager : GridManager;

    constructor(id : number, host : ServerPlayer, client : ServerPlayer) {
        this.id = id;

        this.host = new GamePlayer(host);
        this.client = new GamePlayer(client);

        this.gridManager = new GridManager(new AStar(new EuclideanHeuristic()), GameConfig.GRID_ROWS, GameConfig.GRID_COLS);
        
        if (host.socket) {
            this.host.serverPlayer.socket.emit('startGame', {id: this.id, rows: GameConfig.GRID_ROWS, cols: GameConfig.GRID_COLS, grid: this.gridManager.grid, host: true});
            this.client.serverPlayer.socket.emit('startGame', {id: this.id, rows: GameConfig.GRID_ROWS, cols: GameConfig.GRID_COLS, grid: this.gridManager.grid, host: false});
        }

        this.host.addEntity(new Castle(this.gridManager, GameConfig.GRID_ROWS/2-1, 0));
        this.client.addEntity(new Castle(this.gridManager, GameConfig.GRID_ROWS/2-1, GameConfig.GRID_COLS-2));
        
        this.host.addEntity(new Barracks(this.gridManager, 3, 0));
        
        this.client.addEntity(new Barracks(this.gridManager, 3, GameConfig.GRID_COLS-2));

        this.client.addEntity(new Soldado(this.gridManager, 6, 15));
        this.client.addEntity(new Archer(this.gridManager, 5, 17));
        this.client.addEntity(new Archer(this.gridManager, 7, 17));

        this.host.addEntity(new Soldado(this.gridManager, 6, 2));
        this.host.addEntity(new Soldado(this.gridManager, 5, 2));
        
        this.gridManager.printGrid();
        setInterval(this.step.bind(this), 700);
    }

    getOponentEntities(owner : GamePlayer) : Entity[] {
        if (owner == this.host)
            return this.client.getAllEntities();
        else 
            return this.host.getAllEntities();

    }

    step() {
        this.gridManager.aStar.load(this.gridManager.getNumberGrid());
        
        var hostUnits = this.host.getAllUnits();
        var clientUnits = this.client.getAllUnits();
        var allUnits = hostUnits.concat(clientUnits);

        var hostEntities = this.host.getAllEntities();
        var clientEntities = this.client.getAllEntities();
        var allEntities = hostEntities.concat(clientEntities);

        allUnits.forEach(unit => {
            var target : Tile = null;
            var shortestDistance = 100;

            this.getOponentEntities(unit.owner).forEach(other_unit => {
                
                if (!(other_unit.getEntityData().width > 1 || other_unit.getEntityData().height > 1)) {
                    var dist = this.gridManager.aStar.heuristic.getHeuristic(unit.tile.col, unit.tile.row, 0, other_unit.tile.col, other_unit.tile.row, 0);
                    if (dist < shortestDistance) {
                        target = other_unit.tile;
                        shortestDistance = dist;
                    }
                }
                else {
                    for (var i = 0; i < other_unit.getEntityData().width; i++) {
                        for (var j = 0; j < other_unit.getEntityData().height; j++) {
                            var tile : Tile = this.gridManager.grid[other_unit.tile.row+j][other_unit.tile.col+i];
                            var dist = this.gridManager.aStar.heuristic.getHeuristic(unit.tile.col, unit.tile.row, 0, tile.col, tile.row, 0);
                            if (dist < shortestDistance) {
                                target = tile;
                                shortestDistance = dist;
                            }
                        }
                    }                   
                }
            });

            if (target != null) {
                        console.log("target: "+target.row+", "+target.col);

                var nodeA = this.gridManager.aStar.getNode(unit.tile.col, unit.tile.row),
                nodeB = this.gridManager.aStar.getNode(target.col, target.row);
            
                var path = this.gridManager.aStar.path(nodeA, nodeB); 

                if (path.length > 1 ) {
                    var targetTile : Tile = this.gridManager.grid[path[1].y][path[1].x];
                    if (this.gridManager.getDistance(unit.tile.col, unit.tile.row, target.col, target.row) <= unit.data.attackRange) {
                        unit.attack(target.entity);
                    }
                    else if (targetTile.entity == null)
                        unit.moveTo(targetTile);
                    
                }
            }
        });
        allEntities.forEach(entity => {
            if (entity.getEntityData().hp <= 0)
                entity.onDeath();
        });
        
        this.host.getSpamBuildings().concat(this.client.getSpamBuildings()).forEach(building => {
            building.spamUnit();
        });


        this.gridManager.printGrid();
        this.printEntityStatus();
    }

    getAllUnits() : Unit[]{
        return this.host.getAllUnits().concat(this.client.getAllUnits());
    }
    getAllEntities() : Entity[] {
        return this.host.getAllEntities().concat(this.client.getAllEntities());
    }
    endGame() : void {
        console.log("end game chamado");
        GameServer.instance.endGame(this);
    }

    printEntityStatus() {
        this.getAllEntities().forEach(e => {
            console.log(e.getEntityData().name+", owner: "+e.owner.serverPlayer.id+", hp: "+e.getEntityData().hp+", armor: "+e.getEntityData().armor);
        });
    }

}