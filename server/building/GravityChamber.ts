import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Propeller } from "../unit/Propeller";

export class GravityChamber extends SpamBuilding {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/gravityChamber.json')));
    }

    spamUnit() {
        super.spamUnit(Propeller);
    }

}