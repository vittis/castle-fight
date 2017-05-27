module Kodo {
    export class Tile extends Phaser.Sprite {

        row : number;
        col : number;

        constructor(game : Phaser.Game, x : number, y : number, row, col) {
            super(game, x, y, 'tile' + Math.floor(Math.random() * (1 - 0 + 1))+'_64');
            this.row = row;
            this.col = col;

            game.add.existing(this);
        }


        update() {


        }

    }
}