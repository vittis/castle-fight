"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Unit_1 = require("./Unit");
var Building_1 = require("./Building");
var SpamBuilding_1 = require("./building/SpamBuilding");
var ResourceManager_1 = require("./ResourceManager");
var AttackBuilding_1 = require("./building/AttackBuilding");
var UpdateManager_1 = require("./UpdateManager");
var GamePlayer = (function () {
    function GamePlayer(player, isHost, gm) {
        this.entities = [];
        this.serverPlayer = player;
        this.isHost = isHost;
        this.gm = gm;
        this.resourceManager = new ResourceManager_1.ResourceManager();
        this.updateManager = new UpdateManager_1.UpdateManager(this);
    }
    GamePlayer.prototype.buildBuilding = function (b) {
        if (this.resourceManager.canBuild(b.data.goldCost, b.data.woodCost)) {
            if (this.gm.tileAt(b.row, b.col).entity == null) {
                if (!(b instanceof Unit_1.Unit)) {
                    this.resourceManager.subtract(b.data.goldCost, b.data.woodCost);
                    if (b.data.woodCost == 0) {
                        this.resourceManager.add(0, b.data.goldCost);
                    }
                    this.resourceManager.income += b.data.incomeGain;
                    this.addEntity(b);
                }
                else {
                    this.resourceManager.subtract(b.data.goldCost, b.data.woodCost);
                    b.justSpawned = true;
                    this.addEntity(b);
                }
            }
        }
        else {
            console.log("nao ha recursos");
        }
    };
    GamePlayer.prototype.addEntity = function (e) {
        e.owner = this;
        e.id = GamePlayer.lastEntityID;
        GamePlayer.lastEntityID++;
        this.entities.push(e);
        e.addToGame(this.gm);
    };
    GamePlayer.prototype.getAllUnits = function () {
        var units = [];
        this.entities.forEach(function (e) {
            if (e instanceof Unit_1.Unit) {
                units.push(e);
            }
        });
        return units;
    };
    GamePlayer.prototype.getAllBuildings = function () {
        var buildings = [];
        this.entities.forEach(function (e) {
            if (e instanceof Building_1.Building) {
                buildings.push(e);
            }
        });
        return buildings;
    };
    GamePlayer.prototype.getAttackBuildings = function () {
        var buildings = [];
        this.entities.forEach(function (e) {
            if (e instanceof AttackBuilding_1.AttackBuilding) {
                buildings.push(e);
            }
        });
        return buildings;
    };
    GamePlayer.prototype.getSpamBuildings = function () {
        var buildings = [];
        this.getAllBuildings().forEach(function (e) {
            if (e instanceof SpamBuilding_1.SpamBuilding) {
                buildings.push(e);
            }
        });
        return buildings;
    };
    GamePlayer.prototype.getAllEntities = function () {
        return this.entities;
    };
    GamePlayer.prototype.getEntityById = function (id) {
        var entity = null;
        this.entities.forEach(function (e) {
            if (e.id == id) {
                entity = e;
            }
        });
        return entity;
    };
    GamePlayer.prototype.removeEntity = function (entity) {
        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i] == entity) {
                this.entities.splice(i, 1);
            }
        }
    };
    GamePlayer.prototype.idExists = function (id) {
        var jaExisteId = false;
        this.entities.forEach(function (e) {
            if (e.id == id) {
                jaExisteId = true;
            }
        });
        return jaExisteId;
    };
    GamePlayer.lastEntityID = 0;
    return GamePlayer;
}());
exports.GamePlayer = GamePlayer;
