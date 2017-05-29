module Kodo {
    export abstract class Unit extends Entity {
        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, texture: string, data : EntityData) {
            super(game, tile, id, isHost, texture, data);
        }

        moveTo(tile: Tile) {
            this.game.add.tween(this).to({ x: tile.x, y: tile.y }, 550, Phaser.Easing.Linear.None, true);
        }

        updateStep(data : EntityData, tile : Tile) {
            super.updateStep(data);
            if (Phaser.Math.distance(this.x, this.y, tile.x, tile.y) > 1) {
                this.moveTo(tile);
            }
        }

    }
}