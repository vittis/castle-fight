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
    var Castle = (function (_super) {
        __extends(Castle, _super);
        function Castle(game, tile, id, isHost) {
            var _this = this;
            var texture;
            if (isHost) {
                texture = 'castleh';
            }
            else {
                texture = 'castlec';
            }
            _this = _super.call(this, game, tile, id, isHost, texture) || this;
            return _this;
        }
        return Castle;
    }(Kodo.Entity));
    Kodo.Castle = Castle;
})(Kodo || (Kodo = {}));
