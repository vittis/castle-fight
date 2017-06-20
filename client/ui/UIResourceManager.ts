module Kodo {
    export class UIResourceManager {

        goldLabel : Phaser.Text;
        woodLabel : Phaser.Text;

        incomeBar : IncomeBar;

        constructor(game : Phaser.Game) {
            var style = { font: "Baloo Paaji", fill: '#FEF65B', wordWrap: true, /*wordWrapWidth: this.width,*/ align: "center" };
            this.goldLabel = game.add.text(0, 0, '150', style);
            this.goldLabel.anchor.setTo(0.5, 0.5);
            this.goldLabel.fontSize = 30;
            this.goldLabel.x = 50;
            this.goldLabel.y = GameConfig.uiHeight/2 + 3;
            
            style.fill = '#0D6032';
            this.woodLabel = game.add.text(0, 0, '250', style);
            this.woodLabel.anchor.setTo(0.5, 0.5);
            this.woodLabel.fontSize = 30;
            this.woodLabel.x = 135;
            this.woodLabel.y = GameConfig.uiHeight / 2 + 3;

            this.incomeBar = new IncomeBar(game);
        }

        updateResources(incomeRateCounter : number) {
            this.incomeBar.updateCounter(incomeRateCounter);
            this.incomeBar.updateIncomeLabel();
            this.goldLabel.text = '' + Kodo.GameScene.instance.player.gold;
            this.woodLabel.text = '' + Kodo.GameScene.instance.player.wood;
        }
            
    }
}