var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Kodo;
(function (Kodo) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.grid = [];
            _this.entities = [];
            _this.player = { incomeRate: 1, incomeRateCounter: 0, gold: 150, wood: 0, income: 10, updateRateCounter: 0, updateRate: 1, updateCount: 0 };
            _this.ballData = { spamRate: 1, spamRateCounter: 0, hostMatou: false, clientMatou: false, reward: 0 };
            _this.stateCache = [];
            _this.watchCount = 0;
            return _this;
        }
        GameScene.prototype.create = function () {
            GameScene.instance = this;
            this.entities = [];
            this.stateCache = [];
            this.grid = [];
            this.player = { incomeRate: 1, incomeRateCounter: 0, gold: 150, wood: 0, income: 10, updateRateCounter: 0, updateRate: 1, updateCount: 0 };
            this.ballData = { spamRate: 1, spamRateCounter: 0, hostMatou: false, clientMatou: false, reward: 0 };
            this.game.stage.backgroundColor = '#29B865';
            this.isHost = GameConfig.isHost;
            for (var i = 0; i < GameConfig.GRID_ROWS; i++) {
                this.grid[i] = [];
                for (var j = 0; j < GameConfig.GRID_COLS; j++) {
                    this.grid[i][j] = new Kodo.Tile(j * GameConfig.tileSize, i * GameConfig.tileSize, i, j);
                }
            }
            this.game.add.sprite(0, 0, 'tileFundo');
            this.game.add.sprite(this.grid[6][8].x, this.grid[6][8].y, 'arvores');
            var style = { font: "13px Baloo Paaji", fill: 'white' };
            if (this.isHost != null) {
                var surrenderLabel = this.game.add.text(293, this.game.height - 9, "Surrender", style);
                surrenderLabel.anchor.setTo(0, 0.5);
                style = { font: "12px Lucida Console", fill: 'white' };
                var box = this.game.make.graphics(0, 0);
                box.beginFill(0x000000);
                box.drawRoundedRect(0, 0, surrenderLabel.width + 3, surrenderLabel.height, 5);
                box.endFill();
                var loadingRect = this.game.add.sprite(0, 0, box.generateTexture());
                box.destroy();
                loadingRect.anchor.setTo(0.5, 0.5);
                loadingRect.alignIn(surrenderLabel, Phaser.CENTER);
                loadingRect.alpha = 0.6;
                loadingRect.y -= 3;
                this.game.world.swap(surrenderLabel, loadingRect);
                surrenderLabel.inputEnabled = true;
                surrenderLabel.input.useHandCursor = true;
                surrenderLabel.events.onInputDown.add(Client.askSurrender, this);
                this.uiBuildingManager = new Kodo.UIBuildingManager(this.game);
                this.uiResourceManager = new Kodo.UIResourceManager(this.game);
                this.updateManager = new Kodo.UpdateManager(this.game);
                this.uiResourceManager.startGame();
            }
            if (this.isHost == null) {
                var style_1 = { font: "20px Baloo Paaji", fill: 'white' };
                var surrenderLabel_1 = this.game.add.text(this.game.world.centerX, this.game.height - 30, "Back to Menu", style_1);
                surrenderLabel_1.anchor.setTo(0.5, 0.5);
                var box = this.game.make.graphics(0, 0);
                box.beginFill(0x000000);
                box.drawRoundedRect(0, 0, surrenderLabel_1.width + 8, surrenderLabel_1.height + 8, 5);
                box.endFill();
                var loadingRect = this.game.add.sprite(0, 0, box.generateTexture());
                box.destroy();
                loadingRect.anchor.setTo(0.5, 0.5);
                loadingRect.alignIn(surrenderLabel_1, Phaser.CENTER);
                loadingRect.alpha = 0.6;
                loadingRect.y -= 3;
                this.game.world.swap(surrenderLabel_1, loadingRect);
                surrenderLabel_1.inputEnabled = true;
                surrenderLabel_1.input.useHandCursor = true;
                surrenderLabel_1.events.onInputDown.add(function () {
                    Client.askCancelWatch();
                    this.game.time.events.remove(this.mainLoop);
                    this.game.state.start('MainMenu', true, false);
                }.bind(this), this);
                this.uiSpectatorManager = new Kodo.UISpectatorManager(this.game);
            }
            this.uiEntityManager = new Kodo.UIEntityManager(this.game);
            this.incomeBallBar = new Kodo.IncomeBallBar(this.game);
            style = { font: "14px Lucida Console", fill: 'white' };
            var yourNickLabel;
            if (this.isHost != null) {
                yourNickLabel = this.game.add.text(0, 0, GameConfig.yourNick, style);
                yourNickLabel.stroke = '#E27952';
                yourNickLabel.strokeThickness = 4;
                if (!GameConfig.isHost) {
                    yourNickLabel.x = this.game.width - yourNickLabel.width;
                    yourNickLabel.stroke = '#0D6032';
                    yourNickLabel.strokeThickness = 4;
                }
                var opponentNick = this.game.add.text(0, 0, GameConfig.opponentNick, style);
                opponentNick.stroke = '#E27952';
                opponentNick.strokeThickness = 4;
                if (GameConfig.isHost) {
                    opponentNick.x = this.game.width - opponentNick.width;
                    opponentNick.stroke = '#0D6032';
                    opponentNick.strokeThickness = 4;
                }
            }
            else {
                yourNickLabel = this.game.add.text(0, 0, GameConfig.hostNick, style);
                yourNickLabel.stroke = '#E27952';
                yourNickLabel.strokeThickness = 4;
                var opponentNick_1 = this.game.add.text(0, 0, GameConfig.clientNick, style);
                opponentNick_1.stroke = '#E27952';
                opponentNick_1.strokeThickness = 4;
                if (true) {
                    opponentNick_1.x = this.game.width - opponentNick_1.width;
                    opponentNick_1.stroke = '#0D6032';
                    opponentNick_1.strokeThickness = 4;
                }
            }
            style.font = '13px Baloo Paaji';
            style.fill = '#ffffff';
            this.watchCountLabel = this.game.add.text(0, 0, '0', style);
            this.watchCountLabel.anchor.setTo(0.5, 0.5);
            if (GameConfig.isHost) {
                this.watchCountLabel.alignTo(yourNickLabel, Phaser.RIGHT_CENTER, 23, 0);
            }
            else if (GameConfig.isHost == false) {
                this.watchCountLabel.alignTo(yourNickLabel, Phaser.LEFT_CENTER, 5, 0);
            }
            else {
                this.watchCountLabel.alignTo(yourNickLabel, Phaser.RIGHT_CENTER, 23, 0);
            }
            var eyeSprite = this.game.add.sprite(0, 0, 'eye');
            this.watchCountLabel.addChild(eyeSprite);
            eyeSprite.x -= 15;
            eyeSprite.y -= 2;
            eyeSprite.anchor.setTo(0.5, 0.5);
            eyeSprite.tint = 0xffffff;
            this.mainLoop = this.game.time.events.loop(720, this.loopCache.bind(this), this);
            HtmlUI.isShowingIngameChat = false;
            var enterKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
            enterKey.onDown.add(HtmlUI.hideShowChat, this);
            var scapeKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ESC);
            scapeKey.onDown.add(HtmlUI.hideChat, this);
        };
        GameScene.prototype.updateEntities = function (newEntities) {
            if (this.stateCache.length == 0) {
                this.stateCache.push(newEntities);
            }
        };
        GameScene.prototype.loopCache = function () {
            if (this.stateCache.length > 0) {
                this.executeUpdateEntities(this.stateCache[0]);
                this.stateCache.splice(0, 1);
            }
        };
        GameScene.prototype.executeUpdateEntities = function (newEntities) {
            var _this = this;
            if (this.watchCountLabel.text != "" + this.watchCount)
                this.watchCountLabel.text = "" + this.watchCount;
            if (this.isHost != null) {
                this.uiResourceManager.updateResources(this.player.incomeRateCounter);
                this.incomeBallBar.updateCounter(this.ballData.spamRateCounter);
                this.uiBuildingManager.tintBuyable(this.player.gold, this.player.wood);
                this.updateManager.updateCounter(this.player.updateRateCounter);
                if (this.updateManager.uIUpdateButton.allGroup.visible) {
                    this.world.bringToTop(this.updateManager.uIUpdateButton.allGroup);
                    this.updateManager.uIUpdateButton.updateText();
                }
                this.uiBuildingManager.buildingsGroup.forEachAlive(function (item) {
                    this.world.bringToTop(item.tudoGroup);
                }.bind(this), this);
                this.world.bringToTop(this.uiBuildingManager.buildingsGroup);
            }
            else {
                this.uiSpectatorManager.updateResources(this.player);
                this.incomeBallBar.updateCounter(this.ballData.spamRateCounter);
            }
            newEntities.forEach(function (newEntity) {
                var entityID = newEntity.id;
                if (_this.idExists(entityID)) {
                    _this.getEntityById(entityID).updateStep(newEntity.data, _this.grid[newEntity.row][newEntity.col]);
                }
                else {
                    _this.entities.push(new Kodo[newEntity.data.name](_this.game, _this.grid[newEntity.row][newEntity.col], entityID, newEntity.isHost, newEntity.data));
                }
            });
            this.cleanDeadEntities(newEntities);
            if (this.isHost != null) {
                this.uiEntityManager.updateText();
            }
        };
        GameScene.prototype.endGame = function (hostWon) {
            this.game.time.events.remove(this.mainLoop);
            var stringWon = hostWon == GameConfig.isHost ? "Victory!" : "Defeat! :(";
            var loadingLabel = this.game.add.text(this.game.world.centerX, this.game.world.centerY, stringWon, { font: "80px Baloo Paaji", fill: '#ffffff', wordWrap: false, align: "center" });
            loadingLabel.anchor.setTo(0.5, 0.5);
            var clickToBack = this.game.add.text(0, 50, "(click to back)", { font: "20px Baloo Paaji", fill: '#ffffff', wordWrap: false, align: "center" });
            clickToBack.anchor.setTo(0.5, 0.5);
            loadingLabel.addChild(clickToBack);
            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x000000);
            box.drawRoundedRect(0, 0, loadingLabel.width + 50, loadingLabel.height + 35, 30);
            box.endFill();
            var loadingRect = this.game.add.sprite(0, 0, box.generateTexture());
            box.destroy();
            loadingRect.anchor.setTo(0.5, 0.5);
            loadingRect.alignIn(loadingLabel, Phaser.CENTER);
            loadingRect.alpha = 0.6;
            var group = this.game.add.group();
            group.inputEnableChildren = true;
            loadingLabel.inputEnabled = true;
            loadingLabel.input.useHandCursor = true;
            loadingRect.inputEnabled = true;
            loadingRect.input.useHandCursor = true;
            group.add(loadingLabel);
            group.add(loadingRect);
            group.swap(loadingLabel, loadingRect);
            group.onChildInputDown.add(function (sp) { sp.game.state.start('MainMenu', true, false); }, this);
        };
        GameScene.prototype.update = function () {
            if (this.isHost != null) {
                this.uiBuildingManager.update();
                this.uiEntityManager.update();
                this.updateManager.update();
            }
        };
        GameScene.prototype.cleanDeadEntities = function (newEntities) {
            var idArray = [];
            newEntities.forEach(function (element) {
                idArray.push(element.id);
            });
            for (var i = 0; i < this.entities.length; i++) {
                if (idArray.indexOf(this.entities[i].id) == -1) {
                    this.entities[i].onDeath();
                    this.entities.splice(i, 1);
                }
            }
        };
        GameScene.prototype.idExists = function (id) {
            var jaExisteId = false;
            this.entities.forEach(function (e) {
                if (e.id == id) {
                    jaExisteId = true;
                }
            });
            return jaExisteId;
        };
        GameScene.prototype.getEntityById = function (id) {
            var entity = null;
            this.entities.forEach(function (e) {
                if (e.id == id) {
                    entity = e;
                }
            });
            return entity;
        };
        GameScene.prototype.getOuterTiles = function (building) {
            var tiles = [];
            for (var i = 0; i < building.dataq.width; i++) {
                for (var j = 0; j < building.dataq.height; j++) {
                    var currentTile = this.grid[building.tile.row + j][building.tile.col + i];
                    this.getNeighbors(currentTile).forEach(function (t) {
                        if (t.entity == null) {
                            if (tiles.indexOf(t) == -1)
                                tiles.push(t);
                        }
                    });
                }
            }
            return tiles;
        };
        GameScene.prototype.getNeighbors = function (tile) {
            var tiles = [];
            for (var dx = -1; dx <= 1; dx++) {
                for (var dy = -1; dy <= 1; dy++) {
                    if (dx != 0 || dy != 0) {
                        if (this.isValid(tile.row + dx, tile.col + dy)) {
                            tiles.push(this.grid[tile.row + dx][tile.col + dy]);
                        }
                    }
                }
            }
            return tiles;
        };
        GameScene.prototype.isValid = function (row, col) {
            if ((row >= 0 && row < GameConfig.GRID_ROWS) && (col >= 0 && col < GameConfig.GRID_COLS)) {
                return true;
            }
            return false;
        };
        GameScene.prototype.getSpamBuildings = function (fromHost) {
            var buildings = [];
            this.entities.forEach(function (e) {
                if (e instanceof Kodo.SpamBuilding && e.isHost == fromHost) {
                    buildings.push(e);
                }
            });
            return buildings;
        };
        GameScene.prototype.getEffectBuildings = function (fromHost) {
            var buildings = [];
            this.entities.forEach(function (e) {
                if (e instanceof Kodo.EffectBuilding && e.isHost == fromHost) {
                    buildings.push(e);
                }
            });
            return buildings;
        };
        GameScene.instance = null;
        return GameScene;
    }(Phaser.State));
    Kodo.GameScene = GameScene;
})(Kodo || (Kodo = {}));
