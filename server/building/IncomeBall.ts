import { Building } from "../Building";
import { GridManager } from "../GridManager";
import { IncomeBallManager } from "../IncomeBallManager";
import { Unit } from "../Unit";

export class IncomeBall extends Building {

    ballManager : IncomeBallManager;

    hostMatou : boolean = false;
    clientMatou : boolean = false;

    doAction() {

    }
    constructor(row, col, ballManager) {
        super(row, col, require('clone')(require('../data/buildings/incomeBall.json')));
        this.ballManager = ballManager;
    }

    receiveAttack(unit: Unit) {
        super.receiveAttack(unit);
        if (this.data.hp <= 0) {
            if (unit.owner.isHost) {
                this.hostMatou = true;
            }
            if (!unit.owner.isHost) {
                this.clientMatou = true;
            }
        }
    }
}