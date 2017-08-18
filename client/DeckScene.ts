module Kodo {

    export class DeckScene extends Phaser.State {

        public game: PhaserInput.InputFieldGame; // Added

        buildingsGroup : Phaser.Group;
        yourDeckGroup : Phaser.Group;

        deck : string[] = [];

        inputField;

        create() {
            this.deck = [];

            this.game.add.sprite(0, 0, 'tileFundoMaior');
            this.game.stage.backgroundColor = '#29B865';

            var style = { font: "80px Fertigo", fill: 'white', /* wordWrap: true, */ align: "center" };
            /* var titleLabel = this.game.add.text(this.game.world.centerX, 80, "Castle Arena", style);
            titleLabel.anchor.setTo(0.5, 0.5);
            titleLabel.fontWeight = 'bold';
            titleLabel.stroke = '#0D6032';
            titleLabel.strokeThickness = 12;
            titleLabel.setShadow(0, 5, 'rgba(0,0,0,0.5)', 0);
          
            var tweenA = this.game.add.tween(titleLabel.scale).to({ x: 1.05, y: 1.05 }, 500, Phaser.Easing.Linear.None);
            var tweenB = this.game.add.tween(titleLabel.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Linear.None);
            tweenA.chain(tweenB);
            tweenA.start(); */

             style.font = "60px Lucida Console";
             var cardsLabel = this.game.add.text(this.game.world.centerX, 80, "Cards", style);
             cardsLabel.anchor.setTo(0.5, 0.5);
             cardsLabel.fontWeight = 'bold';
             cardsLabel.stroke = '#0D6032';
             cardsLabel.strokeThickness = 8;
             cardsLabel.setShadow(0, 3, 'rgba(0,0,0,0.5)', 0);
 
             style.font = "45px Lucida Console";
             var yourDeckLabel = this.game.add.text(this.game.world.centerX, 465, "Your Deck", style);
             yourDeckLabel.anchor.setTo(0.5, 0.5);
             yourDeckLabel.fontWeight = 'bold';
             yourDeckLabel.stroke = '#0D6032';
             yourDeckLabel.strokeThickness = 8;
             yourDeckLabel.setShadow(0, 3, 'rgba(0,0,0,0.5)', 0);
 

             var box2 = this.game.make.graphics(0, 0);
             box2.beginFill(0x29B865);
             box2.drawRoundedRect(0, 0, 786, 270, 10);
             box2.endFill();
             var shadowRect2 = this.game.add.sprite(this.game.world.centerX + 5, 276, box2.generateTexture());
             shadowRect2.anchor.setTo(0.5, 0.5);
             shadowRect2.tint = 0xececece;
             var rect2 = this.game.add.sprite(this.game.world.centerX+5, 268, box2.generateTexture());
             rect2.anchor.setTo(0.5, 0.5);
             box2.destroy();
 
             var box = this.game.make.graphics(0, 0);
             box.beginFill(0x29B865);
             box.drawRoundedRect(0, 0, 470, 186, 10);
             box.endFill();
             var shadowRect = this.game.add.sprite(this.game.world.centerX + 5, 603, box.generateTexture());
             shadowRect.anchor.setTo(0.5, 0.5);
             shadowRect.tint = 0xececece;
             var rect = this.game.add.sprite(this.game.world.centerX+5, 595, box.generateTexture());
             rect.anchor.setTo(0.5, 0.5);
             box.destroy();
 
             this.buildingsGroup = this.game.add.group();
             this.buildingsGroup.inputEnableChildren = true;
 
             var hostLabel = GameConfig.isHost ? 'h' : 'c'
 

             this.yourDeckGroup = this.add.group();
             this.yourDeckGroup.inputEnableChildren = true;

             GameConfig.deck.forEach(name => {
                 this.deck.push(name);
                 let isUnit = (GameConfig.unitNameData.indexOf(name) >= 0);
                 this.yourDeckGroup.add(new UIBuildingButton(this.game, name[0].toLowerCase() + name.slice(1) + "_ui_" + hostLabel, this, name[0].toLowerCase() + name.slice(1) + "" + hostLabel, name, isUnit));
             });


             GameConfig.buildingNameData.forEach(name => {
                 let q =this.buildingsGroup.add(new UIBuildingButton(this.game, name[0].toLowerCase() + name.slice(1) + "_ui_" + hostLabel, this, name[0].toLowerCase() + name.slice(1) +""+ hostLabel, name));
                if (this.deck.indexOf(q.buildingName)!=-1) {
                    q.tint = 0x906666;
                }
                /* let r = this.buildingsGroup.add(new UIBuildingButton(game, Kodo[name].spamUnit[0].toLowerCase() + Kodo[name].spamUnit.slice(1) + "_ui_" + hostLabel, this, Kodo[name].spamUnit[0].toLowerCase() + name.slice(1) + "" + hostLabel, Kodo[name].spamUnit, true));
                if (this.deck.indexOf(r.buildingName) != -1) {
                    r.tint = 0x906666;
                } */
            });

             GameConfig.unitNameData.forEach(name => {
                 let q = this.buildingsGroup.add(new UIBuildingButton(this.game, name[0].toLowerCase() + name.slice(1) + "_ui_" + hostLabel, this, name[0].toLowerCase() + name.slice(1) + "" + hostLabel, name, true));
                 if (this.deck.indexOf(q.buildingName) != -1) {
                     q.tint = 0x906666;
                 }
             }); 
 
             this.buildingsGroup.align(7, 3, 110, 90);
 
             this.buildingsGroup.x = 435;
             this.buildingsGroup.y = 180; 
             this.buildingsGroup.setAll('anchor.x', 0.5);
             this.buildingsGroup.setAll('anchor.y', 0.5);
             
             this.buildingsGroup.onChildInputOver.add(this.onHover.bind(this), this);
             this.buildingsGroup.onChildInputDown.add(this.onDown.bind(this), this);
             this.buildingsGroup.onChildInputOut.add(this.onOut.bind(this), this); 

             style = { font: "32px sans-serif", fill: 'white', align: "center" };
             var backButton = this.game.add.button(this.game.world.centerX + 120, this.game.height - 75, 'backButton', this.onBackButton.bind(this), this);
             backButton.anchor.setTo(0.5, 0.5);
             backButton.events.onInputOver.add(this.onOverButton.bind(this), backButton);
             backButton.events.onInputOut.add(this.onOutButton.bind(this), backButton);
             var editText = this.game.add.text(0, 0, 'Finish', style);
             editText.anchor.setTo(0.5, 0.5);
             editText.alignIn(backButton, Phaser.CENTER);

             this.inputField = this.game.add.inputField(10, 90, {
                 font: '20px Lucida Console',
                 fill: '#212121',
                 fontWeight: 'normal',
                 textAlign: 'center',
                 width: 176,
                 padding: 14,
                 max: '15',
                 borderWidth: 1,
                 backgroundColor: '#ececec',
                 borderColor: '#ececec',
                 borderRadius: 6,
                 placeHolder: '<default deck>',
                 type: PhaserInput.InputType.text
             });

             this.inputField.alignTo(backButton, Phaser.LEFT_CENTER, 50);

             
             this.yourDeckGroup.x = 435+80+20+30;
             this.yourDeckGroup.y = 515;
             this.yourDeckGroup.setAll('anchor.x', 0.5);
             this.yourDeckGroup.setAll('anchor.y', 0.5);
             this.yourDeckGroup.align(4, 2, 110, 90);

             this.yourDeckGroup.onChildInputOver.add(this.onHover.bind(this), this);
             this.yourDeckGroup.onChildInputDown.add(this.onDownDeckBuilding.bind(this), this);
             this.yourDeckGroup.onChildInputOut.add(this.onOut.bind(this), this);  
        }

        render() {
            this.game.debug.text(this.game.time.fps + "", 2, 14, "#00ff00");
        }

        onHover(sprite: UIBuildingButton) {
            sprite.onOver();
        }
        onDown(sprite: UIBuildingButton) {
            sprite.onDown();
            if (this.deck.indexOf(sprite.buildingName)==-1 && this.deck.length < 8) {
                this.yourDeckGroup.add(new UIBuildingButton(this.game, sprite.spriteName, this, sprite.previewName, sprite.buildingName, sprite.isUnit));
                this.yourDeckGroup.setAll('anchor.x', 0.5);
                this.yourDeckGroup.setAll('anchor.y', 0.5); 
                this.yourDeckGroup.align(4, 2, 110, 90);
                this.game.time.events.add(200, this.updateCostPos.bind(this), this);

                sprite.tint = 0x906666;

                this.deck.push(sprite.buildingName);
            }
        }
        onOut(sprite: UIBuildingButton) {
            sprite.onOut();
        }
        onDownDeckBuilding(sprite : UIBuildingButton) {
            sprite.onOut();
            sprite.goldCostText.destroy();
            sprite.woodCostText.destroy();
            sprite.tudoGroup.destroy();
            this.yourDeckGroup.remove(sprite);
            this.yourDeckGroup.align(4, 2, 110, 90);
            this.game.time.events.add(200, this.updateCostPos.bind(this), this);

            this.buildingsGroup.forEach(function (item) {
                if (item.buildingName == sprite.buildingName) {
                    item.tint = 0xffffff;
                }
            }, this);
            this.deck.splice(this.deck.indexOf(sprite.buildingName), 1);
        }

        updateCostPos() {
            this.yourDeckGroup.forEach(function (item) {
                item.updateTextPos();
            }, this);
        }
        onOverButton(sprite) {
            sprite.scale.setTo(1.02, 1.02);
        }
        onOutButton(sprite) {
            sprite.scale.setTo(1, 1);
        }
        onBackButton() {
            if (this.deck.length==8) {
                GameConfig.deck = this.deck;
                if (this.inputField.value != '') {
                    GameConfig.deckName = this.inputField.value;
                }
                else {
                    GameConfig.deckName = "<custom deck>";
                }
                this.game.state.start('MainMenu', true, false);
            }
            else if (this.deck.length == 0) {
                GameConfig.deck = ['Barracks', 'ArcheryRange', 'Barn', 'ThiefsTent', 'StorageBarn', 'GravityChamber', 'SpecialFacility', 'KingsCourt'];
                GameConfig.deckName = "<default deck>";
                this.game.state.start('MainMenu', true, false);
            }
        }
    }

}