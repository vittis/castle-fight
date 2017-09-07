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
    var SacrificeChamber = (function (_super) {
        __extends(SacrificeChamber, _super);
        function SacrificeChamber(game, tile, id, isHost, data) {
            var _this = this;
            var texture;
            if (isHost) {
                texture = 'sacrificeChamberh';
            }
            else {
                texture = 'sacrificeChamberc';
            }
            _this = _super.call(this, game, tile, id, isHost, texture, data) || this;
            return _this;
        }
        SacrificeChamber.prototype.onDeath = function () {
            var style = { fill: '#ecec3a', wordWrap: true, align: "center" };
            if (this.game != null) {
                var goldLabel_1 = this.game.add.text(this.x + this.width / 2, this.y + this.height / 2 - 15, '+150', style);
                goldLabel_1.anchor.setTo(0.5, 0.5);
                goldLabel_1.fontSize = 24;
                goldLabel_1.scale.setTo(0.3, 0.3);
                style.fill = '#0D6032';
                var woodLabel_1 = this.game.add.text(this.x + this.width / 2, this.y + this.height / 2 + 15, '+150', style);
                woodLabel_1.anchor.setTo(0.5, 0.5);
                woodLabel_1.fontSize = 24;
                woodLabel_1.scale.setTo(0.3, 0.3);
                var tweenA = this.game.add.tween(goldLabel_1.scale).to({ x: 1.5, y: 1.5 }, 200, Phaser.Easing.Linear.None);
                var tweenB = this.game.add.tween(goldLabel_1.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
                var tweenC = this.game.add.tween(goldLabel_1).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None);
                var tweenD = this.game.add.tween(woodLabel_1.scale).to({ x: 1.5, y: 1.5 }, 200, Phaser.Easing.Linear.None);
                var tweenE = this.game.add.tween(woodLabel_1.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
                var tweenF = this.game.add.tween(woodLabel_1).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None);
                tweenC.onComplete.add(function removeText() {
                    goldLabel_1.destroy();
                    woodLabel_1.destroy();
                }, this);
                tweenA.chain(tweenB);
                tweenB.chain(tweenC);
                tweenA.start();
                tweenD.chain(tweenE);
                tweenE.chain(tweenF);
                tweenD.start();
            }
            _super.prototype.onDeath.call(this);
        };
        return SacrificeChamber;
    }(Kodo.EffectBuilding));
    Kodo.SacrificeChamber = SacrificeChamber;
})(Kodo || (Kodo = {}));
