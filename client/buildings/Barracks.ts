module Kodo {
    export class Barracks extends SpamBuilding {

        

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'barracksh'
            }
            else {
                texture = 'barracksc'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}