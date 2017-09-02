module Kodo {
    export class UIResourceManager {

        game : Phaser.Game;

        goldLabel : Phaser.Text;
        woodLabel : Phaser.Text;

        goldIcon : Phaser.Sprite;
        woodIcon: Phaser.Sprite;

        offsetX : number;
        incomeBar : IncomeBar;

        upgradeButton : Phaser.Button;

        eraLabel : Phaser.Text;

        constructor(game : Phaser.Game) {
            this.game = game;
            this.offsetX = GameConfig.isHost ? 0 : GameConfig.tileSize * GameConfig.GRID_COLS;

            var style = {font: "Baloo Paaji", fill: '#ecec3a', wordWrap: true, /*wordWrapWidth: this.width,*/ align: "center" };
            this.goldLabel = game.add.text(0, 0, '150', style);
            this.goldLabel.anchor.setTo(0.5, 0.5);
            this.goldLabel.fontSize = 40;
            this.goldLabel.x = 64;
            this.goldLabel.y = game.height - GameConfig.uiHeight / 2;
            
            this.goldIcon = game.add.sprite(125, game.height - GameConfig.uiHeight / 2, 'gold_icon');

            style.fill = '#0D6032';
            this.woodLabel = game.add.text(0, 0, '250', style);
            this.woodLabel.anchor.setTo(0.5, 0.5);
            this.woodLabel.fontSize = 40;
            this.woodLabel.x = 184;
            this.woodLabel.y = game.height - GameConfig.uiHeight / 2;
            
            this.woodIcon = game.add.sprite(GameConfig.uiWidth / 2 + 14 + this.offsetX, 95 - 12, 'wood_icon');

        }

        startGame() {
            new WarningMessage(this.game, 'Match Started!');
            this.incomeBar = new IncomeBar(this.game);
        }

        updateResources(incomeRateCounter : number) {
            if (this.incomeBar){
                this.incomeBar.updateCounter(incomeRateCounter);
                this.incomeBar.updateIncomeLabel();
            }
            this.goldLabel.text = '' + Kodo.GameScene.instance.player.gold;
            this.woodLabel.text = '' + Kodo.GameScene.instance.player.wood;

            this.goldIcon.alignTo(this.goldLabel, Phaser.RIGHT_CENTER, 5, -3);
            this.woodIcon.alignTo(this.woodLabel, Phaser.RIGHT_CENTER, 5, -3);
        }
            
    }
}