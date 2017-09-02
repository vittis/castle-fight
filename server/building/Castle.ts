import { GridManager } from "../GridManager";
import { AttackBuilding } from "./AttackBuilding";
import { Tile } from "../Tile";

export class Castle extends AttackBuilding {
    

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/castle.json')));
    }

    doAction(targetTile: Tile) {
        // super.doAction(targetTile);
        if (this.canAttack())
            this.attack(targetTile.entity);
    }
}