import { Entity, EntityData } from "./Entity";
import { GridManager } from "./GridManager";
import { Tile } from "./Tile";

export interface UnitData extends EntityData {
    attackRange? : number;
    attackDmg? : number;

    attackData? : AttackData; 
}

export interface AttackData {
    hasAttacked : boolean;
    row : number;
    col : number;
}

export abstract class Unit extends Entity{

    get data() : UnitData {
        return this.dataq;
    }

    constructor(gm : GridManager, row, col, unitData : UnitData) {
        super(gm, row, col, unitData);   
        this.data.attackData = {hasAttacked: false, row: -1, col: -1};
    }

    moveTo(tile : Tile) : void {
        this.tile.entity = null;
        this.tile = tile;
        tile.entity = this;
    }

    attack(entity : Entity) : void {
        this.data.attackData.hasAttacked = true;
        this.data.attackData.row = entity.tile.row;
        this.data.attackData.col= entity.tile.col;

        entity.receiveAttack(this);
    }

    doAction(targetTile : Tile) : void {

    }
    resetAttackData() {
        this.data.attackData.hasAttacked = false;
    }
}



