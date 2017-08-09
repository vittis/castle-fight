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
    Kodo.startGame = function () {
    };
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.matchmakingButton = this.game.add.button(100, 100, 'button', this.actionOnClick, this, 2, 1, 0);
            this.game.time.advancedTiming = true;
        };
        MainMenu.prototype.actionOnClick = function () {
            Client.askMatchmaking();
        };
        MainMenu.prototype.update = function () {
            if (this.spaceKey.justDown) {
                this.startGame();
            }
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('GameScene', true, false);
        };
        MainMenu.prototype.render = function () {
            this.game.debug.text(this.game.time.fps + "", 2, 14, "#00ff00");
        };
        return MainMenu;
    }(Phaser.State));
    Kodo.MainMenu = MainMenu;
})(Kodo || (Kodo = {}));
