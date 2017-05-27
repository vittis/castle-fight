
module Kodo {
    export class Preloader extends Phaser.State {
 
        preloadBar: Phaser.Sprite;
 
        preload() {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(this.game.width/2, this.game.height/2, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            //32x32
            this.game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
            this.game.load.image('tile0_32', 'assets/tile0_32.png');
            this.game.load.image('tile1_32', 'assets/tile1_32.png');
            this.game.load.image('soldadoh_32', 'assets/soldadoh_32.png');

            //64x64
            this.game.load.image('tile0_64', 'assets/tile0_64.png');
            this.game.load.image('tile1_64', 'assets/tile1_64.png');
            this.game.load.image('soldadoh_64', 'assets/soldadoh_64.png');
        }
 
        create() {
 
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
            
        }   
 
        startMainMenu() {
             //this.game.state.start('GameScene', true, false);
            this.game.state.start('MainMenu', true, false);
        }
 
    }
 
}