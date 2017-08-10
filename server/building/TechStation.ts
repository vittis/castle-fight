import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Engineer } from "../unit/Engineer";

export class TechStation extends SpamBuilding {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/techStation.json')));
    }

    spamUnit() {
        super.spamUnit(Engineer);
    }

}