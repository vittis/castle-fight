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
    var StorageBarn = (function (_super) {
        __extends(StorageBarn, _super);
        function StorageBarn(game, tile, id, isHost, data) {
            var _this = this;
            var texture;
            if (isHost) {
                texture = 'storageBarnh';
            }
            else {
                texture = 'storageBarnc';
            }
            _this = _super.call(this, game, tile, id, isHost, texture, data) || this;
            return _this;
        }
        return StorageBarn;
    }(Kodo.SpamBuilding));
    Kodo.StorageBarn = StorageBarn;
})(Kodo || (Kodo = {}));
