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
    var AboutScene = (function (_super) {
        __extends(AboutScene, _super);
        function AboutScene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AboutScene.prototype.create = function () {
            this.game.add.sprite(0, 0, 'tileFundoMaior');
            var rectsGroup = this.game.add.group();
            var aboutString = "Made by Vitor Bichara\nAssets from Kenney.nl\n\nPartners:\niogames.space\ncrazygames.com\nio-games.io";
            var aboutLabel = this.game.add.text(this.world.centerX, this.world.centerY, aboutString, { font: "30px Baloo Paaji", fill: '#ffffff', wordWrap: false, align: "center" });
            aboutLabel.anchor.setTo(0.5, 0.5);
            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x000000);
            box.drawRoundedRect(0, 0, aboutLabel.width + 50, aboutLabel.height + 35, 30);
            box.endFill();
            var loadingRect = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, box.generateTexture());
            box.destroy();
            loadingRect.anchor.setTo(0.5, 0.5);
            loadingRect.alpha = 0.6;
            var aboutButton = this.game.add.button(this.game.world.centerX, this.game.height - 40, 'playButton', function () { this.game.state.start('MainMenu', true, false); }.bind(this), this);
            aboutButton.tint = 0xb3b3b3;
            var aboutText = this.game.add.text(this.game.world.centerX, this.game.height - 60, 'Back', { font: "30px Baloo Paaji", fill: '#ffffff', wordWrap: false, align: "center" });
            aboutText.fontSize = 30;
            aboutText.anchor.setTo(0.5, 0.5);
            aboutButton.width = aboutText.width + 10;
            aboutButton.height = aboutText.height + 3;
            aboutButton.alignTo(loadingRect, Phaser.BOTTOM_CENTER, 0, 30);
            aboutText.alignIn(aboutButton, Phaser.CENTER);
            rectsGroup.add(loadingRect);
            rectsGroup.add(aboutLabel);
            rectsGroup.add(aboutButton);
            rectsGroup.add(aboutText);
            rectsGroup.y = -1 * rectsGroup.height;
            var tweenDoido = this.add.tween(rectsGroup).to({ y: 0 }, 2000, Phaser.Easing.Bounce.Out, true);
        };
        return AboutScene;
    }(Phaser.State));
    Kodo.AboutScene = AboutScene;
})(Kodo || (Kodo = {}));
