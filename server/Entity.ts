import {Tile} from './Tile';
import { GridManager} from './GridManager';
import { GamePlayer } from "./GamePlayer";

export abstract class Entity {
    tile : Tile;
    
    width : number;
    height : number;

    owner : GamePlayer;

    constructor(gm : GridManager, row, col, width, height, owner : GamePlayer) {
        this.tile = gm.grid[row][col];
        this.width = width;
        this.height = height;
        this.owner = owner;
        
        for (var i = 0; i < this.width; i++) {
            gm.grid[row][col+i].entity = this;
            for (var j = 0; j < this.height; j++) {
                gm.grid[row+j][col+i].entity = this;
            }
        }
        
    }
    
}