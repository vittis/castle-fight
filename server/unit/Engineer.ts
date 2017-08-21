import { Unit } from "../Unit";
import { GridManager } from "../GridManager";
import { Tile } from "../Tile";
import { Entity } from "../Entity";

export class Engineer extends Unit {
    constructor(row, col) {
        super(row, col, require('clone')(require('../data/units/engineer.json')));
    }

    doAction(targetTile: Tile) {
        if (this.canAttack()) {
            this.attack(targetTile.entity);
            //targetTile.entity.getEntityData().statusData.stunned = true;
            targetTile.entity.getOuterTilesWithEntity().forEach(t => {
                if (t.entity != null) {
                    if (t.entity.owner.isHost != this.owner.isHost) {
                        t.entity.receiveAttack(this);
                    }
                }
            });
        }
    }
}