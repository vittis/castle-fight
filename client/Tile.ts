module Kodo {
    export class Tile extends Phaser.Rectangle {

        row : number;
        col : number;

        entity : Entity = null;

        constructor(x : number, y : number, row, col) {
            super(x, y, 48, 48);
            this.row = row;
            this.col = col;
        }

    }
}