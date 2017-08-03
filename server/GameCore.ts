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
import { ArcheryRange } from "./building/ArcheryRange";
import { JuggerField } from "./building/JuggerField";
import { DataSerializer } from "./Serializer";
import { StorageBarn } from "./building/StorageBarn";
import { Barn } from "./building/Barn";

export class GameCore {
    id : number;
    host : GamePlayer;
    client  : GamePlayer;

    gridManager : GridManager;
 
    update;

    constructor(id : number, host : ServerPlayer, client : ServerPlayer) {
        this.id = id;

        this.gridManager = new GridManager(new AStar(new EuclideanHeuristic()), GameConfig.GRID_ROWS, GameConfig.GRID_COLS);
        
        this.host = new GamePlayer(host, true, this.gridManager);
        this.client = new GamePlayer(client, false, this.gridManager);

        this.host.buildBuilding(new Castle(GameConfig.GRID_ROWS/2 -1, 0));
        this.client.buildBuilding(new Castle(GameConfig.GRID_ROWS / 2 - 1, GameConfig.GRID_COLS - 2));     

        this.host.buildBuilding(new StorageBarn(GameConfig.GRID_ROWS / 2 - 1 - 2 - 2, 1));
        this.host.buildBuilding(new Barn(GameConfig.GRID_ROWS / 2 - 1 - 2, 0));
        this.host.buildBuilding(new Barn(0, 0));

        this.host.buildBuilding(new ArcheryRange(GameConfig.GRID_ROWS / 2 - 1 + 3, 0));


        /*this.client.buildBuilding(new Barracks(GameConfig.GRID_ROWS / 2 - 1 + 3, GameConfig.GRID_COLS - 2));

        this.client.buildBuilding(new ArcheryRange(GameConfig.GRID_ROWS / 2 - 1 - 3, GameConfig.GRID_COLS - 2));

        this.client.buildBuilding(new ArcheryRange(GameConfig.GRID_ROWS / 2 - 1 + 3 + 2, GameConfig.GRID_COLS - 3));*/

        this.setSocket(this.host.serverPlayer, true);
        this.setSocket(this.client.serverPlayer, false);

        setTimeout(this.sendaData.bind(this), 100);

        this.gridManager.printGrid();
        this.update = setInterval(this.step.bind(this), GameConfig.STEP_RATE);
    } 

    setSocket(p : ServerPlayer, isHost : boolean) {
        if (p.socket) {
            p.socket.emit('startGame', { id: this.id, rows: GameConfig.GRID_ROWS, cols: GameConfig.GRID_COLS, isHost: isHost, stepRate: GameConfig.STEP_RATE });
            
            p.socket.on('askBuild', function (data) {
                if (data.isHost) {
                    this.host.buildBuilding(new (require('./building/'+data.name))[data.name](data.row, data.col));
                }
                else {
                    this.client.buildBuilding(new (require('./building/' + data.name))[data.name](data.row, data.col));
                }
            }.bind(this));
        }
    }

    sendaData() {
        var entitiesObj = [];
        this.getAllEntities().forEach(element => {
            entitiesObj.push(DataSerializer.SerializeEntity(element));
        });

        var hostObj = DataSerializer.SerializePlayer(this.host);
        var clientObj = DataSerializer.SerializePlayer(this.client);;

        if (this.host.serverPlayer.socket) {
            this.host.serverPlayer.socket.emit('receiveData', { entities: entitiesObj, player: hostObj });
        }
        if (this.client.serverPlayer.socket) {
            this.client.serverPlayer.socket.emit('receiveData', { entities: entitiesObj, player: clientObj });
        }
    }

    step() {
        this.getAllUnits().forEach(unit => {
            unit.resetAttackData();
            this.gridManager.aStar.load(this.gridManager.getNumberGrid());
           
            var closestTileWithEnemy = this.getClosestTargetTile(unit);
            var targetTile;

            if (closestTileWithEnemy != null) {
                if (this.gridManager.getDistance(unit.tile.col, unit.tile.row, closestTileWithEnemy.col, closestTileWithEnemy.row) <= 4 || this.gridManager.getDistance(unit.tile.col, unit.tile.row, closestTileWithEnemy.col, closestTileWithEnemy.row) <= unit.data.attackRange) {
                    targetTile = closestTileWithEnemy;
                }
                else {
                    if (unit.tile.row>= 8) {//parte de baixo
                        if (unit.owner.isHost) {
                            targetTile = unit.tile.col < 20 ? this.gridManager.tileAt(12, 20) : this.gridManager.tileAt(7, 23);
                        }
                        else {
                            targetTile = unit.tile.col <= 6 ? this.gridManager.tileAt(7, 3) : this.gridManager.tileAt(12, 6);
                        }
                    }
                    else {//parte de cima
                        if (unit.owner.isHost) {
                            targetTile = unit.tile.col >= 20 ? this.gridManager.tileAt(8, 23) : this.gridManager.tileAt(3, 20);
                        }
                        else {
                            targetTile = unit.tile.col <= 6 ? this.gridManager.tileAt(8, 3) : this.gridManager.tileAt(3, 6);
                        }
                    }
                }
            }
            
            if (targetTile != null) {
                unit.doAction(targetTile);
            }
        });

        this.getAllEntities().forEach(entity => {
            if (entity.getEntityData().hp <= 0)
                entity.onDeath();
        });
        
        this.host.getSpamBuildings().concat(this.client.getSpamBuildings()).forEach(building => {
            building.resetSpamData();
            building.spamUnit();
        });

        this.host.resourceManager.step();
        this.client.resourceManager.step();

        //this.gridManager.printGrid();
        //this.printEntityStatus();

        this.sendaData();
    }

    //returns closest tile with an enemy entity in it
    getClosestTargetTile(unit : Unit) : Tile {
        this.gridManager.aStar.load(this.gridManager.getNumberGrid());

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
                        var tile: Tile = this.gridManager.tileAt(other_unit.tile.row + j, other_unit.tile.col + i);
                        var dist = this.gridManager.aStar.heuristic.getHeuristic(unit.tile.col, unit.tile.row, 0, tile.col, tile.row, 0);
                        if (dist < shortestDistance) {
                            target = tile;
                            shortestDistance = dist;
                        }
                    }
                }                   
            }
        });
        return target;
    }
    
    getAllUnits() : Unit[]{
        return this.host.getAllUnits().concat(this.client.getAllUnits());
    }
    getAllEntities() : Entity[] {
        return this.host.getAllEntities().concat(this.client.getAllEntities());
    }
    getOponentEntities(owner : GamePlayer) : Entity[] {
        if (owner == this.host)
            return this.client.getAllEntities();
        else 
            return this.host.getAllEntities();
    }
    endGame() : void {
        console.log("end game chamado");
        clearInterval(this.update);
        GameServer.instance.endGame(this);
    }

    printEntityStatus() {
        this.getAllEntities().forEach(e => {
            console.log(e.getEntityData().name+", owner: "+e.owner.serverPlayer.id+", hp: "+e.getEntityData().hp+", armor: "+e.getEntityData().armor+", owner gold: "+e.owner.resourceManager.gold);
        });
        
    }

}