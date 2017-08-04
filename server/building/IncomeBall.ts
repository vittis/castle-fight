import { Building } from "../Building";
import { GridManager } from "../GridManager";
import { IncomeBallManager } from "../IncomeBallManager";
import { Unit } from "../Unit";

export class IncomeBall extends Building {

    ballManager : IncomeBallManager;

    doAction() {

    }
    constructor(row, col, ballManager) {
        super(row, col, require('clone')(require('../data/buildings/IncomeBall.json')));
        this.ballManager = ballManager;
    }

    receiveAttack(unit: Unit) {
        super.receiveAttack(unit);
        if (this.data.hp <= 0) {
            unit.owner.resourceManager.add(50, 50);
        }
    }
}