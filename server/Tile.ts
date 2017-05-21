import {Entity} from './Entity';


export class Tile {
    
    row : number;
    col : number;

    entity = null;

    get walkable() : boolean {
        return this.entity == null;
    }

    public toString = () : string => {
        return this.entity == null ? "0" : ""+this.entity;
    }

    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

}