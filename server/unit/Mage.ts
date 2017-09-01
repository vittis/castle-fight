import { GridManager } from "../GridManager";
import { Unit } from "../Unit";
import { Tile } from "../Tile";
import { Entity } from "../Entity";

export class Mage extends Unit {
    constructor(row, col) {
        super(row, col, require('clone')(require('../data/units/mage.json')));
    }

    doAction(targetTile: Tile) {
        if (this.canAttack()) {
            this.attack(targetTile.entity);
            var attackedId= targetTile.entity.id;
            
            targetTile.entity.getOuterTilesWithEntity().forEach(t => {
                if (t.entity != null) {
                    if (t.entity.owner.isHost != this.owner.isHost) {
                        if (attackedId != t.entity.id) {
                            let currentAttack = this.data.attackDmg;
                            this.data.attackDmg = 2;
                            t.entity.receiveAttack(this);
                            this.data.attackDmg = currentAttack;
                            attackedId = t.entity.id;
                        }
                    }
                }
            });
        }
    }
}