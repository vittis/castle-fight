module Kodo {

    export class MainMenu extends Phaser.State {

        public game: PhaserInput.InputFieldGame; // Added
        
        static instance: MainMenu = null;

        buildingsGroup: Phaser.Group;

        inputField;
        playText : Phaser.Text;
        roomsText: Phaser.Text;

/*         onlineNumber : Phaser.Text;
        matchmakingNumber: Phaser.Text;
        ingameNumber: Phaser.Text; */
        titleLabel : Phaser.Text;

        rectsGroup : Phaser.Group;

/*         chatBox : ChatBox;
        watchBox : WatchBox;
        leaderboard : Leaderboard; */

        create() {
            hideAbout();
            document.getElementById("bottomLeftBox").style.display = 'block';
            document.getElementById("menuUI").style.display = 'block';

            Client.askLastMessages();
            adjust();

            MainMenu.instance = this;
            var nickValue: string = document.cookie.replace(/(?:(?:^|.*;\s*)nick\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            if (nickValue)
                GameConfig.yourNick = nickValue;



            var cookieValue :string = document.cookie.replace(/(?:(?:^|.*;\s*)deck\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var deck = cookieValue.split(',');
            if (deck){
                if (deck.length == 8) {
                    GameConfig.deck = deck;
                }
                else {
                    GameConfig.deck = ['Barracks', 'ArcheryRange', 'WitchsHut', 'Engineer', 'Sniper', 'HeroShrine', 'MagesGuild', 'KingsCourt'];
                }
            }
            else {
                GameConfig.deck = ['Barracks', 'ArcheryRange', 'WitchsHut', 'Engineer', 'Sniper', 'HeroShrine', 'MagesGuild', 'KingsCourt'];
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
            /* var moreButton = this.game.add.button(0, this.game.height - 30, 'moreButton', function () { window.open("http://iogames.space/", "_blank");}, this);
            moreButton.scale.setTo(0.9, 0.9);
            moreButton.position.setTo(30 + 330+640, this.game.height - 30); */

            var style = { font: "86px Baloo Paaji", fill: 'white', align: "center" };
            var aboutButton = this.game.add.button(this.game.world.centerX, this.game.height - 40, 'playButton', function () {
                document.getElementById("bottomLeftBox").style.display = 'none';
                document.getElementById("menuUI").style.display = 'none';
                this.game.state.start('AboutScene', true, false);
            }.bind(this), this);


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
            var originalY = this.titleLabel.y;
            this.titleLabel.y -= 200;
            var tweenC = this.game.add.tween(this.titleLabel).to({y: originalY}, 1500, Phaser.Easing.Bounce.Out, true);

            var enterKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
            enterKey.onDown.add(function () {
                if (document.getElementById('inputChat') == document.activeElement) {
                    if (document.getElementById('inputChat').value != '') {
                        Client.sendMessage(GameConfig.yourNick + ": " + document.getElementById('inputChat').value);
                        document.getElementById('inputChat').value = '';
                    }
                }
                document.getElementById('inputChat').focus();

            }, this);
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
            Client.checkPing();

            GameConfig.yourNick = this.inputField.value;

            Client.askMatchmaking();
            if (this.playText.text == 'Play')
                this.playText.text = 'Matchmaking...';
        }

        onRoomsButton() {
            Client.checkPing();
            //this.roomsText.text = 'Coming soon... :(';
            Client.askBotGame();
        }

        onEditDeckButton() {
            Client.checkPing();

            GameConfig.yourNick = this.inputField.value;
            Client.cancelMatchmaking();
            document.getElementById("bottomLeftBox").style.display = 'none';
            document.getElementById("menuUI").style.display = 'none';
            this.game.state.start('DeckScene', true, false);
        }

        startGame() {
            this.game.state.start('GameScene', true, false);
            document.getElementById("bottomLeftBox").style.display = 'none';
            document.getElementById("menuUI").style.display = 'none';

        }


        updatePlayersConnected(data) {
            HtmlUI.updateLeaderboards(data);
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