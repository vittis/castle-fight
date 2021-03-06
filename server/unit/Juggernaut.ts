import { Unit } from "../Unit";
import { GridManager } from "../GridManager";
import { Tile } from "../Tile";

export class Juggernaut extends Unit {
    constructor(row, col) {
        super(row, col, require('clone')(require('../data/units/juggernaut.json')));
    }


    /* doAction(targetTile: Tile): void {
        super.doAction(targetTile);

        var path = this.gm.aStar.path(this.gm.aStar.getNode(this.tile.col, this.tile.row), this.gm.aStar.getNode(targetTile.col, targetTile.row));

        if (path.length > 1) {
            var pathToTargetTile: Tile = this.gm.grid[path[1].y][path[1].x];

            if (this.gm.getDistance(this.tile.col, this.tile.row, targetTile.col, targetTile.row) <= this.data.attackRange) {
                if (this.canAttack())
                    this.attack(targetTile.entity);
            }
            else if (pathToTargetTile.entity == null)
                this.moveTo(pathToTargetTile);
        }

    } */
}