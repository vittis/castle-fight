import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Thief } from "../unit/Thief";

export class ThiefsTent extends SpamBuilding {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/thiefsTent.json')));
    }

    spamUnit() {
        super.spamUnit(Thief);
    }

}