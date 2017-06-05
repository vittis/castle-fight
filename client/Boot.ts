module Kodo {
    export class Boot extends Phaser.State {
       
        preload() {
            this.load.image('preloadBar', 'assets/loader.png');
            
        }

        create() {
            document.body.style.margin = '0px';
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            if (this.game.device.android || this.game.device.iOS) {
                //Phaser.Canvas.setTouchAction(this.game.canvas, "auto"); // disable the default "none"
                //this.game.input.touch.preventDefault = false;
                this.game.scale.forceLandscape = true;
                this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.game.scale.startFullScreen()
                this.game.scale.refresh();
                window.addEventListener('resize', function () { adjust(); });
                adjust();
            }
            this.game.state.start('Preloader', true, false);
        }
        
    }
    
}

function adjust() { var divgame = document.getElementById("game"); divgame.style.width = window.innerWidth + "px"; divgame.style.height = window.innerHeight + "px"; }