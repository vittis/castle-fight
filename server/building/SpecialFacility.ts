import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Sniper } from "../unit/Sniper";

export class SpecialFacility extends SpamBuilding {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/specialFacility.json')));
    }

    spamUnit() {
        super.spamUnit(Sniper);
    }

}