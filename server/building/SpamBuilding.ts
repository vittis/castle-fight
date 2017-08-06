import { Building, BuildingData } from "../Building";
import { GridManager } from "../GridManager";
import { Unit } from "../Unit";
import { Tile } from "../Tile";
import { EntityData } from "../Entity";

export interface SpamBuildingData extends BuildingData {
    spamCount?: number;
    spamRate?: number;
    spamData?: SpamData;
    tileRow?: number;
    tileCol?: number;
}
export interface SpamData {
    hasSpammed: boolean;
    spamRateCounter : number;
    isTraining : boolean;
}

export abstract class SpamBuilding extends Building {
    
    get data(): SpamBuildingData {
        return this.dataq;
    }

    constructor(row, col, buildingData : BuildingData) {
        super(row, col, buildingData);
        this.data.spamData = { hasSpammed: false, spamRateCounter: this.data.spamRate, isTraining: true};
    }

    addToGame(gm) {
        super.addToGame(gm);
        var tile = this.getTileToSpam();
        this.data.tileRow = tile.row;
        this.data.tileCol = tile.col;
    }

    spamUnit(unit? : any) {
        if (this.data.spamData.spamRateCounter == 0) {

            var tile = this.gm.tileAt(this.data.tileRow, this.data.tileCol);
            if (tile.entity != null) {
                tile = this.getTileToSpam();
                this.data.tileRow = tile.row;
                this.data.tileCol = tile.col;
            }

            if (tile) {
                this.owner.addEntity(new unit(tile.row, tile.col));
            }
            this.data.spamData.spamRateCounter = this.data.spamRate;
            this.data.spamData.hasSpammed = true;
            this.data.spamCount--;
            if (this.data.spamCount <= 0)
                this.onDeath();

            //this.data.spamData.isTraining = false;
        }
       if (this.data.spamData.isTraining) {
            this.data.spamData.spamRateCounter--;
       }
    }

    trainUnit() {//n sendo usado
        this.data.spamData.isTraining = true;
    }

    getTileToSpam() : Tile {
        var r = Math.floor(Math.random() * this.getOuterTiles().length);
        return this.getOuterTiles()[r];
    }

    resetSpamData() {
        this.data.spamData.hasSpammed = false;
    }
    
}