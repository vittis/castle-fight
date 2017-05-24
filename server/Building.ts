import { Entity, EntityData } from "./Entity";
import { GridManager } from "./GridManager";
import { Tile } from "./Tile";

export interface BuildingData extends EntityData {
    spamCount? : number;
    spamRate? : number;

}

export abstract class Building extends Entity {

    get data() : BuildingData {
        return this.dataq;
    }

    constructor(gm : GridManager, row, col, buildingData : BuildingData) {
        super(gm, row, col, buildingData);
    }

    getOuterTiles() : Tile[] {
        var tiles : Tile[] = [];

         for (var i = 0; i < this.data.width; i++) {
            for (var j = 0; j < this.data.height; j++) {
                var currentTile = this.gm.grid[this.tile.row+j][this.tile.col+i];
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (dx != 0 || dy != 0) {
                            if ((currentTile.row+dx > 0 && currentTile.row+dx < this.gm.rows) && (currentTile.col+dy > 0 && currentTile.col+dy < this.gm.cols)) {
                                if (this.gm.grid[currentTile.row+dx][currentTile.col+dy].entity == null) {
                                    if (tiles.indexOf(this.gm.grid[currentTile.row+dx][currentTile.col+dy]) == -1)
                                        tiles.push(this.gm.grid[currentTile.row+dx][currentTile.col+dy]);
                                }
                            }
                        }
                    }
                }
            }
        }
        
        return tiles;
    }

    
}

