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
            _this.mostrarUnit = false;
            _this.over = false;
            _this.spriteName = sprite;
            _this.previewName = previewName;
            _this.buildingName = buildingName;
            _this.tudoGroup = _this.game.add.group();
            var style = { fill: '#ecec3a', wordWrap: true, align: "center" };
            _this.goldCostText = game.add.text(0, 0, Kodo[buildingName].goldCost, style);
            _this.goldCostText.anchor.setTo(0.5, 0.5);
            _this.goldCostText.fontSize = 20;
            style.fill = '#0D6032';
            _this.woodCostText = game.add.text(0, 0, Kodo[buildingName].woodCost, style);
            _this.woodCostText.anchor.setTo(0.5, 0.5);
            _this.woodCostText.fontSize = 20;
            /* this.goldCostText.alignTo(this, Phaser.RIGHT_TOP, 30);
            this.woodCostText.alignTo(this, Phaser.RIGHT_BOTTOM, 30); */
            _this.game.time.events.add(500, _this.updateTextPos.bind(_this), _this);
            _this.game.time.events.add(1000, _this.updateTextPos.bind(_this), _this);
            _this.descricaoString = Kodo[buildingName].nome + "\n\n" + "Unit Count: " + Kodo[buildingName].spamCount
                + "\nTraining Rate: " + Kodo[buildingName].spamRate + "\nIncome Gain: " + Kodo[buildingName].incomeGain + "\nWood Gain: " + (Kodo[buildingName].woodCost > 0 ? 0 : Kodo[buildingName].goldCost) + "\n" + Kodo[buildingName].description + "\n(click to unit info)";
            style = {
                fill: 'white', wordWrap: false, align: "center"
            };
            _this.descTexto = _this.game.add.text(200, 100, _this.descricaoString, style);
            _this.descTexto.fontSize = 16;
            _this.descTexto.alpha = 0.85;
            _this.descTexto.anchor.setTo(0.5, 1);
            var indice = _this.descricaoString.indexOf('in: ');
            _this.descTexto.addColor('#ecec3a', indice);
            if (Kodo[buildingName].incomeGain >= 10)
                _this.descTexto.addColor('#ffffff', indice + 2);
            else
                _this.descTexto.addColor('#ffffff', indice + 1);
            indice = _this.descricaoString.indexOf('Wood Gain: ') + 6;
            _this.descTexto.addColor('#a8cc7f', indice);
            if ((Kodo[buildingName].woodCost > 0 ? 0 : Kodo[buildingName].goldCost) >= 10)
                _this.descTexto.addColor('#ffffff', indice + 2);
            else
                _this.descTexto.addColor('#ffffff', indice + 1);
            _this.iconGroup = _this.game.add.group();
            var hp_icon = _this.game.add.sprite(50, 50, 'hp_icon');
            var armor_icon = _this.game.add.sprite(50, 50, 'armor_icon');
            armor_icon.alignTo(hp_icon, Phaser.RIGHT_CENTER, 10);
            var hpTexto = _this.game.add.text(200, 100, "" + Kodo[buildingName].maxHP, style);
            hpTexto.fontSize = 16;
            hpTexto.alpha = 0.9;
            hpTexto.alignIn(hp_icon, Phaser.CENTER, 0, 1);
            var armorTexto = _this.game.add.text(200, 100, "" + Kodo[buildingName].maxArmor, style);
            armorTexto.fontSize = 16;
            armorTexto.alpha = 0.9;
            armorTexto.alignIn(armor_icon, Phaser.CENTER, 0, 3);
            _this.iconGroup.add(hp_icon);
            _this.iconGroup.add(armor_icon);
            _this.iconGroup.add(hpTexto);
            _this.iconGroup.add(armorTexto);
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
            _this.descricaoBox.alpha = 0.8;
            _this.descricaoBox.anchor.setTo(0.5, 1);
            box.destroy();
            _this.game.world.swap(_this.descricaoBox, _this.descTexto);
            _this.descricaoBox.visible = false;
            _this.descTexto.visible = false;
            _this.iconGroup.visible = false;
            //-----------------------------------------------------------------
            _this.unitDescricaoString = Kodo[Kodo[buildingName].spamUnit].nome
                + "\n   \nDamage: " + Kodo[Kodo[buildingName].spamUnit].attackDmg + "\nRange: " + Kodo[Kodo[buildingName].spamUnit].attackRange + "\nAtk Speed: " + Kodo[Kodo[buildingName].spamUnit].attackRate
                + "\n\n\n" + Kodo[Kodo[buildingName].spamUnit].description;
            style = {
                fill: 'white', wordWrap: false, align: "center"
            };
            _this.unitDescTexto = _this.game.add.text(200, 100, _this.unitDescricaoString, style);
            _this.unitDescTexto.fontSize = 16;
            _this.unitDescTexto.alpha = 0.85;
            _this.unitDescTexto.anchor.setTo(0.5, 1);
            _this.unitIconGroup = _this.game.add.group();
            var hp_icon2 = _this.game.add.sprite(50, 50, 'hp_icon');
            var armor_icon2 = _this.game.add.sprite(50, 50, 'armor_icon');
            armor_icon2.alignTo(hp_icon2, Phaser.RIGHT_CENTER, 10);
            var hpTexto2 = _this.game.add.text(200, 100, "" + Kodo[Kodo[buildingName].spamUnit].maxHP, style);
            hpTexto2.fontSize = 16;
            hpTexto2.alpha = 0.9;
            hpTexto2.alignIn(hp_icon2, Phaser.CENTER, 0, 1);
            var armorTexto2 = _this.game.add.text(200, 100, "" + Kodo[Kodo[buildingName].spamUnit].maxArmor, style);
            armorTexto2.fontSize = 16;
            armorTexto2.alpha = 0.9;
            armorTexto2.alignIn(armor_icon2, Phaser.CENTER, 0, 3);
            var hostLabel = GameConfig.isHost ? "h" : "c";
            _this.unitImage = _this.game.add.sprite(200, 200, Kodo[buildingName].spamUnit.toLowerCase() + hostLabel);
            //this.unitImage.scale.setTo(0.9, 0.9);
            _this.unitIconGroup.add(hp_icon2);
            _this.unitIconGroup.add(armor_icon2);
            _this.unitIconGroup.add(hpTexto2);
            _this.unitIconGroup.add(armorTexto2);
            var box2 = _this.game.make.graphics(0, 0);
            box2.beginFill(0x000000);
            box2.lineStyle(5, 0x000000, 1);
            box2.moveTo(0, 0);
            box2.lineTo(_this.unitDescTexto.width + 10, 0);
            box2.lineTo(_this.unitDescTexto.width + 10, _this.unitDescTexto.height + 10);
            box2.lineTo((_this.unitDescTexto.width + 10) / 2 + 10, _this.unitDescTexto.height + 10);
            box2.lineTo((_this.unitDescTexto.width + 10) / 2, _this.unitDescTexto.height + 20);
            box2.lineTo((_this.unitDescTexto.width + 10) / 2 - 10, _this.unitDescTexto.height + 10);
            box2.lineTo(0, _this.unitDescTexto.height + 10);
            box2.lineTo(0, 0);
            box2.endFill();
            _this.unitDescricaoBox = _this.game.add.sprite(_this.unitDescTexto.x, _this.unitDescTexto.y, box2.generateTexture());
            _this.unitDescricaoBox.alpha = 0.8;
            _this.unitDescricaoBox.anchor.setTo(0.5, 1);
            box2.destroy();
            _this.game.world.swap(_this.unitDescricaoBox, _this.unitDescTexto);
            _this.unitDescricaoBox.visible = false;
            _this.unitDescTexto.visible = false;
            _this.unitIconGroup.visible = false;
            _this.unitImage.visible = false;
            _this.alive = false;
            _this.tudoGroup.add(_this.descricaoBox);
            _this.tudoGroup.add(_this.descTexto);
            _this.tudoGroup.add(_this.iconGroup);
            _this.tudoGroup.add(_this.unitDescricaoBox);
            _this.tudoGroup.add(_this.unitDescTexto);
            _this.tudoGroup.add(_this.unitIconGroup);
            _this.tudoGroup.add(_this.unitImage);
            return _this;
        }
        UIBuildingButton.prototype.updateTextPos = function () {
            if (Kodo[this.buildingName].goldCost >= 100 || Kodo[this.buildingName].woodCost >= 100) {
                this.goldCostText.x = Math.round(this.world.x - 54);
                this.goldCostText.y = Math.round(this.world.y - this.height / 2 + 23);
                this.woodCostText.x = Math.round(this.world.x - 54);
                this.woodCostText.y = Math.round(this.world.y + this.height / 2 - 23);
            }
            else {
                this.goldCostText.x = Math.round(this.world.x - 48);
                this.goldCostText.y = Math.round(this.world.y - this.height / 2 + 23);
                this.woodCostText.x = Math.round(this.world.x - 48);
                this.woodCostText.y = Math.round(this.world.y + this.height / 2 - 23);
            }
        };
        UIBuildingButton.prototype.onOver = function () {
            this.game.world.bringToTop(this.tudoGroup);
            this.alive = true;
            if (!this.over) {
                this.mostrarUnit = false;
            }
            this.over = true;
            if (!this.mostrarUnit) {
                this.unitDescricaoBox.visible = false;
                this.unitDescTexto.visible = false;
                this.unitIconGroup.visible = false;
                this.unitImage.visible = false;
                this.descricaoBox.x = this.world.x;
                this.descricaoBox.y = this.world.y - this.height / 2;
                this.descTexto.alignIn(this.descricaoBox, Phaser.TOP_LEFT);
                this.descTexto.x += 10;
                this.descTexto.y += 10;
                this.iconGroup.alignIn(this.descTexto, Phaser.TOP_CENTER, 0, -20);
                this.descricaoBox.visible = true;
                this.descTexto.visible = true;
                this.iconGroup.visible = true;
            }
            else {
                this.descricaoBox.visible = false;
                this.descTexto.visible = false;
                this.iconGroup.visible = false;
                this.unitDescricaoBox.x = this.world.x;
                this.unitDescricaoBox.y = this.world.y - this.height / 2;
                this.unitDescTexto.alignIn(this.unitDescricaoBox, Phaser.TOP_LEFT);
                this.unitDescTexto.x += 10;
                this.unitDescTexto.y += 10;
                this.unitIconGroup.alignIn(this.unitDescTexto, Phaser.TOP_CENTER, 0, -20);
                this.unitImage.alignIn(this.unitDescTexto, Phaser.BOTTOM_CENTER, 0, -25);
                this.unitDescricaoBox.visible = true;
                this.unitDescTexto.visible = true;
                this.unitIconGroup.visible = true;
                this.unitImage.visible = true;
            }
        };
        UIBuildingButton.prototype.onDown = function () {
            this.mostrarUnit = !this.mostrarUnit;
        };
        UIBuildingButton.prototype.onOut = function () {
            this.over = false;
            this.descricaoBox.visible = false;
            this.descTexto.visible = false;
            this.unitDescricaoBox.visible = false;
            this.unitDescTexto.visible = false;
            this.iconGroup.visible = false;
            this.unitIconGroup.visible = false;
            this.unitImage.visible = false;
            this.alive = false;
        };
        return UIBuildingButton;
    }(Phaser.Button));
    Kodo.UIBuildingButton = UIBuildingButton;
})(Kodo || (Kodo = {}));
