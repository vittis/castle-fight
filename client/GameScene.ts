module Kodo {
    export class GameScene extends Phaser.State {

        id : number;
        host;
        client;

        grid : number[][] = [];

        create() {
            this.game.stage.backgroundColor = 'rgb(19,58,43)';
        }

        update() {
           
        }

    }
}