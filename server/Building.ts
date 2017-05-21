import { Entity } from "./Entity";
import { GridManager } from "./GridManager";

export abstract class Building extends Entity {


    constructor(gm : GridManager, row, col, width, height) {
        super(gm, row, col, width, height);
        console.log("uma building foi inicializada!");
    }

}
export class Castle extends Building {
    constructor(gm : GridManager, row, col, width, height) {
        super(gm, row, col, width, height);
        console.log("castle inicializado!");
    }


}