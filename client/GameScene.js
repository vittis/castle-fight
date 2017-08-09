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
            _this.player = { incomeRate: 1, incomeRateCounter: 0, gold: 0, wood: 0, income: 10 };
            _this.ballData = { spamRate: 1, spamRateCounter: 0 };
            return _this;
        }
        GameScene.prototype.create = function () {
            GameScene.instance = this;
            this.game.stage.backgroundColor = '#29B865';
            this.isHost = GameConfig.isHost;
            var uiArea = this.isHost ? GameConfig.uiWidth : 0;
            for (var i = 0; i < GameConfig.GRID_ROWS; i++) {
                this.grid[i] = [];
                for (var j = 0; j < GameConfig.GRID_COLS; j++) {
                    this.grid[i][j] = new Kodo.Tile(j * GameConfig.tileSize + uiArea, i * GameConfig.tileSize, i, j);
                    /* if((i >= 6 && i <= 9) && (j >= 8 && j <= 22)){ //para 16x31
                        this.game.add.sprite(j * GameConfig.tileSize + uiArea, i * GameConfig.tileSize, 'arvore1');
                    } */
                }
            }
            this.game.add.sprite(0, 0, 'tileFundo');
            this.game.add.sprite(this.grid[6][8].x, this.grid[6][8].y, 'arvores');
            this.uiBuildingManager = new Kodo.UIBuildingManager(this.game);
            this.uiResourceManager = new Kodo.UIResourceManager(this.game);
            this.uiEntityManager = new Kodo.UIEntityManager(this.game);
            this.incomeBallBar = new Kodo.IncomeBallBar(this.game);
        };
        GameScene.prototype.update = function () {
            this.uiBuildingManager.update();
            this.uiEntityManager.update();
        };
        GameScene.prototype.render = function () {
            this.game.debug.text(this.game.time.fps + "", 2, 14, "#00ff00");
        };
        GameScene.prototype.updateEntities = function (newEntities) {
            var _this = this;
            this.uiResourceManager.updateResources(this.player.incomeRateCounter);
            this.incomeBallBar.updateCounter(this.ballData.spamRateCounter);
            this.uiBuildingManager.buildingsGroup.forEachAlive(function (item) {
                this.world.bringToTop(item.tudoGroup);
            }.bind(this), this);
            this.world.bringToTop(this.uiBuildingManager.buildingsGroup);
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
            this.uiEntityManager.updateText();
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
        GameScene.instance = null;
        return GameScene;
    }(Phaser.State));
    Kodo.GameScene = GameScene;
})(Kodo || (Kodo = {}));
