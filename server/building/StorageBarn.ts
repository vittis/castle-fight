import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Farmer } from "../unit/Farmer";

export class StorageBarn extends SpamBuilding {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/storageBarn.json')));
    }

    spamUnit() {
        super.spamUnit(Farmer);
    }

}