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
            this.buildingsGroup.align(7, 1, 110, 0);
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
            var posX = GameConfig.isHost ? 0 : (GameConfig.GRID_COLS - 6) * 48;
            var buildArea = game.make.graphics(0, 0);
            buildArea.beginFill(0x000000, 0.1);
            buildArea.drawRect(0, 0, 6 * 48, 16 * 48);
            buildArea.endFill();
            this.buildArea = game.add.sprite(posX, 0, buildArea.generateTexture());
            buildArea.destroy();
            this.buildArea.visible = false;
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
                this.buildArea.visible = true;
                this.game.world.bringToTop(this.preview);
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
                if (col > GameConfig.GRID_COLS - 2) {
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
                this.buildArea.visible = false;
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
                        //console.log("ja tem uma entidade aqui!!");
                    }
                }
                else {
                    //console.log("n pode construir aqui");
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
                var row = Math.floor(this.game.input.activePointer.y / GameConfig.tileSize);
                var col = Math.floor(this.game.input.activePointer.x / GameConfig.tileSize);
                this.preview.x = col * GameConfig.tileSize;
                this.preview.y = row * GameConfig.tileSize;
                if (row <= GameConfig.GRID_ROWS - 1 && col <= GameConfig.GRID_COLS - 1) {
                    var paint = false;
                    if (col > 4 && col < GameConfig.GRID_COLS - 6) {
                        paint = true;
                    }
                    else if (row + 1 >= GameConfig.GRID_ROWS || col + 1 >= GameConfig.GRID_COLS) {
                        paint = true;
                    }
                    else if (Kodo.GameScene.instance.grid[row][col].entity != null || Kodo.GameScene.instance.grid[row][col + 1].entity != null ||
                        Kodo.GameScene.instance.grid[row + 1][col].entity != null || Kodo.GameScene.instance.grid[row + 1][col + 1].entity != null) {
                        paint = true;
                    }
                    else if (col >= GameConfig.GRID_COLS - 1) {
                        paint = true;
                    }
                    else if (row >= GameConfig.GRID_ROWS - 1) {
                        paint = true;
                    }
                    else {
                        paint = false;
                    }
                    if (this.preview.tint == 0xffffff && paint) {
                        this.preview.tint = 0xff0000;
                    }
                    if (this.preview.tint == 0xff0000 && !paint) {
                        this.preview.tint = 0xffffff;
                    }
                }
            }
        };
        return UIBuildingManager;
    }());
    Kodo.UIBuildingManager = UIBuildingManager;
})(Kodo || (Kodo = {}));
