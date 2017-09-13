"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IncomeBall_1 = require("./building/IncomeBall");
var GameConfig_1 = require("./GameConfig");
var Unit_1 = require("./Unit");
var Building_1 = require("./Building");
var IncomeBallManager = (function () {
    function IncomeBallManager(gamePlayer) {
        this.spamRate = GameConfig_1.GameConfig.BALL_SPAM_RATE;
        this.spamRateCounter = 0;
        this.hostMatou = false;
        this.clientMatou = false;
        this.baseReward = 10;
        this.gp = gamePlayer;
    }
    IncomeBallManager.prototype.addBallsToGame = function () {
        var entity = this.gp.gm.tileAt(12, 15).entity;
        if (entity != null) {
            if (entity instanceof Unit_1.Unit) {
                var outerTiles = entity.getOuterTiles();
                entity.moveTo(outerTiles[Math.floor(Math.random() * outerTiles.length)]);
            }
            else if (entity instanceof Building_1.Building) {
                var outerTiles = entity.getOuterTiles();
                var tile = outerTiles[Math.floor(Math.random() * outerTiles.length)];
                if (tile != null) {
                    entity.tile.entity = null;
                    entity.tile = tile;
                    tile.entity = entity;
                }
            }
        }
        entity = this.gp.gm.tileAt(3, 15).entity;
        if (entity != null) {
            if (entity instanceof Unit_1.Unit) {
                var outerTiles = entity.getOuterTiles();
                entity.moveTo(outerTiles[Math.floor(Math.random() * outerTiles.length)]);
            }
            else if (entity instanceof Building_1.Building) {
                var outerTiles = entity.getOuterTiles();
                var tile = outerTiles[Math.floor(Math.random() * outerTiles.length)];
                entity.tile.entity = null;
                entity.tile = tile;
                tile.entity = entity;
            }
        }
        this.gp.addEntity(new IncomeBall_1.IncomeBall(12, 15, this));
        this.gp.addEntity(new IncomeBall_1.IncomeBall(3, 15, this));
        this.baseReward += 20;
    };
    IncomeBallManager.prototype.step = function () {
        this.hostMatou = false;
        this.clientMatou = false;
        if (this.gp.entities.length == 0) {
            this.spamRateCounter++;
            if (this.spamRateCounter == this.spamRate) {
                this.spamRateCounter = 0;
                this.addBallsToGame();
            }
        }
    };
    return IncomeBallManager;
}());
exports.IncomeBallManager = IncomeBallManager;
