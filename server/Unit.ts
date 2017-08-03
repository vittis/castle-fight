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

    constructor(row, col, unitData : UnitData) {
        super(row, col, unitData);   
        this.data.attackData = {hasAttacked: false, row: -1, col: -1};
        this.attackRateCounter = this.data.attackRate;
    }

    moveTo(tile : Tile) : void {
        this.tile.entity = null;
        this.tile = tile;
        tile.entity = this;
    }
    
    receiveAttack(unit: Unit) {
        super.receiveAttack(unit);
    }

    attack(entity : Entity) : void {
        this.data.attackData.hasAttacked = true;
        var target: Tile = null;
        var shortestDistance = 100;
        
        for (var i = 0; i < entity.getEntityData().width; i++) {
            for (var j = 0; j < entity.getEntityData().height; j++) {
                var tile: Tile = this.gm.tileAt(entity.tile.row + j, entity.tile.col + i);
                var dist = this.gm.aStar.heuristic.getHeuristic(this.tile.col, this.tile.row, 0, tile.col, tile.row, 0);
                if (dist < shortestDistance) {
                    target = tile;
                    shortestDistance = dist;
                }
            }
        }

        this.data.attackData.row = target.row;
        this.data.attackData.col = target.col;

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



