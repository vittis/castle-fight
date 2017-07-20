
module Kodo {
 
    export class Game extends Phaser.Game {
        
        public static instance : Game = null;

        constructor() {
            //1296, 844
            //super(1296+GameConfig.uiWidth, 816-48, Phaser.AUTO, document.getElementById('game'), null);
            super(1392, 844-6, Phaser.AUTO, document.getElementById('game'), null);

            Game.instance = this;

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('GameScene', GameScene, false);
            
            this.state.start('Boot'); 
        }
 
    }
 
} 