import {Entity} from './Entity';


export class Tile {
    
    row : number;
    col : number;

    entity : Entity = null;

    get walkable() : boolean {
        return this.entity == null;
    }

    public toString = () : string => {
        return this.entity == null ? "*" : ""+this.entity;
    }

    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

}