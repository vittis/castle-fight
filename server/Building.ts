import { Entity } from "./Entity";
import { GridManager } from "./GridManager";

export abstract class Building extends Entity {

    constructor(gm : GridManager, row, col, width, height, owner) {
        super(gm, row, col, width, height, owner);
        console.log("uma building foi inicializada!");
    }

}
export class Castle extends Building {
    constructor(gm : GridManager, row, col, width, height, owner) {
        super(gm, row, col, width, height, owner);
        console.log("castle inicializado!");
    }
     public toString = () : string => {
        return "c";
    }

}