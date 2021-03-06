import { GamePlayer } from "./GamePlayer";
import { GridManager } from "./GridManager";
import { ServerPlayer, PlayerStatus } from "./ServerPlayer";
import { AStar } from "./lib/AStar";
import { EuclideanHeuristic } from "./lib/Heuristics/EuclideanHeuristic";
import { GameConfig } from "./GameConfig";
import { Castle } from "./building/Castle";
import { Barracks } from "./building/Barracks";
import { Entity } from "./Entity";
import { Tile } from "./Tile";
import { GameServer } from "./GameServer";
import { Archer } from "./unit/Archer";
import { Unit } from "./Unit";
import { ArcheryRange } from "./building/ArcheryRange";
import { JuggerField } from "./building/JuggerField";
import { DataSerializer } from "./Serializer";
import { StorageBarn } from "./building/StorageBarn";
import { Barn } from "./building/Barn";
import { IncomeBallManager } from "./IncomeBallManager";
import { KingsCourt } from "./building/KingsCourt";
import { Tower } from "./building/Tower";
import { IncomeBall } from "./building/IncomeBall";
import { GameBot } from "./GameBot";
import { Building } from "./Building";

export class GameCore {
    id : number;
    host : GamePlayer;
    client  : GamePlayer;

    gridManager : GridManager;
    ballManager : IncomeBallManager;

    update;

    clientCastle : Building;
    hostCastle : Building;

    startGameTimeout;
    sendDataTimeout;

    totalTurns =0;

    observers : ServerPlayer[] = [];

    constructor(id : number, host : ServerPlayer, client : ServerPlayer) {
        this.id = id;

        this.gridManager = new GridManager(new AStar(new EuclideanHeuristic()), GameConfig.GRID_ROWS, GameConfig.GRID_COLS);
        
        this.host = new GamePlayer(host, true, this.gridManager);

        if (client.socket) {
            this.client = new GamePlayer(client, false, this.gridManager);
        }
        else {
            this.client = new GameBot(client, false, this.gridManager);
        }
        this.ballManager = new IncomeBallManager(new GamePlayer(null, null, this.gridManager));

        this.hostCastle = new Castle(GameConfig.GRID_ROWS / 2 - 1, 2);
        this.clientCastle = new Castle(GameConfig.GRID_ROWS / 2 - 1, GameConfig.GRID_COLS - 2 - 2)

        this.host.buildBuilding(this.hostCastle);
        this.client.buildBuilding(this.clientCastle);     

        this.client.buildBuilding(new Tower(3, 24, this.host));  
        this.client.buildBuilding(new Tower(11, 24, this.host));     
   
        this.host.buildBuilding(new Tower(11, 5, this.client));     
        this.host.buildBuilding(new Tower(3, 5, this.client)); 

         // this.host.buildBuilding(new ArcheryRange(GameConfig.GRID_ROWS / 2 - 1 - 2 - 2, 1));
         /* this.host.buildBuilding(new Barn(GameConfig.GRID_ROWS / 2 - 1 - 2, 0)); 
         this.host.buildBuilding(new Barn(0, 0));   
        this.host.buildBuilding(new Barn(2, 3));   */          

       /*  this.host.buildBuilding(new ArcheryRange(GameConfig.GRID_ROWS / 2 - 1 + 3, 0));
        this.client.buildBuilding(new ArcheryRange(GameConfig.GRID_ROWS / 2 + 4, GameConfig.GRID_COLS - 2)); */
        //this.host.addEntity(new Soldado(15, 28));
        //this.client.addEntity(new Archer(GameConfig.GRID_ROWS / 2 + 4, GameConfig.GRID_COLS - 6));  
        if (client.socket)  
            this.client.serverPlayer.socket.emit('startGame', { id: this.id, rows: GameConfig.GRID_ROWS, cols: GameConfig.GRID_COLS, isHost: false, stepRate: GameConfig.STEP_RATE, playerId: client.id, opponentNick: host.nick });
        if (host.socket)
            this.host.serverPlayer.socket.emit('startGame', { id: this.id, rows: GameConfig.GRID_ROWS, cols: GameConfig.GRID_COLS, isHost: true, stepRate: GameConfig.STEP_RATE, playerId: host.id, opponentNick: client.nick });
                
        this.sendDataTimeout = setTimeout(this.sendaData.bind(this), 1000);

        this.startGameTimeout = setTimeout(this.startGame.bind(this), 2000);

        //this.gridManager.printGrid();
    } 

    startGame() {
        if (this.client || this.host) {
            /* if (this.client) {
                if (!(this.client instanceof GameBot)) {
                    this.setSocket(this.client.serverPlayer, false);
                }
            }
            if (this.host) {
                if (this.host.serverPlayer.socket) {
                    this.setSocket(this.host.serverPlayer, true);
                }
            } */
            this.update = setInterval(this.step.bind(this), GameConfig.STEP_RATE);
        }
    }



    setSocket(p : ServerPlayer, isHost : boolean) {
        
    } 

    sendaData() {
        var entitiesObj = [];
        this.getAllEntities().forEach(element => {
            entitiesObj.push(DataSerializer.SerializeEntity(element));
        });

        var hostObj = DataSerializer.SerializePlayer(this.host);
        var clientObj = DataSerializer.SerializePlayer(this.client);

        var ballObj = DataSerializer.SerializeBall(this.ballManager);

        if (this.host) {
            if (this.host.serverPlayer.socket) {
                this.host.serverPlayer.socket.emit('receiveData', { entities: entitiesObj, player: hostObj, ballData : ballObj, watchCount: this.observers.length });
            }
        }
        if (this.client) {
            if (this.client.serverPlayer.socket) {
                this.client.serverPlayer.socket.emit('receiveData', { entities: entitiesObj, player: clientObj, ballData: ballObj, watchCount: this.observers.length });
            }
        }
        if (this.observers.length>0) {
            this.observers.forEach(p => {
                if (p != null) {
                    if (p.status == PlayerStatus.spectating) {
                        p.socket.emit('receiveData', { entities: entitiesObj, player: {client: clientObj, host: hostObj}, ballData: ballObj, watchCount: this.observers.length });
                    }
                }
            });
        }
    }
    removeObserver(id) {
        for (var i = 0; i < this.observers.length; i++) {
            if (this.observers[i].id == id) {
                this.observers.splice(i, 1);
                break;
            }
        }
    }
    
    step() {
        this.totalTurns++;
        //end game condition
        if (this.clientCastle.data.hp <= 0 || this.hostCastle.data.hp <= 0 ) {
            if (this.clientCastle.data.hp <= 0) {
                console.log("JOGOU ACABOU -"+this.host.serverPlayer.nick+"- GANHOU");
                this.endGame(true);

            }
            else {
                console.log("JOGOU ACABOU -" + this.client.serverPlayer.nick + "- GANHOU");
                this.endGame(false);
            }
            return;
        }


        this.host.getEffectBuildings().concat(this.client.getEffectBuildings()).forEach(building => {
            building.resetSpamData();
            building.step();
        });

        //load map status
        this.gridManager.aStar.load(this.gridManager.getNumberGrid());

        //attack buildings loop
         this.host.getAttackBuildings().concat(this.client.getAttackBuildings()).forEach(building => {
            building.resetAttackData();
            building.step();

            var closestTileWithEnemy = this.getClosestTargetTile(building);
           
            if (building.target == null) {
                if (closestTileWithEnemy != null) {
                    if (building.inRange(closestTileWithEnemy)) {
                        building.doAction(closestTileWithEnemy);
                    }
                }
            }
            else {
                if (building.inRange(building.target.tile)) {
                    building.doAction(building.target.tile);
                }
            }
        }); 
        //unit attack
        this.getAllUnits().forEach(unit => {
            unit.resetAttackData();
            unit.step();
            if (!unit.justSpawned) {
                var closestTileWithEnemy = this.getClosestTargetTile(unit);

                if (unit.target == null) {
                    if (closestTileWithEnemy != null) {
                        if (unit.inRange(closestTileWithEnemy)) {
                            unit.doAction(closestTileWithEnemy);
                        }
                    }
                }
                else {
                    if (unit.inRange(unit.target.tile)) {
                        unit.doAction(unit.target.tile);
                    }
                    else {
                        unit.doAction(closestTileWithEnemy);
                    }
                }
            }

        });
        //tentar mover
        this.getAllUnits().forEach(unit => {
            this.gridManager.aStar.load(this.gridManager.getNumberGrid());

            if (!unit.justSpawned) {
                var closestTileWithEnemy = this.getClosestTargetTile(unit);
                if (closestTileWithEnemy != null) {
                    if (!unit.inRange(closestTileWithEnemy)) {
                        if (!unit.data.attackData.hasAttacked)  {
                            var targetTile;
                            
                            if (this.gridManager.getDistance(unit.tile.col, unit.tile.row, closestTileWithEnemy.col, closestTileWithEnemy.row) <= 4) {
                                targetTile = closestTileWithEnemy;
                            }
                            else {
                                if (unit.tile.row >= 8) {//parte de baixo
                                    if (unit.owner.isHost) {
                                        targetTile = unit.tile.col < 20 ? this.gridManager.tileAt(12, 22) : this.gridManager.tileAt(7, 25);
                                    }
                                    else {
                                        targetTile = unit.tile.col <= 6 ? this.gridManager.tileAt(7, 3) : this.gridManager.tileAt(12, 6);
                                    }
                                }
                                else {//parte de cima
                                    if (unit.owner.isHost) {
                                        targetTile = unit.tile.col >= 20 ? this.gridManager.tileAt(8, 25) : this.gridManager.tileAt(3, 22);
                                    }
                                    else {
                                        targetTile = unit.tile.col <= 8 ? this.gridManager.tileAt(8, 5) : this.gridManager.tileAt(3, 8);
                                    }
                                }
                            }
                            unit.moveTowards(targetTile);
                        }
                    }
                }   
            }
            else {
                unit.justSpawned = false;
            }
        });

        this.ballManager.step();

        this.getAllEntities().forEach(entity => {
            if (entity.getEntityData().hp <= 0) {
                if (entity instanceof IncomeBall) {
                    if (entity.hostMatou) {
                        this.ballManager.hostMatou = true;
                        this.host.resourceManager.add(this.ballManager.baseReward, this.ballManager.baseReward);
                    }
                    if (entity.clientMatou) {
                        this.ballManager.clientMatou = true;
                        this.client.resourceManager.add(this.ballManager.baseReward, this.ballManager.baseReward);
                    }
                }
                entity.onDeath();
            }
        });
        
        this.host.getSpamBuildings().concat(this.client.getSpamBuildings()).forEach(building => {
            building.resetSpamData();
            building.spamUnit();
        });

        this.host.resourceManager.step();
        this.client.resourceManager.step();

        this.host.updateManager.step();
        this.client.updateManager.step();

        if (this.client instanceof GameBot) {
            this.client.step();
        }
        /* this.gridManager.printGrid();
        this.printEntityStatus(); */

        this.sendaData();
    }

    //returns closest tile with an enemy entity in it
    getClosestTargetTile(unit : Entity) : Tile {
     //   this.gridManager.aStar.load(this.gridManager.getNumberGrid());

        var target : Tile = null;
        var shortestDistance = 100;
        this.getOponentEntities(unit.owner).forEach(other_unit => {
            if (!(other_unit.getEntityData().width > 1 || other_unit.getEntityData().height > 1)) {
                let dist = this.gridManager.aStar.heuristic.getHeuristic(unit.tile.col, unit.tile.row, 0, other_unit.tile.col, other_unit.tile.row, 0);
                if (dist < shortestDistance) {
                    target = other_unit.tile;
                    shortestDistance = dist;
                }
            }
            else {
                for (var i = 0; i < other_unit.getEntityData().width; i++) {
                    for (var j = 0; j < other_unit.getEntityData().height; j++) {
                        var tile: Tile = this.gridManager.tileAt(other_unit.tile.row + j, other_unit.tile.col + i);
                        let dist = this.gridManager.aStar.heuristic.getHeuristic(unit.tile.col, unit.tile.row, 0, tile.col, tile.row, 0);
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
        return this.host.getAllEntities().concat(this.client.getAllEntities()).concat(this.ballManager.gp.getAllEntities());
    }
    getOponentEntities(owner : GamePlayer) : Entity[] {
        if (owner == this.host)
            return this.client.getAllEntities().concat(this.ballManager.gp.getAllEntities());
        else 
            return this.host.getAllEntities().concat(this.ballManager.gp.getAllEntities());
    }
    endGame(hostWon) : void {
        console.log("end game chamado duracao da partida: "+this.totalTurns+" ,Vencedor: "+this.host.serverPlayer.nick);

        clearInterval(this.update);
        clearTimeout(this.sendDataTimeout);
        clearTimeout(this.startGameTimeout);
        this.sendDataTimeout = null;
        this.startGameTimeout = null;
        this.host.getAllEntities().concat(this.client.getAllEntities()).forEach(element => {
            element = null;
        });
        this.host.entities = null;
        this.client.entities = null;
        this.gridManager = null;

        let versusBot = false;
        if (this.client instanceof GameBot) {
            this.client = null;
            versusBot = true;
        }

        GameServer.instance.endGame(this, hostWon, versusBot);
    }


}