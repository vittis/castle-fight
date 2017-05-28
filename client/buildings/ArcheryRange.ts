module Kodo {
    export class ArcheryRange extends Entity {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost) {
            var texture;
            if (isHost) {
                texture = 'archeryRangeh'
            }
            else {
                texture = 'archeryRangec'
            }
            super(game, tile, id, isHost, texture);

        }


    }
}