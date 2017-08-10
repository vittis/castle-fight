module Kodo {
    export class GravityChamber extends SpamBuilding {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'gravityChamberh'
            }
            else {
                texture = 'gravityChamberc'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}