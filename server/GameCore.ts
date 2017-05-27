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
        
        //this.host.addEntity(new Castle(this.gridManager, GameConfig.GRID_ROWS/2-1, 0));
        //this.client.addEntity(new Castle(this.gridManager, GameConfig.GRID_ROWS/2-1, GameConfig.GRID_COLS-2));
        
        //this.host.addEntity(new JuggerField(this.gridManager, 3, 0));
        //this.host.addEntity(new JuggerField(this.gridManager, 0, 0));


        //this.client.addEntity(new Barracks(this.gridManager, 3, 18));
        //this.client.addEntity(new ArcheryRange(this.gridManager, 0, 18));
        this.client.addEntity(new Soldado(this.gridManager, 6, 15));
        this.client.addEntity(new Soldado(this.gridManager, 6, 17));
        this.client.addEntity(new Soldado(this.gridManager, 6, 14));



        this.host.addEntity(new Soldado(this.gridManager, 6, 2));
        this.host.addEntity(new Soldado(this.gridManager, 0, 0));
        this.host.addEntity(new Soldado(this.gridManager, 0, 1));
        this.host.addEntity(new Soldado(this.gridManager, 6, 3));


        /*
        this.client.addEntity(new Soldado(this.gridManager, 6, 15));
        this.client.addEntity(new Archer(this.gridManager, 5, 17));
        this.client.addEntity(new Archer(this.gridManager, 7, 17));
        this.client.addEntity(new Archer(this.gridManager, 4, 17));


        //this.host.addEntity(new Soldado(this.gridManager, 6, 2));
        //this.host.addEntity(new Soldado(this.gridManager, 5, 2));
        this.host.addEntity(new Archer(this.gridManager, 4, 2));
        this.host.addEntity(new Soldado(this.gridManager, 0, 2));
        */
        //console.log(this.client.entities[0]);
        //console.log(DataSerializer.SerializeEntity(this.client.entities[0]));
        //console.log(DataSerializer.SerializeTile(this.gridManager.tileAt(3, 18)));

        var gridObj = DataSerializer.SerializeGrid(this.gridManager.grid);

        if (host.socket) {
            this.host.serverPlayer.socket.emit('startGame', { id: this.id, host: true });
        }
        if (client.socket) {
            this.client.serverPlayer.socket.emit('startGame', { id: this.id, host: false });
        }
        setTimeout(this.sendEntities.bind(this), 100);



        this.gridManager.printGrid();
        setInterval(this.step.bind(this), 300);
    } 
    sendEntities() {
        var entitiesObj = [];
        this.getAllEntities().forEach(element => {
            entitiesObj.push(DataSerializer.SerializeEntity(element));
        });

        if (this.host.serverPlayer.socket) {
            this.host.serverPlayer.socket.emit('updateStateEntities', entitiesObj);
        }
        if (this.client.serverPlayer.socket) {
            this.client.serverPlayer.socket.emit('updateStateEntities', entitiesObj);
        }
    }
    sendGrid() {
        var gridObj = DataSerializer.SerializeGrid(this.gridManager.grid);

        if (this.host.serverPlayer.socket) {
            this.host.serverPlayer.socket.emit('updateState', gridObj);
        }
        if (this.client.serverPlayer.socket) {
            this.client.serverPlayer.socket.emit('updateState', gridObj);
        }
    }

    step() {
        this.getAllUnits().forEach(unit => {
            var targetTile = this.getClosestTargetTile(unit);

            if (targetTile != null) {
                unit.doAction(targetTile);
            }
        });

        this.getAllEntities().forEach(entity => {
            if (entity.getEntityData().hp <= 0)
                entity.onDeath();
        });
        
        this.host.getSpamBuildings().concat(this.client.getSpamBuildings()).forEach(building => {
            building.spamUnit();
        });


        this.gridManager.printGrid();
        this.printEntityStatus();

        this.sendEntities();
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
        GameServer.instance.endGame(this);
    }

    printEntityStatus() {
        this.getAllEntities().forEach(e => {
            console.log(e.getEntityData().name+", owner: "+e.owner.serverPlayer.id+", hp: "+e.getEntityData().hp+", armor: "+e.getEntityData().armor);
        });
    }

}