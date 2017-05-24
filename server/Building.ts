import { Entity, EntityData } from "./Entity";
import { GridManager } from "./GridManager";

export interface BuildingData extends EntityData {
    canAttack? : boolean;
}


export abstract class Building extends Entity {

    get data() : BuildingData {
        return this.dataq;
    }

    constructor(gm : GridManager, row, col, buildingData : BuildingData, owner) {
        super(gm, row, col, buildingData, owner);
    }

}
export class Castle extends Building {
    constructor(gm : GridManager, row, col, owner) {
        super(gm, row, col, require('clone')(require('./data/castle.json')), owner);
    }
}
export class Barracks extends Building {
    constructor(gm : GridManager, row, col, owner) {
        super(gm, row, col, require('clone')(require('./data/barracks.json')), owner);
    }

}