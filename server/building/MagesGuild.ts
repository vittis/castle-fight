import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Mage } from "../unit/Mage";

export class MagesGuild extends SpamBuilding {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/magesGuild.json')));
    }

    spamUnit() {
        super.spamUnit(Mage);
    }

}