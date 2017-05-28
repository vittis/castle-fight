module Kodo {
    export class Archer extends Entity {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost) {
            var texture;
            if (isHost) {
                texture = 'archerh'
            }
            else {
                texture = 'archerc'
            }
            super(game, tile, id, isHost, texture);

        }


    }
}