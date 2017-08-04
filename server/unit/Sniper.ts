import { GridManager } from "../GridManager";
import { Unit } from "../Unit";
import { Tile } from "../Tile";
import { Entity } from "../Entity";

export class Sniper extends Unit {

    hasAttacked = false;
    
    constructor(row, col) {
        super(row, col, require('clone')(require('../data/units/sniper.json')));
        this.data.attackDmg += 4;
        this.data.attackRange += 2;
    }

    doAction(targetTile: Tile): void {
        super.doAction(targetTile);

        if (this.canAttack()) {
            this.attack(targetTile.entity);
            if (!this.hasAttacked) {
                this.data.attackDmg -= 4;
                this.data.attackRange -= 2;
                this.hasAttacked = true;
            }
        }
    }

}