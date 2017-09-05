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
    var Footman = (function (_super) {
        __extends(Footman, _super);
        function Footman(game, tile, id, isHost, data) {
            var _this = this;
            var texture;
            if (isHost) {
                texture = 'footmanh';
            }
            else {
                texture = 'footmanc';
            }
            _this = _super.call(this, game, tile, id, isHost, texture, data) || this;
            return _this;
        }
        Footman.prototype.attack = function (tile) {
            if (this.game != null) {
                var tweenA = this.game.add.tween(this).to({ x: tile.x, y: tile.y }, 100, Phaser.Easing.Linear.None);
                var tweenB = this.game.add.tween(this).to({ x: this.x, y: this.y }, 100, Phaser.Easing.Linear.None);
                tweenA.chain(tweenB);
                tweenA.start();
                _super.prototype.attack.call(this, tile);
            }
        };
        return Footman;
    }(Kodo.Unit));
    Kodo.Footman = Footman;
})(Kodo || (Kodo = {}));
