import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { King } from "../unit/King";

export class KingsCourt extends SpamBuilding {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/kingsCourt.json')));
    }

    spamUnit() {
        super.spamUnit(King);
    }

}