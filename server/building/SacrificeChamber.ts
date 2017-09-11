import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { EffectBuilding } from "./EffectBuilding";
import { Unit } from "../Unit";

export class SacrificeChamber extends EffectBuilding {


    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/sacrificeChamber.json')));
    }

    unitsKilled=0;

    canDoEffect() {
        var canDo = false;
        if (this.owner.getAllUnits().length > 0) {
            this.owner.getAllUnits().forEach(unit => {
                if (unit.data.maxHP == unit.data.hp) {
                    canDo = true;
                }
            });
        }
        else {
            canDo = false;
        }
        return canDo;
    }
    doEffect() {

        var allUnits = this.owner.getAllUnits();
        var unit: Unit;
        do {
            unit = allUnits[Math.floor(Math.random() * allUnits.length)];
        } while (unit.data.hp != unit.data.maxHP);

        unit.data.hp = 0;
        this.unitsKilled++;
    }

    onDeath() {
        this.owner.resourceManager.add(50*this.unitsKilled, 0);
        super.onDeath();
    }


}