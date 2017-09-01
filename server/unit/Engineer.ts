import { Unit } from "../Unit";
import { GridManager } from "../GridManager";
import { Tile } from "../Tile";
import { Entity } from "../Entity";
import { TrapDevice } from "../building/TrapDevice";

export class Engineer extends Unit {
    constructor(row, col) {
        super(row, col, require('clone')(require('../data/units/engineer.json')));
    }

    /* doAction(targetTile: Tile) {
        if (this.canAttack()) {
            this.attack(targetTile.entity);
            //targetTile.entity.getEntityData().statusData.stunned = true;
            var attackedId = targetTile.entity.id;

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
    } */
    doAction(targetTile: Tile) {
        if (this.canAttack()) {
            this.attack(targetTile.entity);
        }
    }

    onDeath() {
        this.tile.entity = null;
        this.owner.addEntity(new TrapDevice(this.tile.row, this.tile.col));
        this.owner.removeEntity(this);
        //super.onDeath();
    }
}