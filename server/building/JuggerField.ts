import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Juggernaut } from "../unit/Juggernaut";

export class JuggerField extends SpamBuilding {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/juggerField.json')));
    }

    spamUnit() {
        super.spamUnit(Juggernaut);
    }

}