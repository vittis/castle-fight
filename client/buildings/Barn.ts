module Kodo {
    export class Barn extends SpamBuilding {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'barnh'
            }
            else {
                texture = 'barnc'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}