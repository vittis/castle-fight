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
    var Archer = (function (_super) {
        __extends(Archer, _super);
        function Archer(game, tile, id, isHost, data) {
            var _this = this;
            var texture;
            if (isHost) {
                texture = 'archerh';
            }
            else {
                texture = 'archerc';
            }
            _this = _super.call(this, game, tile, id, isHost, texture, data) || this;
            return _this;
        }
        Archer.prototype.attack = function (tile) {
            new Kodo.Projectile(this.game, this.x + GameConfig.tileSize / 2 + GameConfig.tileSize / 5, this.y + GameConfig.tileSize / 2 - GameConfig.tileSize / 3, tile, this.isHost);
            _super.prototype.attack.call(this, tile);
        };
        return Archer;
    }(Kodo.Unit));
    Kodo.Archer = Archer;
})(Kodo || (Kodo = {}));
