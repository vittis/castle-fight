import { Building } from "../Building";
import { GridManager } from "../GridManager";
import { IncomeBallManager } from "../IncomeBallManager";

export class IncomeBall extends Building {

    ballManager : IncomeBallManager;

    doAction() {

    }
    constructor(row, col, ballManager) {
        super(row, col, require('clone')(require('../data/buildings/IncomeBall.json')));
        this.ballManager = ballManager;
    }

    onDeath() {
        console.log("bola morreu doida");
        //this.ballManager.ballInGame = false;
        super.onDeath();
    }
}