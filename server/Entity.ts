import {Tile} from './Tile';
import { GridManager} from './GridManager';
import { GamePlayer } from "./GamePlayer";
import { Unit } from "./Unit";
import { AttackBuilding } from "./building/AttackBuilding";

export interface EntityData {
    name : string;
    width : number;
    height : number;
    maxHP : number;
    hp? : number;
    maxArmor : number;
    armor : number;
    statusData : StatusData;
}
export interface StatusData {
    stunned? : boolean;
}

export abstract class Entity {
    col: number;
    row: number;
    tile: Tile;
    
    owner : GamePlayer;
    id : number;
    
    protected dataq : EntityData;

    gm : GridManager;

    stunCounter = 0;

    constructor(row, col, data : EntityData) {
        this.dataq = data;
        this.dataq.hp = data.maxHP;
        this.dataq.armor = data.maxArmor;
        this.row = row;
        this.col = col;
        
        this.dataq.statusData = {stunned : false};
    }

    addToGame(gm) {
        this.gm = gm;

        this.tile = gm.tileAt(this.row, this.col);

        for (var i = 0; i < this.dataq.width; i++) {
            for (var j = 0; j < this.dataq.height; j++) {
                gm.tileAt(this.row + j, this.col + i).entity = this;
            }
        }
    }

    receiveAttack(unit : Unit) {
        this.takeDamage(Math.max(unit.data.attackDmg - this.dataq.armor, 0));
        if (this.dataq.armor > 0)
            this.dataq.armor--;
    }
    receiveAttackFromBuilding(unit: AttackBuilding) {
        this.takeDamage(Math.max(unit.data.attackDmg - this.dataq.armor, 0));
        if (this.dataq.armor > 0)
            this.dataq.armor--;
    }

    takeDamage(dmg : number) {
        this.dataq.hp -= dmg;
    }

    onDeath() {
        for (var i = 0; i < this.dataq.width; i++) {
            for (var j = 0; j < this.dataq.height; j++) {
                this.gm.tileAt(this.tile.row+j, this.tile.col+i).entity = null;
            }
        }
        this.owner.removeEntity(this);
        
    }

    getEntityData() {
        return this.dataq;
    }
    getOuterTiles(): Tile[] {
        var tiles: Tile[] = [];

        for (var i = 0; i < this.dataq.width; i++) {
            for (var j = 0; j < this.dataq.height; j++) {
                var currentTile = this.gm.tileAt(this.tile.row + j, this.tile.col + i);
                this.gm.getNeighbors(currentTile).forEach(t => {
                    if (t.entity == null) {
                        if (tiles.indexOf(t) == -1)
                            tiles.push(t);
                    }
                });
            }

        }

        return tiles;
    }
    getOuterTilesWithEntity(): Tile[] {
        var tiles: Tile[] = [];

        for (var i = 0; i < this.dataq.width; i++) {
            for (var j = 0; j < this.dataq.height; j++) {
                var currentTile = this.gm.tileAt(this.tile.row + j, this.tile.col + i);
                this.gm.getNeighbors(currentTile).forEach(t => {
                    if (t.entity != null) {
                        if (tiles.indexOf(t) == -1)
                            tiles.push(t);
                    }
                });
            }

        }

        return tiles;
    }
    public toString = () : string => {
        return this.dataq.name[0];
    }
}