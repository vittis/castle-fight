import { Unit } from "../Unit";
import { GridManager } from "../GridManager";

export class Soldado extends Unit {
    constructor(gm : GridManager, row, col) {
        super(gm, row, col, require('clone')(require('../data/soldado.json')));
        
    }    
}