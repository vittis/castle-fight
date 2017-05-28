module Kodo {
    export class Castle extends Entity {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost) {
            var texture;
            if (isHost) {
                texture = 'castleh'
            }
            else {
                texture = 'castlec'
            }
            super(game, tile, id, isHost, texture);

        }


    }
}