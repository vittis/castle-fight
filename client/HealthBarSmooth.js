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
    var HealthBarSmooth = (function (_super) {
        __extends(HealthBarSmooth, _super);
        function HealthBarSmooth(game, entity) {
            var _this = _super.call(this, game, 0, 0) || this;
            _this.visible = false;
            _this.entity = entity;
            _this.maxHp = entity.dataq.maxHP;
            _this.cuts = 1 / _this.maxHp;
            _this.maxLenght = -33 * entity.dataq.height;
            _this.lenght = _this.maxLenght;
            _this.smooth = _this.lenght;
            game.add.existing(_this);
            return _this;
        }
        HealthBarSmooth.prototype.update = function () {
            if (this.visible) {
                if (this.entity.isHost) {
                    this.x = this.entity.x + 2;
                    this.y = this.entity.y + GameConfig.tileSize - 7 + GameConfig.tileSize * (this.entity.dataq.height - 1);
                }
                else {
                    this.x = this.entity.x + GameConfig.tileSize - 5 + 1 + GameConfig.tileSize * (this.entity.dataq.height - 1);
                    this.y = this.entity.y + GameConfig.tileSize - 7 + GameConfig.tileSize * (this.entity.dataq.height - 1);
                }
                if (this.smooth < this.lenght) {
                    if (this.game != null)
                        this.smooth += this.game.time.elapsed / 100 * 6;
                }
                this.clear();
                this.lineStyle(6, 0xd42a2a, 1);
                this.moveTo(0, 0);
                this.lineTo(0, this.smooth);
            }
        };
        HealthBarSmooth.prototype.receiveDamage = function (newHealth) {
            this.receivedDamage = true;
            var t = this.maxHp - newHealth;
            this.lenght = Phaser.Math.linear(this.maxLenght, 0, this.cuts * t);
            this.visible = true;
            if (this.game != null) {
                this.game.time.events.remove(this.timerEvento);
                this.timerEvento = this.game.time.events.add(5500, this.hideBar.bind(this), this);
            }
        };
        HealthBarSmooth.prototype.hideBar = function () {
            this.clear();
            this.visible = false;
            this.receivedDamage = false;
        };
        return HealthBarSmooth;
    }(Phaser.Graphics));
    Kodo.HealthBarSmooth = HealthBarSmooth;
})(Kodo || (Kodo = {}));
