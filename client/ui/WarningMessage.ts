module Kodo {

    export class WarningMessage {

        game : Phaser.Game;

        constructor(gameP : Phaser.Game, message, c?, time?) {
            this.game = gameP;

            var color = '#ffffff';
            if (c) {
                color = c;
            }
            var duration = 600;
            if (time) {
                duration = time;
            }
            var loadingLabel = this.game.add.text(this.game.world.centerX, this.game.world.centerY-GameConfig.uiHeight/2, message, { font: "25px Baloo Paaji", fill: color, wordWrap: false, align: "center" });
            loadingLabel.anchor.setTo(0.5, 0.5);

            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x2b0000);
            box.drawRoundedRect(0, 0, loadingLabel.width + 20, loadingLabel.height + 20, 10);
            box.endFill();
            var loadingRect = this.game.add.sprite(0, 0, box.generateTexture());
            box.destroy();
            loadingRect.anchor.setTo(0.5, 0.5);
            loadingRect.alignIn(loadingLabel, Phaser.CENTER);
            loadingRect.alpha = 0.45;

            var group = this.game.add.group();
            group.inputEnableChildren = true;



            group.add(loadingLabel);
            group.add(loadingRect);
            group.swap(loadingLabel, loadingRect);

            group.alpha = 0.95;

            var tweenA = this.game.add.tween(group).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None);
            var tweenB = this.game.add.tween(group).to({ alpha: 0, y: -20 }, duration, Phaser.Easing.Linear.None);

            tweenA.chain(tweenB);

            tweenB.onComplete.add(function destroi() { group.destroy();}, this);

            tweenA.start();
        }

    }
}