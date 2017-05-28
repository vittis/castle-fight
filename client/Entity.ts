module Kodo {
     export abstract class Entity extends Phaser.Sprite {

        tile : Tile;
        id : number;

        constructor(game: Phaser.Game, tile : Tile, id : number, isHost, texture : string) {
            super(game, tile.x, tile.y, texture);
            this.id = id;
            game.add.existing(this);
        }


        update() {

        }

        moveTo(tile : Tile) {
            if (Phaser.Math.distance(this.x, this.y, tile.x, tile.y) > 1) {
                this.game.add.tween(this).to({ x: tile.x, y: tile.y }, 375, Phaser.Easing.Linear.None, true);
            }
        }
        onDeath() {
            this.destroy();
        }
    }
}