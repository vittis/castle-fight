module Kodo {
 
    export class MainMenu extends Phaser.State {
 
        background: Phaser.Sprite;
        logo: Phaser.Sprite;
 
        spaceKey : Phaser.Key;
        create() {
 
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
 
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
 
            this.add.tween(this.background).to({ alpha: 1}, 2000, Phaser.Easing.Bounce.InOut, true);

            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.InOut, true, 2000);
            
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        }
        update() {
            if (this.spaceKey.justDown || this.game.input.activePointer.isDown) {
                this.fadeOut();
            }
        }
        

        fadeOut() {
 
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
 
            tween.onComplete.add(this.startGame, this);
 
        }
 
        startGame() {
 
            this.game.state.start('GameScene', true, false);
 
        }
 
    }
 
}