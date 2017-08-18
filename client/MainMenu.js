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
            MainMenu.instance = this;
            this.game.add.sprite(0, 0, 'tileFundoMaior');
            this.game.stage.backgroundColor = '#29B865';
            var style = { font: "86px Fertigo", fill: 'white', /* wordWrap: true, */ align: "center" };
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
            console.log("clicou no rooms " + this.inputField.value);
        };
        MainMenu.prototype.onEditDeckButton = function () {
            console.log("clicou no edit deck");
            this.game.state.start('DeckScene', true, false);
        };
        MainMenu.prototype.startGame = function () {
            console.log(this.inputField.value);
            this.game.state.start('GameScene', true, false);
        };
        MainMenu.prototype.render = function () {
            this.game.debug.text(this.game.time.fps + "", 2, 14, "#00ff00");
        };
        MainMenu.prototype.updatePlayersConnected = function (players) {
            players.forEach(function (p) {
                console.log(p.id + " - " + p.status);
            });
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
