import { Building, BuildingData } from "../Building";
import { GridManager } from "../GridManager";
import { Unit } from "../Unit";
import { Tile } from "../Tile";


export interface SpamData {
    hasSpammed: boolean;
    spamRateCounter : number;
}

export abstract class SpamBuilding extends Building {
    
    

    constructor(gm: GridManager, row, col, buildingData : BuildingData) {
        super(gm, row, col, buildingData);
        this.data.spamData = { hasSpammed: false, spamRateCounter: this.data.spamRate};
    }

    spamUnit() {
        this.data.spamCount--;
        if (this.data.spamCount <= 0) 
            this.onDeath();
    }
    getTileToSpam() : Tile {
        var r = Math.floor(Math.random() * this.getOuterTiles().length);
        return this.getOuterTiles()[r];
    }

    resetSpamData() {
        this.data.spamData.hasSpammed = false;
    }
}