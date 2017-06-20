module Kodo {
    export abstract class Building extends Entity {

        static goldCost = 0;
        static woodCost = 0;

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, texture: string, data : EntityData) {
            super(game, tile, id, isHost, texture, data);
        }

        updateStep(data, tile? : Tile) {
            super.updateStep(data);
        }

    }
}