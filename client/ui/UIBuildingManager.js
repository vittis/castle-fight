var Kodo;
(function (Kodo) {
    var UIBuildingManager = (function () {
        function UIBuildingManager(game) {
            var _this = this;
            this.buildingSelected = false;
            this.inputDown = false;
            this.inputOver = false;
            this.isUnit = false;
            this.clickedHotkey = false;
            this.hotKeySprite = { buildingName: "0", isUnit: false };
            this.game = game;
            this.buildingsGroup = game.add.group();
            this.buildingsGroup.inputEnableChildren = true;
            var hostLabel = GameConfig.isHost ? 'h' : 'c';
            GameConfig.deck.forEach(function (name) {
                var isUnit = (GameConfig.unitNameData.indexOf(name) >= 0);
                _this.buildingsGroup.add(new Kodo.UIBuildingButton(game, name[0].toLowerCase() + name.slice(1) + "_ui_" + hostLabel, _this, name[0].toLowerCase() + name.slice(1) + "" + hostLabel, name, isUnit));
            });
            this.buildingsGroup.align(8, 1, 114, 0);
            this.buildingsGroup.x = 640;
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
            var key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
            key1.onDown.add(this.onDownNumber.bind(this), this);
            var key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
            key2.onDown.add(this.onDownNumber.bind(this), this);
            var key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
            key3.onDown.add(this.onDownNumber.bind(this), this);
            var key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
            key4.onDown.add(this.onDownNumber.bind(this), this);
            var key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
            key5.onDown.add(this.onDownNumber.bind(this), this);
            var key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
            key6.onDown.add(this.onDownNumber.bind(this), this);
            var key7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
            key7.onDown.add(this.onDownNumber.bind(this), this);
            var key8 = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
            key8.onDown.add(this.onDownNumber.bind(this), this);
        }
        UIBuildingManager.prototype.onDownNumber = function (param) {
            var hostLabel = GameConfig.isHost ? 'h' : 'c';
            var number;
            if (param.keyCode == Phaser.Keyboard.ONE) {
                number = 0;
            }
            if (param.keyCode == Phaser.Keyboard.TWO) {
                number = 1;
            }
            if (param.keyCode == Phaser.Keyboard.THREE) {
                number = 2;
            }
            if (param.keyCode == Phaser.Keyboard.FOUR) {
                number = 3;
            }
            if (param.keyCode == Phaser.Keyboard.FIVE) {
                number = 4;
            }
            if (param.keyCode == Phaser.Keyboard.SIX) {
                number = 5;
            }
            if (param.keyCode == Phaser.Keyboard.SEVEN) {
                number = 6;
            }
            if (param.keyCode == Phaser.Keyboard.EIGHT) {
                number = 7;
            }
            this.buildingSelected = true;
            this.isUnit = GameConfig.buildingNameData.indexOf(GameConfig.deck[number]) == -1 ? true : false;
            this.preview.loadTexture(GameConfig.deck[number][0].toLowerCase() + GameConfig.deck[number].slice(1) + "" + hostLabel);
            this.preview.visible = true;
            this.buildArea.visible = true;
            this.game.world.bringToTop(this.preview);
            this.clickedHotkey = true;
            this.hotKeySprite = { buildingName: GameConfig.deck[number], isUnit: this.isUnit };
        };
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
                this.isUnit = sprite.isUnit;
                this.preview.visible = true;
                this.buildArea.visible = true;
                this.game.world.bringToTop(this.preview);
            }
            sprite.onOut();
        };
        UIBuildingManager.prototype.onUp = function (sprite) {
            this.inputDown = false;
            this.buildingSelected = false;
            var hasBuilt = false;
            if (!this.inputOver) {
                var row = Math.floor(this.game.input.activePointer.y / GameConfig.tileSize);
                var col = Math.floor(this.game.input.activePointer.x / GameConfig.tileSize);
                var canBuild = true;
                if (!sprite.isUnit) {
                    if (row >= GameConfig.GRID_ROWS - 1) {
                        console.log("tenta de nv otario");
                        canBuild = false;
                    }
                    if (col > GameConfig.GRID_COLS - 2) {
                        canBuild = false;
                        console.log("n opode porra");
                    }
                    if (canBuild) {
                        for (var i = 0; i < 2; i++) {
                            for (var j = 0; j < 2; j++) {
                                if (Kodo.GameScene.instance.grid[row + j][col + i].entity != null) {
                                    canBuild = false;
                                    console.log("vai da n monstrao");
                                }
                            }
                        }
                    }
                    this.buildArea.visible = false;
                    if (row < GameConfig.GRID_ROWS - 1 && row >= 0 && col < GameConfig.GRID_COLS - 1) {
                        if (canBuild) {
                            if (GameConfig.isHost) {
                                if (col < 5) {
                                    Client.askBuild(row, col, sprite.buildingName, sprite.isUnit);
                                    hasBuilt = true;
                                }
                            }
                            else {
                                if (col > GameConfig.GRID_COLS - 7) {
                                    Client.askBuild(row, col, sprite.buildingName, sprite.isUnit);
                                    hasBuilt = true;
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
                }
                else {
                    if (row > GameConfig.GRID_ROWS - 1) {
                        canBuild = false;
                    }
                    if (col > GameConfig.GRID_COLS - 1) {
                        canBuild = false;
                    }
                    if (canBuild) {
                        if (Kodo.GameScene.instance.grid[row][col].entity != null) {
                            canBuild = false;
                        }
                    }
                    this.buildArea.visible = false;
                    if (row <= GameConfig.GRID_ROWS - 1 && row >= 0 && col <= GameConfig.GRID_COLS - 1) {
                        if (canBuild) {
                            if (GameConfig.isHost) {
                                if (col < 6) {
                                    Client.askBuild(row, col, sprite.buildingName, sprite.isUnit);
                                    hasBuilt = true;
                                }
                            }
                            else {
                                if (col > GameConfig.GRID_COLS - 7) {
                                    Client.askBuild(row, col, sprite.buildingName, sprite.isUnit);
                                    hasBuilt = true;
                                }
                            }
                        }
                        else {
                            console.log("ja tem uma entidade aqui!! UNIT");
                        }
                    }
                    else {
                        console.log("n pode construir aqui UNIT");
                    }
                }
                this.preview.visible = false;
                if (hasBuilt) {
                    var sp = this.game.add.sprite(this.preview.x, this.preview.y, this.preview.key);
                    sp.alpha = 0.8;
                    this.game.time.events.add(1000, function (sp) { sp.destroy(); }, this, sp);
                }
            }
        };
        UIBuildingManager.prototype.tintBuyable = function (gold, wood) {
            this.buildingsGroup.forEach(function (b) {
                if (Kodo[b.buildingName].goldCost > gold || Kodo[b.buildingName].woodCost > wood) {
                    if (b.tint != 0x906666)
                        b.tint = 0x906666;
                }
                else {
                    if (b.tint != 0xffffff)
                        b.tint = 0xffffff;
                }
            }.bind(this), this);
        };
        UIBuildingManager.prototype.update = function () {
            if (this.game.input.activePointer.isDown) {
                var clicouNaBuilding_1 = false;
                var taMostrando_1 = false;
                this.buildingsGroup.forEach(function (b) {
                    if (b.getBounds().contains(this.game.input.x, this.game.input.y)) {
                        clicouNaBuilding_1 = true;
                    }
                    if (b.over)
                        taMostrando_1 = true;
                }.bind(this), this);
                if (!clicouNaBuilding_1 && taMostrando_1) {
                    this.buildingsGroup.forEach(function (b) {
                        if (b.over) {
                            b.input.stop();
                            b.onOut();
                            b.input.start(1, true);
                        }
                    }.bind(this), this);
                }
                if (this.clickedHotkey) {
                    this.onUp(this.hotKeySprite);
                    this.clickedHotkey = false;
                }
            }
            if (this.buildingSelected) {
                var row = Math.floor(this.game.input.activePointer.y / GameConfig.tileSize);
                var col = Math.floor(this.game.input.activePointer.x / GameConfig.tileSize);
                this.preview.x = col * GameConfig.tileSize;
                this.preview.y = row * GameConfig.tileSize;
                if (row <= GameConfig.GRID_ROWS - 1 && col <= GameConfig.GRID_COLS - 1) {
                    var paint = false;
                    if (!this.isUnit) {
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
                    }
                    else {
                        if (col > 5 && col < GameConfig.GRID_COLS - 6) {
                            paint = true;
                        }
                        else if (Kodo.GameScene.instance.grid[row][col].entity != null) {
                            paint = true;
                        }
                        else {
                            paint = false;
                        }
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
