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
    var IncomeBall = (function (_super) {
        __extends(IncomeBall, _super);
        function IncomeBall(game, tile, id, isHost, data) {
            var _this = this;
            var texture = 'incomeBall';
            _this = _super.call(this, game, tile, id, isHost, texture, data) || this;
            IncomeBall.description = "Grants " + Kodo.GameScene.instance.ballData.reward + "G and " + Kodo.GameScene.instance.ballData.reward + "W";
            return _this;
        }
        IncomeBall.prototype.onDeath = function () {
            var style = { fill: '#ecec3a', wordWrap: true, align: "center" };
            if (this.game != null) {
                if (Kodo.GameScene.instance.ballData.hostMatou && GameConfig.isHost) {
                    var goldLabel_1 = this.game.add.text(this.x + this.width / 2, this.y + this.height / 2 - 15, '+' + Kodo.GameScene.instance.ballData.reward, style);
                    goldLabel_1.anchor.setTo(0.5, 0.5);
                    goldLabel_1.fontSize = 24;
                    goldLabel_1.scale.setTo(0.3, 0.3);
                    style.fill = '#0D6032';
                    var woodLabel_1 = this.game.add.text(this.x + this.width / 2, this.y + this.height / 2 + 15, '+' + Kodo.GameScene.instance.ballData.reward, style);
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
                else if (Kodo.GameScene.instance.ballData.clientMatou && !GameConfig.isHost) {
                    var goldLabel_2 = this.game.add.text(this.x + this.width / 2, this.y + this.height / 2 - 15, '+' + Kodo.GameScene.instance.ballData.reward, style);
                    goldLabel_2.anchor.setTo(0.5, 0.5);
                    goldLabel_2.fontSize = 24;
                    goldLabel_2.scale.setTo(0.3, 0.3);
                    style.fill = '#0D6032';
                    var woodLabel_2 = this.game.add.text(this.x + this.width / 2, this.y + this.height / 2 + 15, '+' + Kodo.GameScene.instance.ballData.reward, style);
                    woodLabel_2.anchor.setTo(0.5, 0.5);
                    woodLabel_2.fontSize = 24;
                    woodLabel_2.scale.setTo(0.3, 0.3);
                    var tweenA = this.game.add.tween(goldLabel_2.scale).to({ x: 1.5, y: 1.5 }, 200, Phaser.Easing.Linear.None);
                    var tweenB = this.game.add.tween(goldLabel_2.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
                    var tweenC = this.game.add.tween(goldLabel_2).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None);
                    var tweenD = this.game.add.tween(woodLabel_2.scale).to({ x: 1.5, y: 1.5 }, 200, Phaser.Easing.Linear.None);
                    var tweenE = this.game.add.tween(woodLabel_2.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
                    var tweenF = this.game.add.tween(woodLabel_2).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None);
                    tweenC.onComplete.add(function removeText() {
                        goldLabel_2.destroy();
                        woodLabel_2.destroy();
                    }, this);
                    tweenA.chain(tweenB);
                    tweenB.chain(tweenC);
                    tweenA.start();
                    tweenD.chain(tweenE);
                    tweenE.chain(tweenF);
                    tweenD.start();
                }
                else {
                    var goldLabel_3 = this.game.add.text(this.x + this.width / 2, this.y + this.height / 2 - 15, '+0', style);
                    goldLabel_3.anchor.setTo(0.5, 0.5);
                    goldLabel_3.fontSize = 24;
                    goldLabel_3.scale.setTo(0.3, 0.3);
                    style.fill = '#0D6032';
                    var woodLabel_3 = this.game.add.text(this.x + this.width / 2, this.y + this.height / 2 + 15, '+0', style);
                    woodLabel_3.anchor.setTo(0.5, 0.5);
                    woodLabel_3.fontSize = 24;
                    woodLabel_3.scale.setTo(0.3, 0.3);
                    var tweenA = this.game.add.tween(goldLabel_3.scale).to({ x: 1.5, y: 1.5 }, 200, Phaser.Easing.Linear.None);
                    var tweenB = this.game.add.tween(goldLabel_3.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
                    var tweenC = this.game.add.tween(goldLabel_3).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None);
                    var tweenD = this.game.add.tween(woodLabel_3.scale).to({ x: 1.5, y: 1.5 }, 200, Phaser.Easing.Linear.None);
                    var tweenE = this.game.add.tween(woodLabel_3.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
                    var tweenF = this.game.add.tween(woodLabel_3).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None);
                    tweenC.onComplete.add(function removeText() {
                        goldLabel_3.destroy();
                        woodLabel_3.destroy();
                    }, this);
                    tweenA.chain(tweenB);
                    tweenB.chain(tweenC);
                    tweenA.start();
                    tweenD.chain(tweenE);
                    tweenE.chain(tweenF);
                    tweenD.start();
                }
            }
            _super.prototype.onDeath.call(this);
        };
        return IncomeBall;
    }(Kodo.Building));
    Kodo.IncomeBall = IncomeBall;
})(Kodo || (Kodo = {}));
