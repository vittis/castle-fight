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
    var SpamBarSmooth32 = (function (_super) {
        __extends(SpamBarSmooth32, _super);
        function SpamBarSmooth32(game, building) {
            var _this = _super.call(this, game, 0, 0) || this;
            _this.unitsCountBar = [];
            _this.currentTime = 0;
            _this.timeToMove = 0.58;
            _this.fadeIn = false;
            _this.fadeOut = false;
            _this.building = building;
            _this.spamRate = building.data.spamRate;
            _this.cuts = 1 / _this.spamRate;
            _this.x = _this.building.x + GameConfig.tileSize / 2 - 4 / 2;
            _this.y = _this.building.y + GameConfig.tileSize * building.data.height + 3 / 2;
            _this.smooth = 0;
            _this.lenght = 0;
            _this.maxLenght = 68 / 2;
            _this.alpha = 0.8;
            game.add.existing(_this);
            var bar = game.make.graphics(0, 0);
            bar.beginFill();
            bar.lineStyle(6 / 2, 0xffffff, 1);
            bar.moveTo(0, 0);
            bar.lineTo(_this.maxLenght, 0);
            bar.endFill();
            _this.containerBar = game.add.sprite(_this.x, _this.y, bar.generateTexture());
            bar.destroy();
            game.world.swap(_this, _this.containerBar);
            _this.containerBar.alpha = 0.5;
            _this.containerBar.y -= 6 / 2;
            _this.containerBar.x -= 6 / 2;
            for (var i = 0; i < building.data.spamCount; i++) {
                var bar2 = game.make.graphics(0, 0);
                bar2.beginFill();
                bar2.lineStyle(5 / 2, 0xffd700, 1);
                bar2.moveTo(0, 0);
                bar2.lineTo(_this.maxLenght / building.data.spamCount - 5 / 2, 0);
                bar2.endFill();
                _this.unitsCountBar[i] = game.add.sprite(_this.x, _this.y, bar2.generateTexture());
                bar2.destroy();
                _this.unitsCountBar[i].alpha = 0.9;
                _this.unitsCountBar[i].y += 3 / 2;
                _this.unitsCountBar[i].x -= 5 / 2;
                _this.unitsCountBar[i].x += i * (_this.maxLenght / building.data.spamCount) + 5 / 2 / 2;
            }
            return _this;
            //this.fadeUnitBarIn();
            //this.game.time.events.add(4000, this.fadeUnitBarOut.bind(this), this);
        }
        /*fadeUnitBarIn() {
            this.fadeIn = true;
            this.unitsCountBar.forEach(element => {
                element.alpha = 0;
            });
        }
        fadeUnitBarOut() {
            this.fadeOut = true;
            this.unitsCountBar.forEach(element => {
                element.alpha = 1;
            });
        }*/
        SpamBarSmooth32.prototype.update = function () {
            if (this.smooth < this.maxLenght) {
                this.currentTime += this.game.time.elapsed / 1000;
                this.smooth = Phaser.Math.linear(0, this.maxLenght, this.currentTime / (this.timeToMove * this.spamRate));
            }
            this.clear();
            this.lineStyle(3, 0xffd700, 1);
            this.moveTo(0, 0);
            this.lineTo(this.smooth, 0);
            /*if (this.fadeIn) {
                this.unitsCountBar.forEach(element => {
                    element.alpha += this.game.time.elapsed/1000;
                    if (element.alpha > 1) {
                        this.fadeIn = false;
                    }
                });
            }*/
            if (this.fadeOut) {
                var bar = this.unitsCountBar[this.unitsCountBar.length - 1];
                bar.alpha -= this.game.time.elapsed / 1000;
                if (bar.alpha < 0) {
                    bar.destroy();
                    this.unitsCountBar.splice(this.unitsCountBar.length - 1, 1);
                    this.fadeOut = false;
                }
            }
        };
        SpamBarSmooth32.prototype.updateCounter = function (counter) {
            if (counter != 0) {
                counter = counter * -1 + this.spamRate;
                this.smooth = Phaser.Math.linear(0, this.maxLenght, this.cuts * counter);
            }
        };
        SpamBarSmooth32.prototype.resetCounter = function () {
            this.smooth = 0;
            this.currentTime = 0;
            this.fadeOut = true;
            //this.fadeUnitBarIn();
            //this.game.time.events.add(4000, this.fadeUnitBarOut.bind(this), this);
        };
        SpamBarSmooth32.prototype.destroy = function () {
            this.unitsCountBar.forEach(function (element) {
                element.destroy();
            });
            this.containerBar.destroy();
            _super.prototype.destroy.call(this);
        };
        return SpamBarSmooth32;
    }(Phaser.Graphics));
    Kodo.SpamBarSmooth32 = SpamBarSmooth32;
})(Kodo || (Kodo = {}));
