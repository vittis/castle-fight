module Kodo {
    export class TechStation extends SpamBuilding {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'techStationh'
            }
            else {
                texture = 'techStationc'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}