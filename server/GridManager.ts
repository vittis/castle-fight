import {Tile} from './Tile';

export class GridManager {

    grid : Tile[][] = [];
    rows : number;
    cols : number;

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        for (var i = 0; i < rows; i++) {
            this.grid[i] = [];
            for (var j = 0; j < cols; j++) {
                this.grid[i][j] = new Tile(i, j);
            }
        }
    }

    printGrid() : void {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                process.stdout.write(""+this.grid[i][j]);  
            }
            console.log("\n");
        }
    }


}