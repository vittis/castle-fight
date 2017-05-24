import { GridManager } from "../GridManager";
import { Unit } from "../Unit";

export class Archer extends Unit {
    constructor(gm : GridManager, row, col) {
        super(gm, row, col, require('clone')(require('../data/archer.json')));
        
    }    
}