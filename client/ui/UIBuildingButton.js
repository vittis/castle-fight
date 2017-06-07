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
    var UIBuildingButton = (function (_super) {
        __extends(UIBuildingButton, _super);
        function UIBuildingButton(game, sprite, context, previewName, buildingName) {
            var _this = _super.call(this, game, 0, 0, sprite, null, context, 1, 0, 2) || this;
            _this.previewName = previewName;
            _this.buildingName = buildingName;
            return _this;
        }
        return UIBuildingButton;
    }(Phaser.Button));
    Kodo.UIBuildingButton = UIBuildingButton;
})(Kodo || (Kodo = {}));
