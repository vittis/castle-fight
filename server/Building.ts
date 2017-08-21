import { Entity, EntityData } from "./Entity";
import { GridManager } from "./GridManager";
import { Tile } from "./Tile";
import { SpamData } from "./building/SpamBuilding";

export interface BuildingData extends EntityData {
    goldCost? : number;
    woodCost? : number;
    incomeGain? : number;
}

export abstract class Building extends Entity {

    get data() : BuildingData {
        return this.dataq;
    }

    constructor(row, col, buildingData : BuildingData) {
        super(row, col, buildingData);
    }



    
}

