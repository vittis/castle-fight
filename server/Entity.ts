import {Tile} from './Tile';
import { GridManager} from './GridManager';

export abstract class Entity {
    tile : Tile;
    
    width : number;
    height : number;

    constructor(gm : GridManager, row : number, col : number, width, height) {
        this.tile = gm.grid[row][col];
        this.tile.entity = this;
    }
    
}