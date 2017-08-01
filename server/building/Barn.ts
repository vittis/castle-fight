import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Farmer } from "../unit/Farmer";

export class Barn extends SpamBuilding {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/barn.json')));
    }

    spamUnit() {
        super.spamUnit(Farmer);
    }

}