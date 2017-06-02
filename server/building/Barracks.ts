import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Soldado } from "../unit/soldado";

export class Barracks extends SpamBuilding {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/barracks.json')));
    }

    spamUnit() {
        super.spamUnit(Soldado);
    }

}