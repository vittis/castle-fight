module Kodo {
    export class GameScene extends Phaser.State {

        public static _instance : GameScene = null;

        create() {
            GameScene._instance = this;
            this.game.stage.backgroundColor = 'rgb(19,58,43)';


            //this.game.input.onDown.add(Client.pingCheck, this);
            //input wsad

            
            Client.askNewPlayer();
        }

        update() {
           
        }

    }
}