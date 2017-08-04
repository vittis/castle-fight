module Kodo {
    export class Tile extends Phaser.Sprite {

        row : number;
        col : number;

        entity : Entity = null;

        constructor(game : Phaser.Game, x : number, y : number, row, col) {
            super(game, x, y, 'tile' + Math.floor(Math.random() * (1 - 0 + 1)));
            this.row = row;
            this.col = col;

            game.add.existing(this);
             /* var style = { font: "Baloo Paaji", fill: '#FEF65B', wordWrap: true,  align: "center" };
            var q = game.add.text(x, y, row+", "+col, style);   */
            
        }

    }
}