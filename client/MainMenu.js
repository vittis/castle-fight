var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Kodo;
(function (Kodo) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            hideAbout();
            MainMenu.instance = this;
            var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)deck\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var deck = cookieValue.split(',');
            if (deck) {
                if (deck.length == 8) {
                    GameConfig.deck = deck;
                }
                else {
                    GameConfig.deck = ['Barracks', 'ArcheryRange', 'WitchsHut', 'Engineer', 'Sniper', 'GravityChamber', 'MagesGuild', 'KingsCourt'];
                }
            }
            else {
                GameConfig.deck = ['Barracks', 'ArcheryRange', 'WitchsHut', 'Engineer', 'Sniper', 'GravityChamber', 'MagesGuild', 'KingsCourt'];
            }
            var deckName = document.cookie.replace(/(?:(?:^|.*;\s*)deckName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            if (deckName.length > 0) {
                GameConfig.deckName = deckName;
            }
            else {
                GameConfig.deckName = "<default deck>";
            }
            this.game.add.sprite(0, 0, 'tileFundoMaior');
            this.game.stage.backgroundColor = '#29B865';
            var groupFundo = this.game.add.group();
            var unitNames = ["archerc", "footmanc", "kingc", "sniperc", "propellerc", "thiefc", "farmerc", "engineerc"];
            var _loop_1 = function () {
                var card = unitNames[Math.floor(Math.random() * unitNames.length)];
                var carinha = this_1.game.add.sprite(-48, this_1.game.world.randomY, card);
                if (card == 'archerc') {
                    carinha.scale.x *= -1;
                }
                var tweenAnda = this_1.game.add.tween(carinha.position).to({ x: this_1.game.width }, 20000, Phaser.Easing.Linear.None, true, i * ((Math.floor(Math.random() * 7) + 3) * 500) + 3000);
                tweenAnda.onComplete.add(function resetaTween() {
                    carinha.destroy();
                    var card = unitNames[Math.floor(Math.random() * unitNames.length)];
                    var carinha2 = this.game.add.sprite(-48, this.game.world.randomY, card);
                    if (card == 'archerc') {
                        carinha2.scale.x *= -1;
                    }
                    groupFundo.add(carinha2);
                    var tweenAnda2 = this.game.add.tween(carinha2.position).to({ x: this.game.width }, 20000, Phaser.Easing.Linear.None, true, (Math.floor(Math.random() * 25) + 2) * 1000);
                    tweenAnda2.onComplete.add(function resetaTween() {
                        carinha2.destroy();
                        var card = unitNames[Math.floor(Math.random() * unitNames.length)];
                        var carinha3 = this.game.add.sprite(-48, this.game.world.randomY, card);
                        if (card == 'archerc') {
                            carinha2.scale.x *= -1;
                        }
                        groupFundo.add(carinha3);
                        var tweenAnda3 = this.game.add.tween(carinha3.position).to({ x: this.game.width }, 20000, Phaser.Easing.Linear.None, true, (Math.floor(Math.random() * 25) + 2) * 1000);
                        tweenAnda3.onComplete.add(function resetaTween() {
                            carinha3.destroy();
                        }, this);
                    }, this);
                }, this_1);
            };
            var this_1 = this;
            for (var i = 0; i < 9; i++) {
                _loop_1();
            }
            var moreButton = this.game.add.button(0, this.game.height - 30, 'moreButton', function () { window.open("http://iogames.space/", "_blank"); }, this);
            moreButton.scale.setTo(0.9, 0.9);
            moreButton.position.setTo(30 + 330 + 640, this.game.height - 30);
            var howToPlay = this.game.add.sprite(0, 0, 'howToPlay-changelog');
            howToPlay.x = this.game.width - howToPlay.width;
            var style = { font: "86px Baloo Paaji", fill: 'white', align: "center" };
            var aboutButton = this.game.add.button(this.game.world.centerX, this.game.height - 40, 'playButton', function () { this.game.state.start('AboutScene', true, false); }.bind(this), this);
            aboutButton.anchor.setTo(0.5, 0.5);
            aboutButton.tint = 0xb3b3b3;
            var aboutText = this.game.add.text(this.game.world.centerX, this.game.height - 30, 'About', style);
            aboutText.fontSize = 17;
            aboutText.anchor.setTo(0.5, 0.5);
            aboutButton.width = aboutText.width + 10;
            aboutButton.height = aboutText.height + 3;
            aboutText.alignIn(aboutButton, Phaser.CENTER);
            this.titleLabel = this.game.add.text(this.game.world.centerX, 80, "Castle Arena", style);
            this.titleLabel.anchor.setTo(0.5, 0.5);
            this.titleLabel.fontWeight = 'bold';
            this.titleLabel.stroke = '#0D6032';
            this.titleLabel.strokeThickness = 20;
            this.titleLabel.setShadow(0, 10, 'rgba(0,0,0,0.5)', 0);
            var panelGrande = this.game.add.sprite(0, 0, 'panelGrande');
            panelGrande.anchor.setTo(0.5, 0.5);
            panelGrande.alignTo(this.titleLabel, Phaser.BOTTOM_CENTER, 0, 70);
            this.inputField = this.game.add.inputField(10, 90, {
                font: '28px Lucida Console',
                fill: '#212121',
                fontWeight: 'normal',
                textAlign: 'center',
                width: 320,
                padding: 16,
                borderWidth: 1,
                max: '15',
                backgroundColor: '#ececec',
                borderColor: '#ececec',
                borderRadius: 6,
                placeHolder: 'Enter Nick',
                type: PhaserInput.InputType.text,
            });
            this.inputField.alignIn(panelGrande, Phaser.TOP_CENTER, -16, -30);
            if (GameConfig.yourNick != "")
                this.inputField.setText(GameConfig.yourNick);
            this.inputField.focusOut.add(this.onFocusOut.bind(this), this);
            style.font = "36px sans-serif";
            var playButton = this.game.add.button(0, 0, 'playButton', this.onPlayButton.bind(this), this);
            playButton.anchor.setTo(0.5, 0.5);
            playButton.alignIn(panelGrande, Phaser.CENTER);
            playButton.events.onInputOver.add(this.onOverButton.bind(this), playButton);
            playButton.events.onInputOut.add(this.onOutButton.bind(this), playButton);
            this.playText = this.game.add.text(0, 0, 'Play', style);
            this.playText.anchor.setTo(0.5, 0.5);
            this.playText.alignIn(playButton, Phaser.CENTER);
            var roomsButton = this.game.add.button(0, 0, 'roomsButton', this.onRoomsButton.bind(this), this);
            roomsButton.anchor.setTo(0.5, 0.5);
            roomsButton.alignIn(panelGrande, Phaser.BOTTOM_CENTER, 0, -25);
            roomsButton.events.onInputOver.add(this.onOverButton.bind(this), playButton);
            roomsButton.events.onInputOut.add(this.onOutButton.bind(this), playButton);
            this.roomsText = this.game.add.text(0, 0, 'Versus Bot', style);
            this.roomsText.anchor.setTo(0.5, 0.5);
            this.roomsText.alignIn(roomsButton, Phaser.CENTER);
            var panelMenor = this.game.add.sprite(0, 0, 'panelMenor');
            panelMenor.anchor.setTo(0.5, 0.5);
            panelMenor.alignTo(panelGrande, Phaser.BOTTOM_CENTER, 0, 90);
            style.font = "32px sans-serif";
            var editDeck = this.game.add.button(0, 0, 'editDeck', this.onEditDeckButton.bind(this), this);
            editDeck.anchor.setTo(0.5, 0.5);
            editDeck.alignIn(panelMenor, Phaser.BOTTOM_CENTER, 0, -15);
            editDeck.events.onInputOver.add(this.onOverButton.bind(this), playButton);
            editDeck.events.onInputOut.add(this.onOutButton.bind(this), playButton);
            var editText = this.game.add.text(0, 0, 'Edit deck', style);
            editText.anchor.setTo(0.5, 0.5);
            editText.alignIn(editDeck, Phaser.CENTER);
            style.font = "26px Lucida Console";
            style.fill = 'black';
            var deckNameLabel = this.game.add.text(this.game.world.centerX, 80, GameConfig.deckName, style);
            deckNameLabel.anchor.setTo(0.5, 0.5);
            deckNameLabel.alignIn(panelMenor, Phaser.CENTER, 26, -30);
            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x000000);
            box.drawRoundedRect(0, 0, 220, 115, 20);
            box.endFill();
            var serverStatusRect = this.game.add.sprite(0, 0, box.generateTexture());
            box.destroy();
            serverStatusRect.anchor.setTo(0.5, 0.5);
            serverStatusRect.x = howToPlay.x + howToPlay.width / 2;
            serverStatusRect.y = this.game.height - serverStatusRect.height / 2 - 120;
            serverStatusRect.alpha = 0.53;
            var redditButton = this.game.add.button(15, this.game.height - 30, 'redditButton', function () { window.open("https://www.reddit.com/r/castlearena/", "_blank"); }, this, 1, 0, 2);
            redditButton.anchor.setTo(0.5, 0.5);
            redditButton.alignTo(serverStatusRect, Phaser.BOTTOM_CENTER, -27, 30);
            var discordButton = this.game.add.button(15, this.game.height - 30, 'discordButton', function () { window.open("https://discord.gg/tP2YjDb", "_blank"); }, this, 1, 0, 2);
            discordButton.anchor.setTo(0.5, 0.5);
            discordButton.alignTo(serverStatusRect, Phaser.BOTTOM_CENTER, 27, 30);
            style.font = "18px Baloo Paaji";
            style.fill = '#12522d';
            var getInvolved = this.game.add.text(0, 0, "Join Us!", style);
            getInvolved.anchor.setTo(0.5, 0.5);
            getInvolved.alignTo(redditButton, Phaser.BOTTOM_CENTER, 27, 1);
            style.font = "26px Baloo Paaji";
            style.fill = '#ecec3a';
            var serverStatusLabel = this.game.add.text(0, 0, "Server Status", style);
            serverStatusLabel.anchor.setTo(0.5, 0.5);
            serverStatusLabel.alignIn(serverStatusRect, Phaser.TOP_CENTER, 0, -12);
            style.font = "18px Baloo Paaji";
            style.fill = '#ffffff';
            var onlineLabel = this.game.add.text(0, 0, "Online: ", style);
            onlineLabel.anchor.setTo(0.5, 0.5);
            onlineLabel.alignTo(serverStatusLabel, Phaser.BOTTOM_CENTER, 0, 5);
            var ingame = this.game.add.text(0, 0, "In-game: ", style);
            ingame.anchor.setTo(0.5, 0.5);
            ingame.alignTo(onlineLabel, Phaser.BOTTOM_CENTER, 0, 2);
            style.fill = "#29B865";
            this.onlineNumber = this.game.add.text(0, 0, "-", style);
            this.onlineNumber.anchor.setTo(0.5, 0.5);
            this.onlineNumber.alignTo(onlineLabel, Phaser.RIGHT_CENTER, 3);
            style.fill = "#de8787";
            this.ingameNumber = this.game.add.text(0, 0, "-", style);
            this.ingameNumber.anchor.setTo(0.5, 0.5);
            this.ingameNumber.alignTo(ingame, Phaser.RIGHT_CENTER, 3);
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            var tweenA = this.game.add.tween(this.titleLabel.scale).to({ x: 1.02, y: 1.02 }, 800, Phaser.Easing.Linear.None);
            var tweenB = this.game.add.tween(this.titleLabel.scale).to({ x: 1, y: 1 }, 1200, Phaser.Easing.Linear.None);
            tweenA.onComplete.add(function volta() {
                tweenB.start();
            }, this);
            tweenB.onComplete.add(function vai() {
                tweenA.start();
            }, this);
            tweenA.start();
            this.rectsGroup = this.game.add.group();
            this.rectsGroup.add(howToPlay);
            this.rectsGroup.add(serverStatusRect);
            this.rectsGroup.add(serverStatusLabel);
            this.rectsGroup.add(redditButton);
            this.rectsGroup.add(discordButton);
            this.rectsGroup.add(getInvolved);
            this.rectsGroup.add(onlineLabel);
            this.rectsGroup.add(ingame);
            this.rectsGroup.add(this.onlineNumber);
            this.rectsGroup.add(this.ingameNumber);
            this.rectsGroup.y = -1 * this.rectsGroup.height;
            var tweenDoido = this.add.tween(this.rectsGroup).to({ y: 0 }, 2000, Phaser.Easing.Bounce.Out, true);
            this.chatBox = new Kodo.ChatBox(this.game);
            this.leaderboard = new Kodo.Leaderboard(this.game);
        };
        MainMenu.prototype.onFocusOut = function () {
            if (this.inputField.value.length > 0) {
                GameConfig.yourNick = this.inputField.value;
            }
            else {
                GameConfig.yourNick = "guest";
            }
        };
        MainMenu.prototype.onOverButton = function (sprite) {
            sprite.scale.setTo(1.02, 1.02);
        };
        MainMenu.prototype.onOutButton = function (sprite) {
            sprite.scale.setTo(1, 1);
        };
        MainMenu.prototype.onPlayButton = function () {
            GameConfig.yourNick = this.inputField.value;
            Client.askMatchmaking();
            this.playText.text = 'Matchmaking...';
        };
        MainMenu.prototype.onRoomsButton = function () {
            Client.checkPing();
            Client.askBotGame();
        };
        MainMenu.prototype.onEditDeckButton = function () {
            GameConfig.yourNick = this.inputField.value;
            Client.cancelMatchmaking();
            this.game.state.start('DeckScene', true, false);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('GameScene', true, false);
        };
        MainMenu.prototype.updatePlayersConnected = function (data) {
            this.onlineNumber.text = "" + data.players.length;
            var ingame = 0;
            data.players.forEach(function (p) {
                if (p.status == 2) {
                    ingame++;
                }
            });
            this.ingameNumber.text = "" + ingame;
            data.players.sort(predicateBy("wins"));
            data.players.reverse();
            this.leaderboard.updateTop5(data);
        };
        MainMenu.prototype.onHover = function (sprite) {
            sprite.onOver();
        };
        MainMenu.prototype.onDown = function (sprite) {
            sprite.onDown();
        };
        MainMenu.prototype.onOut = function (sprite) {
            sprite.onOut();
        };
        MainMenu.instance = null;
        return MainMenu;
    }(Phaser.State));
    Kodo.MainMenu = MainMenu;
})(Kodo || (Kodo = {}));
