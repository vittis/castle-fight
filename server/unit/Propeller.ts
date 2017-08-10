import { Unit } from "../Unit";
import { GridManager } from "../GridManager";
import { Tile } from "../Tile";
import { Entity } from "../Entity";

export class Propeller extends Unit {

    firstAttacked = false;

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/units/propeller.json')));
    }

    doAction(targetTile: Tile) {
        super.doAction(targetTile);

        if (this.canAttack()) {
            this.attack(targetTile.entity);
            this.firstAttacked = true;
        }
    }

    moveTowards(targetTile: Tile): void {
        super.moveTowards(targetTile);
        if (!this.firstAttacked) {
            var path = this.gm.aStar.path(this.gm.aStar.getNode(this.tile.col, this.tile.row), this.gm.aStar.getNode(targetTile.col, targetTile.row));
            if (path.length > 1) {
                var pathToTargetTile: Tile = this.gm.grid[path[1].y][path[1].x];
                if (pathToTargetTile.entity == null)
                    this.moveTo(pathToTargetTile);
            }
        }
    }
}