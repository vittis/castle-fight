import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Soldado } from "../unit/soldado";

export class Barracks extends SpamBuilding {

    constructor(gm : GridManager, row, col) {
        super(gm, row, col, require('clone')(require('../data/barracks.json')));
    }

    spamUnit() {
        if (this.spamRateCounter == 0) {
            var tile = this.getTileToSpam();
            this.owner.addEntity(new Soldado(this.gm, tile.row, tile.col));
            super.spamUnit();
            this.spamRateCounter = this.data.spamRate;
        }
        this.spamRateCounter--;
    }

}