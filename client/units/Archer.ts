module Kodo {
    export class Archer extends Unit {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'archerh'
            }
            else {
                texture = 'archerc'
            }
            super(game, tile, id, isHost, texture, data);

        }
        update() {
            super.update();

        }
        attack(tile: Tile) {
            new Projectile(this.game, this.x + GameConfig.tileSize / 2 + GameConfig.tileSize / 5, this.y + GameConfig.tileSize / 2 - GameConfig.tileSize / 3, tile.entity, this.isHost);
            super.attack(tile);
        }

    }
}