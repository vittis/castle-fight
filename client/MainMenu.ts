module Kodo {
    export class MainMenu extends Phaser.State {

        spaceKey : Phaser.Key;
        matchmakingButton : Phaser.Button;

        create() {
 
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.matchmakingButton = this.game.add.button(100, 100, 'button', this.actionOnClick, this, 2, 1, 0);
        }
        actionOnClick() {
            Client.askMatchmaking();
        }
        update() {
            if (this.spaceKey.justDown) {
                this.startGame();
            }
        }
        
        startGame() {
            
            this.game.state.start('GameScene', true, false);
 
        }
 
    }
 
}