import { Unit } from "../Unit";
import { GridManager } from "../GridManager";
import { Tile } from "../Tile";
import { Entity } from "../Entity";

export class Farmer extends Unit {
    constructor(row, col) {
        super(row, col, require('clone')(require('../data/units/farmer.json')));
    }
    addToGame(gm) {
        super.addToGame(gm);
        var farmersInGame = 0;
        this.owner.getAllUnits().forEach(unit => {
            if (unit instanceof Farmer) {
                farmersInGame++;
            }
        });
        if (farmersInGame > 3) {
            this.data.maxHP = this.data.maxHP + 3;
            this.data.hp = this.data.maxHP;
            this.data.attackDmg = this.data.attackDmg * 2;
        }
    }
    doAction(targetTile: Tile) {

        if (this.canAttack())
            this.attack(targetTile.entity);
    }
}