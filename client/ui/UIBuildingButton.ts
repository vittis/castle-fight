module Kodo {
    export class UIBuildingButton extends Phaser.Button {

        previewName : string;
        buildingName : string;

        goldCostText : Phaser.Text;
        woodCostText: Phaser.Text;

        descricaoBox : Phaser.Image;
        descTexto : Phaser.Text;
        descricaoString : string;

        constructor(game, sprite : string, context, previewName, buildingName) {
            super(game, 0, 0, sprite, null, context, 1, 0, 2);
            this.previewName = previewName;
            this.buildingName = buildingName;


            var style = { font: "Baloo Paaji", fill: '#ecec3a', wordWrap: true, /*wordWrapWidth: this.width,*/ align: "center" };
            this.goldCostText = game.add.text(0, 0, Kodo[buildingName].goldCost, style);
            this.goldCostText.anchor.setTo(0.5, 0.5);
            this.goldCostText.fontSize = 20;
            //this.goldCostText.alpha = 0.9;

            style.fill = '#0D6032';
            this.woodCostText = game.add.text(0, 0, Kodo[buildingName].woodCost, style);
            this.woodCostText.anchor.setTo(0.5, 0.5);
            this.woodCostText.fontSize = 20;
            //this.woodCostText.alpha = 0.9;

            this.goldCostText.alignTo(this, Phaser.RIGHT_TOP, 3);
            this.woodCostText.alignTo(this, Phaser.RIGHT_BOTTOM, 3);


            this.game.time.events.add(500, this.updateTextPos.bind(this), this);
            this.game.time.events.add(1000, this.updateTextPos.bind(this), this);

            this.descricaoString = Kodo[buildingName].nome + "\nHP: " + Kodo[buildingName].maxHP + 
                "\nArmor: " + Kodo[buildingName].maxArmor + "\nUnit Count: " + Kodo[buildingName].spamCount + "\nTraining Rate: " + Kodo[buildingName].spamRate;
            var style = {
                font: "Baloo Paaji", fill: 'white', wordWrap: false, align: "left"
            };
            this.descTexto = this.game.add.text(200, 100, this.descricaoString, style);
            this.descTexto.fontSize = 16;
            this.descTexto.alpha = 0.8;
            this.descTexto.anchor.setTo(0.5, 1);

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
        }
        updateTextPos() {
            this.goldCostText.x = Math.round(this.world.x - 50);
            this.goldCostText.y = Math.round(this.world.y - this.height/2+23);

            this.woodCostText.x = Math.round(this.world.x - 50);
            this.woodCostText.y = Math.round(this.world.y + this.height/2-23);
        }
        onOver() {
            this.descricaoBox.x = this.world.x;
            this.descricaoBox.y = this.world.y - this.height / 2;

            this.descTexto.alignIn(this.descricaoBox, Phaser.TOP_LEFT);
            this.descTexto.x += 10;
            this.descTexto.y += 10;

            this.descricaoBox.visible = true;
            this.descTexto.visible = true;
        }
        onOut() {
            this.descricaoBox.visible = false;
            this.descTexto.visible = false;
        }
    }
}