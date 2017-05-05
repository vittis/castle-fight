
module Kodo {
 
    export class Game extends Phaser.Game {
  
        constructor() {
            super(1280, 768, Phaser.AUTO, document.getElementById('game'), null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('GameScene', GameScene, false);
            
            this.state.start('Boot'); 
                
        }
 
    }
 
} 