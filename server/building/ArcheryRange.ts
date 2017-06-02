import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Archer } from "../unit/Archer";

export class ArcheryRange extends SpamBuilding {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/archeryRange.json')));
    }

    spamUnit() {
        super.spamUnit(Archer);
    }

}