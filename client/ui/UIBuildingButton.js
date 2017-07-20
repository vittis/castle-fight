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
            var style = { font: "Baloo Paaji", fill: '#ecec3a', wordWrap: true, /*wordWrapWidth: this.width,*/ align: "center" };
            _this.goldCostText = game.add.text(0, 0, Kodo[buildingName].goldCost, style);
            _this.goldCostText.anchor.setTo(0.5, 0.5);
            _this.goldCostText.fontSize = 20;
            //this.goldCostText.alpha = 0.9;
            style.fill = '#0D6032';
            _this.woodCostText = game.add.text(0, 0, Kodo[buildingName].woodCost, style);
            _this.woodCostText.anchor.setTo(0.5, 0.5);
            _this.woodCostText.fontSize = 20;
            //this.woodCostText.alpha = 0.9;
            _this.goldCostText.alignTo(_this, Phaser.RIGHT_TOP, 3);
            _this.woodCostText.alignTo(_this, Phaser.RIGHT_BOTTOM, 3);
            _this.game.time.events.add(500, _this.updateTextPos.bind(_this), _this);
            _this.game.time.events.add(1000, _this.updateTextPos.bind(_this), _this);
            return _this;
        }
        UIBuildingButton.prototype.updateTextPos = function () {
            this.goldCostText.x = Math.round(this.world.x - 50);
            this.goldCostText.y = Math.round(this.world.y - this.height / 2 + 23);
            this.woodCostText.x = Math.round(this.world.x - 50);
            this.woodCostText.y = Math.round(this.world.y + this.height / 2 - 23);
        };
        return UIBuildingButton;
    }(Phaser.Button));
    Kodo.UIBuildingButton = UIBuildingButton;
})(Kodo || (Kodo = {}));
