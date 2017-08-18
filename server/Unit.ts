import { Entity, EntityData } from "./Entity";
import { Tile } from "./Tile";

export interface UnitData extends EntityData {
    attackRange? : number;
    attackDmg? : number;
    attackRate?: number;
    goldCost?: number;
    woodCost?: number;
    attackData? : AttackData; 
}

export interface AttackData {
    hasAttacked : boolean;
    row : number;
    col : number;
}

export abstract class Unit extends Entity{

    attackRateCounter : number;

    target : Entity = null;

    justSpawned : boolean = false;

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


    canAttack() : boolean {
        return this.attackRateCounter == this.data.attackRate;
    }
    inRange(targetTile : Tile) : boolean {
        if (targetTile.entity != null) {
            if (targetTile.entity.getEntityData().width == 1) {
                return (this.gm.getDistance(this.tile.col, this.tile.row, targetTile.col, targetTile.row) <= this.data.attackRange);
            }
            else {
                var target: Tile = null;
                var shortestDistance = 100;
                for (var i = 0; i < targetTile.entity.getEntityData().width; i++) {
                    for (var j = 0; j < targetTile.entity.getEntityData().height; j++) {
                        var tile: Tile = this.gm.tileAt(targetTile.entity.tile.row + j, targetTile.entity.tile.col + i);
                        var dist = this.gm.aStar.heuristic.getHeuristic(this.tile.col, this.tile.row, 0, tile.col, tile.row, 0);
                        if (dist < shortestDistance) {
                            target = tile;
                            shortestDistance = dist;
                        }
                    }
                }
                return (this.gm.getDistance(this.tile.col, this.tile.row, target.col, target.row) <= this.data.attackRange);
            }
        }
        else {
            return false;
        }
    }

    step() : void {
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
            if (this.target.getEntityData().hp <= 0) {
                this.target = null;
            }
        }
    }

    moveTowards(targetTile: Tile): void {
        //this.step();

        var path = this.gm.aStar.path(this.gm.aStar.getNode(this.tile.col, this.tile.row), this.gm.aStar.getNode(targetTile.col, targetTile.row));

        if (path.length > 1) {
            var pathToTargetTile: Tile = this.gm.grid[path[1].y][path[1].x];

            if (pathToTargetTile.entity == null)
                this.moveTo(pathToTargetTile);
        }
    }
    doAction(targetTile: Tile) {
        this.step();
    }

    attack(entity: Entity): void {
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

        entity.receiveAttack(this);

        this.attackRateCounter = 0;
    }

    resetAttackData() {
        this.data.attackData.hasAttacked = false;
    }
}



