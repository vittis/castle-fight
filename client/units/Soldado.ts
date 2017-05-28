module Kodo {
    export class Soldado extends Entity {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost) {
            var texture;
            if (isHost) {
                texture = 'soldadoh'
            }
            else {
                texture = 'soldadoc'
            }
            super(game, tile, id, isHost, texture);
            
        }


    }
}