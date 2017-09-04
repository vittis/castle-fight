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
            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x000000);
            box.drawRoundedRect(0, 0, 700, 600, 30);
            box.endFill();
            var loadingRect = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, box.generateTexture());
            box.destroy();
            loadingRect.anchor.setTo(0.5, 0.5);
            loadingRect.alpha = 0.6;
            showAbout();
            var aboutButton = this.game.add.button(this.game.world.centerX, this.game.height - 60, 'playButton', function () { this.game.state.start('MainMenu', true, false); }.bind(this), this);
            aboutButton.tint = 0xb3b3b3;
            var aboutText = this.game.add.text(this.game.world.centerX, this.game.height - 60, 'Back', { font: "30px Baloo Paaji", fill: '#ffffff', wordWrap: false, align: "center" });
            aboutText.fontSize = 30;
            aboutText.anchor.setTo(0.5, 0.5);
            aboutButton.width = aboutText.width + 10;
            aboutButton.height = aboutText.height + 3;
            aboutButton.anchor.setTo(0.5, 0.5);
            aboutText.alignIn(aboutButton, Phaser.CENTER);
        };
        return AboutScene;
    }(Phaser.State));
    Kodo.AboutScene = AboutScene;
})(Kodo || (Kodo = {}));
function showAbout() {
    var x = document.getElementById('links');
    x.style.display = 'block';
}
function hideAbout() {
    var x = document.getElementById('links');
    x.style.display = 'none';
}
