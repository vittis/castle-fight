import { Building } from "../Building";
import { GridManager } from "../GridManager";

export class Castle extends Building {
    
    doAction() {
        
    }
    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/castle.json')));
    }
}