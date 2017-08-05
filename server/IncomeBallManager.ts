import { GridManager } from "./GridManager";
import { IncomeBall } from "./building/IncomeBall";
import { GamePlayer } from "./GamePlayer";
import { Entity } from "./Entity";
import { GameConfig } from "./GameConfig";

export class IncomeBallManager {

    gp : GamePlayer;
    spamRate = GameConfig.BALL_SPAM_RATE;
    spamRateCounter = 0;

    constructor(gamePlayer : GamePlayer) {
        this.gp = gamePlayer;
    }

    addBallsToGame() {
        this.gp.addEntity(new IncomeBall(12, 15, this));
        this.gp.addEntity(new IncomeBall(3, 15, this));

    }
    step() {
        if (this.gp.entities.length == 0) {
            this.spamRateCounter++;
            if (this.spamRateCounter == this.spamRate) {
                this.spamRateCounter = 0;
                this.addBallsToGame();
            }
        }
    }
    

}