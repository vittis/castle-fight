module Kodo {
    export class UIBuildingButton extends Phaser.Button {


        previewName : string;
        buildingName : string;

        constructor(game, sprite : string, context, previewName, buildingName) {
            super(game, 0, 0, sprite, null, context, 1, 0, 2);

            this.previewName = previewName;
            this.buildingName = buildingName;
        }

    }
}