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

            this.x = 200;
            this.y = GameConfig.uiHeight/2 + 3;
            this.smooth = 0;
            this.maxLenght = 124;

            game.add.existing(this);

            var bar = game.make.graphics(0, 0);
            bar.beginFill();
            bar.lineStyle(12, 0xffffff, 1);
            bar.moveTo(0, 0);
            bar.lineTo(this.maxLenght, 0);
            bar.endFill();
            this.containerBar = game.add.sprite(this.x, this.y, bar.generateTexture());
            bar.destroy();

            game.world.swap(this, this.containerBar);
            this.containerBar.alpha = 0.5;
            this.containerBar.y -= 12;
            this.containerBar.x -= 12;

            var style = { font: "Baloo Paaji", fill: '#FEF65B', wordWrap: true, /*wordWrapWidth: this.width,*/ align: "center" };
            /*var incomeLabel = game.add.text(0, 0, 'income', style);
            incomeLabel.anchor.setTo(0.5, 0.5);
            incomeLabel.fontSize = 15;
            incomeLabel.x = this.x + 124/2;
            incomeLabel.y = this.y - 12;*/

            this.incomeNumberLabel = game.add.text(0, 0, '+' + Kodo.GameScene.instance.player.income, style);
            this.incomeNumberLabel.anchor.setTo(0.5, 0.5);
            this.incomeNumberLabel.fontSize = 25;
            this.incomeNumberLabel.x = this.x + this.maxLenght + 28;
            this.incomeNumberLabel.y = this.y + 1;
        }
        update() {
            if (this.smooth < this.maxLenght) {
                this.currentTime += this.game.time.elapsed / 1000;
                this.smooth = Phaser.Math.linear(0, this.maxLenght + this.maxLenght/20, this.currentTime / (this.timeToMove * Kodo.GameScene.instance.player.incomeRate));
            }
            //else {
            //    this.currentTime = 0;
            //}
            this.clear();
            this.lineStyle(12, 0xFEF65B, 1);
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