module Kodo {
    export class Barracks extends Entity {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost) {
            var texture;
            if (isHost) {
                texture = 'barracksh'
            }
            else {
                texture = 'barracksc'
            }
            super(game, tile, id, isHost, texture);

        }


    }
}