import { Entity, EntityData } from "./Entity";
import { GridManager } from "./GridManager";
import { Tile } from "./Tile";

export interface UnitData extends EntityData {
    attackRange? : number;
    attackDmg? : number;
    attackRate?: number;

    attackData? : AttackData; 
}

export interface AttackData {
    hasAttacked : boolean;
    row : number;
    col : number;
}

export abstract class Unit extends Entity{

    attackRateCounter : number;

    get data() : UnitData {
        return this.dataq;
    }

    constructor(gm : GridManager, row, col, unitData : UnitData) {
        super(gm, row, col, unitData);   
        this.data.attackData = {hasAttacked: false, row: -1, col: -1};
        this.attackRateCounter = this.data.attackRate;
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

        this.attackRateCounter = 0;
    }
    canAttack() : boolean {
        return this.attackRateCounter == this.data.attackRate;
    }

    doAction(targetTile : Tile) : void {
        if (this.attackRateCounter < this.data.attackRate)
            this.attackRateCounter++;
    }

    resetAttackData() {
        this.data.attackData.hasAttacked = false;
    }
}



