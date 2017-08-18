module Kodo {
    export class IncomeBall extends Building {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture='incomeBall';
            super(game, tile, id, isHost, texture, data);
        }

        onDeath() {
            var style = { fill: '#ecec3a', wordWrap: true, align: "center" };

            if (Kodo.GameScene.instance.ballData.hostMatou && GameConfig.isHost) {

                let goldLabel = game.add.text(this.x + this.width / 2, this.y + this.height / 2 - 15, '+50', style);
                goldLabel.anchor.setTo(0.5, 0.5);
                goldLabel.fontSize = 24;
                goldLabel.scale.setTo(0.3, 0.3);

                style.fill = '#0D6032';
                let woodLabel = game.add.text(this.x + this.width / 2, this.y + this.height / 2 + 15, '+50', style);
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
            if (Kodo.GameScene.instance.ballData.clientMatou && !GameConfig.isHost) {

                let goldLabel = game.add.text(this.x + this.width / 2, this.y + this.height / 2-15, '+50', style);
                goldLabel.anchor.setTo(0.5, 0.5);
                goldLabel.fontSize = 24;
                goldLabel.scale.setTo(0.3, 0.3);

                style.fill = '#0D6032';
                let woodLabel = game.add.text(this.x + this.width / 2, this.y + this.height / 2+15, '+50', style);
                woodLabel.anchor.setTo(0.5, 0.5);
                woodLabel.fontSize = 24;
                woodLabel.scale.setTo(0.3, 0.3);

                let tweenA = this.game.add.tween(goldLabel.scale).to({ x: 1.5, y: 1.5 }, 200, Phaser.Easing.Linear.None);
                let tweenB = this.game.add.tween(goldLabel.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
                let tweenC = this.game.add.tween(goldLabel).to({alpha: 0}, 300, Phaser.Easing.Linear.None);


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