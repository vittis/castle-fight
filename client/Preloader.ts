module Kodo {
 
    export class Preloader extends Phaser.State {
 
        preloadBar: Phaser.Sprite;
 
        preload() {
 
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(this.game.width/2, this.game.height/2, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
 
            //  Load our actual games assets
        }
 
        create() {
 
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
            
        }   
 
        startMainMenu() {
             this.game.state.start('GameScene', true, false);
        }
 
    }
 
}