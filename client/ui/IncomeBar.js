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
        function IncomeBar(game, x) {
            var _this = _super.call(this, game, 0, 0) || this;
            _this.currentTime = 0;
            _this.timeToMove = GameConfig.updateRate / 1000;
            _this.lastCounter = 0;
            _this.incomeRate = 1;
            _this.maxLenght = 120;
            _this.x = 264;
            _this.y = game.height - GameConfig.uiHeight / 2;
            _this.smooth = 0;
            if (x) {
                _this.x += x;
            }
            game.add.existing(_this);
            var bar = game.make.graphics(0, 0);
            bar.beginFill();
            bar.lineStyle(19, 0xffffff, 1);
            bar.moveTo(0, 0);
            bar.lineTo(_this.maxLenght, 0);
            bar.endFill();
            _this.containerBar = game.add.sprite(_this.x, _this.y, bar.generateTexture());
            bar.destroy();
            game.world.swap(_this, _this.containerBar);
            _this.containerBar.alpha = 0.5;
            _this.containerBar.y -= 19;
            _this.containerBar.x -= 19;
            var style = { font: "Baloo Paaji", fill: '#ecec3a', wordWrap: true, align: "center" };
            _this.incomeNumberLabel = game.add.text(0, 0, '+15', style);
            _this.incomeNumberLabel.anchor.setTo(0.5, 0.5);
            _this.incomeNumberLabel.fontSize = 30;
            _this.incomeNumberLabel.alignTo(_this, Phaser.RIGHT_CENTER, _this.maxLenght + 5);
            var goldIcon = game.add.sprite(125, game.height - GameConfig.uiHeight / 2, 'gold_icon');
            goldIcon.scale.setTo(0.7, 0.7);
            goldIcon.alignTo(_this.incomeNumberLabel, Phaser.RIGHT_CENTER, 3, -2);
            return _this;
        }
        IncomeBar.prototype.update = function () {
            if (this.smooth < this.maxLenght) {
                this.currentTime += this.game.time.elapsed * 0.001;
                this.smooth = Phaser.Math.linear(0, this.maxLenght + this.maxLenght * 0.05, this.currentTime / (this.timeToMove * this.incomeRate));
            }
            this.clear();
            this.lineStyle(19, 0xecec3a, 1);
            this.moveTo(0, 0);
            this.lineTo(this.smooth, 0);
        };
        IncomeBar.prototype.updateCounter = function (counter, customIncomeRate) {
            this.incomeRate = Kodo.GameScene.instance.player.incomeRate;
            if (customIncomeRate) {
                this.incomeRate = customIncomeRate;
            }
            this.cuts = 1 / this.incomeRate;
            this.smooth = Phaser.Math.linear(0, this.maxLenght, this.cuts * counter);
            if (counter == this.incomeRate || counter < this.lastCounter) {
                this.currentTime = 0;
                var tweenA = this.game.add.tween(this.incomeNumberLabel.scale).to({ x: 1.5, y: 1.5 }, 200, Phaser.Easing.Linear.None);
                var tweenB = this.game.add.tween(this.incomeNumberLabel.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
                tweenA.chain(tweenB);
                tweenA.start();
            }
            this.lastCounter = counter;
        };
        IncomeBar.prototype.updateIncomeLabel = function (value) {
            if (value) {
                this.incomeNumberLabel.text = '+' + value;
                return;
            }
            this.incomeNumberLabel.text = '+' + Kodo.GameScene.instance.player.income;
        };
        return IncomeBar;
    }(Phaser.Graphics));
    Kodo.IncomeBar = IncomeBar;
})(Kodo || (Kodo = {}));
