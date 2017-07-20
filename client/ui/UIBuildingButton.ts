module Kodo {
    export class UIBuildingButton extends Phaser.Button {

        previewName : string;
        buildingName : string;

        goldCostText : Phaser.Text;
        woodCostText: Phaser.Text;

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
        }
        updateTextPos() {
            this.goldCostText.x = Math.round(this.world.x - 50);
            this.goldCostText.y = Math.round(this.world.y - this.height/2+23);

            this.woodCostText.x = Math.round(this.world.x - 50);
            this.woodCostText.y = Math.round(this.world.y + this.height/2-23);
        }
    }
}