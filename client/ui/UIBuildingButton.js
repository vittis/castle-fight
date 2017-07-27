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
            _this.descricaoString = Kodo[buildingName].nome + "\nHP: " + Kodo[buildingName].maxHP +
                "\nArmor: " + Kodo[buildingName].maxArmor + "\nUnit Count: " + Kodo[buildingName].spamCount + "\nTraining Rate: " + Kodo[buildingName].spamRate;
            var style = {
                font: "Baloo Paaji", fill: 'white', wordWrap: false, align: "left"
            };
            _this.descTexto = _this.game.add.text(200, 100, _this.descricaoString, style);
            _this.descTexto.fontSize = 16;
            _this.descTexto.alpha = 0.8;
            _this.descTexto.anchor.setTo(0.5, 1);
            var box = _this.game.make.graphics(0, 0);
            box.beginFill(0x000000);
            box.lineStyle(5, 0x000000, 1);
            box.moveTo(0, 0);
            box.lineTo(_this.descTexto.width + 10, 0);
            box.lineTo(_this.descTexto.width + 10, _this.descTexto.height + 10);
            box.lineTo((_this.descTexto.width + 10) / 2 + 10, _this.descTexto.height + 10);
            box.lineTo((_this.descTexto.width + 10) / 2, _this.descTexto.height + 20);
            box.lineTo((_this.descTexto.width + 10) / 2 - 10, _this.descTexto.height + 10);
            box.lineTo(0, _this.descTexto.height + 10);
            box.lineTo(0, 0);
            box.endFill();
            _this.descricaoBox = _this.game.add.sprite(_this.descTexto.x, _this.descTexto.y, box.generateTexture());
            _this.descricaoBox.alpha = 0.6;
            _this.descricaoBox.anchor.setTo(0.5, 1);
            box.destroy();
            _this.game.world.swap(_this.descricaoBox, _this.descTexto);
            _this.descricaoBox.visible = false;
            _this.descTexto.visible = false;
            return _this;
        }
        UIBuildingButton.prototype.updateTextPos = function () {
            this.goldCostText.x = Math.round(this.world.x - 50);
            this.goldCostText.y = Math.round(this.world.y - this.height / 2 + 23);
            this.woodCostText.x = Math.round(this.world.x - 50);
            this.woodCostText.y = Math.round(this.world.y + this.height / 2 - 23);
        };
        UIBuildingButton.prototype.onOver = function () {
            this.descricaoBox.x = this.world.x;
            this.descricaoBox.y = this.world.y - this.height / 2;
            this.descTexto.alignIn(this.descricaoBox, Phaser.TOP_LEFT);
            this.descTexto.x += 10;
            this.descTexto.y += 10;
            this.descricaoBox.visible = true;
            this.descTexto.visible = true;
        };
        UIBuildingButton.prototype.onOut = function () {
            this.descricaoBox.visible = false;
            this.descTexto.visible = false;
        };
        return UIBuildingButton;
    }(Phaser.Button));
    Kodo.UIBuildingButton = UIBuildingButton;
})(Kodo || (Kodo = {}));
