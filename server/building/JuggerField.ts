import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Juggernaut } from "../unit/Juggernaut";

export class JuggerField extends SpamBuilding {

    constructor(gm: GridManager, row, col) {
        super(gm, row, col, require('clone')(require('../data/buildings/juggerField.json')));
    }

    spamUnit() {
        super.spamUnit(Juggernaut);
    }

}