module Kodo {
    export class Game extends Phaser.Game {
        
        public static instance : Game = null;

        constructor() {
            super(1488, 838, Phaser.CANVAS, document.getElementById('game'), null);

            Game.instance = this;

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('DeckScene', DeckScene, false);
            this.state.add('GameScene', GameScene, false);
            this.state.add('AboutScene', AboutScene, false);

            this.state.start('Boot'); 
        }

    }
 
} 