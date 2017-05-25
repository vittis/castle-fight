import {Tile} from './Tile';
import { AStar } from "./lib/AStar";

export class GridManager {

    grid : Tile[][] = [];
    rows : number;
    cols : number;

    aStar : AStar;

    constructor(aStar : AStar,rows, cols) {
        this.aStar = aStar;
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
        process.stdout.write('\x1Bc');
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                process.stdout.write(""+this.grid[i][j]+" ");  
            }
            process.stdout.write("\n");
        }
        console.log("----------------------------------------");

    }
    getNumberGrid() : number[][] {
        var numberGrid : number[][] = [];

        for (var i = 0; i < this.rows; i++) {
            numberGrid[i] = [];
            for (var j = 0; j < this.cols; j++) {
                numberGrid[i][j] = this.grid[i][j].entity == null ? 0 : 5;
            }
        }

        return numberGrid;
    }


    getDistance(x1:number, y1:number, x2:number, y2:number) : number {
	
		return Math.max(Math.abs(x1- x2), Math.abs(y1-y2));
	}

}