module Kodo {
    export class SacrificeChamber extends EffectBuilding {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'sacrificeChamberh'
            }
            else {
                texture = 'sacrificeChamberc'
            }
            super(game, tile, id, isHost, texture, data);

        }
        onDeath() {
            var style = { fill: '#ecec3a', wordWrap: true, align: "center" };

            if (this.game != null) {
                let goldLabel = this.game.add.text(this.x + this.width / 2, this.y + this.height / 2 - 15, '+150', style);
                goldLabel.anchor.setTo(0.5, 0.5);
                goldLabel.fontSize = 24;
                goldLabel.scale.setTo(0.3, 0.3);

                style.fill = '#0D6032';
                let woodLabel = this.game.add.text(this.x + this.width / 2, this.y + this.height / 2 + 15, '+0', style);
                woodLabel.anchor.setTo(0.5, 0.5);
                woodLabel.fontSize = 24;
                woodLabel.scale.setTo(0.3, 0.3);

                let tweenA = this.game.add.tween(goldLabel.scale).to({ x: 1.5, y: 1.5 }, 200, Phaser.Easing.Linear.None);
                let tweenB = this.game.add.tween(goldLabel.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
                let tweenC = this.game.add.tween(goldLabel).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None);


                let tweenD = this.game.add.tween(woodLabel.scale).to({ x: 1.5, y: 1.5 }, 200, Phaser.Easing.Linear.None);
                let tweenE = this.game.add.tween(woodLabel.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
                let tweenF = this.game.add.tween(woodLabel).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None);

                tweenC.onComplete.add(function removeText() {
                    goldLabel.destroy();
                    woodLabel.destroy();
                }, this);

                tweenA.chain(tweenB);
                tweenB.chain(tweenC);
                tweenA.start();

                tweenD.chain(tweenE);
                tweenE.chain(tweenF);
                tweenD.start();
            }
            super.onDeath();

        }

    }
}