import { AttackBuilding } from "./AttackBuilding";
import { GridManager } from "../GridManager";
import { Tile } from "../Tile";

export class Tower extends AttackBuilding {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/tower.json')));
    }

    doAction(targetTile: Tile) {
       // super.doAction(targetTile);
        if (this.canAttack())
            this.attack(targetTile.entity);
    }

}