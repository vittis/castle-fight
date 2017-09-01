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
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            this.game.load.image('tileFundoPagina', 'assets/48/tileFundoPagina.png');
        };
        Boot.prototype.create = function () {
            document.body.style.margin = '0px';
            document.body.style.backgroundColor = '#27AE60';
            this.game.add.plugin(new PhaserInput.Plugin(this.game, this.game.plugins));
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            GameConfig.GAME_WIDTH = 1488;
            GameConfig.GAME_HEIGHT = 838;
            var versaoAndroid = false;
            if (this.game.device.android || this.game.device.iOS) {
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
            else {
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                if (!versaoAndroid)
                    this.scale.setMinMax(0, 0, 1488, 838);
            }
            if (versaoAndroid) {
                this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.game.scale.startFullScreen();
            }
            this.game.scale.refresh();
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    }(Phaser.State));
    Kodo.Boot = Boot;
})(Kodo || (Kodo = {}));
