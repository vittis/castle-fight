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
            this.x = tile.x;
            this.y = tile.y;
        }
        onDeath() {
            this.destroy();
        }
    }
}