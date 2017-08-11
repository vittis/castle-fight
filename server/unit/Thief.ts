import { Unit } from "../Unit";
import { GridManager } from "../GridManager";
import { Tile } from "../Tile";
import { Entity } from "../Entity";

export class Thief extends Unit {
    constructor(row, col) {
        super(row, col, require('clone')(require('../data/units/thief.json')));
    }

    doAction(targetTile: Tile) {

        if (this.canAttack()) {
            this.attack(targetTile.entity);
            this.owner.resourceManager.add(1, 0);
        }
    }
}