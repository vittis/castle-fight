import { GridManager } from "../GridManager";
import { Unit } from "../Unit";
import { Tile } from "../Tile";
import { Entity } from "../Entity";
import { Building } from "../Building";

export class Mage extends Unit {
    constructor(row, col) {
        super(row, col, require('clone')(require('../data/units/mage.json')));
    }

    doAction(targetTile: Tile) {
        if (this.canAttack()) {
            this.attack(targetTile.entity);
            if (targetTile.entity != null) {
                    var attackedId= [];
                    attackedId.push(targetTile.entity.id);
            }
            if (targetTile.entity != null) {
                if (!(targetTile.entity instanceof Building)) {
                    targetTile.entity.getOuterTilesWithEntity().forEach(t => {
                        if (t.entity != null) {
                            if (t.entity.owner.isHost != this.owner.isHost) {
                                if (attackedId.indexOf(t.entity.id) == -1) {
                                    let currentAttack = this.data.attackDmg;
                                    this.data.attackDmg = 2;
                                    t.entity.receiveAttack(this);
                                    this.data.attackDmg = currentAttack;
                                    attackedId.push(t.entity.id);
                                }
                            }
                        }
                    });
                }
            }
        }
    }
}