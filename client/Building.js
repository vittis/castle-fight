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
    var Building = (function (_super) {
        __extends(Building, _super);
        function Building(game, tile, id, isHost, texture, data) {
            var _this = _super.call(this, game, tile, id, isHost, texture, data) || this;
            _this.events.onInputDown.add(Kodo.GameScene.instance.uiEntityManager.onDownBuilding, _this);
            return _this;
        }
        Object.defineProperty(Building.prototype, "data", {
            get: function () {
                return this.dataq;
            },
            enumerable: true,
            configurable: true
        });
        Building.prototype.updateStep = function (data, tile) {
            _super.prototype.updateStep.call(this, data);
        };
        Building.goldCost = 0;
        Building.woodCost = 0;
        return Building;
    }(Kodo.Entity));
    Kodo.Building = Building;
})(Kodo || (Kodo = {}));
