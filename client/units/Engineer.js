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
    var Engineer = (function (_super) {
        __extends(Engineer, _super);
        function Engineer(game, tile, id, isHost, data) {
            var _this = this;
            var texture;
            if (isHost) {
                texture = 'engineerh';
            }
            else {
                texture = 'engineerc';
            }
            _this = _super.call(this, game, tile, id, isHost, texture, data) || this;
            return _this;
        }
        Engineer.prototype.attack = function (tile) {
            var tweenA = this.game.add.tween(this).to({ x: tile.x, y: tile.y }, 100, Phaser.Easing.Linear.None);
            var tweenB = this.game.add.tween(this).to({ x: this.x, y: this.y }, 100, Phaser.Easing.Linear.None);
            tweenA.chain(tweenB);
            tweenA.start();
            _super.prototype.attack.call(this, tile);
            //tile.entity.tint = 0xbedbff;
            //tile.entity.justBeenStunned = true;
        };
        return Engineer;
    }(Kodo.Unit));
    Kodo.Engineer = Engineer;
})(Kodo || (Kodo = {}));
