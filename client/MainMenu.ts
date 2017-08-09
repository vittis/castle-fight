module Kodo {

    export var startGame = function() {

    }

    export class MainMenu extends Phaser.State {

        spaceKey : Phaser.Key;
        matchmakingButton : Phaser.Button;

        create() {
 
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.matchmakingButton = this.game.add.button(100, 100, 'button', this.actionOnClick, this, 2, 1, 0);
            this.game.time.advancedTiming = true;

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
        render() {
            this.game.debug.text(this.game.time.fps + "", 2, 14, "#00ff00");
        }
    }
 
}