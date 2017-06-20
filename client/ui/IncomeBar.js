var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Kodo;
(function (Kodo) {
    var IncomeBar = (function (_super) {
        __extends(IncomeBar, _super);
        function IncomeBar(game) {
            var _this = _super.call(this, game, 0, 0) || this;
            _this.currentTime = 0;
            _this.timeToMove = GameConfig.updateRate / 1000 + 0.045;
            _this.x = 200;
            _this.y = GameConfig.uiHeight / 2 + 3;
            _this.smooth = 0;
            _this.maxLenght = 124;
            game.add.existing(_this);
            var bar = game.make.graphics(0, 0);
            bar.beginFill();
            bar.lineStyle(12, 0xffffff, 1);
            bar.moveTo(0, 0);
            bar.lineTo(_this.maxLenght, 0);
            bar.endFill();
            _this.containerBar = game.add.sprite(_this.x, _this.y, bar.generateTexture());
            bar.destroy();
            game.world.swap(_this, _this.containerBar);
            _this.containerBar.alpha = 0.5;
            _this.containerBar.y -= 12;
            _this.containerBar.x -= 12;
            var style = { font: "Baloo Paaji", fill: '#FEF65B', wordWrap: true, /*wordWrapWidth: this.width,*/ align: "center" };
            /*var incomeLabel = game.add.text(0, 0, 'income', style);
            incomeLabel.anchor.setTo(0.5, 0.5);
            incomeLabel.fontSize = 15;
            incomeLabel.x = this.x + 124/2;
            incomeLabel.y = this.y - 12;*/
            _this.incomeNumberLabel = game.add.text(0, 0, '+' + Kodo.GameScene.instance.player.income, style);
            _this.incomeNumberLabel.anchor.setTo(0.5, 0.5);
            _this.incomeNumberLabel.fontSize = 25;
            _this.incomeNumberLabel.x = _this.x + _this.maxLenght + 28;
            _this.incomeNumberLabel.y = _this.y + 1;
            return _this;
        }
        IncomeBar.prototype.update = function () {
            if (this.smooth < this.maxLenght) {
                this.currentTime += this.game.time.elapsed / 1000;
                this.smooth = Phaser.Math.linear(0, this.maxLenght + this.maxLenght / 20, this.currentTime / (this.timeToMove * Kodo.GameScene.instance.player.incomeRate));
            }
            //else {
            //    this.currentTime = 0;
            //}
            this.clear();
            this.lineStyle(12, 0xFEF65B, 1);
            this.moveTo(0, 0);
            this.lineTo(this.smooth, 0);
        };
        IncomeBar.prototype.updateCounter = function (counter) {
            this.cuts = 1 / Kodo.GameScene.instance.player.incomeRate;
            this.smooth = Phaser.Math.linear(0, this.maxLenght, this.cuts * counter);
            if (counter == 0) {
                this.currentTime = 0;
                var tweenA = this.game.add.tween(this.incomeNumberLabel.scale).to({ x: 1.5, y: 1.5 }, 200, Phaser.Easing.Linear.None);
                var tweenB = this.game.add.tween(this.incomeNumberLabel.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
                tweenA.chain(tweenB);
                tweenA.start();
            }
        };
        IncomeBar.prototype.updateIncomeLabel = function () {
            this.incomeNumberLabel.text = '+' + Kodo.GameScene.instance.player.income;
        };
        return IncomeBar;
    }(Phaser.Graphics));
    Kodo.IncomeBar = IncomeBar;
})(Kodo || (Kodo = {}));
