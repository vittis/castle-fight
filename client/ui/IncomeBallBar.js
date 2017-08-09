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
    var IncomeBallBar = (function (_super) {
        __extends(IncomeBallBar, _super);
        function IncomeBallBar(game) {
            var _this = _super.call(this, game, 0, 0) || this;
            _this.currentTime = 0;
            _this.timeToMove = GameConfig.updateRate / 1000 + 0.045;
            _this.maxLenght = 624;
            _this.x = 384 + 46;
            _this.y = 20;
            _this.smooth = 0;
            _this.alpha = 0.7;
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
            _this.containerBar.alpha = 0.3;
            _this.containerBar.y -= 19;
            _this.containerBar.x -= 19;
            var ballImage = _this.game.add.sprite(0, 0, 'incomeBall');
            ballImage.anchor.setTo(0.5, 0.5);
            ballImage.scale.setTo(0.5, 0.5);
            ballImage.alignIn(_this.containerBar, Phaser.RIGHT_CENTER, -5);
            _this.containerBar.inputEnabled = true;
            _this.containerBar.events.onInputOver.add(_this.onOver.bind(_this), _this);
            _this.containerBar.events.onInputOut.add(_this.onOut.bind(_this), _this);
            _this.counterText = _this.game.add.text(0, 0, '0', { fill: 'white', wordWrap: false, align: "center" });
            _this.counterText.anchor.setTo(0.5, 0.5);
            _this.counterText.fontSize = 18;
            _this.counterText.visible = false;
            _this.counterText.alignIn(_this.containerBar, Phaser.RIGHT_CENTER, -35, 3);
            _this.tudoGroup = _this.game.add.group();
            _this.tudoGroup.add(_this);
            _this.tudoGroup.add(_this.containerBar);
            _this.tudoGroup.add(ballImage);
            _this.tudoGroup.visible = false;
            return _this;
        }
        IncomeBallBar.prototype.onOver = function () {
            this.counterText.text = "" + (Kodo.GameScene.instance.ballData.spamRate - this.counter);
            this.counterText.visible = true;
        };
        IncomeBallBar.prototype.onOut = function () {
            this.counterText.visible = false;
        };
        IncomeBallBar.prototype.update = function () {
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
        };
        IncomeBallBar.prototype.updateCounter = function (counter) {
            if (counter == 0) {
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
        };
        return IncomeBallBar;
    }(Phaser.Graphics));
    Kodo.IncomeBallBar = IncomeBallBar;
})(Kodo || (Kodo = {}));
