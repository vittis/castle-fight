import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Soldado } from "../unit/soldado";

export class Barracks extends SpamBuilding {

    constructor(gm : GridManager, row, col) {
        super(gm, row, col, require('clone')(require('../data/buildings/barracks.json')));
    }

    spamUnit() {
        super.spamUnit(Soldado);
    }

}