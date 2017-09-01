module Kodo {
    export class WitchsHut extends SpamBuilding {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'witchsHuth'
            }
            else {
                texture = 'witchsHutc'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}
