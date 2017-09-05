var Kodo;
(function (Kodo) {
    var UIResourceManager = (function () {
        function UIResourceManager(game) {
            this.game = game;
            this.offsetX = GameConfig.isHost ? 0 : GameConfig.tileSize * GameConfig.GRID_COLS;
            var style = { font: "Baloo Paaji", fill: '#ecec3a', wordWrap: true, align: "center" };
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
            this.incomeBar = new Kodo.IncomeBar(this.game);
        }
        UIResourceManager.prototype.startGame = function () {
            console.log("kd starta ae");
            new Kodo.WarningMessage(this.game, 'Match Started!');
        };
        UIResourceManager.prototype.updateResources = function (incomeRateCounter) {
            if (this.incomeBar) {
                this.incomeBar.updateCounter(incomeRateCounter);
                this.incomeBar.updateIncomeLabel();
            }
            this.goldLabel.text = '' + Kodo.GameScene.instance.player.gold;
            this.woodLabel.text = '' + Kodo.GameScene.instance.player.wood;
            this.goldIcon.alignTo(this.goldLabel, Phaser.RIGHT_CENTER, 5, -3);
            this.woodIcon.alignTo(this.woodLabel, Phaser.RIGHT_CENTER, 5, -3);
        };
        return UIResourceManager;
    }());
    Kodo.UIResourceManager = UIResourceManager;
})(Kodo || (Kodo = {}));
