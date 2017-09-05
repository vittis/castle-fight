module Kodo {
    export class Mage extends Unit {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'mageh'
            }
            else {
                texture = 'magec'
            }
            super(game, tile, id, isHost, texture, data);

        }

        attack(tile: Tile) {
            if (this.game != null) {
                new Projectile(this.game, this.x + GameConfig.tileSize / 2 + 6, this.y + GameConfig.tileSize / 2 - 6, tile, this.isHost);
                super.attack(tile);
            }
        }

    }
}