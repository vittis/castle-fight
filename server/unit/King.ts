import { Unit } from "../Unit";
import { GridManager } from "../GridManager";
import { Tile } from "../Tile";
import { Entity } from "../Entity";
import { Building } from "../Building";

export class King extends Unit {

    grappleRate = 10;
    grappleCounter = 10;

    canGrapple: boolean = true;

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/units/king.json')));
        this.data.attackRange = 6;
    }

    step() {
        super.step();
        if (this.grappleCounter < this.grappleRate)
            this.grappleCounter++;
        else {
            this.canGrapple = true;
            this.data.attackRange = 6;
        }
    }

    doAction(targetTile: Tile): void {

        if (this.canGrapple) {
            if (targetTile.entity instanceof Unit) {
                if (this.gm.getDistance(this.tile.col, this.tile.row, targetTile.col, targetTile.row) <= 6 && this.gm.getDistance(this.tile.col, this.tile.row, targetTile.col, targetTile.row) >= 2) {
                    this.grapple(targetTile.entity);
                    this.data.attackRange = 1;
                    this.grappleCounter = 0;
                    this.canGrapple = false;
                }
                else {
                    if (this.canAttack())
                        this.attack(targetTile.entity);
                }
            }
            else {
                this.data.attackRange = 1;
                if (this.canAttack() && this.inRange(targetTile))
                    this.attack(targetTile.entity);
            }
        }
        else {
            if (this.canAttack())
                this.attack(targetTile.entity);
        }
    }

    grapple(unit: Unit) {
        if (!this.owner.isHost) {
            if (this.gm.tileAt(this.tile.row, this.tile.col - 1) != null) {
                if (this.gm.tileAt(this.tile.row, this.tile.col - 1).entity == null) 
                    unit.moveTo(this.gm.grid[this.tile.row][this.tile.col - 1]);
            }
            else if (this.gm.tileAt(this.tile.row + 1, this.tile.col - 1) != null) {
                if (this.gm.tileAt(this.tile.row + 1, this.tile.col - 1).entity == null)
                    unit.moveTo(this.gm.grid[this.tile.row + 1][this.tile.col - 1]);
            }
            else if (this.gm.tileAt(this.tile.row - 1, this.tile.col - 1) != null) {
                if (this.gm.tileAt(this.tile.row - 1, this.tile.col - 1).entity == null)
                    unit.moveTo(this.gm.grid[this.tile.row - 1][this.tile.col - 1]);
            }
        }
        else {
            if (this.gm.tileAt(this.tile.row, this.tile.col + 1) != null) {
                if (this.gm.tileAt(this.tile.row, this.tile.col + 1).entity == null)
                    unit.moveTo(this.gm.grid[this.tile.row][this.tile.col + 1]);
            }
            else if (this.gm.tileAt(this.tile.row + 1, this.tile.col + 1) != null) {
                if(this.gm.tileAt(this.tile.row + 1, this.tile.col + 1).entity == null)
                    unit.moveTo(this.gm.grid[this.tile.row + 1][this.tile.col + 1]);
            }
            else if (this.gm.tileAt(this.tile.row - 1, this.tile.col + 1) != null) {
                if (this.gm.tileAt(this.tile.row - 1, this.tile.col + 1).entity == null)
                    unit.moveTo(this.gm.grid[this.tile.row - 1][this.tile.col + 1]);
            }
        }
    }

}