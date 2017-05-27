module Kodo {
     export class Entity extends Phaser.Sprite {

        tile : Tile;
        id : number;
        constructor(game: Phaser.Game, tile : Tile, id : number) {
            super(game, tile.x, tile.y, 'soldadoh_64');
            this.id = id;

            game.add.existing(this);
        }


        update() {
            if (!this.visible)
                return;
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