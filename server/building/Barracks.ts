import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Footman } from "../unit/Footman";

export class Barracks extends SpamBuilding {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/barracks.json')));
    }

    spamUnit() {
        super.spamUnit(Footman);
    }

}