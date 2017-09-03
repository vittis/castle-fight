"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = require("./Tile");
var GridManager = (function () {
    function GridManager(aStar, rows, cols) {
        this.grid = [];
        this.aStar = aStar;
        this.rows = rows;
        this.cols = cols;
        for (var i = 0; i < rows; i++) {
            this.grid[i] = [];
            for (var j = 0; j < cols; j++) {
                this.grid[i][j] = new Tile_1.Tile(i, j);
            }
        }
    }
    GridManager.prototype.printGrid = function () {
        process.stdout.write('\x1Bc');
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                process.stdout.write("" + this.grid[i][j] + " ");
            }
            process.stdout.write("\n");
        }
        console.log("----------------------------------------");
    };
    GridManager.prototype.getNumberGrid = function () {
        var numberGrid = [];
        for (var i = 0; i < this.rows; i++) {
            numberGrid[i] = [];
            for (var j = 0; j < this.cols; j++) {
                if ((i >= 6 && i <= 9) && (j >= 8 && j <= 22)) {
                    numberGrid[i][j] = 5;
                }
                else if (this.grid[i][j].entity == null) {
                    numberGrid[i][j] = 0;
                }
                else {
                    numberGrid[i][j] = 5;
                }
            }
        }
        return numberGrid;
    };
    GridManager.prototype.tileAt = function (row, col) {
        if (this.isValid(row, col)) {
            return this.grid[row][col];
        }
        else {
            return this.grid[6][0];
        }
    };
    GridManager.prototype.isValid = function (row, col) {
        if ((row >= 0 && row < this.rows) && (col >= 0 && col < this.cols)) {
            return true;
        }
        return false;
    };
    GridManager.prototype.getDistance = function (x1, y1, x2, y2) {
        return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
    };
    GridManager.prototype.getNeighbors = function (tile) {
        var tiles = [];
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx != 0 || dy != 0) {
                    if (this.isValid(tile.row + dx, tile.col + dy)) {
                        tiles.push(this.tileAt(tile.row + dx, tile.col + dy));
                    }
                }
            }
        }
        return tiles;
    };
    return GridManager;
}());
exports.GridManager = GridManager;
