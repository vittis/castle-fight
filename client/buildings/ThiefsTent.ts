module Kodo {
    export class ThiefsTent extends SpamBuilding {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'thiefsTenth'
            }
            else {
                texture = 'thiefsTentc'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}