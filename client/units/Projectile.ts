module Kodo {
    export class Projectile extends Phaser.Sprite {
        
        target : Tile;


        constructor(game: Phaser.Game, x, y, target : Tile, isHost) {
            super(game, x, y, 'tiro');
            if (isHost)
                this.tint = 0xd42a2a;
            else
                this.tint = 0x008000;
            this.anchor.setTo(0.5, 0.5);
            this.target = target;
            this.game.add.existing(this);
            if (target != null) {
                var tweenA = this.game.add.tween(this).to({ x: target.x + GameConfig.tileSize / 2, y: target.y + GameConfig.tileSize / 2}, 350, Phaser.Easing.Linear.None, true);
                this.game.time.events.add(350, function(){this.destroy();}.bind(this), this);
            }
            else {
                this.destroy();
            }
        }

        update() {
            if (Phaser.Math.distance(this.x, this.y, this.target.x + GameConfig.tileSize / 2, this.target.y + GameConfig.tileSize / 2) < 30) {
                this.destroy();
            } 
            
        }

    }
}