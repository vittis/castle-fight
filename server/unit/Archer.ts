import { GridManager } from "../GridManager";
import { Unit } from "../Unit";
import { Tile } from "../Tile";
import { Entity } from "../Entity";

export class Archer extends Unit {
    constructor(row, col) {
        super(row, col, require('clone')(require('../data/units/archer.json')));
    }    

    doAction(targetTile: Tile) {
        super.doAction(targetTile);

        if (this.canAttack())
            this.attack(targetTile.entity);
    }
}