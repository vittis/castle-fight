import { GridManager } from "../GridManager";
import { Unit } from "../Unit";
import { Tile } from "../Tile";
import { Entity } from "../Entity";

export class Witch extends Unit {

    shieldRate = 8;
    shieldRateCounter = 1;

    canShield = false;

    justShielded = false;

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/units/witch.json')));
    }

    doAction(targetTile: Tile) {
        if (this.canAttack() && !this.justShielded)
            this.attack(targetTile.entity);
    }

    step() {
        super.step();
        this.justShielded = false;
        this.shieldRateCounter++;
        if (this.shieldRateCounter >= this.shieldRate) {
            this.canShield = true;
        }

        if (this.canShield) {
            var jaShieldou = false;
            this.getOuterTilesWithEntity().forEach(e => {
                if (e.entity instanceof Unit) {
                    if (e.entity.owner.isHost == this.owner.isHost && !jaShieldou) {
                        if (e.entity.getEntityData().statusData.shielded == false ) {
                            e.entity.getEntityData().statusData.shielded = true;
                            this.shieldRateCounter = 0;
                            jaShieldou=true;
                            this.canShield = false;
                            this.justShielded = true;
                        }
                    }
                }
            });
            if (!jaShieldou && this.getEntityData().statusData.shielded==false) {
                this.getEntityData().statusData.shielded = true;
                this.shieldRateCounter = 0;
                jaShieldou = true;
                this.canShield = false;
                this.justShielded = true;
            }

        }
    }
    moveTowards(targetTile: Tile): void {
        if (!this.justShielded) {
            super.moveTowards(targetTile);
        }
    }
}