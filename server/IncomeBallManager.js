"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IncomeBall_1 = require("./building/IncomeBall");
var GameConfig_1 = require("./GameConfig");
var IncomeBallManager = (function () {
    function IncomeBallManager(gamePlayer) {
        this.spamRate = GameConfig_1.GameConfig.BALL_SPAM_RATE;
        this.spamRateCounter = 0;
        this.hostMatou = false;
        this.clientMatou = false;
        this.gp = gamePlayer;
    }
    IncomeBallManager.prototype.addBallsToGame = function () {
        this.gp.addEntity(new IncomeBall_1.IncomeBall(12, 15, this));
        this.gp.addEntity(new IncomeBall_1.IncomeBall(3, 15, this));
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
