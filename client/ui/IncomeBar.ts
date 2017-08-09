module Kodo {

    export class IncomeBar extends Phaser.Graphics {

        containerBar: Phaser.Image;
        
        incomeNumberLabel : Phaser.Text;
        smooth: number;

        cuts : number;

        maxLenght: number;

        currentTime = 0;
        timeToMove = GameConfig.updateRate / 1000 + 0.045;

        constructor(game: Phaser.Game) {
            super(game, 0, 0);

            this.maxLenght = 120;

            this.x = 275;
            this.y = game.height - GameConfig.uiHeight / 2;
            this.smooth = 0;

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
            this.containerBar.alpha = 0.5;
            this.containerBar.y -= 19;
            this.containerBar.x -= 19;

            var style = { fill: '#ecec3a', wordWrap: true, /*wordWrapWidth: this.width,*/ align: "center" };

            this.incomeNumberLabel = game.add.text(0, 0, '+' + Kodo.GameScene.instance.player.income, style);
            this.incomeNumberLabel.anchor.setTo(0.5, 0.5);
            this.incomeNumberLabel.fontSize = 30;
            this.incomeNumberLabel.alignTo(this, Phaser.RIGHT_CENTER, this.maxLenght + 5);

            var goldIcon = game.add.sprite(125, game.height - GameConfig.uiHeight / 2, 'gold_icon');
            goldIcon.scale.setTo(0.7, 0.7);
            goldIcon.alignTo(this.incomeNumberLabel, Phaser.RIGHT_CENTER, 3, -2);

        }
        update() {
            if (this.smooth < this.maxLenght) {
                this.currentTime += this.game.time.elapsed * 0.001;
                this.smooth = Phaser.Math.linear(0, this.maxLenght + this.maxLenght*0.05, this.currentTime / (this.timeToMove * Kodo.GameScene.instance.player.incomeRate));
            }

            this.clear();
            this.lineStyle(19, 0xecec3a, 1);
            this.moveTo(0, 0);
            this.lineTo(this.smooth, 0);
        }
        updateCounter(counter : number) {
            this.cuts = 1 / Kodo.GameScene.instance.player.incomeRate;
            this.smooth = Phaser.Math.linear(0, this.maxLenght, this.cuts * counter);
            if (counter == 0) {
                this.currentTime=0;
                var tweenA = this.game.add.tween(this.incomeNumberLabel.scale).to({ x: 1.5, y: 1.5 }, 200, Phaser.Easing.Linear.None);
                var tweenB = this.game.add.tween(this.incomeNumberLabel.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
                tweenA.chain(tweenB);
                tweenA.start();
            }
        }

        updateIncomeLabel() {
            this.incomeNumberLabel.text = '+' + Kodo.GameScene.instance.player.income;
        }
       
    }
}