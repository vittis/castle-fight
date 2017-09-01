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
    var Unit = (function (_super) {
        __extends(Unit, _super);
        function Unit(game, tile, id, isHost, texture, data) {
            var _this = _super.call(this, game, tile, id, isHost, texture, data) || this;
            _this.shield = null;
            _this.events.onInputDown.add(Kodo.GameScene.instance.uiEntityManager.onDownUnit, _this);
            return _this;
        }
        Object.defineProperty(Unit.prototype, "data", {
            get: function () {
                return this.dataq;
            },
            enumerable: true,
            configurable: true
        });
        Unit.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        Unit.prototype.moveTo = function (tile) {
            this.tile.entity = null;
            this.tile = tile;
            this.tile.entity = this;
            this.game.add.tween(this).to({ x: tile.x, y: tile.y }, GameConfig.updateRate + 75, Phaser.Easing.Linear.None, true);
        };
        Unit.prototype.attack = function (tile) {
        };
        Unit.prototype.updateStep = function (newData, tile) {
            _super.prototype.updateStep.call(this, newData);
            if (tile != this.tile) {
                if (Phaser.Math.distance(this.x, this.y, tile.x, tile.y) > 1) {
                    this.moveTo(tile);
                }
            }
            if (this.data.attackData.hasAttacked) {
                this.attack(Kodo.GameScene.instance.grid[this.data.attackData.row][this.data.attackData.col]);
            }
            if (newData.statusData.shielded) {
                if (this.shield == null) {
                    this.shield = this.game.add.sprite(0, 0, 'shield');
                    this.shield.tint = this.isHost ? 0xe27952 : 0x1b914d;
                    this.addChild(this.shield);
                }
            }
            else {
                if (this.shield != null) {
                    this.removeChild(this.shield);
                    this.shield.destroy();
                    this.shield = null;
                }
            }
        };
        Unit.prototype.onDeath = function () {
            _super.prototype.onDeath.call(this);
        };
        Unit.goldCost = 0;
        Unit.woodCost = 0;
        return Unit;
    }(Kodo.Entity));
    Kodo.Unit = Unit;
})(Kodo || (Kodo = {}));
