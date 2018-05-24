var Kodo;
(function (Kodo) {
    var UIUpdateButton = (function () {
        function UIUpdateButton(game, button) {
            this.upgradeCosts = [2,
                1,
                2,
                3,
                1,
                3,
                1,
                2];
            this.justOpened = false;
            this.justClicked = false;
            this.game = game;
            button.events.onInputDown.add(this.onDownButton.bind(this), this);
            var style = {
                font: "17px Baloo Paaji", fill: 'white', wordWrap: false, align: "center"
            };
            var descTexto = this.game.add.text(200, 100, "Upgrade Points: " + Kodo.GameScene.instance.player.updateCount, style);
            descTexto.fontSize = 21;
            descTexto.alpha = 0.95;
            descTexto.anchor.setTo(0.5, 1);
            descTexto.addColor("#38c876", 15);
            var upgradeGroup = this.game.add.group();
            style.fill = '#b94d03';
            style.font = "15px Baloo Paaji";
            for (var i = 0; i < 8; i++) {
                var upgrade = this.game.add.button(0, 0, 'upgrade' + i, null, this);
                upgrade.anchor.setTo(0.5, 0.5);
                upgrade.data.cost = this.upgradeCosts[i];
                upgrade.data.upgrade = i;
                var quant = this.game.add.text(200, 100, "x0", style);
                quant.alpha = 0.95;
                upgrade.addChild(quant);
                quant.alignIn(upgrade, Phaser.LEFT_BOTTOM);
                quant.y += 45;
                quant.x += 3;
                quant.visible = false;
                upgradeGroup.add(upgrade);
            }
            upgradeGroup.align(4, 2, 135 + 27, 63 + 10);
            upgradeGroup.x = button.x - upgradeGroup.width / 2;
            upgradeGroup.y = button.y - 200;
            descTexto.alignTo(upgradeGroup, Phaser.TOP_CENTER, 0, 10);
            this.wrapGroup = this.game.add.group();
            this.wrapGroup.add(descTexto);
            this.wrapGroup.add(upgradeGroup);
            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x000000);
            box.lineStyle(5, 0x000000, 1);
            box.moveTo(0, 0);
            box.lineTo(this.wrapGroup.width + 10, 0);
            box.lineTo(this.wrapGroup.width + 10, this.wrapGroup.height + 10);
            box.lineTo((this.wrapGroup.width + 10) / 2 + 10, this.wrapGroup.height + 10);
            box.lineTo((this.wrapGroup.width + 10) / 2, this.wrapGroup.height + 20);
            box.lineTo((this.wrapGroup.width + 10) / 2 - 10, this.wrapGroup.height + 10);
            box.lineTo(0, this.wrapGroup.height + 10);
            box.lineTo(0, 0);
            box.endFill();
            var descricaoBox = this.game.add.sprite(this.wrapGroup.x, this.wrapGroup.y, box.generateTexture());
            descricaoBox.alpha = 0.8;
            descricaoBox.anchor.setTo(0.5, 1);
            box.destroy();
            descricaoBox.x = button.world.x;
            descricaoBox.y = button.world.y - button.height / 2 - 4;
            this.wrapGroup.alignIn(descricaoBox, Phaser.TOP_LEFT);
            this.wrapGroup.x += 10;
            this.wrapGroup.y += 10;
            this.allGroup = this.game.add.group();
            this.allGroup.add(descricaoBox);
            this.allGroup.add(this.wrapGroup);
            this.allGroup.visible = false;
            upgradeGroup.onChildInputOver.add(this.onHover.bind(this), this);
            upgradeGroup.onChildInputDown.add(this.onDown.bind(this), this);
            upgradeGroup.onChildInputOut.add(this.onOut.bind(this), this);
        }
        UIUpdateButton.prototype.updateText = function () {
            this.wrapGroup.getAt(0).text = "Upgrade Points: " + Kodo.GameScene.instance.player.updateCount;
        };
        UIUpdateButton.prototype.onHover = function (sprite) {
            sprite.scale.setTo(1.05, 1.05);
        };
        UIUpdateButton.prototype.onDown = function (sprite) {
            sprite.scale.setTo(1.1, 1.1);
            if (sprite.data.cost <= Kodo.GameScene.instance.player.updateCount && !this.justClicked) {
                this.justClicked = true;
                this.game.time.events.add(500, this.justClickedFalse.bind(this), this);
                var quant = parseInt(sprite.getChildAt(0).text.charAt(1));
                quant++;
                sprite.getChildAt(0).visible = true;
                sprite.getChildAt(0).text = "x" + quant;
                Client.askUpgrade(sprite.data.upgrade);
                this.wrapGroup.getAt(0).text = "Upgrade Points: " + (Kodo.GameScene.instance.player.updateCount - sprite.data.cost);
                if (sprite.data.upgrade == 5) {
                    Kodo.GameScene.instance.getSpamBuildings(GameConfig.isHost).forEach(function (b) {
                        b.bar.addUnitCount();
                    });
                    Kodo.GameScene.instance.getEffectBuildings(GameConfig.isHost).forEach(function (b) {
                        if (!(b instanceof Kodo.SacrificeChamber))
                            b.bar.addUnitCount();
                    });
                }
            }
        };
        UIUpdateButton.prototype.onOut = function (sprite) {
            sprite.scale.setTo(1, 1);
        };
        UIUpdateButton.prototype.onDownButton = function () {
            if (this.allGroup.visible) {
                this.allGroup.visible = false;
            }
            else {
                this.allGroup.visible = true;
                this.game.world.bringToTop(this.allGroup);
                this.justOpened = true;
                this.game.time.events.add(150, this.justOpenedFalse.bind(this), this);
            }
        };
        UIUpdateButton.prototype.justOpenedFalse = function () {
            this.justOpened = false;
        };
        UIUpdateButton.prototype.justClickedFalse = function () {
            this.justClicked = false;
        };
        return UIUpdateButton;
    }());
    Kodo.UIUpdateButton = UIUpdateButton;
})(Kodo || (Kodo = {}));
