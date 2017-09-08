import { Building, BuildingData } from "../Building";
import { GridManager } from "../GridManager";
import { Unit } from "../Unit";
import { Tile } from "../Tile";
import { EntityData } from "../Entity";

export interface EffectBuildingData extends BuildingData {
    spamCount?: number;
    spamRate?: number;
    spamData?: EffectData;
}
export interface EffectData {
    hasSpammed: boolean;
    spamRateCounter: number;
    isTraining: boolean;
}

export abstract class EffectBuilding extends Building {

    get data(): EffectBuildingData {
        return this.dataq;
    }

    constructor(row, col, buildingData: BuildingData) {
        super(row, col, buildingData);
        this.data.spamData = { hasSpammed: false, spamRateCounter: 0, isTraining: true };
    }

    addToGame(gm) {
        super.addToGame(gm);

        /* this.data.spamRate += this.owner.updateManager.spamRateModifier;
        if (this.data.spamRate <= 0) {
            this.data.spamRate = 1;
        }
        this.data.spamCount += this.owner.updateManager.unitCountModifier; */
    }

    abstract canDoEffect() : boolean;
    abstract doEffect();

    step() {
        if (this.data.spamData.spamRateCounter >= this.data.spamRate) {
            if (this.canDoEffect()) {
                this.doEffect();
                this.data.spamData.spamRateCounter = 0;
                this.data.spamData.hasSpammed = true;
                this.data.spamCount--;
                if (this.data.spamCount <= 0)
                    this.onDeath();
            }

        }
        if (this.data.spamData.isTraining) {
            this.data.spamData.spamRateCounter++;
        }
    }


    resetSpamData() {
        this.data.spamData.hasSpammed = false;
    }

}