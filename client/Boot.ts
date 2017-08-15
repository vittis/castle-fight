module Kodo {
    export class Boot extends Phaser.State {
       
        preload() {
            this.load.image('preloadBar', 'assets/loader.png');
            
        }

        create() {
            document.body.style.margin = '0px';
            document.body.style.backgroundColor = '#29B865';

            this.game.add.plugin(new PhaserInput.Plugin(this.game, this.game.plugins));            
            
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
        }

    }
}

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
