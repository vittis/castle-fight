module Kodo {
    export class Soldado extends Unit {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'soldadoh'
            }
            else {
                texture = 'soldadoc'
            }
            super(game, tile, id, isHost, texture, data);
        }


    }
}