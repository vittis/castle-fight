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
    var Tower = (function (_super) {
        __extends(Tower, _super);
        function Tower(game, tile, id, isHost, data) {
            var _this = this;
            var texture;
            if (isHost) {
                texture = 'towerh';
            }
            else {
                texture = 'towerc';
            }
            _this = _super.call(this, game, tile, id, isHost, texture, data) || this;
            return _this;
        }
        Tower.prototype.attack = function (tile) {
            new Kodo.Projectile(this.game, this.x + this.width / 2, this.y + this.height / 2, tile, this.isHost).scale.setTo(1.6, 1.6);
        };
        Tower.prototype.updateStep = function (newData, tile) {
            _super.prototype.updateStep.call(this, newData);
            if (this.data.attackData.hasAttacked) {
                this.attack(Kodo.GameScene.instance.grid[this.data.attackData.row][this.data.attackData.col]);
            }
        };
        return Tower;
    }(Kodo.Building));
    Kodo.Tower = Tower;
})(Kodo || (Kodo = {}));
