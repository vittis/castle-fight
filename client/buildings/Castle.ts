module Kodo {
    export class Castle extends Building {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'castleh'
            }
            else {
                texture = 'castlec'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}