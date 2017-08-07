var Kodo;
(function (Kodo) {
    var UIBuildingManager = (function () {
        function UIBuildingManager(game) {
            this.buildingSelected = false;
            this.inputDown = false;
            this.inputOver = false;
            this.game = game;
            this.buildingsGroup = game.add.group();
            this.buildingsGroup.inputEnableChildren = true;
            var hostLabel = GameConfig.isHost ? 'h' : 'c';
            /*var barracksui = game.add.button(0, 0, 'barracks_ui_'+hostLabel, null, this, 1, 0, 2);
            barracksui.data.previewName = 'barracks'+hostLabel;
            barracksui.data.buildingName = 'Barracks';
            this.buildingsGroup.add(barracksui);

            var archeryRangeui = game.add.button(0, 0, 'archeryRange_ui_'+hostLabel, null, this, 1, 0, 2);
            archeryRangeui.data.previewName = 'archeryRange' + hostLabel;
            archeryRangeui.data.buildingName = 'ArcheryRange';
            this.buildingsGroup.add(archeryRangeui);*/
            var barracksui = new Kodo.UIBuildingButton(game, 'barracks_ui_' + hostLabel, this, 'barracks' + hostLabel, 'Barracks');
            this.buildingsGroup.add(barracksui);
            var archeryRangeui = new Kodo.UIBuildingButton(game, 'archeryRange_ui_' + hostLabel, this, 'archeryRange' + hostLabel, 'ArcheryRange');
            this.buildingsGroup.add(archeryRangeui);
            var barnui = new Kodo.UIBuildingButton(game, 'barn_ui_' + hostLabel, this, 'barn' + hostLabel, 'Barn');
            this.buildingsGroup.add(barnui);
            var thiefsTentui = new Kodo.UIBuildingButton(game, 'thiefsTent_ui_' + hostLabel, this, 'thiefsTent' + hostLabel, 'ThiefsTent');
            this.buildingsGroup.add(thiefsTentui);
            var storageBarnui = new Kodo.UIBuildingButton(game, 'storageBarn_ui_' + hostLabel, this, 'storageBarn' + hostLabel, 'StorageBarn');
            this.buildingsGroup.add(storageBarnui);
            var specialFacilityui = new Kodo.UIBuildingButton(game, 'specialFacility_ui_' + hostLabel, this, 'specialFacility' + hostLabel, 'SpecialFacility');
            this.buildingsGroup.add(specialFacilityui);
            var kingsCourtui = new Kodo.UIBuildingButton(game, 'kingsCourt_ui_' + hostLabel, this, 'kingsCourt' + hostLabel, 'KingsCourt');
            this.buildingsGroup.add(kingsCourtui);
            this.buildingsGroup.align(7, 1, 105, 0);
            var offsetX = GameConfig.isHost ? 0 : GameConfig.tileSize * GameConfig.GRID_COLS;
            this.buildingsGroup.x = 650;
            this.buildingsGroup.y = game.height - GameConfig.uiHeight / 2;
            this.buildingsGroup.setAll('anchor.x', 0.5);
            this.buildingsGroup.setAll('anchor.y', 0.5);
            this.buildingsGroup.onChildInputOver.add(this.onHover.bind(this), this);
            this.buildingsGroup.onChildInputDown.add(this.onDown.bind(this), this);
            this.buildingsGroup.onChildInputUp.add(this.onUp.bind(this), this);
            this.buildingsGroup.onChildInputOut.add(this.onOut.bind(this), this);
            /* this.buildingsGroup.onChildInputOver.add(this.onHover.bind(this), this);
            this.buildingsGroup.onChildInputDown.add(this.onDown.bind(this), this);
            this.buildingsGroup.onChildInputUp.add(this.onUp.bind(this), this);
            this.buildingsGroup.onChildInputOut.add(this.onUp.bind(this), this); */
            this.preview = game.add.sprite(0, 0, null);
            this.preview.alpha = 0.8;
            this.preview.visible = false;
        }
        UIBuildingManager.prototype.onHover = function (sprite) {
            this.inputOver = true;
            sprite.onOver();
        };
        UIBuildingManager.prototype.onDown = function (sprite) {
            sprite.onDown();
            this.inputDown = true;
            this.preview.loadTexture(sprite.previewName);
        };
        UIBuildingManager.prototype.onOut = function (sprite) {
            this.inputOver = false;
            if (this.inputDown) {
                this.buildingSelected = true;
                this.preview.visible = true;
            }
            sprite.onOut();
        };
        UIBuildingManager.prototype.onUp = function (sprite) {
            this.inputDown = false;
            this.buildingSelected = false;
            if (!this.inputOver) {
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
                if (row < GameConfig.GRID_ROWS - 1 && row >= 0 && col < GameConfig.GRID_COLS - 1) {
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
        };
        UIBuildingManager.prototype.hidePreview = function () {
            this.preview.visible = false;
        };
        UIBuildingManager.prototype.update = function () {
            if (this.game.input.activePointer.isDown) {
                var clicouNaBuilding = false;
                var taMostrando = false;
                this.buildingsGroup.forEach(function (b) {
                    if (b.getBounds().contains(this.game.input.x, this.game.input.y)) {
                        clicouNaBuilding = true;
                    }
                    if (b.over)
                        taMostrando = true;
                }.bind(this), this);
                if (!clicouNaBuilding && taMostrando) {
                    console.log("qqq");
                    this.buildingsGroup.forEach(function (b) {
                        if (b.over) {
                            b.input.stop();
                            b.onOut();
                            b.input.start(1, true);
                        }
                    }.bind(this), this);
                }
            }
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
        };
        return UIBuildingManager;
    }());
    Kodo.UIBuildingManager = UIBuildingManager;
})(Kodo || (Kodo = {}));
