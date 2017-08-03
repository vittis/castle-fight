import { GridManager } from "./GridManager";
import { IncomeBall } from "./building/IncomeBall";
import { GamePlayer } from "./GamePlayer";
import { Entity } from "./Entity";

export class IncomeBallManager {

    //ball : IncomeBall;

    gp : GamePlayer;


    constructor(gamePlayer : GamePlayer) {
        this.gp = gamePlayer;
    }

    addBallToGame() {
        /* this.ball = new IncomeBall(12, 14);
        this.ball.owner = this.gp;
        this.ball.addToGame(this.gp.gm);
        this.ballInGame = true; */
        this.gp.addEntity(new IncomeBall(12, 14, this));
    }

    /* getBall() : Entity {
        if (this.gp.entities.length == 1) {
            return this.gp.getAllEntities()[0];
        }
        else {
            return null;
        }
    } */

}