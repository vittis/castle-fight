import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { EffectBuilding } from "./EffectBuilding";
import { Unit } from "../Unit";

export class HeroShrine extends EffectBuilding {


    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/heroShrine.json')));
    }
    canDoEffect() {
        var canDo = false;
        if (this.owner.getAllUnits().length > 0) {
            this.owner.getAllUnits().forEach(unit => {
                if (unit.data.statusData.heroBuff == false) {
                    canDo=true;
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
        var unit : Unit;
        do {
            unit = allUnits[Math.floor(Math.random() * allUnits.length)];
        } while (unit.data.statusData.heroBuff == true);
        
        unit.data.maxHP += 10;
        unit.data.hp += 10;
        unit.data.attackDmg += 3;
        unit.data.attackRate = Math.max(1, unit.data.attackRate-1);
        unit.data.statusData.heroBuff = true;

    }


    

}