import { Unit } from "../Unit";
import { GridManager } from "../GridManager";
import { Tile } from "../Tile";

export class King extends Unit {

    attacksReceived = 0;

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/units/king.json')));
    }

    doAction(targetTile: Tile): void {
        super.doAction(targetTile);

        var path = this.gm.aStar.path(this.gm.aStar.getNode(this.tile.col, this.tile.row), this.gm.aStar.getNode(targetTile.col, targetTile.row));

        if (path.length > 1) {
            var pathToTargetTile: Tile = this.gm.grid[path[1].y][path[1].x];

            if (targetTile.entity != null && targetTile.entity.owner != this.owner) {
                if (this.gm.getDistance(this.tile.col, this.tile.row, targetTile.col, targetTile.row) <= this.data.attackRange) {
                    if (this.canAttack())
                        this.attack(targetTile.entity);
                }
                else if (pathToTargetTile.entity == null)
                    this.moveTo(pathToTargetTile);
            }
            else {
                if (pathToTargetTile.entity == null)
                    this.moveTo(pathToTargetTile);
            }
        }
    }

     receiveAttack(unit: Unit) {
        super.receiveAttack(unit);
        this.attacksReceived++;
        if (this.attacksReceived == 5) {
            this.dataq.armor += 3;
            this.attacksReceived = 0;
        }
    }
}