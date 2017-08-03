module Kodo {
    export class IncomeBall extends Building {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture='incomeBall';
            super(game, tile, id, isHost, texture, data);
        }


    }
}