module Kodo {
    export class UIResourceManager {

        goldLabel : Phaser.Text;
        woodLabel : Phaser.Text;

        goldIcon : Phaser.Sprite;
        woodIcon: Phaser.Sprite;

        offsetX : number;
        incomeBar : IncomeBar;

        upgradeButton : Phaser.Button;

        eraLabel : Phaser.Text;

        constructor(game : Phaser.Game) {
            this.offsetX = GameConfig.isHost ? 0 : GameConfig.tileSize * GameConfig.GRID_COLS;

            var style = { fill: '#ecec3a', wordWrap: true, /*wordWrapWidth: this.width,*/ align: "center" };
            this.goldLabel = game.add.text(0, 0, '150', style);
            this.goldLabel.anchor.setTo(0.5, 0.5);
            this.goldLabel.fontSize = 40;
            this.goldLabel.x = 80;
            this.goldLabel.y = game.height - GameConfig.uiHeight / 2;
            
            this.goldIcon = game.add.sprite(125, game.height - GameConfig.uiHeight / 2, 'gold_icon');
            //this.goldIcon.alignTo(this.goldLabel, Phaser.RIGHT_CENTER, 5);

            style.fill = '#0D6032';
            this.woodLabel = game.add.text(0, 0, '250', style);
            this.woodLabel.anchor.setTo(0.5, 0.5);
            this.woodLabel.fontSize = 40;
            this.woodLabel.x = 200;
            this.woodLabel.y = game.height - GameConfig.uiHeight / 2;
            
            this.woodIcon = game.add.sprite(GameConfig.uiWidth / 2 + 14 + this.offsetX, 95 - 12, 'wood_icon');
            //this.woodIcon.alignTo(this.woodLabel, Phaser.RIGHT_CENTER, 5);

            this.incomeBar = new IncomeBar(game);

           /*  style.fill = '#ecec3a';
            this.eraLabel = game.add.text(0, 0, 'IV', style);
            this.eraLabel.anchor.setTo(0.5, 0.5);
            this.eraLabel.fontSize = 40;
            this.eraLabel.x = 530;
            this.eraLabel.y = game.height - GameConfig.uiHeight / 2 - 11;

            this.upgradeButton = game.add.button(this.incomeBar.x, this.incomeBar.y+17, 'upgrade_button');
            this.upgradeButton.alignTo(this.eraLabel, Phaser.BOTTOM_CENTER,0, -10); */
        }

        updateResources(incomeRateCounter : number) {
            this.incomeBar.updateCounter(incomeRateCounter);
            this.incomeBar.updateIncomeLabel();
            this.goldLabel.text = '' + Kodo.GameScene.instance.player.gold;
            this.woodLabel.text = '' + Kodo.GameScene.instance.player.wood;

            this.goldIcon.alignTo(this.goldLabel, Phaser.RIGHT_CENTER, 5, -3);
            this.woodIcon.alignTo(this.woodLabel, Phaser.RIGHT_CENTER, 5, -3);
        }
            
    }
}