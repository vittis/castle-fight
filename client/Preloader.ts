module Kodo {
    export class Preloader extends Phaser.State {
 
        preloadBar: Phaser.Sprite;
 
        preload() {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(this.game.width/2, this.game.height/2, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            this.game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
            //32x32
            if (GameConfig.tileSize == 32) {
                this.game.load.image('tile0', 'assets/32/tile0_32.png');
                this.game.load.image('tile1', 'assets/32/tile1_32.png');
                this.game.load.image('soldadoh', 'assets/32/soldadoh_32.png');
                this.game.load.image('soldadoc', 'assets/32/soldadoc_32.png');
                this.game.load.image('archerc', 'assets/32/archerc_32.png');
                this.game.load.image('archerh', 'assets/32/archerh_32.png');
                this.game.load.image('castleh', 'assets/32/castleh_32.png');
                this.game.load.image('castlec', 'assets/32/castlec_32.png');
                this.game.load.image('barracksc', 'assets/32/barracksc_32.png');
                this.game.load.image('barracksh', 'assets/32/barracksh_32.png');
                this.game.load.image('archeryRangeh', 'assets/32/archeryRangeh_32.png');
                this.game.load.image('archeryRangec', 'assets/32/archeryRangec_32.png');
                this.game.load.image('tiro', 'assets/32/tiro_32.png');



            }
            //64x64
            else {
                this.game.load.image('tile0', 'assets/64/tile0_64.png');
                this.game.load.image('tile1', 'assets/64/tile1_64.png');
                this.game.load.image('soldadoh', 'assets/64/soldadoh_64.png');
                this.game.load.image('soldadoc', 'assets/64/soldadoc_64.png');
                this.game.load.image('archerh', 'assets/64/archerh_64.png');
                this.game.load.image('archerc', 'assets/64/archerc_64.png');
                this.game.load.image('castleh', 'assets/64/castleh_64.png');
                this.game.load.image('castlec', 'assets/64/castlec_64.png');
                this.game.load.image('barracksh', 'assets/64/barracksh_64.png');
                this.game.load.image('barracksc', 'assets/64/barracksc_64.png');
                this.game.load.image('archeryRangeh', 'assets/64/archeryRangeh_64.png');
                this.game.load.image('archeryRangec', 'assets/64/archeryRangec_64.png');
                this.game.load.image('tiro', 'assets/64/tiro_64.png');
            }
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