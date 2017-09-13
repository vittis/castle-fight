module Kodo {
    export class Boot extends Phaser.State {
       
        preload() {
            //this.load.image('preloadBar', 'assets/loader.png');
            this.game.load.image('tileFundoPagina', 'assets/48/tileFundoPagina.png');
        }

        create() {
            document.body.style.margin = '0px';
            document.body.style.backgroundColor = '#27AE60';

            this.game.add.plugin(new PhaserInput.Plugin(this.game, this.game.plugins));            
            
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            //this.game.forceSingleUpdate = true;
            GameConfig.GAME_WIDTH = 1488;
            GameConfig.GAME_HEIGHT = 838;

            var versaoAndroid = false;

            if (this.game.device.android || this.game.device.iOS) {
                /* this.game.scale.forceLandscape = true;
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.startFullScreen();
                this.game.scale.refresh();
                adjust(); */
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
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
            window.addEventListener('resize', function () { adjust(); });
            adjust();
            this.game.scale.refresh();
            this.game.state.start('Preloader', true, false);
        }

    }
}

function adjust() { 
     var scaleFactor = this.game.scale.scaleFactorInversed.x * 28;
     if (window.innerHeight < 860) {
         scaleFactor -= 1;
     }
     if (window.innerHeight < 780) {
         scaleFactor -= 2;
     }
     if (window.innerHeight < 700) {
         scaleFactor -= 2;
     }

     document.getElementById("menuUI").style.fontSize = scaleFactor + 'px';
} 
