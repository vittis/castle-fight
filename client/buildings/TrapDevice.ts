module Kodo {
    export class TrapDevice extends Building {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'trapDeviceh'
            }
            else {
                texture = 'trapDevicec'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}
