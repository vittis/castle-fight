module Kodo {
    export class Boot extends Phaser.State {
       
        preload() {
            this.load.image('preloadBar', 'assets/loader.png');
            
        }

        create() {
            document.body.style.margin = '0px';
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            Phaser.Canvas.setTouchAction(this.game.canvas, "auto"); // disable the default "none"
            this.game.input.touch.preventDefault = false;

            this.game.state.start('Preloader', true, false);
        }
    }
    
}