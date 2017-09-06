module Kodo {

    export class MainMenu extends Phaser.State {

        public game: PhaserInput.InputFieldGame; // Added
        
        static instance: MainMenu = null;

        buildingsGroup: Phaser.Group;

        inputField;
        playText : Phaser.Text;
        roomsText: Phaser.Text;

        onlineNumber : Phaser.Text;
        matchmakingNumber: Phaser.Text;
        ingameNumber: Phaser.Text;
        titleLabel : Phaser.Text;

        rectsGroup : Phaser.Group;

        chatBox : ChatBox;
        watchBox : WatchBox;
        leaderboard : Leaderboard;

        create() {
            hideAbout();
            MainMenu.instance = this;
            var cookieValue :string = document.cookie.replace(/(?:(?:^|.*;\s*)deck\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var deck = cookieValue.split(',');
            if (deck){
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
            var deckName: string = document.cookie.replace(/(?:(?:^|.*;\s*)deckName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
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
            for (var i = 0; i < 9; i++) {
                let card = unitNames[Math.floor(Math.random() * unitNames.length)];
                let carinha = this.game.add.sprite(-48, this.game.world.randomY, card);
                if (card == 'archerc') {
                    carinha.scale.x *= -1;
                }
                let tweenAnda = this.game.add.tween(carinha.position).to({ x: this.game.width }, 20000, Phaser.Easing.Linear.None, true, i * ((Math.floor(Math.random() * 7) + 3) * 500)+3000);
                
                tweenAnda.onComplete.add(function resetaTween() {
                    carinha.destroy();
                    let card = unitNames[Math.floor(Math.random() * unitNames.length)];
                    let carinha2 = this.game.add.sprite(-48, this.game.world.randomY, card);
                    if (card == 'archerc') {
                        carinha2.scale.x *= -1;
                    }
                    groupFundo.add(carinha2);
                    let tweenAnda2 = this.game.add.tween(carinha2.position).to({ x: this.game.width }, 20000, Phaser.Easing.Linear.None, true, (Math.floor(Math.random() * 25) + 2) * 1000);
                    tweenAnda2.onComplete.add(function resetaTween() {
                        carinha2.destroy();
                        let card = unitNames[Math.floor(Math.random() * unitNames.length)];
                        let carinha3 = this.game.add.sprite(-48, this.game.world.randomY, card);
                        if (card == 'archerc') {
                            carinha2.scale.x *= -1;
                        }
                        groupFundo.add(carinha3);
                        let tweenAnda3 = this.game.add.tween(carinha3.position).to({ x: this.game.width }, 20000, Phaser.Easing.Linear.None, true, (Math.floor(Math.random() * 25) + 2) * 1000);
                        tweenAnda3.onComplete.add(function resetaTween() {
                            carinha3.destroy();
                        }, this);
                    }, this);
                }, this);           
            }
            var moreButton = this.game.add.button(0, this.game.height - 30, 'moreButton', function () { window.open("http://iogames.space/", "_blank");}, this);
            moreButton.scale.setTo(0.9, 0.9);
            moreButton.position.setTo(30 + 330+640, this.game.height - 30);


            var howToPlay = this.game.add.sprite(0, 0, 'howToPlay-changelog');
            howToPlay.x = this.game.width - howToPlay.width;

            var style = { font: "86px Baloo Paaji", fill: 'white', align: "center" };
            var aboutButton = this.game.add.button(this.game.world.centerX, this.game.height - 40, 'playButton', function () {this.game.state.start('AboutScene', true, false);}.bind(this), this);
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
            this.titleLabel.setShadow(0, 10, 'rgba(0,0,0,0.5)', 0)
            
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
                max: '14',
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
            serverStatusRect.x = howToPlay.x + howToPlay.width/2;
            serverStatusRect.y = this.game.height - serverStatusRect.height/2 - 120;
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
            //serverStatusLabel.fontWeight = 900;



            style.font = "18px Baloo Paaji";
            style.fill = '#ffffff';

            var onlineLabel = this.game.add.text(0, 0, "Online: ", style);
            onlineLabel.anchor.setTo(0.5, 0.5);
            onlineLabel.alignTo(serverStatusLabel, Phaser.BOTTOM_CENTER, 0, 5);
            //onlineLabel.fontWeight = 600;

            //var matchMaking = this.game.add.text(0, 0, "Matchmaking: ", style);
            //matchMaking.anchor.setTo(0.5, 0.5);
            //matchMaking.alignTo(onlineLabel, Phaser.BOTTOM_CENTER, 0, 2);
            //matchMaking.fontWeight = 600; 

            var ingame = this.game.add.text(0, 0, "In-game: ", style);
            ingame.anchor.setTo(0.5, 0.5);
            ingame.alignTo(onlineLabel, Phaser.BOTTOM_CENTER, 0, 2);
            //ingame.fontWeight = 600;

            style.fill = "#29B865";
            this.onlineNumber = this.game.add.text(0, 0, "-", style);
            this.onlineNumber.anchor.setTo(0.5, 0.5);
            this.onlineNumber.alignTo(onlineLabel, Phaser.RIGHT_CENTER, 3);
            //this.onlineNumber.fontWeight = 600;
            
            //style.fill = "#c9b32b";
            //this.matchmakingNumber = this.game.add.text(0, 0, "-", style);
            //this.matchmakingNumber.anchor.setTo(0.5, 0.5);
            //this.matchmakingNumber.alignTo(matchMaking, Phaser.RIGHT_CENTER, 3);
            //this.matchmakingNumber.fontWeight = 600;

            style.fill = "#de8787";
            this.ingameNumber = this.game.add.text(0, 0, "-", style);
            this.ingameNumber.anchor.setTo(0.5, 0.5);
            this.ingameNumber.alignTo(ingame, Phaser.RIGHT_CENTER, 3);
            //this.ingameNumber.fontWeight = 600;



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
            //this.rectsGroup.add(matchMaking);
            this.rectsGroup.add(ingame);
            this.rectsGroup.add(this.onlineNumber);
            //this.rectsGroup.add(this.matchmakingNumber);
            this.rectsGroup.add(this.ingameNumber);

            this.rectsGroup.y = -1 * this.rectsGroup.height;

            var tweenDoido = this.add.tween(this.rectsGroup).to({ y: 0 }, 2000, Phaser.Easing.Bounce.Out, true);

            //this.game.add.sprite(260, this.game.world.centerY -40, 'warning').anchor.setTo(0.5, 0.5);
            this.chatBox = new ChatBox(this.game);
            this.leaderboard = new Leaderboard(this.game);
            this.watchBox = new WatchBox(this.game);
        }
        onFocusOut() {
            if (this.inputField.value.length > 0) {
                GameConfig.yourNick = this.inputField.value;
            }
            else {
                GameConfig.yourNick = "guest";
            }
        }

        onOverButton(sprite) {
            sprite.scale.setTo(1.02, 1.02);
        }
        onOutButton(sprite) {
            sprite.scale.setTo(1, 1);
        }
        onPlayButton() {
            GameConfig.yourNick = this.inputField.value;

            Client.askMatchmaking();
            this.playText.text = 'Matchmaking...';
        }

        onRoomsButton() {
            Client.checkPing();
            //this.roomsText.text = 'Coming soon... :(';
            Client.askBotGame();
        }

        onEditDeckButton() {
            GameConfig.yourNick = this.inputField.value;
            Client.cancelMatchmaking();
            this.game.state.start('DeckScene', true, false);
        }

        startGame() {
            this.game.state.start('GameScene', true, false);
        }


        updatePlayersConnected(data ) {
            this.onlineNumber.text = " "+data.players.length;
            var ingame=0;
            data.players.forEach(p => {

                if (p.status == 2) {
                    ingame++;
                }
            });
            this.ingameNumber.text = " "+ingame;

            data.players.sort(predicateBy("wins"));
            data.players.reverse();
            this.leaderboard.updateTop5(data);
            this.watchBox.updateLiveGames(data.liveGames);
        }

        onHover(sprite: UIBuildingButton) {
            sprite.onOver();
        }
        onDown(sprite: UIBuildingButton) {
            sprite.onDown();
        }
        onOut(sprite: UIBuildingButton) {
            sprite.onOut();
        }
    }
 
}