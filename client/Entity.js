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
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity(game, tile, id, isHost, texture, data) {
            var _this = _super.call(this, game, tile.x, tile.y, texture) || this;
            _this.id = id;
            _this.dataq = data;
            _this.isHost = isHost;
            var row = tile.row;
            var col = tile.col;
            _this.tile = tile;
            for (var i = 0; i < _this.dataq.width; i++) {
                for (var j = 0; j < _this.dataq.height; j++) {
                    Kodo.GameScene.instance.grid[row + j][col + i].entity = _this;
                }
            }
            _this.armorBar = new Kodo.ArmorBarSmooth(_this.game, _this);
            _this.hpBar = new Kodo.HealthBarSmooth(_this.game, _this);
            _this.barGroup = _this.game.add.group();
            _this.barGroup.add(_this.hpBar);
            _this.barGroup.add(_this.armorBar);
            _this.inputEnabled = true;
            _this.input.useHandCursor = true;
            _this.events.onInputOver.add(_this.onOver.bind(_this), _this);
            _this.events.onInputOut.add(_this.onOut.bind(_this), _this);
            _this.fade = _this.game.add.tween(_this).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None);
            _this.fade.onComplete.add(function destroyMe() {
                this.destroy();
            }, _this);
            game.add.existing(_this);
            return _this;
        }
        Entity.prototype.onOver = function () {
            this.hpBar.visible = true;
            if (this.dataq.maxArmor > 0)
                this.armorBar.visible = true;
        };
        Entity.prototype.onOut = function () {
            this.hpBar.visible = false;
            this.armorBar.visible = false;
        };
        Entity.prototype.updateStep = function (newData, tile) {
            if (newData.hp < this.dataq.hp || newData.armor < this.dataq.armor) {
                this.armorBar.receiveDamage(newData.armor);
                this.hpBar.receiveDamage(newData.hp);
                if (this.hpBar.lenght < this.armorBar.lenght)
                    this.barGroup.moveUp(this.armorBar);
                else
                    this.barGroup.moveUp(this.hpBar);
                this.dataq = newData;
                this.receiveDamage();
            }
            else {
                if (newData.statusData.stunned) {
                    this.tint = 0xbedbff;
                }
                else {
                    this.resetColor();
                }
                this.dataq = newData;
            }
        };
        Entity.prototype.receiveDamage = function () {
            this.tint = 0xff3030;
            this.game.time.events.add(200, this.resetColor.bind(this), this);
        };
        Entity.prototype.resetColor = function () {
            if (!this.dataq.statusData.stunned) {
                this.tint = 0xFFFFFF;
            }
            else {
                this.tint = 0xbedbff;
            }
        };
        Entity.prototype.onDeath = function () {
            for (var i = 0; i < this.dataq.width; i++) {
                for (var j = 0; j < this.dataq.height; j++) {
                    Kodo.GameScene.instance.grid[this.tile.row + j][this.tile.col + i].entity = null;
                }
            }
            this.armorBar.destroy();
            this.hpBar.destroy();
            this.fade.start();
            if (Kodo.GameScene.instance.uiEntityManager.target == this) {
                Kodo.GameScene.instance.uiEntityManager.target = null;
                if (this instanceof Kodo.SpamBuilding) {
                    if (Kodo.GameScene.instance.uiEntityManager.isShowing) {
                        Kodo.GameScene.instance.uiEntityManager.tileMark.destroy();
                        Kodo.GameScene.instance.uiEntityManager.tileClickArray.forEach(function (t) {
                            t.visible = false;
                        });
                    }
                    Kodo.GameScene.instance.uiEntityManager.trainButton.visible = false;
                }
                Kodo.GameScene.instance.uiEntityManager.isShowing = false;
                Kodo.GameScene.instance.uiEntityManager.boxGroup.removeAll();
            }
        };
        return Entity;
    }(Phaser.Sprite));
    Kodo.Entity = Entity;
})(Kodo || (Kodo = {}));
