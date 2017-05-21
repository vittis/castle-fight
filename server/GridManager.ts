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
        console.log("----------------------------------------");

    }
    getNumberGrid() : number[][] {
        var numberGrid : number[][] = [];

        for (var i = 0; i < this.rows; i++) {
            numberGrid[i] = [];
            for (var j = 0; j < this.cols; j++) {
                numberGrid[i][j] = this.grid[i][j].entity == null ? 0 : 5;
                process.stdout.write(""+numberGrid[i][j]);  
            }
            console.log("\n");

        }
        console.log("----------------------------------------");

        return numberGrid;
    }

}