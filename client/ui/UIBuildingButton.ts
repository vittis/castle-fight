module Kodo {
    export class UIBuildingButton extends Phaser.Button {

        previewName : string;
        buildingName : string;

        goldCostText : Phaser.Text;
        woodCostText: Phaser.Text;

        descricaoBox : Phaser.Image;
        descTexto : Phaser.Text;
        descricaoString : string;

        unitDescricaoBox: Phaser.Image;
        unitDescTexto: Phaser.Text;
        unitDescricaoString: string;

        mostrarUnit : boolean = false;

        iconGroup : Phaser.Group;
        unitIconGroup : Phaser.Group;

        unitImage : Phaser.Sprite;

        tudoGroup : Phaser.Group;

        constructor(game, sprite : string, context, previewName, buildingName) {
            super(game, 0, 0, sprite, null, context, 1, 0, 2);
             this.previewName = previewName;
            this.buildingName = buildingName;

            this.tudoGroup = this.game.add.group();

            var style = { font: "Baloo Paaji", fill: '#ecec3a', wordWrap: true, align: "center" };
            this.goldCostText = game.add.text(0, 0, Kodo[buildingName].goldCost, style);
            this.goldCostText.anchor.setTo(0.5, 0.5);
            this.goldCostText.fontSize = 20;
            style.fill = '#0D6032';
            this.woodCostText = game.add.text(0, 0, Kodo[buildingName].woodCost, style);
            this.woodCostText.anchor.setTo(0.5, 0.5);
            this.woodCostText.fontSize = 20;
            this.goldCostText.alignTo(this, Phaser.RIGHT_TOP, 3);
            this.woodCostText.alignTo(this, Phaser.RIGHT_BOTTOM, 3);

            this.game.time.events.add(500, this.updateTextPos.bind(this), this);
            this.game.time.events.add(1000, this.updateTextPos.bind(this), this);


            this.descricaoString = Kodo[buildingName].nome + "\n\n" + "Unit Count: " + Kodo[buildingName].spamCount 
                + "\nTraining Rate: " + Kodo[buildingName].spamRate + "\nIncome Gain: " + Kodo[buildingName].incomeGain + "\nWood Gain: " + (Kodo[buildingName].woodCost > 0 ? 0 : Kodo[buildingName].goldCost) +"\n" + Kodo[buildingName].description+"\n(click to unit info)";


            style = {
                font: "Baloo Paaji", fill: 'white', wordWrap: false, align: "center"
            };
            this.descTexto = this.game.add.text(200, 100, this.descricaoString, style);
            this.descTexto.fontSize = 16;
            this.descTexto.alpha = 0.85;
            this.descTexto.anchor.setTo(0.5, 1);

            var indice = this.descricaoString.indexOf('in: ');
            this.descTexto.addColor('#ecec3a', indice);
            if (Kodo[buildingName].incomeGain >=10)
                this.descTexto.addColor('#ffffff', indice+2);
            else 
                this.descTexto.addColor('#ffffff', indice + 1);

            indice = this.descricaoString.indexOf('Wood Gain: ') + 6;
            this.descTexto.addColor('#a8cc7f', indice);
            if ((Kodo[buildingName].woodCost > 0 ? 0 : Kodo[buildingName].goldCost) >= 10)
                this.descTexto.addColor('#ffffff', indice + 2);
            else
                this.descTexto.addColor('#ffffff', indice + 1);

            this.iconGroup = this.game.add.group();
            var hp_icon = this.game.add.sprite(50, 50, 'hp_icon');
            var armor_icon = this.game.add.sprite(50, 50, 'armor_icon');
            armor_icon.alignTo(hp_icon, Phaser.RIGHT_CENTER, 10);

            var hpTexto = this.game.add.text(200, 100, ""+Kodo[buildingName].maxHP, style);
            hpTexto.fontSize = 16;
            hpTexto.alpha = 0.9;
            hpTexto.alignIn(hp_icon, Phaser.CENTER, 0, 1);

            var armorTexto = this.game.add.text(200, 100, "" + Kodo[buildingName].maxArmor, style);
            armorTexto.fontSize = 16;
            armorTexto.alpha = 0.9;
            armorTexto.alignIn(armor_icon, Phaser.CENTER, 0, 3);    

            this.iconGroup.add(hp_icon);
            this.iconGroup.add(armor_icon);
            this.iconGroup.add(hpTexto);
            this.iconGroup.add(armorTexto);


            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x000000);
            box.lineStyle(5, 0x000000, 1);
            box.moveTo(0, 0);
            box.lineTo(this.descTexto.width + 10, 0);
            box.lineTo(this.descTexto.width + 10, this.descTexto.height + 10);
            box.lineTo((this.descTexto.width + 10) / 2 + 10, this.descTexto.height + 10);
            box.lineTo((this.descTexto.width + 10) / 2, this.descTexto.height + 20);
            box.lineTo((this.descTexto.width + 10) / 2 - 10, this.descTexto.height + 10);

            box.lineTo(0, this.descTexto.height + 10);
            box.lineTo(0, 0);
            box.endFill();
            this.descricaoBox = this.game.add.sprite(this.descTexto.x, this.descTexto.y, box.generateTexture());
            this.descricaoBox.alpha = 0.6;
            this.descricaoBox.anchor.setTo(0.5, 1);
            box.destroy();

            this.game.world.swap(this.descricaoBox, this.descTexto);
            this.descricaoBox.visible = false;
            this.descTexto.visible = false;
            this.iconGroup.visible = false;

            //-----------------------------------------------------------------
            this.unitDescricaoString = Kodo[Kodo[buildingName].spamUnit].nome 
            + "\n   \nDamage: " + Kodo[Kodo[buildingName].spamUnit].attackDmg + "\nRange: " + Kodo[Kodo[buildingName].spamUnit].attackRange + "\nAtk Speed: " + Kodo[Kodo[buildingName].spamUnit].attackRate
            + "\n\n\n" + Kodo[Kodo[buildingName].spamUnit].description;

            style = {
                font: "Baloo Paaji", fill: 'white', wordWrap: false, align: "center"
            };
            this.unitDescTexto = this.game.add.text(200, 100, this.unitDescricaoString, style);
            this.unitDescTexto.fontSize = 16;
            this.unitDescTexto.alpha = 0.85;
            this.unitDescTexto.anchor.setTo(0.5, 1);


            this.unitIconGroup = this.game.add.group();
            var hp_icon2 = this.game.add.sprite(50, 50, 'hp_icon');
            var armor_icon2 = this.game.add.sprite(50, 50, 'armor_icon');
            armor_icon2.alignTo(hp_icon2, Phaser.RIGHT_CENTER, 10);

            var hpTexto2 = this.game.add.text(200, 100, "" + Kodo[Kodo[buildingName].spamUnit].maxHP, style);
            hpTexto2.fontSize = 16;
            hpTexto2.alpha = 0.9;
            hpTexto2.alignIn(hp_icon2, Phaser.CENTER, 0, 1);

            var armorTexto2 = this.game.add.text(200, 100, "" + Kodo[Kodo[buildingName].spamUnit].maxArmor, style);
            armorTexto2.fontSize = 16;
            armorTexto2.alpha = 0.9;
            armorTexto2.alignIn(armor_icon2, Phaser.CENTER, 0, 3);

            var hostLabel = GameConfig.isHost ? "h" : "c";
            this.unitImage = this.game.add.sprite(200, 200, Kodo[buildingName].spamUnit.toLowerCase() + hostLabel);
            //this.unitImage.scale.setTo(0.9, 0.9);

            this.unitIconGroup.add(hp_icon2);
            this.unitIconGroup.add(armor_icon2);
            this.unitIconGroup.add(hpTexto2);
            this.unitIconGroup.add(armorTexto2);


            var box2 = this.game.make.graphics(0, 0);
            box2.beginFill(0x000000);
            box2.lineStyle(5, 0x000000, 1);
            box2.moveTo(0, 0);
            box2.lineTo(this.unitDescTexto.width + 10, 0);
            box2.lineTo(this.unitDescTexto.width + 10, this.unitDescTexto.height + 10);
            box2.lineTo((this.unitDescTexto.width + 10) / 2 + 10, this.unitDescTexto.height + 10);
            box2.lineTo((this.unitDescTexto.width + 10) / 2, this.unitDescTexto.height + 20);
            box2.lineTo((this.unitDescTexto.width + 10) / 2 - 10, this.unitDescTexto.height + 10);

            box2.lineTo(0, this.unitDescTexto.height + 10);
            box2.lineTo(0, 0);
            box2.endFill();
            this.unitDescricaoBox = this.game.add.sprite(this.unitDescTexto.x, this.unitDescTexto.y, box2.generateTexture());
            this.unitDescricaoBox.alpha = 0.6;
            this.unitDescricaoBox.anchor.setTo(0.5, 1);
            box2.destroy();

            this.game.world.swap(this.unitDescricaoBox, this.unitDescTexto);
            this.unitDescricaoBox.visible = false;
            this.unitDescTexto.visible = false;
            this.unitIconGroup.visible = false;
            this.unitImage.visible = false;
            this.alive = false;

            this.tudoGroup.add(this.descricaoBox);
            this.tudoGroup.add(this.descTexto);
            this.tudoGroup.add(this.iconGroup);
            this.tudoGroup.add(this.unitDescricaoBox);
            this.tudoGroup.add(this.unitDescTexto);
            this.tudoGroup.add(this.unitIconGroup);
            this.tudoGroup.add(this.unitImage); 
        }
        updateTextPos() {
            this.goldCostText.x = Math.round(this.world.x - 50);
            this.goldCostText.y = Math.round(this.world.y - this.height/2+23);

            this.woodCostText.x = Math.round(this.world.x - 50);
            this.woodCostText.y = Math.round(this.world.y + this.height/2-23);
        }
        over : boolean = false;
        onOver() {
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
        }
        onDown() {
            this.mostrarUnit = !this.mostrarUnit;
        }
        onOut() {
            this.over = false;

            this.descricaoBox.visible = false;
            this.descTexto.visible = false;
            this.unitDescricaoBox.visible = false;
            this.unitDescTexto.visible = false;
            this.iconGroup.visible = false;
            this.unitIconGroup.visible = false;
            this.unitImage.visible = false;
            this.alive = false;
        }
    }
}