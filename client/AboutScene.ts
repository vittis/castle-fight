module Kodo {

    export class AboutScene extends Phaser.State {


        create() {
            this.game.add.sprite(0, 0, 'tileFundoMaior');

            var rectsGroup = this.game.add.group();


            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x000000);
            box.drawRoundedRect(0, 0, 700, 600, 30);
            box.endFill();
            var loadingRect = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, box.generateTexture());
            box.destroy();
            loadingRect.anchor.setTo(0.5, 0.5);
            loadingRect.alpha = 0.6;
            showAbout();
 
            var aboutButton = this.game.add.button(this.game.world.centerX, this.game.height - 60, 'playButton', function () { this.game.state.start('MainMenu', true, false); }.bind(this), this);
            aboutButton.tint = 0xb3b3b3;

            var aboutText = this.game.add.text(this.game.world.centerX, this.game.height - 60, 'Back', { font: "30px Baloo Paaji", fill: '#ffffff', wordWrap: false, align: "center" });
            aboutText.fontSize = 30;
            aboutText.anchor.setTo(0.5, 0.5);

            aboutButton.width = aboutText.width + 10;
            aboutButton.height = aboutText.height + 3;
            aboutButton.anchor.setTo(0.5, 0.5);
            aboutText.alignIn(aboutButton, Phaser.CENTER);
            
            /*
            var spaceLink = this.game.add.text(0, 0, 'iogames.space (link)', { font: "30px Baloo Paaji", fill: '#ffffff', wordWrap: false, align: "center" });
            spaceLink.fontSize = 30;
            spaceLink.inputEnabled = true;
            spaceLink.input.useHandCursor = true;
            spaceLink.events.onInputDown.add(function () { window.open("https://discord.gg/tP2YjDb", "_blank");}, this);
            spaceLink.alignTo(aboutText, Phaser.BOTTOM_CENTER, 0, 5);

            var crazyLink = this.game.add.text(0, 0, 'iogames.space (link)', { font: "30px Baloo Paaji", fill: '#ffffff', wordWrap: false, align: "center" });
            crazyLink.fontSize = 30;
            crazyLink.inputEnabled = true;
            crazyLink.input.useHandCursor = true;
            crazyLink.events.onInputDown.add(function () { window.open("https://discord.gg/tP2YjDb", "_blank"); }, this);
            crazyLink.alignTo(spaceLink, Phaser.BOTTOM_CENTER, 0, 1);

            var ioListLink = this.game.add.text(0, 0, 'iogames.space (link)', { font: "30px Baloo Paaji", fill: '#ffffff', wordWrap: false, align: "center" });
            ioListLink.fontSize = 30;
            ioListLink.inputEnabled = true;
            ioListLink.input.useHandCursor = true;
            ioListLink.events.onInputDown.add(myFunction);
            ioListLink.alignTo(crazyLink, Phaser.BOTTOM_CENTER, 0, 1);

            rectsGroup.add(loadingRect);
            rectsGroup.add(aboutLabel);
            rectsGroup.add(aboutButton);
            rectsGroup.add(aboutText);

            //rectsGroup.swap(loadingRect, aboutLabel);

            rectsGroup.y = -1 * rectsGroup.height;

            var tweenDoido = this.add.tween(rectsGroup).to({ y: 0 }, 2000, Phaser.Easing.Bounce.Out, true);

 */
        }

    }
}

function showAbout() {
    /* var x = document.getElementById('links');
    x.style.display = 'block'; */
} 

function hideAbout() {
    /* var x = document.getElementById('links');
    x.style.display = 'none'; */
}