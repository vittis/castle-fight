import { Entity, EntityData } from "./Entity";
import { GridManager } from "./GridManager";
import { Tile } from "./Tile";
import { SpamData } from "./building/SpamBuilding";

export interface BuildingData extends EntityData {
    goldCost? : number;
    woodCost? : number;
    incomeGain? : number;
}

export abstract class Building extends Entity {

    get data() : BuildingData {
        return this.dataq;
    }

    constructor(row, col, buildingData : BuildingData) {
        super(row, col, buildingData);
    }

    getOuterTiles() : Tile[] {
        var tiles : Tile[] = [];

         for (var i = 0; i < this.data.width; i++) {
            for (var j = 0; j < this.data.height; j++) {
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

    
}

