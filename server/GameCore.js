"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GamePlayer_1 = require("./GamePlayer");
var GridManager_1 = require("./GridManager");
var AStar_1 = require("./lib/AStar");
var EuclideanHeuristic_1 = require("./lib/Heuristics/EuclideanHeuristic");
var GameConfig_1 = require("./GameConfig");
var Castle_1 = require("./building/Castle");
var GameServer_1 = require("./GameServer");
var Serializer_1 = require("./Serializer");
var IncomeBallManager_1 = require("./IncomeBallManager");
var Tower_1 = require("./building/Tower");
var GameCore = (function () {
    function GameCore(id, host, client) {
        this.id = id;
        this.gridManager = new GridManager_1.GridManager(new AStar_1.AStar(new EuclideanHeuristic_1.EuclideanHeuristic()), GameConfig_1.GameConfig.GRID_ROWS, GameConfig_1.GameConfig.GRID_COLS);
        this.host = new GamePlayer_1.GamePlayer(host, true, this.gridManager);
        this.client = new GamePlayer_1.GamePlayer(client, false, this.gridManager);
        this.ballManager = new IncomeBallManager_1.IncomeBallManager(new GamePlayer_1.GamePlayer(null, null, this.gridManager));
        this.host.buildBuilding(new Castle_1.Castle(GameConfig_1.GameConfig.GRID_ROWS / 2 - 1, 0));
        this.client.buildBuilding(new Castle_1.Castle(GameConfig_1.GameConfig.GRID_ROWS / 2 - 1, GameConfig_1.GameConfig.GRID_COLS - 2));
        this.client.buildBuilding(new Tower_1.Tower(3, 24));
        this.client.buildBuilding(new Tower_1.Tower(11, 24));
        this.host.buildBuilding(new Tower_1.Tower(11, 5));
        this.host.buildBuilding(new Tower_1.Tower(3, 5));
        //this.host.buildBuilding(new ArcheryRange(GameConfig.GRID_ROWS / 2 - 1 - 2 - 2, 1));
        /* this.host.buildBuilding(new Barracks(GameConfig.GRID_ROWS / 2 - 1 - 2, 0));
        this.host.buildBuilding(new Barn(0, 0));
        this.host.buildBuilding(new Barn(2, 3)); */
        /*  this.host.buildBuilding(new ArcheryRange(GameConfig.GRID_ROWS / 2 - 1 + 3, 0));
         this.client.buildBuilding(new ArcheryRange(GameConfig.GRID_ROWS / 2 + 4, GameConfig.GRID_COLS - 2)); */
        //this.host.addEntity(new Soldado(15, 28));
        //this.client.addEntity(new Archer(GameConfig.GRID_ROWS / 2 + 4, GameConfig.GRID_COLS - 6));    
        this.setSocket(this.host.serverPlayer, true);
        this.setSocket(this.client.serverPlayer, false);
        setTimeout(this.sendaData.bind(this), 100);
        setTimeout(this.trainCoisa.bind(this), 5000);
        this.gridManager.printGrid();
        this.update = setInterval(this.step.bind(this), GameConfig_1.GameConfig.STEP_RATE);
    }
    GameCore.prototype.trainCoisa = function () {
        this.host.getSpamBuildings().forEach(function (b) {
            b.data.spamData.isTraining = true;
        });
    };
    GameCore.prototype.setSocket = function (p, isHost) {
        if (p.socket) {
            p.socket.emit('startGame', { id: this.id, rows: GameConfig_1.GameConfig.GRID_ROWS, cols: GameConfig_1.GameConfig.GRID_COLS, isHost: isHost, stepRate: GameConfig_1.GameConfig.STEP_RATE });
            p.socket.on('askBuild', function (data) {
                if (data.isHost) {
                    this.host.buildBuilding(new (require('./building/' + data.name))[data.name](data.row, data.col));
                }
                else {
                    this.client.buildBuilding(new (require('./building/' + data.name))[data.name](data.row, data.col));
                }
            }.bind(this));
            p.socket.on('askSpamTileMark', function (data) {
                if (data.isHost) {
                    this.host.getEntityById(data.buildingId).data.tileRow = data.row;
                    this.host.getEntityById(data.buildingId).data.tileCol = data.col;
                }
                else {
                    this.client.getEntityById(data.buildingId).data.tileRow = data.row;
                    this.client.getEntityById(data.buildingId).data.tileCol = data.col;
                }
            }.bind(this));
            p.socket.on('askTrainUnit', function (data) {
                if (data.isHost) {
                    this.host.getEntityById(data.buildingId).data.spamData.isTraining = true;
                }
                else {
                    this.client.getEntityById(data.buildingId).data.spamData.isTraining = true;
                }
            }.bind(this));
            p.socket.on('askPauseUnit', function (data) {
                if (data.isHost) {
                    this.host.getEntityById(data.buildingId).data.spamData.isTraining = false;
                }
                else {
                    this.client.getEntityById(data.buildingId).data.spamData.isTraining = false;
                }
            }.bind(this));
        }
    };
    GameCore.prototype.sendaData = function () {
        var entitiesObj = [];
        this.getAllEntities().forEach(function (element) {
            entitiesObj.push(Serializer_1.DataSerializer.SerializeEntity(element));
        });
        var hostObj = Serializer_1.DataSerializer.SerializePlayer(this.host);
        var clientObj = Serializer_1.DataSerializer.SerializePlayer(this.client);
        var ballObj = Serializer_1.DataSerializer.SerializeBall(this.ballManager);
        if (this.host.serverPlayer.socket) {
            this.host.serverPlayer.socket.emit('receiveData', { entities: entitiesObj, player: hostObj, ballData: ballObj });
        }
        if (this.client.serverPlayer.socket) {
            this.client.serverPlayer.socket.emit('receiveData', { entities: entitiesObj, player: clientObj, ballData: ballObj });
        }
    };
    GameCore.prototype.step = function () {
        var _this = this;
        //tentar atacar
        this.gridManager.aStar.load(this.gridManager.getNumberGrid());
        this.host.getAttackBuildings().concat(this.client.getAttackBuildings()).forEach(function (building) {
            building.resetAttackData();
            var closestTileWithEnemy = _this.getClosestTargetTile(building);
            if (closestTileWithEnemy != null) {
                if (building.inRange(closestTileWithEnemy)) {
                    building.doAction(closestTileWithEnemy);
                }
            }
        });
        this.getAllUnits().forEach(function (unit) {
            unit.resetAttackData();
            var closestTileWithEnemy = _this.getClosestTargetTile(unit);
            if (closestTileWithEnemy != null) {
                if (unit.inRange(closestTileWithEnemy)) {
                    unit.doAction(closestTileWithEnemy);
                }
            }
        });
        //tentar mover
        this.getAllUnits().forEach(function (unit) {
            _this.gridManager.aStar.load(_this.gridManager.getNumberGrid());
            var closestTileWithEnemy = _this.getClosestTargetTile(unit);
            if (closestTileWithEnemy != null) {
                if (!unit.inRange(closestTileWithEnemy)) {
                    if (!unit.data.attackData.hasAttacked) {
                        var targetTile;
                        if (_this.gridManager.getDistance(unit.tile.col, unit.tile.row, closestTileWithEnemy.col, closestTileWithEnemy.row) <= 4) {
                            targetTile = closestTileWithEnemy;
                        }
                        else {
                            if (unit.tile.row >= 8) {
                                if (unit.owner.isHost) {
                                    targetTile = unit.tile.col < 20 ? _this.gridManager.tileAt(12, 22) : _this.gridManager.tileAt(7, 25);
                                }
                                else {
                                    targetTile = unit.tile.col <= 6 ? _this.gridManager.tileAt(7, 3) : _this.gridManager.tileAt(12, 6);
                                }
                            }
                            else {
                                if (unit.owner.isHost) {
                                    targetTile = unit.tile.col >= 20 ? _this.gridManager.tileAt(8, 25) : _this.gridManager.tileAt(3, 22);
                                }
                                else {
                                    targetTile = unit.tile.col <= 6 ? _this.gridManager.tileAt(8, 5) : _this.gridManager.tileAt(3, 8);
                                }
                            }
                        }
                        unit.moveTowards(targetTile);
                    }
                }
            }
        });
        this.getAllEntities().forEach(function (entity) {
            if (entity.getEntityData().hp <= 0)
                entity.onDeath();
        });
        this.host.getSpamBuildings().concat(this.client.getSpamBuildings()).forEach(function (building) {
            building.resetSpamData();
            building.spamUnit();
        });
        this.ballManager.step();
        this.host.resourceManager.step();
        this.client.resourceManager.step();
        /* this.gridManager.printGrid();
        this.printEntityStatus(); */
        this.sendaData();
    };
    //returns closest tile with an enemy entity in it
    GameCore.prototype.getClosestTargetTile = function (unit) {
        //   this.gridManager.aStar.load(this.gridManager.getNumberGrid());
        var _this = this;
        var target = null;
        var shortestDistance = 100;
        this.getOponentEntities(unit.owner).forEach(function (other_unit) {
            if (!(other_unit.getEntityData().width > 1 || other_unit.getEntityData().height > 1)) {
                var dist = _this.gridManager.aStar.heuristic.getHeuristic(unit.tile.col, unit.tile.row, 0, other_unit.tile.col, other_unit.tile.row, 0);
                if (dist < shortestDistance) {
                    target = other_unit.tile;
                    shortestDistance = dist;
                }
            }
            else {
                for (var i = 0; i < other_unit.getEntityData().width; i++) {
                    for (var j = 0; j < other_unit.getEntityData().height; j++) {
                        var tile = _this.gridManager.tileAt(other_unit.tile.row + j, other_unit.tile.col + i);
                        var dist = _this.gridManager.aStar.heuristic.getHeuristic(unit.tile.col, unit.tile.row, 0, tile.col, tile.row, 0);
                        if (dist < shortestDistance) {
                            target = tile;
                            shortestDistance = dist;
                        }
                    }
                }
            }
        });
        return target;
    };
    GameCore.prototype.getAllUnits = function () {
        return this.host.getAllUnits().concat(this.client.getAllUnits());
    };
    GameCore.prototype.getAllEntities = function () {
        return this.host.getAllEntities().concat(this.client.getAllEntities()).concat(this.ballManager.gp.getAllEntities());
    };
    GameCore.prototype.getOponentEntities = function (owner) {
        if (owner == this.host)
            return this.client.getAllEntities().concat(this.ballManager.gp.getAllEntities());
        else
            return this.host.getAllEntities().concat(this.ballManager.gp.getAllEntities());
    };
    GameCore.prototype.endGame = function () {
        console.log("end game chamado");
        clearInterval(this.update);
        GameServer_1.GameServer.instance.endGame(this);
    };
    GameCore.prototype.printEntityStatus = function () {
        this.getAllEntities().forEach(function (e) {
            console.log(e.getEntityData().name + ", owner: " + e.owner.isHost + ", hp: " + e.getEntityData().hp + ", armor: " + e.getEntityData().armor + ", owner gold: " + e.owner.resourceManager.gold);
        });
    };
    return GameCore;
}());
exports.GameCore = GameCore;