import { Building } from "../Building";
import { GridManager } from "../GridManager";

export class Castle extends Building {
    doAction() {
        
    }
    constructor(gm: GridManager, row, col) {
        super(gm, row, col, require('clone')(require('../data/castle.json')));
    }
}