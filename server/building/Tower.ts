import { AttackBuilding } from "./AttackBuilding";
import { GridManager } from "../GridManager";
import { Tile } from "../Tile";
import { GamePlayer } from "../GamePlayer";

export class Tower extends AttackBuilding {

    enemy : GamePlayer;

    constructor(row, col, enemy) {
        super(row, col, require('clone')(require('../data/buildings/tower.json')));
        this.enemy = enemy;
    }

    doAction(targetTile: Tile) {
       // super.doAction(targetTile);
        if (this.canAttack())
            this.attack(targetTile.entity);
    }
    onDeath() {
        this.enemy.resourceManager.income += 20;
        super.onDeath();
    }
}