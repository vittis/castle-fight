var Kodo;
(function (Kodo) {
    var UISpectatorManager = (function () {
        function UISpectatorManager(game) {
            this.game = game;
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
            this.woodIcon = game.add.sprite(GameConfig.uiWidth / 2 + 14, 95 - 12, 'wood_icon');
            this.incomeBar = new Kodo.IncomeBar(this.game);
            style = { font: "Baloo Paaji", fill: '#ecec3a', wordWrap: true, align: "center" };
            this.goldLabelC = game.add.text(0, 0, '150', style);
            this.goldLabelC.anchor.setTo(0.5, 0.5);
            this.goldLabelC.fontSize = 40;
            this.goldLabelC.x = 64 + 1000;
            this.goldLabelC.y = game.height - GameConfig.uiHeight / 2;
            this.goldIconC = game.add.sprite(125, game.height - GameConfig.uiHeight / 2, 'gold_icon');
            style.fill = '#0D6032';
            this.woodLabelC = game.add.text(0, 0, '250', style);
            this.woodLabelC.anchor.setTo(0.5, 0.5);
            this.woodLabelC.fontSize = 40;
            this.woodLabelC.x = 184 + 1000;
            this.woodLabelC.y = game.height - GameConfig.uiHeight / 2;
            this.woodIconC = game.add.sprite(GameConfig.uiWidth / 2 + 14, 95 - 12, 'wood_icon');
            this.incomeBarC = new Kodo.IncomeBar(this.game, 1000);
        }
        UISpectatorManager.prototype.startGame = function () {
            new Kodo.WarningMessage(this.game, 'Entered the Arena!');
        };
        UISpectatorManager.prototype.updateResources = function (players) {
            if (this.incomeBar) {
                this.incomeBar.updateCounter(players.host.incomeRateCounter, players.host.incomeRate);
                this.incomeBar.updateIncomeLabel(players.host.income);
            }
            this.goldLabel.text = '' + players.host.gold;
            this.woodLabel.text = '' + players.host.wood;
            this.goldIcon.alignTo(this.goldLabel, Phaser.RIGHT_CENTER, 5, -3);
            this.woodIcon.alignTo(this.woodLabel, Phaser.RIGHT_CENTER, 5, -3);
            if (this.incomeBarC) {
                this.incomeBarC.updateCounter(players.client.incomeRateCounter, players.client.incomeRate);
                this.incomeBarC.updateIncomeLabel(players.client.income);
            }
            this.goldLabelC.text = '' + players.client.gold;
            this.woodLabelC.text = '' + players.client.wood;
            this.goldIconC.alignTo(this.goldLabelC, Phaser.RIGHT_CENTER, 5, -3);
            this.woodIconC.alignTo(this.woodLabelC, Phaser.RIGHT_CENTER, 5, -3);
        };
        return UISpectatorManager;
    }());
    Kodo.UISpectatorManager = UISpectatorManager;
})(Kodo || (Kodo = {}));
