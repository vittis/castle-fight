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
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(x, y, row, col) {
            var _this = _super.call(this, x, y, 48, 48) || this;
            _this.entity = null;
            _this.row = row;
            _this.col = col;
            return _this;
        }
        return Tile;
    }(Phaser.Rectangle));
    Kodo.Tile = Tile;
})(Kodo || (Kodo = {}));
