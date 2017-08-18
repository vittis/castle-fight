module Kodo {

    export class IncomeBallBar extends Phaser.Graphics {

        containerBar: Phaser.Image;

        smooth: number;

        cuts: number;

        maxLenght: number;

        currentTime = 0;
        timeToMove = GameConfig.updateRate / 1000 + 0.045;

        counterText : Phaser.Text;

        tudoGroup : Phaser.Group;

        counter;
        constructor(game: Phaser.Game) {
            super(game, 0, 0);

            this.maxLenght = 624;

            this.x = 384+46;
            this.y = 20;
            this.smooth = 0;
            this.alpha = 0.7;

            game.add.existing(this);

            var bar = game.make.graphics(0, 0);
            bar.beginFill();
            bar.lineStyle(19, 0xffffff, 1);
            bar.moveTo(0, 0);
            bar.lineTo(this.maxLenght, 0);
            bar.endFill();
            this.containerBar = game.add.sprite(this.x, this.y, bar.generateTexture());
            bar.destroy();

            game.world.swap(this, this.containerBar);
            this.containerBar.alpha = 0.3;
            this.containerBar.y -= 19;
            this.containerBar.x -= 19;

            var ballImage = this.game.add.sprite(0, 0, 'incomeBall');
            ballImage.anchor.setTo(0.5, 0.5);
            ballImage.scale.setTo(0.5, 0.5);
            ballImage.alignIn(this.containerBar, Phaser.RIGHT_CENTER, -5);

            this.containerBar.inputEnabled = true;
            this.containerBar.events.onInputOver.add(this.onOver.bind(this), this);
            this.containerBar.events.onInputOut.add(this.onOut.bind(this), this);

            this.counterText = this.game.add.text(0, 0, '0', { fill: 'white', wordWrap: false, align: "center"});
            this.counterText.anchor.setTo(0.5, 0.5);
            this.counterText.fontSize = 18;
            this.counterText.visible = false;
            this.counterText.alignIn(this.containerBar, Phaser.RIGHT_CENTER, -35, 3);

            this.tudoGroup = this.game.add.group();
            this.tudoGroup.add(this);
            this.tudoGroup.add(this.containerBar);
            this.tudoGroup.add(ballImage);

            this.tudoGroup.visible = false;
        }
        onOver() {
            this.counterText.text = "" + (Kodo.GameScene.instance.ballData.spamRate - this.counter);
            this.counterText.visible = true;
        }
        onOut() {
            this.counterText.visible = false;
        }

        update() {
            if (this.visible) {
                if (this.smooth < this.maxLenght) {
                    this.currentTime += this.game.time.elapsed / 1000;
                    this.smooth = Phaser.Math.linear(0, this.maxLenght + this.maxLenght / 20, this.currentTime / (this.timeToMove * Kodo.GameScene.instance.ballData.spamRate));
                }
                this.clear();
                this.lineStyle(19, 0xbae8e7, 1);
                this.moveTo(0, 0);
                this.lineTo(this.smooth, 0);
            }
        }
        updateCounter(counter: number) {
            if (counter === 0) {
                this.tudoGroup.visible = false;
                this.currentTime = 0;
            }
            else {
                this.counter = counter;
                this.tudoGroup.visible = true;

                if (this.counterText.visible) {
                    this.counterText.text = "" + (Kodo.GameScene.instance.ballData.spamRate - counter);
                }
                this.cuts = 1 / Kodo.GameScene.instance.ballData.spamRate;
                this.smooth = Phaser.Math.linear(0, this.maxLenght, this.cuts * counter);
                /* if (counter == 0) {
                    this.currentTime = 0;
                } */
            }
        }

    }
}