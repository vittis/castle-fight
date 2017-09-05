module Kodo {
    export class Leaderboard {

        game : Phaser.Game;

        /* top5 : string[]=['vittis', 'THIEF RUSH!!', 'testeq', 'oloko', 'sam'];
        win : number[]=[5, 4, 3, 2, 1]; */

        top5Group : Phaser.Group;
    label;
        constructor(game) {
            this.game = game;
            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x000000);
            box.drawRoundedRect(0, 0, 260, 260, 20);
            box.endFill();
            var leaderSpace = this.game.add.sprite(0, 0, box.generateTexture());
            box.destroy();
            //leaderSpace.anchor.setTo(0, 1);
            leaderSpace.alpha = 0.47;

            var style = { font: "30px Baloo Paaji", fill: '#ECEC3A' };

            this.label = this.game.add.text(0, 0,"Leaderboards", style)
            this.label.anchor.setTo(0.5, 0.5);

            this.label.alignIn(leaderSpace, Phaser.TOP_CENTER, 0, -3);

            this.top5Group = this.game.add.group();

            /* style = { font: "20px Baloo Paaji", fill: 'white' };
            for (var i = 0; i < this.top5.length; i++) {
                var text = this.game.add.text(0, 0, this.top5[i]+" - "+this.win[i]+" wins", style);
                this.top5Group.add(text);
            }
            this.top5Group.align(1, 5, 0, 30);
            this.top5Group.alignTo(this.label, Phaser.BOTTOM_LEFT, 13, 5); */
        }

        updateTop5(players : any[]) {
            var style = { font: "20px Baloo Paaji", fill: 'white' };

            players.splice(7, players.length-7);
            this.top5Group.removeAll();
            for (var i = 0; i < players.length; i++) {
                var text = this.game.add.text(0, 0, players[i].nick + " - " + players[i].wins + " wins", style);
                text.addColor('#2bb664', text.text.indexOf('-')-1);
                text.addColor('#02C605', text.text.indexOf('-') + 1);
                
                
                this.top5Group.add(text);
            }
            this.top5Group.align(1, 7, 0, 30);
            this.top5Group.alignTo(this.label, Phaser.BOTTOM_CENTER, 0, 5);
        }
    }
}