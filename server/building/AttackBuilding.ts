import { Building, BuildingData } from "../Building";
import { Tile } from "../Tile";
import { Entity } from "../Entity";

export interface AttackBuildingData extends BuildingData {
    attackRange?: number;
    attackDmg?: number;
    attackRate?: number;
    attackData?: AttackData; 
}
export interface AttackData {
    hasAttacked: boolean;
    row: number;
    col: number;
}
export abstract class AttackBuilding extends Building {

    attackRateCounter: number;
    target: Entity = null;
    regenRateCounter = 0;
    regenRate=15;
    receivedDamageCounter = 0;
    receivedDamageRate = 10;

    get data(): AttackBuildingData {
        return this.dataq;
    }

    constructor(row, col, buildingData: BuildingData) {
        super(row, col, buildingData);
        this.data.attackData = { hasAttacked: false, row: -1, col: -1 };
        this.attackRateCounter = this.data.attackRate;
    }

    canAttack(): boolean {
        return this.attackRateCounter == this.data.attackRate;
    }
    inRange(targetTile: Tile): boolean {
        var shortestDistance = 100;
        var myTile: Tile = null;

        for (var i = 0; i < this.getEntityData().width; i++) {
            for (var j = 0; j < this.getEntityData().height; j++) {
                var tile: Tile = this.gm.tileAt(this.tile.row + j, this.tile.col + i);
                var dist = this.gm.aStar.heuristic.getHeuristic(tile.col, tile.row, 0, targetTile.col, targetTile.row, 0);
                if (dist < shortestDistance) {
                    myTile = tile;
                    shortestDistance = dist;
                }
            }
        }


        return (this.gm.getDistance(myTile.col, myTile.row, targetTile.col, targetTile.row) <= this.data.attackRange);
    }
    step(): void {
        if (!this.getEntityData().statusData.stunned) {
            if (this.attackRateCounter < this.data.attackRate)
                this.attackRateCounter++;
        }
        else {
            this.stunCounter++;
            if (this.stunCounter >= 2) {
                this.getEntityData().statusData.stunned = false;
                this.stunCounter = 0;
            }
        }
        if (this.target != null) {
            if(this.target.getEntityData().hp <= 0) {
                this.target = null;
            }
        }
        this.receivedDamageCounter++;
        if (this.receivedDamageCounter>this.receivedDamageRate) {
            this.regenRateCounter++;
            if (this.regenRateCounter >= this.regenRate) {
                this.regenRateCounter=0;
                if (this.data.armor < this.data.maxArmor) {
                    this.data.armor++;
                }
            }
        }
    }
    receiveAttack(unit) {
        this.receivedDamageCounter=0;
        super.receiveAttack(unit);
    }
    doAction(targetTile: Tile) {
        this.step();
    }

    attack(entity: Entity): void {
        if (entity != null) {
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

            this.target = entity;

            entity.receiveAttackFromBuilding(this);

            this.attackRateCounter = 0;
        }
    }

    resetAttackData() {
        this.data.attackData.hasAttacked = false;
    }

}