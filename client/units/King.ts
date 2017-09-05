module Kodo {
    export class King extends Unit {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'kingh'
            }
            else {
                texture = 'kingc'
            }

            super(game, tile, id, isHost, texture, data);
        }
        attack(tile: Tile) {
            if (this.game != null) {
                var tweenA = this.game.add.tween(this).to({ x: tile.x, y: tile.y }, 100, Phaser.Easing.Linear.None);
                var tweenB = this.game.add.tween(this).to({ x: this.x, y: this.y }, 100, Phaser.Easing.Linear.None);

                tweenA.chain(tweenB);
                tweenA.start();
                super.attack(tile);
            }
        }

    }
}