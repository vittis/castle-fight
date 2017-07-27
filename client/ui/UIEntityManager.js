var Kodo;
(function (Kodo) {
    var UIEntityManager = (function () {
        function UIEntityManager(game) {
            this.isShowing = false;
            this.game = game;
            this.isShowing = false;
            this.boxGroup = game.add.group();
        }
        UIEntityManager.prototype.updateText = function () {
            if (this.descTexto) {
                if (this.target instanceof Kodo.Building) {
                    this.descTexto.text = this.target.dataq.name + "\nHP: " + this.target.dataq.hp + "/" + this.target.dataq.maxHP +
                        "\nArmor: " + this.target.dataq.armor + "/" + this.target.dataq.maxArmor;
                }
                if (this.target instanceof Kodo.Unit) {
                    this.descTexto.text = this.target.dataq.name + "\nHP: " + this.target.dataq.hp + "/" + this.target.dataq.maxHP +
                        "\nArmor: " + this.target.dataq.armor + "/" + this.target.dataq.maxArmor + "\nDamage: "
                        + this.target.data.attackDmg + "\nRange: " + this.target.data.attackRange + "\nAtk Speed: " + this.target.data.attackRate;
                }
            }
            this.game.world.bringToTop(this.boxGroup);
        };
        UIEntityManager.prototype.update = function () {
            if (this.isShowing) {
                this.descricaoBox.x = this.target.world.x + this.target.width / 2;
                this.descricaoBox.y = this.target.world.y;
                this.descTexto.alignIn(this.descricaoBox, Phaser.TOP_LEFT);
                this.descTexto.x += 10;
                this.descTexto.y += 10;
            }
        };
        UIEntityManager.prototype.onDownUnit = function (unit) {
            var entityManager = Kodo.GameScene.instance.uiEntityManager;
            if (entityManager.descricaoBox) {
                entityManager.descricaoBox.destroy();
                entityManager.descTexto.destroy();
            }
            if (entityManager.target != unit || !entityManager.isShowing) {
                entityManager.isShowing = true;
                entityManager.descricaoString = unit.dataq.name + "\nHP: " + unit.dataq.hp + "/" + unit.dataq.maxHP +
                    "\nArmor: " + unit.dataq.armor + "/" + unit.dataq.maxArmor
                    + "\nDamage: " + unit.data.attackDmg + "\nRange: " + unit.data.attackRange + "\nAtk Speed: " + unit.data.attackRate;
                var style = {
                    font: "Baloo Paaji", fill: 'white', wordWrap: false, align: "left"
                };
                entityManager.descTexto = this.game.add.text(200, 100, entityManager.descricaoString, style);
                entityManager.descTexto.fontSize = 16;
                entityManager.descTexto.alpha = 0.8;
                entityManager.descTexto.anchor.setTo(0.5, 0.5);
                var box = this.game.make.graphics(0, 0);
                box.beginFill(0x000000);
                box.lineStyle(5, 0x000000, 1);
                box.moveTo(0, 0);
                box.lineTo(entityManager.descTexto.width + 10, 0);
                box.lineTo(entityManager.descTexto.width + 10, entityManager.descTexto.height + 10);
                box.lineTo((entityManager.descTexto.width + 10) / 2 + 10, entityManager.descTexto.height + 10);
                box.lineTo((entityManager.descTexto.width + 10) / 2, entityManager.descTexto.height + 20);
                box.lineTo((entityManager.descTexto.width + 10) / 2 - 10, entityManager.descTexto.height + 10);
                box.lineTo(0, entityManager.descTexto.height + 10);
                box.lineTo(0, 0);
                box.endFill();
                entityManager.descricaoBox = this.game.add.sprite(entityManager.descTexto.x, entityManager.descTexto.y, box.generateTexture());
                entityManager.descricaoBox.alpha = 0.5;
                entityManager.descricaoBox.anchor.setTo(0.5, 1);
                box.destroy();
                this.game.world.swap(entityManager.descricaoBox, entityManager.descTexto);
                entityManager.descricaoBox.x = unit.world.x + unit.width / 2;
                entityManager.descricaoBox.y = unit.world.y;
                entityManager.descTexto.alignIn(entityManager.descricaoBox, Phaser.TOP_LEFT);
                entityManager.descTexto.x += 10;
                entityManager.descTexto.y += 10;
                entityManager.boxGroup.add(entityManager.descricaoBox);
                entityManager.boxGroup.add(entityManager.descTexto);
                this.game.world.bringToTop(entityManager.boxGroup);
            }
            else {
                entityManager.isShowing = false;
            }
            entityManager.target = unit;
        };
        UIEntityManager.prototype.onDownBuilding = function (building) {
            var entityManager = Kodo.GameScene.instance.uiEntityManager;
            if (entityManager.descricaoBox) {
                entityManager.descricaoBox.destroy();
                entityManager.descTexto.destroy();
            }
            if (entityManager.target != building || !entityManager.isShowing) {
                entityManager.isShowing = true;
                entityManager.descricaoString = building.dataq.name + "\nHP: " + building.dataq.hp + "/" + building.dataq.maxHP +
                    "\nArmor: " + building.dataq.armor + "/" + building.dataq.maxArmor;
                var style = {
                    font: "Baloo Paaji", fill: 'white', wordWrap: false, align: "left"
                };
                entityManager.descTexto = this.game.add.text(200, 100, entityManager.descricaoString, style);
                entityManager.descTexto.fontSize = 16;
                entityManager.descTexto.alpha = 0.8;
                entityManager.descTexto.anchor.setTo(0.5, 0.5);
                var box = this.game.make.graphics(0, 0);
                box.beginFill(0x000000);
                box.lineStyle(5, 0x000000, 1);
                box.moveTo(0, 0);
                box.lineTo(entityManager.descTexto.width + 10, 0);
                box.lineTo(entityManager.descTexto.width + 10, entityManager.descTexto.height + 10);
                box.lineTo((entityManager.descTexto.width + 10) / 2 + 10, entityManager.descTexto.height + 10);
                box.lineTo((entityManager.descTexto.width + 10) / 2, entityManager.descTexto.height + 20);
                box.lineTo((entityManager.descTexto.width + 10) / 2 - 10, entityManager.descTexto.height + 10);
                box.lineTo(0, entityManager.descTexto.height + 10);
                box.lineTo(0, 0);
                box.endFill();
                entityManager.descricaoBox = this.game.add.sprite(entityManager.descTexto.x, entityManager.descTexto.y, box.generateTexture());
                entityManager.descricaoBox.alpha = 0.5;
                entityManager.descricaoBox.anchor.setTo(0.5, 1);
                box.destroy();
                this.game.world.swap(entityManager.descricaoBox, entityManager.descTexto);
                entityManager.descricaoBox.x = building.world.x + building.width / 2;
                entityManager.descricaoBox.y = building.world.y;
                entityManager.descTexto.alignIn(entityManager.descricaoBox, Phaser.TOP_LEFT);
                entityManager.descTexto.x += 10;
                entityManager.descTexto.y += 10;
                entityManager.boxGroup.add(entityManager.descricaoBox);
                entityManager.boxGroup.add(entityManager.descTexto);
                this.game.world.bringToTop(entityManager.boxGroup);
            }
            else {
                entityManager.isShowing = false;
            }
            entityManager.target = building;
        };
        return UIEntityManager;
    }());
    Kodo.UIEntityManager = UIEntityManager;
})(Kodo || (Kodo = {}));
