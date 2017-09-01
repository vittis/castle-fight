import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Witch } from "../unit/Witch";

export class WitchsHut extends SpamBuilding {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/witchsHut.json')));
    }

    spamUnit() {
        super.spamUnit(Witch);
    }

}