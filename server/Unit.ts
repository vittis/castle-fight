import { Entity, EntityData } from "./Entity";
import { GridManager } from "./GridManager";
import { Tile } from "./Tile";

export interface UnitData extends EntityData {
    attackRange? : number;
    attackDmg? : number;
}

export abstract class Unit extends Entity{

    get data() : UnitData {
        return this.dataq;
    }

    constructor(gm : GridManager, row, col, unitData : UnitData, owner) {
        super(gm, row, col, unitData, owner);        
    }

    moveTo(tile : Tile) : void {
        this.tile.entity = null;
        this.tile = tile;
        tile.entity = this;
    }

    attack(entity : Entity) : void {
        entity.receiveAttack(this);
    }

}

export class Soldado extends Unit {
    
    constructor(gm : GridManager, row, col, owner) {
        super(gm, row, col, require('clone')(require('./data/soldado.json')), owner);
        
    }    
}

export class Archer extends Unit {
    
    constructor(gm : GridManager, row, col, owner) {
        super(gm, row, col, require('clone')(require('./data/archer.json')), owner);
        
    }    
}