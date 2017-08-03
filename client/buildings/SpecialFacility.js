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
    var SpecialFacility = (function (_super) {
        __extends(SpecialFacility, _super);
        function SpecialFacility(game, tile, id, isHost, data) {
            var _this = this;
            var texture;
            if (isHost) {
                texture = 'specialFacilityh';
            }
            else {
                texture = 'specialFacilityc';
            }
            _this = _super.call(this, game, tile, id, isHost, texture, data) || this;
            return _this;
        }
        return SpecialFacility;
    }(Kodo.SpamBuilding));
    Kodo.SpecialFacility = SpecialFacility;
})(Kodo || (Kodo = {}));
