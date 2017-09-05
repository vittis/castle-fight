var Kodo;
(function (Kodo) {
    var Leaderboard = (function () {
        function Leaderboard(game) {
            this.game = game;
            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x000000);
            box.drawRoundedRect(0, 0, 260, 220, 20);
            box.endFill();
            var leaderSpace = this.game.add.sprite(0, 0, box.generateTexture());
            box.destroy();
            leaderSpace.alpha = 0.47;
            var style = { font: "30px Baloo Paaji", fill: '#ECEC3A' };
            this.label = this.game.add.text(0, 0, "Leaderboards", style);
            this.label.anchor.setTo(0.5, 0.5);
            this.label.alignIn(leaderSpace, Phaser.TOP_CENTER, 0, -3);
            this.top5Group = this.game.add.group();
        }
        Leaderboard.prototype.updateTop5 = function (players) {
            var style = { font: "20px Baloo Paaji", fill: 'white' };
            players.splice(5, players.length - 5);
            this.top5Group.removeAll();
            for (var i = 0; i < players.length; i++) {
                var text = this.game.add.text(0, 0, players[i].nick + " - " + players[i].wins + " wins", style);
                text.addColor('#2bb664', text.text.indexOf('-') - 1);
                text.addColor('#02C605', text.text.indexOf('-') + 1);
                this.top5Group.add(text);
            }
            this.top5Group.align(1, 5, 0, 30);
            this.top5Group.alignTo(this.label, Phaser.BOTTOM_CENTER, 0, 5);
        };
        return Leaderboard;
    }());
    Kodo.Leaderboard = Leaderboard;
})(Kodo || (Kodo = {}));
