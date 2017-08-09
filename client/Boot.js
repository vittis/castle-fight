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
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
            document.body.style.margin = '0px';
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.forceSingleUpdate = true;
            GameConfig.GAME_WIDTH = 1488;
            GameConfig.GAME_HEIGHT = 838;
            var versaoAndroid = false;
            if (this.game.device.android || this.game.device.iOS) {
                /* this.game.scale.forceLandscape = true;
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.startFullScreen();
                this.game.scale.refresh();
                window.addEventListener('resize', function () { adjust(); });
                adjust(); */
                this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                //this.game.scale.startFullScreen();
            }
            else {
                //this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
                //this.scale.setUserScale(1, 1);  
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                //window.addEventListener('resize', function () { adjust(); });
                //adjust();
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
/* function adjust() {
     if (window.innerWidth < GameConfig.GAME_WIDTH || window.innerHeight < GameConfig.GAME_HEIGHT) {
        var divgame = document.getElementById("game");
        divgame.style.width = window.innerWidth + "px";
        divgame.style.height = window.innerHeight + "px";
    }
    else if (window.innerWidth > GameConfig.GAME_WIDTH && window.innerHeight > GameConfig.GAME_HEIGHT){
        var divgame = document.getElementById("game");
        divgame.style.width = GameConfig.GAME_WIDTH + "px";
        divgame.style.height = GameConfig.GAME_HEIGHT + "px";
    }
} */
