import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Archer } from "../unit/Archer";

export class ArcheryRange extends SpamBuilding {

    constructor(gm: GridManager, row, col) {
        super(gm, row, col, require('clone')(require('../data/buildings/archeryRange.json')));
    }

    spamUnit() {
        if (this.data.spamData.spamRateCounter == 0) {
            var tile = this.getTileToSpam();
            this.owner.addEntity(new Archer(this.gm, tile.row, tile.col));
            super.spamUnit();
            this.data.spamData.spamRateCounter = this.data.spamRate;
            this.data.spamData.hasSpammed = true;

        }
        this.data.spamData.spamRateCounter--;
    }

}