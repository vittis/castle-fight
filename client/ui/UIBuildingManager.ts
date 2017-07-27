module Kodo {
    export class UIBuildingManager {

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


            /*var barracksui = game.add.button(0, 0, 'barracks_ui_'+hostLabel, null, this, 1, 0, 2);
            barracksui.data.previewName = 'barracks'+hostLabel;
            barracksui.data.buildingName = 'Barracks';
            this.buildingsGroup.add(barracksui);

            var archeryRangeui = game.add.button(0, 0, 'archeryRange_ui_'+hostLabel, null, this, 1, 0, 2);
            archeryRangeui.data.previewName = 'archeryRange' + hostLabel;
            archeryRangeui.data.buildingName = 'ArcheryRange';
            this.buildingsGroup.add(archeryRangeui);*/
            var barracksui = new UIBuildingButton(game, 'barracks_ui_'+hostLabel, this, 'barracks'+hostLabel, 'Barracks');
            this.buildingsGroup.add(barracksui);

            var archeryRangeui = new UIBuildingButton(game, 'archeryRange_ui_' + hostLabel, this, 'archeryRange' + hostLabel, 'ArcheryRange');
            this.buildingsGroup.add(archeryRangeui);

            this.buildingsGroup.align(2, 1, 120, 0);
            

            var offsetX = GameConfig.isHost ? 0 : GameConfig.tileSize * GameConfig.GRID_COLS;
            this.buildingsGroup.x = 650;
            this.buildingsGroup.y = game.height - GameConfig.uiHeight / 2;
            this.buildingsGroup.setAll('anchor.x', 0.5);
            this.buildingsGroup.setAll('anchor.y', 0.5);

            this.buildingsGroup.onChildInputOver.add(this.onHover.bind(this), this);
            this.buildingsGroup.onChildInputDown.add(this.onDown.bind(this), this);
            this.buildingsGroup.onChildInputUp.add(this.onUp.bind(this), this);
            this.buildingsGroup.onChildInputOut.add(this.onOut.bind(this), this);

            this.preview = game.add.sprite(0, 0, null);
            this.preview.alpha = 0.8;
            this.preview.visible = false;
        }
        onHover(sprite: UIBuildingButton) {
            sprite.onOver();
        }

        onDown(sprite : UIBuildingButton) {
            this.inputDown = true;
            this.preview.loadTexture(sprite.previewName);
        }
        onOut(sprite: UIBuildingButton) {
            if (this.inputDown) {
                this.buildingSelected = true;
                this.preview.visible = true;
            }
            sprite.onOut();
        }

        onUp(sprite: UIBuildingButton) {
            this.buildingSelected = false;
            
            this.inputDown = false;

            var row = Math.floor(this.game.input.activePointer.y / GameConfig.tileSize);
            var col = Math.floor(this.game.input.activePointer.x / GameConfig.tileSize);

            var canBuild = true;

            if (row >= GameConfig.GRID_ROWS - 1) {
                canBuild = false;
            }
            if (col > GameConfig.GRID_COLS - 1) {
                canBuild = false;
            }
            if (canBuild) {
                for (var i = 0; i < 2; i++) {
                    for (var j = 0; j < 2; j++) {
                        if (Kodo.GameScene.instance.grid[row + j][col + i].entity != null) {
                            canBuild = false;
                        }
                    }
                }
            }

            for (var i = 0; i < GameConfig.GRID_ROWS; i++) {
                for (var j = 0; j < GameConfig.GRID_COLS; j++) {
                    Kodo.GameScene.instance.grid[i][j].tint = 0xFFFFFF;
                }
            }

            if (row < GameConfig.GRID_ROWS-1 && row >=0 && col < GameConfig.GRID_COLS-1) {
                if (canBuild) {
                    if (GameConfig.isHost) {
                        if (col < 6) {
                            Client.askBuild(row, col, sprite.buildingName);
                       }
                    }
                    else {
                        if (col > GameConfig.GRID_COLS - 7) {
                            Client.askBuild(row, col, sprite.buildingName);
                        }
                    }
                }
                else {
                    console.log("ja tem uma entidade aqui!!");
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
                this.preview.y = Math.floor(this.game.input.activePointer.y / GameConfig.tileSize) * GameConfig.tileSize;


                if (GameConfig.isHost) {
                    for (var i = 0; i < GameConfig.GRID_ROWS; i++) {
                        for (var j = 0; j < GameConfig.GRID_COLS; j++) {
                            if (j < 6) {
                                if (Kodo.GameScene.instance.grid[i][j].entity == null)
                                    Kodo.GameScene.instance.grid[i][j].tint = 0xc9e5d4;
                                else 
                                    Kodo.GameScene.instance.grid[i][j].tint = 0xFFFFFF;
                            }
                        }
                    }
                }
                else {
                    for (var i = 0; i < GameConfig.GRID_ROWS; i++) {
                        for (var j = 0; j < GameConfig.GRID_COLS; j++) {
                            if (j > GameConfig.GRID_COLS - 7) {
                                if (Kodo.GameScene.instance.grid[i][j].entity == null)
                                    Kodo.GameScene.instance.grid[i][j].tint = 0xc9e5d4;
                                else
                                    Kodo.GameScene.instance.grid[i][j].tint = 0xFFFFFF;
                            }
                        }
                    }
                }



            }
        }

    }
}