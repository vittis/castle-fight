import { GridManager } from "../GridManager";
import { Unit } from "../Unit";
import { Tile } from "../Tile";

export class Sniper extends Unit {

    hasAttacked = false;
    
    constructor(row, col) {
        super(row, col, require('clone')(require('../data/units/sniper.json')));
        this.data.attackDmg += 4;
        this.data.attackRange += 2;
    }

    doAction(targetTile: Tile): void {
        super.doAction(targetTile);

        var path = this.gm.aStar.path(this.gm.aStar.getNode(this.tile.col, this.tile.row), this.gm.aStar.getNode(targetTile.col, targetTile.row));

        if (path.length > 1) {
            var pathToTargetTile: Tile = this.gm.grid[path[1].y][path[1].x];

            if (targetTile.entity != null && targetTile.entity.owner != this.owner) {
                if (this.gm.getDistance(this.tile.col, this.tile.row, targetTile.col, targetTile.row) <= this.data.attackRange) {
                    if (this.canAttack()) {
                        this.attack(targetTile.entity);
                        if (!this.hasAttacked) {
                            this.data.attackDmg -= 4;
                            this.data.attackRange -= 2;
                            this.hasAttacked = true;
                        }
                    }
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

}