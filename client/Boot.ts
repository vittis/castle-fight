module Kodo {
    export class Boot extends Phaser.State {
       
        preload() {
            this.load.image('preloadBar', 'assets/loader.png');
            
        }

        create() {
            document.body.style.margin = '0px';
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            if (this.game.device.android || this.game.device.iOS) {
                Phaser.Canvas.setTouchAction(this.game.canvas, "auto"); // disable the default "none"
                this.game.input.touch.preventDefault = false;
                this.game.scale.forceLandscape = true;
                this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.game.scale.startFullScreen();
                //this.game.scale.setShowAll();
                this.game.scale.refresh();
        
            }
            this.game.state.start('Preloader', true, false);
        }
    }
    
}