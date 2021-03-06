"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GamePlayer_1 = require("./GamePlayer");
var GridManager_1 = require("./GridManager");
var ServerPlayer_1 = require("./ServerPlayer");
var AStar_1 = require("./lib/AStar");
var EuclideanHeuristic_1 = require("./lib/Heuristics/EuclideanHeuristic");
var GameConfig_1 = require("./GameConfig");
var Castle_1 = require("./building/Castle");
var GameServer_1 = require("./GameServer");
var Serializer_1 = require("./Serializer");
var IncomeBallManager_1 = require("./IncomeBallManager");
var Tower_1 = require("./building/Tower");
var IncomeBall_1 = require("./building/IncomeBall");
var GameBot_1 = require("./GameBot");
var GameCore = (function () {
    function GameCore(id, host, client) {
        this.totalTurns = 0;
        this.observers = [];
        this.id = id;
        this.gridManager = new GridManager_1.GridManager(new AStar_1.AStar(new EuclideanHeuristic_1.EuclideanHeuristic()), GameConfig_1.GameConfig.GRID_ROWS, GameConfig_1.GameConfig.GRID_COLS);
        this.host = new GamePlayer_1.GamePlayer(host, true, this.gridManager);
        if (client.socket) {
            this.client = new GamePlayer_1.GamePlayer(client, false, this.gridManager);
        }
        else {
            this.client = new GameBot_1.GameBot(client, false, this.gridManager);
        }
        this.ballManager = new IncomeBallManager_1.IncomeBallManager(new GamePlayer_1.GamePlayer(null, null, this.gridManager));
        this.hostCastle = new Castle_1.Castle(GameConfig_1.GameConfig.GRID_ROWS / 2 - 1, 2);
        this.clientCastle = new Castle_1.Castle(GameConfig_1.GameConfig.GRID_ROWS / 2 - 1, GameConfig_1.GameConfig.GRID_COLS - 2 - 2);
        this.host.buildBuilding(this.hostCastle);
        this.client.buildBuilding(this.clientCastle);
        this.client.buildBuilding(new Tower_1.Tower(3, 24, this.host));
        this.client.buildBuilding(new Tower_1.Tower(11, 24, this.host));
        this.host.buildBuilding(new Tower_1.Tower(11, 5, this.client));
        this.host.buildBuilding(new Tower_1.Tower(3, 5, this.client));
        if (client.socket)
            this.client.serverPlayer.socket.emit('startGame', { id: this.id, rows: GameConfig_1.GameConfig.GRID_ROWS, cols: GameConfig_1.GameConfig.GRID_COLS, isHost: false, stepRate: GameConfig_1.GameConfig.STEP_RATE, playerId: client.id, opponentNick: host.nick });
        if (host.socket)
            this.host.serverPlayer.socket.emit('startGame', { id: this.id, rows: GameConfig_1.GameConfig.GRID_ROWS, cols: GameConfig_1.GameConfig.GRID_COLS, isHost: true, stepRate: GameConfig_1.GameConfig.STEP_RATE, playerId: host.id, opponentNick: client.nick });
        this.sendDataTimeout = setTimeout(this.sendaData.bind(this), 1000);
        this.startGameTimeout = setTimeout(this.startGame.bind(this), 2000);
    }
    GameCore.prototype.startGame = function () {
        if (this.client || this.host) {
            this.update = setInterval(this.step.bind(this), GameConfig_1.GameConfig.STEP_RATE);
        }
    };
    GameCore.prototype.setSocket = function (p, isHost) {
    };
    GameCore.prototype.sendaData = function () {
        var _this = this;
        var entitiesObj = [];
        this.getAllEntities().forEach(function (element) {
            entitiesObj.push(Serializer_1.DataSerializer.SerializeEntity(element));
        });
        var hostObj = Serializer_1.DataSerializer.SerializePlayer(this.host);
        var clientObj = Serializer_1.DataSerializer.SerializePlayer(this.client);
        var ballObj = Serializer_1.DataSerializer.SerializeBall(this.ballManager);
        if (this.host) {
            if (this.host.serverPlayer.socket) {
                this.host.serverPlayer.socket.emit('receiveData', { entities: entitiesObj, player: hostObj, ballData: ballObj, watchCount: this.observers.length });
            }
        }
        if (this.client) {
            if (this.client.serverPlayer.socket) {
                this.client.serverPlayer.socket.emit('receiveData', { entities: entitiesObj, player: clientObj, ballData: ballObj, watchCount: this.observers.length });
            }
        }
        if (this.observers.length > 0) {
            this.observers.forEach(function (p) {
                if (p != null) {
                    if (p.status == ServerPlayer_1.PlayerStatus.spectating) {
                        p.socket.emit('receiveData', { entities: entitiesObj, player: { client: clientObj, host: hostObj }, ballData: ballObj, watchCount: _this.observers.length });
                    }
                }
            });
        }
    };
    GameCore.prototype.removeObserver = function (id) {
        for (var i = 0; i < this.observers.length; i++) {
            if (this.observers[i].id == id) {
                this.observers.splice(i, 1);
                break;
            }
        }
    };
    GameCore.prototype.step = function () {
        var _this = this;
        this.totalTurns++;
        if (this.clientCastle.data.hp <= 0 || this.hostCastle.data.hp <= 0) {
            if (this.clientCastle.data.hp <= 0) {
                console.log("JOGOU ACABOU -" + this.host.serverPlayer.nick + "- GANHOU");
                this.endGame(true);
            }
            else {
                console.log("JOGOU ACABOU -" + this.client.serverPlayer.nick + "- GANHOU");
                this.endGame(false);
            }
            return;
        }
        this.host.getEffectBuildings().concat(this.client.getEffectBuildings()).forEach(function (building) {
            building.resetSpamData();
            building.step();
        });
        this.gridManager.aStar.load(this.gridManager.getNumberGrid());
        this.host.getAttackBuildings().concat(this.client.getAttackBuildings()).forEach(function (building) {
            building.resetAttackData();
            building.step();
            var closestTileWithEnemy = _this.getClosestTargetTile(building);
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
        this.getAllUnits().forEach(function (unit) {
            unit.resetAttackData();
            unit.step();
            if (!unit.justSpawned) {
                var closestTileWithEnemy = _this.getClosestTargetTile(unit);
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
        this.getAllUnits().forEach(function (unit) {
            _this.gridManager.aStar.load(_this.gridManager.getNumberGrid());
            if (!unit.justSpawned) {
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
                                        targetTile = unit.tile.col <= 8 ? _this.gridManager.tileAt(8, 5) : _this.gridManager.tileAt(3, 8);
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
        this.getAllEntities().forEach(function (entity) {
            if (entity.getEntityData().hp <= 0) {
                if (entity instanceof IncomeBall_1.IncomeBall) {
                    if (entity.hostMatou) {
                        _this.ballManager.hostMatou = true;
                        _this.host.resourceManager.add(_this.ballManager.baseReward, _this.ballManager.baseReward);
                    }
                    if (entity.clientMatou) {
                        _this.ballManager.clientMatou = true;
                        _this.client.resourceManager.add(_this.ballManager.baseReward, _this.ballManager.baseReward);
                    }
                }
                entity.onDeath();
            }
        });
        this.host.getSpamBuildings().concat(this.client.getSpamBuildings()).forEach(function (building) {
            building.resetSpamData();
            building.spamUnit();
        });
        this.host.resourceManager.step();
        this.client.resourceManager.step();
        this.host.updateManager.step();
        this.client.updateManager.step();
        if (this.client instanceof GameBot_1.GameBot) {
            this.client.step();
        }
        this.sendaData();
    };
    GameCore.prototype.getClosestTargetTile = function (unit) {
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
    GameCore.prototype.endGame = function (hostWon) {
        console.log("end game chamado duracao da partida: " + this.totalTurns + " ,Vencedor: " + this.host.serverPlayer.nick);
        clearInterval(this.update);
        clearTimeout(this.sendDataTimeout);
        clearTimeout(this.startGameTimeout);
        this.sendDataTimeout = null;
        this.startGameTimeout = null;
        this.host.getAllEntities().concat(this.client.getAllEntities()).forEach(function (element) {
            element = null;
        });
        this.host.entities = null;
        this.client.entities = null;
        this.gridManager = null;
        var versusBot = false;
        if (this.client instanceof GameBot_1.GameBot) {
            this.client = null;
            versusBot = true;
        }
        GameServer_1.GameServer.instance.endGame(this, hostWon, versusBot);
    };
    return GameCore;
}());
exports.GameCore = GameCore;
