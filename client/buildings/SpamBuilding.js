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
    var SpamBuilding = (function (_super) {
        __extends(SpamBuilding, _super);
        function SpamBuilding(game, tile, id, isHost, texture, data) {
            var _this = _super.call(this, game, tile, id, isHost, texture, data) || this;
            _this.bar = new Kodo.SpamBarSmooth(game, _this);
            return _this;
        }
        Object.defineProperty(SpamBuilding.prototype, "data", {
            get: function () {
                return this.dataq;
            },
            enumerable: true,
            configurable: true
        });
        SpamBuilding.prototype.updateStep = function (newData, tile) {
            _super.prototype.updateStep.call(this, newData);
            //console.log(newData.tileRow+", "+newData.tileCol);
            if (this.data.spamData.hasSpammed) {
                this.bar.resetCounter();
                /* if (Kodo.GameScene.instance.uiEntityManager.target == this && this.isHost == GameConfig.isHost)
                    Kodo.GameScene.instance.uiEntityManager.appearTrainButton(this); */
            }
            else {
                this.bar.updateCounter(newData.spamData.spamRateCounter);
            }
        };
        SpamBuilding.prototype.onDeath = function () {
            this.bar.destroy();
            _super.prototype.onDeath.call(this);
        };
        return SpamBuilding;
    }(Kodo.Building));
    Kodo.SpamBuilding = SpamBuilding;
})(Kodo || (Kodo = {}));
