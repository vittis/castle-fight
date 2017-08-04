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
    var Projectile = (function (_super) {
        __extends(Projectile, _super);
        function Projectile(game, x, y, target, isHost) {
            var _this = _super.call(this, game, x, y, 'tiro') || this;
            if (isHost)
                _this.tint = 0xd42a2a;
            else
                _this.tint = 0x008000;
            _this.target = target;
            _this.game.add.existing(_this);
            if (target != null) {
                var tweenA = _this.game.add.tween(_this).to({ x: target.x + GameConfig.tileSize / 2, y: target.y + GameConfig.tileSize / 2 }, 350, Phaser.Easing.Linear.None, true);
                _this.game.time.events.add(350, function () { this.destroy(); }.bind(_this), _this);
            }
            else {
                console.log("ihhh");
                _this.destroy();
            }
            return _this;
        }
        Projectile.prototype.update = function () {
            if (Phaser.Math.distance(this.x, this.y, this.target.x + GameConfig.tileSize / 2, this.target.y + GameConfig.tileSize / 2) < 30) {
                this.destroy();
                console.log("xiba sam");
            }
        };
        return Projectile;
    }(Phaser.Sprite));
    Kodo.Projectile = Projectile;
})(Kodo || (Kodo = {}));
