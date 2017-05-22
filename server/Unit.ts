import { Entity } from "./Entity";
import { GridManager } from "./GridManager";
import { Tile } from "./Tile";

export abstract class Unit extends Entity {

    constructor(gm : GridManager, row, col, width, height, owner) {
        super(gm, row, col, width, height, owner);
        console.log("uma unidade foi inicializada!");
    }

    moveTo(tile : Tile) : void {
        this.tile.entity = null;
        this.tile = tile;
        tile.entity = this;
    }

}

export class Soldado extends Unit {

    constructor(gm : GridManager, row, col, width, height, owner) {
        super(gm, row, col, width, height, owner);
    }
     public toString = () : string => {
        return "s";
    }


}