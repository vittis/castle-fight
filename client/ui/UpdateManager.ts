module Kodo {

    export class UpdateManager {

        updateCountLabel : Phaser.Text;

        currentTime = 0;
        timeToMove = GameConfig.updateRate / 1000 + 0.045;
        maxLenght: number;
        smooth: number;
        cuts: number;

        fillBar : Phaser.Graphics;

        game : Phaser.Game;

        uIUpdateButton : UIUpdateButton;


        constructor(game : Phaser.Game) {
            this.game = game;
            this.smooth = 0;
            this.maxLenght = 42;

            var style = { font: "15px Baloo Paaji", fill: '#13723C', wordWrap: true,align: "center" };


            var updateButton = game.add.button(510-2, game.height - GameConfig.uiHeight / 2, 'update_button', null, this, 1, 0, 2);
            updateButton.anchor.setTo(0.5, 0.5);
            var xLabel = game.add.text(0, 0, "x", style);
            xLabel.anchor.setTo(0.5, 0.5);
            //xLabel.alignTo(updateButton, Phaser.RIGHT_BOTTOM, -3, 2);

            style.font = "25px Baloo Paaji";
 
            this.updateCountLabel = game.add.text(0, 0, "0", style);
            this.updateCountLabel.anchor.setTo(0.5, 0.5);

            updateButton.addChild(xLabel);
            updateButton.addChild(this.updateCountLabel);

            //xLabel.alignTo(updateButton, Phaser.RIGHT_BOTTOM, -3, 2);
            //this.updateCountLabel.alignTo(xLabel, Phaser.RIGHT_CENTER, 0, -2);
            xLabel.x += 33;
            xLabel.y += 20;
            this.updateCountLabel.alignTo(xLabel, Phaser.RIGHT_CENTER, 0, -2);
            

            var bar = game.make.graphics(0, 0);
            bar.beginFill();
            bar.lineStyle(40, 0x000000, 1);
            bar.moveTo(0, 0);
            bar.lineTo(0, -1*(this.maxLenght+3));
            bar.endFill();
            var containerBar = game.add.sprite(updateButton.x, updateButton.y - updateButton.height/2 + 6, bar.generateTexture());
            bar.destroy();

            game.world.swap(updateButton, containerBar);
            containerBar.alpha = 0.5;
            containerBar.y -= 40;
            containerBar.x -= 40;


            this.fillBar = game.add.graphics(updateButton.x, updateButton.y + updateButton.height/2 -6);
            game.world.swap(this.fillBar, updateButton);

            this.uIUpdateButton = new UIUpdateButton(game, updateButton);
        }

        update() {
            if (this.game.input.activePointer.isDown) {
                if (!this.uIUpdateButton.justOpened) {
                    if (!this.uIUpdateButton.allGroup.getBounds().contains(this.game.input.x, this.game.input.y)) {
                        this.uIUpdateButton.allGroup.visible = false;
                    }
                }
            }

            if (this.smooth < this.maxLenght) {
                this.currentTime += this.game.time.elapsed * 0.001;
                this.smooth = Phaser.Math.linear(0, this.maxLenght + this.maxLenght * 0.05, this.currentTime / (this.timeToMove * Kodo.GameScene.instance.player.updateRate));
            }

            this.fillBar.clear();
            this.fillBar.lineStyle(40, 0x38c876, 1);
            this.fillBar.moveTo(0, 0);
            this.fillBar.lineTo(0, -1*this.smooth);
        }

        updateCounter(counter: number) {
            this.updateCountLabel.text = ""+Kodo.GameScene.instance.player.updateCount;
            this.cuts = 1 / Kodo.GameScene.instance.player.updateRate;
            this.smooth = Phaser.Math.linear(0, this.maxLenght, this.cuts * counter);
            if (counter == 0) {
                this.currentTime = 0;
                var tweenA = this.game.add.tween(this.updateCountLabel.scale).to({ x: 1.5, y: 1.5 }, 200, Phaser.Easing.Linear.None);
                var tweenB = this.game.add.tween(this.updateCountLabel.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
                tweenA.chain(tweenB);
                tweenA.start(); 
            }
        }

    }

}