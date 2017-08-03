module Kodo {
    export class KingsCourt extends SpamBuilding {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'kingsCourth'
            }
            else {
                texture = 'kingsCourtc'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}