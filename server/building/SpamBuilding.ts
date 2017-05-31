import { Building, BuildingData } from "../Building";
import { GridManager } from "../GridManager";
import { Unit } from "../Unit";
import { Tile } from "../Tile";
import { EntityData } from "../Entity";

export interface SpamBuildingData extends BuildingData {
    spamCount?: number;
    spamRate?: number;
    spamData?: SpamData;
}
export interface SpamData {
    hasSpammed: boolean;
    spamRateCounter : number;
}

export abstract class SpamBuilding extends Building {
    
    get data(): SpamBuildingData {
        return this.dataq;
    }

    constructor(gm: GridManager, row, col, buildingData : BuildingData) {
        super(gm, row, col, buildingData);
        this.data.spamData = { hasSpammed: false, spamRateCounter: this.data.spamRate};
    }

    spamUnit(unit : any) {
        if (this.data.spamData.spamRateCounter == 0) {
            var tile = this.getTileToSpam();
            this.owner.addEntity(new unit(this.gm, tile.row, tile.col));
            this.data.spamData.spamRateCounter = this.data.spamRate;
            this.data.spamData.hasSpammed = true;
            this.data.spamCount--;
            if (this.data.spamCount <= 0)
                this.onDeath();
        }
       
        this.data.spamData.spamRateCounter--;
    }
    getTileToSpam() : Tile {
        var r = Math.floor(Math.random() * this.getOuterTiles().length);
        return this.getOuterTiles()[r];
    }

    resetSpamData() {
        this.data.spamData.hasSpammed = false;
    }
}