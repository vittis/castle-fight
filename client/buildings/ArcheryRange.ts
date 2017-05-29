module Kodo {
    export class ArcheryRange extends Building {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'archeryRangeh'
            }
            else {
                texture = 'archeryRangec'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}