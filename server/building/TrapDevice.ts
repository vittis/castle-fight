import { SpamBuilding } from "./SpamBuilding";
import { GridManager } from "../GridManager";
import { Building } from "../Building";

export class TrapDevice extends Building {

    constructor(row, col) {
        super(row, col, require('clone')(require('../data/buildings/trapDevice.json')));
    }

    onDeath() {
        this.getOuterTilesWithEntity().forEach(t => {
            if (t.entity.owner.isHost != this.owner.isHost) {
                t.entity.takeDamageFromNonUnitSource(3);
            }
        });

        super.onDeath();
    }

}