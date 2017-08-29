import { GridManager } from "./GridManager";
import { IncomeBall } from "./building/IncomeBall";
import { GamePlayer } from "./GamePlayer";
import { Entity } from "./Entity";
import { GameConfig } from "./GameConfig";
import { Unit } from "./Unit";

export class IncomeBallManager {

    gp : GamePlayer;
    spamRate = GameConfig.BALL_SPAM_RATE;
    spamRateCounter = 0;

    hostMatou = false;
    clientMatou = false;

    baseReward = 10;//+20 no comeco

    constructor(gamePlayer : GamePlayer) {
        this.gp = gamePlayer;
    }

    addBallsToGame() {
        var entity = this.gp.gm.tileAt(12, 15).entity;
        if (entity != null) {
            if (entity instanceof Unit) {
                let outerTiles = entity.getOuterTiles();
                entity.moveTo(outerTiles[Math.floor(Math.random() * outerTiles.length)]);
            }
        }
        entity = this.gp.gm.tileAt(3, 15).entity;
        if (entity != null) {
            if (entity instanceof Unit) {
                let outerTiles = entity.getOuterTiles();
                entity.moveTo(outerTiles[Math.floor(Math.random() * outerTiles.length)]);
            }
        }
        this.gp.addEntity(new IncomeBall(12, 15, this));
        this.gp.addEntity(new IncomeBall(3, 15, this));
        this.baseReward += 20;
    }
    step() {
        this.hostMatou = false;
        this.clientMatou = false;
        if (this.gp.entities.length == 0) {
            this.spamRateCounter++;
            if (this.spamRateCounter == this.spamRate) {
                this.spamRateCounter = 0;
                this.addBallsToGame();
            }
        }
    }
    

}