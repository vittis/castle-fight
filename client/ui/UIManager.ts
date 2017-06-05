module Kodo {
    export class UIManager {

        buildingsGroup : Phaser.Group;

        buildingSelected : boolean = false;

        game : Phaser.Game;

        preview : Phaser.Sprite;

        inputDown : boolean = false;

        constructor(game : Phaser.Game) {
            this.game = game;

            this.buildingsGroup = game.add.group();
            this.buildingsGroup.inputEnableChildren = true;

            var hostLabel = GameConfig.isHost ? 'h' : 'c'


            var barracksui = game.add.button(game.width / 2 - 72 / 2, game.height - 100, 'barracks_ui_'+hostLabel, null, this, 1, 0, 2);
            barracksui.data.previewName = 'barracks'+hostLabel;
            barracksui.data.buildingName = 'Barracks';
            this.buildingsGroup.add(barracksui);

            var archeryRangeui = game.add.button(game.width / 2 - 72 / 2, game.height - 100, 'archeryRange_ui_'+hostLabel, null, this, 1, 0, 2);
            archeryRangeui.data.previewName = 'archeryRange' + hostLabel;
            archeryRangeui.data.buildingName = 'ArcheryRange';
            this.buildingsGroup.add(archeryRangeui);



            this.buildingsGroup.align(2, 1, 85, 48);

            this.buildingsGroup.x = game.width / 2 - 72;
            this.buildingsGroup.y = game.height - 100;


            this.buildingsGroup.onChildInputDown.add(this.onDown.bind(this), this);
            this.buildingsGroup.onChildInputUp.add(this.onUp.bind(this), this);
            this.buildingsGroup.onChildInputOut.add(this.onOut.bind(this), this);

            this.preview = game.add.sprite(0, 0, null);
            this.preview.alpha = 0.8;
            this.preview.visible = false;
        }
        onDown(sprite) {
            this.inputDown = true;
            this.preview.loadTexture(sprite.data.previewName);
        }
        onOut(sprite) {
            if (this.inputDown) {
                this.buildingSelected = true;
                this.preview.visible = true;
            }
        }

        onUp(sprite) {
            this.buildingSelected = false;
            
            this.inputDown = false;

            var row = Math.floor(this.game.input.activePointer.y / GameConfig.tileSize);
            var col = Math.floor(this.game.input.activePointer.x / GameConfig.tileSize);

            if (row < GameConfig.GRID_ROWS-1 && col < GameConfig.GRID_COLS-1) {
                if (Kodo.GameScene.instance.grid[row][col].entity == null) {
                    Client.askBuild(row, col, sprite.data.buildingName);
                }
            }
            else {
                console.log("n pode construir aqui");
            }
            this.game.time.events.add(500, this.hidePreview.bind(this), this);
        }   
        hidePreview() {
            this.preview.visible = false;
        }
        update() {
            if (this.buildingSelected) {
                this.preview.x = Math.floor(this.game.input.activePointer.x / GameConfig.tileSize) * GameConfig.tileSize;
                this.preview.y = Math.floor(this.game.input.activePointer.y / GameConfig.tileSize) * GameConfig.tileSize;;
            }
        }

    }
}