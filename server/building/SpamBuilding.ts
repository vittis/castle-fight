import { Building, BuildingData } from "../Building";
import { GridManager } from "../GridManager";
import { Unit } from "../Unit";
import { Tile } from "../Tile";

export abstract class SpamBuilding extends Building {

    spamRateCounter : number;
    
    constructor(gm: GridManager, row, col, buildingData : BuildingData) {
        super(gm, row, col, buildingData);
        this.spamRateCounter = this.data.spamRate;
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
}