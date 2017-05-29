module Kodo {
    export class Archer extends Unit {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'archerh'
            }
            else {
                texture = 'archerc'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}