import {Tile} from './Tile';
import { GridManager} from './GridManager';
import { GamePlayer } from "./GamePlayer";
import { Unit } from "./Unit";

export interface EntityData {
    name : string;
    width : number;
    height : number;
    maxHP : number;
    hp? : number;
    maxArmor : number;
    armor : number;
}


export abstract class Entity {
    tile : Tile;
    
    owner : GamePlayer;

    protected dataq : EntityData;

    gm : GridManager;

    constructor(gm : GridManager, row, col, data : EntityData) {
        this.gm = gm;
        this.dataq = data;
        this.dataq.hp = data.maxHP;
        this.dataq.armor = data.maxArmor;

        this.tile = gm.grid[row][col];
        
        for (var i = 0; i < data.width; i++) {
            for (var j = 0; j < data.height; j++) {
                gm.grid[row+j][col+i].entity = this;
            }
        }
    }

    receiveAttack(unit : Unit) {
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
                this.gm.grid[this.tile.row+j][this.tile.col+i].entity = null;
            }
        }
        this.owner.removeEntity(this);
    }

    getEntityData() {
        return this.dataq;
    }

    public toString = () : string => {
        return this.dataq.name[0];
    }
}