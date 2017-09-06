module Kodo {
    export class Leaderboard {

        game : Phaser.Game;

        /* top5 : string[]=['vittis', 'THIEF RUSH!!', 'testeq', 'oloko', 'sam'];
        win : number[]=[5, 4, 3, 2, 1]; */

        top5Group : Phaser.Group;
        allTimeGroup: Phaser.Group;

        label;
        onlineLabel;
        top3Label : Phaser.Text;
        constructor(game) {
            this.game = game;
            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x000000);
            box.drawRoundedRect(0, 0, 260, 340, 20);
            box.endFill();
            var leaderSpace = this.game.add.sprite(0, 0, box.generateTexture());
            box.destroy();
            //leaderSpace.anchor.setTo(0, 1);
            leaderSpace.alpha = 0.52;

            var style = { font: "26px Baloo Paaji", fill: '#ECEC3A', align: "center" };

            this.label = this.game.add.text(0, 0,"Leaderboards", style)
            this.label.anchor.setTo(0.5, 0.5);


            this.label.alignIn(leaderSpace, Phaser.TOP_CENTER, 0, -3);

            style = { font: "20px Baloo Paaji", fill: '#ECEC3A', align: "center" };
            this.onlineLabel = this.game.add.text(0, 0, "Online", style)
            this.onlineLabel.anchor.setTo(0.5, 0.5);
            this.onlineLabel.alignTo(this.label, Phaser.BOTTOM_CENTER, 0, 0);

            this.top3Label = this.game.add.text(0, 0, "Daily Top 3", style)
            this.top3Label.anchor.setTo(0.5, 0.5);
            this.top3Label.alignTo(this.onlineLabel, Phaser.BOTTOM_CENTER, 0, 0);


            this.top5Group = this.game.add.group();
            this.allTimeGroup = this.game.add.group();

            /* style = { font: "20px Baloo Paaji", fill: 'white' };
            for (var i = 0; i < this.top5.length; i++) {
                var text = this.game.add.text(0, 0, this.top5[i]+" - "+this.win[i]+" wins", style);
                this.top5Group.add(text);
            }
            this.top5Group.align(1, 5, 0, 30);
            this.top5Group.alignTo(this.label, Phaser.BOTTOM_LEFT, 13, 5); */
        }

        updateTop5(data) {
            var style = { font: "17px Baloo Paaji", fill: 'white', align: "center" };

            data.players.splice(5, data.players.length-5);
            this.top5Group.removeAll();
            for (var i = 0; i < data.players.length; i++) {
                var text = this.game.add.text(0, 0, data.players[i].nick + " - " + data.players[i].wins + " wins", style);
                text.addColor('#2bb664', text.text.indexOf('-')-1);
                text.addColor('#02C605', text.text.indexOf('-') + 1);
                
                this.top5Group.add(text);
            }
            this.top5Group.align(1, 5, 0, 30);
            this.top5Group.alignTo(this.onlineLabel, Phaser.BOTTOM_CENTER, 0, 5);
            this.top3Label.alignTo(this.top5Group, Phaser.BOTTOM_CENTER, 0, 5);
            
            this.allTimeGroup.removeAll();
            for (var j = 0; j < data.top3.length; j++) {
                let text = this.game.add.text(0, 0, data.top3[j].nick + " - " + data.top3[j].wins + " wins", style);
                text.addColor('#2bb664', text.text.indexOf('-') - 1);
                text.addColor('#02C605', text.text.indexOf('-') + 1);
                this.allTimeGroup.add(text);
            }
            this.allTimeGroup.align(1, 3, 0, 30);
            this.allTimeGroup.alignTo(this.top3Label, Phaser.BOTTOM_CENTER, 0, 5);
        }
    }
}