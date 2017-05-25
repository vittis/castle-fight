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

    constructor(gm : GridManager, row, col, unitData : UnitData) {
        super(gm, row, col, unitData);        
    }

    moveTo(tile : Tile) : void {
        this.tile.entity = null;
        this.tile = tile;
        tile.entity = this;
    }

    attack(entity : Entity) : void {
        entity.receiveAttack(this);
    }

    doAction(targetTile : Tile) : void {

    }

}



