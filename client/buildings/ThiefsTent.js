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
    var ThiefsTent = (function (_super) {
        __extends(ThiefsTent, _super);
        function ThiefsTent(game, tile, id, isHost, data) {
            var _this = this;
            var texture;
            if (isHost) {
                texture = 'thiefsTenth';
            }
            else {
                texture = 'thiefsTentc';
            }
            _this = _super.call(this, game, tile, id, isHost, texture, data) || this;
            return _this;
        }
        return ThiefsTent;
    }(Kodo.SpamBuilding));
    Kodo.ThiefsTent = ThiefsTent;
})(Kodo || (Kodo = {}));
