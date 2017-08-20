module Kodo {

    export class MainMenu extends Phaser.State {

        public game: PhaserInput.InputFieldGame; // Added

        matchmakingButton : Phaser.Button;
        
        static instance: MainMenu = null;

        buildingsGroup: Phaser.Group;

        inputField;
        playText : Phaser.Text;
        create() {
            MainMenu.instance = this;

            this.game.add.sprite(0, 0, 'tileFundoMaior');
            this.game.stage.backgroundColor = '#29B865';

            var groupFundo = this.game.add.group();

            
            var unitNames = ["archerc", "soldadoc", "kingc", "sniperc", "propellerc", "thiefc", "farmerc", "engineerc"];
            for (var i = 0; i < 9; i++) {
                let carinha = this.game.add.sprite(-48, this.game.world.randomY, unitNames[Math.floor(Math.random() * unitNames.length)]);
                let tweenAnda = this.game.add.tween(carinha.position).to({ x: this.game.width }, 20000, Phaser.Easing.Linear.None, true, i * ((Math.floor(Math.random() * 7) + 3) * 500)+3000);
                
                tweenAnda.onComplete.add(function resetaTween() {
                    carinha.destroy();
                    let carinha2 = this.game.add.sprite(-48, this.game.world.randomY, unitNames[Math.floor(Math.random() * unitNames.length)]);
                    groupFundo.add(carinha2);
                    let tweenAnda2 = this.game.add.tween(carinha2.position).to({ x: this.game.width }, 20000, Phaser.Easing.Linear.None, true, (Math.floor(Math.random() * 25) + 2) * 1000);
                    tweenAnda2.onComplete.add(function resetaTween() {
                        carinha2.destroy();
                        let carinha3 = this.game.add.sprite(-48, this.game.world.randomY, unitNames[Math.floor(Math.random() * unitNames.length)]);
                        groupFundo.add(carinha3);
                        let tweenAnda3 = this.game.add.tween(carinha3.position).to({ x: this.game.width }, 20000, Phaser.Easing.Linear.None, true, (Math.floor(Math.random() * 25) + 2) * 1000);
                        tweenAnda3.onComplete.add(function resetaTween() {
                            carinha3.destroy();
                        }, this);
                    }, this);
                }, this);           
            }

            var howToPlay = this.game.add.sprite(0, 0, 'howToPlay-changelog');
            howToPlay.x = this.game.width - howToPlay.width;
            
            var style = { font: "86px Fertigo", fill: 'white', align: "center" };
            var titleLabel = this.game.add.text(this.game.world.centerX, 80, "Castle Arena", style);
            titleLabel.anchor.setTo(0.5, 0.5);
            titleLabel.fontWeight = 'bold';
            titleLabel.stroke = '#0D6032';
            titleLabel.strokeThickness = 12; 
            titleLabel.setShadow(0, 5, 'rgba(0,0,0,0.5)', 0);
            
            var panelGrande = this.game.add.sprite(0, 0, 'panelGrande');
            panelGrande.anchor.setTo(0.5, 0.5);
            panelGrande.alignTo(titleLabel, Phaser.BOTTOM_CENTER, 0, 70);

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
            var roomsText = this.game.add.text(0, 0, 'Rooms', style);
            roomsText.anchor.setTo(0.5, 0.5);
            roomsText.alignIn(roomsButton, Phaser.CENTER);

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
            deckNameLabel.alignIn(panelMenor, Phaser.CENTER, 23, -30);

            var tweenA = this.game.add.tween(titleLabel.scale).to({ x: 1.1, y: 1.1 }, 200, Phaser.Easing.Linear.None);
            var tweenB = this.game.add.tween(titleLabel.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
            tweenA.chain(tweenB);
            tweenA.start();
         
            this.game.time.advancedTiming = true;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
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
            this.playText.text = 'Matchmaking...'
        }

        onRoomsButton() {
            console.log("clicou no rooms "+this.inputField.value);
        }

        onEditDeckButton() {
            console.log("clicou no edit deck");
            this.game.state.start('DeckScene', true, false);
        }

        startGame() {
            console.log(this.inputField.value);
            this.game.state.start('GameScene', true, false);
        }
        render() {
            this.game.debug.text(this.game.time.fps + "", 2, 14, "#00ff00");
        }

        updatePlayersConnected(players : any[]) {
            players.forEach(p => {
                console.log(p.id + " - " + p.status);
            });
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