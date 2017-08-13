module Kodo {

    export class MainMenu extends Phaser.State {

        matchmakingButton : Phaser.Button;
        
        static instance: MainMenu = null;

        buildingsGroup: Phaser.Group;

        create() {
            MainMenu.instance = this;

            this.game.add.sprite(0, 0, 'tileFundo');
            this.game.stage.backgroundColor = '#29B865';

            var style = { font: "80px Fertigo", fill: 'white', /* wordWrap: true, */ align: "center" };
            var titleLabel = this.game.add.text(this.game.world.centerX, 80, "Castle Fight", style);
            titleLabel.anchor.setTo(0.5, 0.5);
            titleLabel.fontWeight = 'bold';
            titleLabel.stroke = '#0D6032';
            titleLabel.strokeThickness = 12;

            style.font = "50px Lucida Console";
            var cardsLabel = this.game.add.text(300, 170, "Cards", style);
            cardsLabel.anchor.setTo(0.5, 0.5);
            cardsLabel.fontWeight = 'bold';
            cardsLabel.stroke = '#0D6032';
            cardsLabel.strokeThickness = 8;

            style.font = "45px Lucida Console";
            var yourDeckLabel = this.game.add.text(300, 440, "Your Deck", style);
            yourDeckLabel.anchor.setTo(0.5, 0.5);
            yourDeckLabel.fontWeight = 'bold';
            yourDeckLabel.stroke = '#0D6032';
            yourDeckLabel.strokeThickness = 8;

            var roomsLabel = this.game.add.text(this.game.width-300, 170, "Rooms", style);
            roomsLabel.anchor.setTo(0.5, 0.5);
            roomsLabel.fontWeight = 'bold';
            roomsLabel.stroke = '#0D6032';
            roomsLabel.strokeThickness = 8;

            var box3 = this.game.make.graphics(0, 0);
            box3.beginFill(0x29B865);
            box3.drawRoundedRect(0, 0, 556, 480, 10);
            box3.endFill();
            var rect3 = this.game.add.sprite(this.game.width - 600, 196, box3.generateTexture());
            //rect3.anchor.setTo(0.5, 0.5);
            box3.destroy();

            var box2 = this.game.make.graphics(0, 0);
            box2.beginFill(0x29B865);
            box2.drawRoundedRect(0, 0, 556, 196, 10);
            box2.endFill();
            var rect2 = this.game.add.sprite(305, 300, box2.generateTexture());
            rect2.anchor.setTo(0.5, 0.5);
            box2.destroy();

            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x29B865);
            box.drawRoundedRect(0, 0, 556-66, 196, 10);
            box.endFill();
            var rect = this.game.add.sprite(305, 570, box.generateTexture());
            rect.anchor.setTo(0.5, 0.5);
            box.destroy();

            this.buildingsGroup = game.add.group();
            this.buildingsGroup.inputEnableChildren = true;

            var hostLabel = GameConfig.isHost ? 'h' : 'c'

            GameConfig.buildingNameData.forEach(name => {
                this.buildingsGroup.add(new UIBuildingButton(game, name[0].toLowerCase() + name.slice(1) + "_ui_" + hostLabel, this, name[0].toLowerCase() + name.slice(1) +""+ hostLabel, name));
            });

            this.buildingsGroup.align(5, 2, 110, 90);

            var offsetX = GameConfig.isHost ? 0 : GameConfig.tileSize * GameConfig.GRID_COLS;
            this.buildingsGroup.x = 100;
            this.buildingsGroup.y = 260;
            this.buildingsGroup.setAll('anchor.x', 0.5);
            this.buildingsGroup.setAll('anchor.y', 0.5);
            
            this.buildingsGroup.onChildInputOver.add(this.onHover.bind(this), this);
            this.buildingsGroup.onChildInputDown.add(this.onDown.bind(this), this);
            this.buildingsGroup.onChildInputOut.add(this.onOut.bind(this), this); 

            this.matchmakingButton = this.game.add.button(this.game.world.centerX, this.game.height - 120, 'button', this.actionOnClick, this, 2, 1, 0);
            this.matchmakingButton.anchor.setTo(0.5, 0.5);
            this.game.time.advancedTiming = true;

        }
        actionOnClick() {
            Client.askMatchmaking();
        }

        startGame() {
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