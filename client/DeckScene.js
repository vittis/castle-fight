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
    var DeckScene = (function (_super) {
        __extends(DeckScene, _super);
        function DeckScene() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.deck = [];
            return _this;
        }
        DeckScene.prototype.create = function () {
            var _this = this;
            this.deck = [];
            this.game.add.sprite(0, 0, 'tileFundoMaior');
            this.game.stage.backgroundColor = '#29B865';
            var guide = this.game.add.sprite(0, 0, 'deckbuildingGuide');
            guide.x = this.game.width - guide.width;
            var style = { font: "80px Fertigo", fill: 'white', align: "center" };
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
            var rect2 = this.game.add.sprite(this.game.world.centerX + 5, 268, box2.generateTexture());
            rect2.anchor.setTo(0.5, 0.5);
            box2.destroy();
            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x29B865);
            box.drawRoundedRect(0, 0, 470, 186, 10);
            box.endFill();
            var shadowRect = this.game.add.sprite(this.game.world.centerX + 5, 603, box.generateTexture());
            shadowRect.anchor.setTo(0.5, 0.5);
            shadowRect.tint = 0xececece;
            var rect = this.game.add.sprite(this.game.world.centerX + 5, 595, box.generateTexture());
            rect.anchor.setTo(0.5, 0.5);
            box.destroy();
            this.buildingsGroup = this.game.add.group();
            this.buildingsGroup.inputEnableChildren = true;
            var hostLabel = GameConfig.isHost ? 'h' : 'c';
            this.yourDeckGroup = this.add.group();
            this.yourDeckGroup.inputEnableChildren = true;
            GameConfig.deck.forEach(function (name) {
                _this.deck.push(name);
                var isUnit = (GameConfig.unitNameData.indexOf(name) >= 0);
                _this.yourDeckGroup.add(new Kodo.UIBuildingButton(_this.game, name[0].toLowerCase() + name.slice(1) + "_ui_" + hostLabel, _this, name[0].toLowerCase() + name.slice(1) + "" + hostLabel, name, isUnit));
            });
            var i = 0;
            GameConfig.buildingNameData.forEach(function (name) {
                var q = _this.buildingsGroup.add(new Kodo.UIBuildingButton(_this.game, name[0].toLowerCase() + name.slice(1) + "_ui_" + hostLabel, _this, name[0].toLowerCase() + name.slice(1) + "" + hostLabel, name, false, i > 6 ? false : true));
                if (_this.deck.indexOf(q.buildingName) != -1) {
                    q.tint = 0x906666;
                }
                i++;
            });
            GameConfig.unitNameData.forEach(function (name) {
                var q = _this.buildingsGroup.add(new Kodo.UIBuildingButton(_this.game, name[0].toLowerCase() + name.slice(1) + "_ui_" + hostLabel, _this, name[0].toLowerCase() + name.slice(1) + "" + hostLabel, name, true));
                if (_this.deck.indexOf(q.buildingName) != -1) {
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
            this.yourDeckGroup.x = 435 + 80 + 20 + 30;
            this.yourDeckGroup.y = 515;
            this.yourDeckGroup.setAll('anchor.x', 0.5);
            this.yourDeckGroup.setAll('anchor.y', 0.5);
            this.yourDeckGroup.align(4, 2, 110, 90);
            this.yourDeckGroup.onChildInputOver.add(this.onHover.bind(this), this);
            this.yourDeckGroup.onChildInputDown.add(this.onDownDeckBuilding.bind(this), this);
            this.yourDeckGroup.onChildInputOut.add(this.onOut.bind(this), this);
        };
        DeckScene.prototype.onHover = function (sprite) {
            sprite.onOver();
        };
        DeckScene.prototype.onDown = function (sprite) {
            sprite.onDown();
            if (this.deck.indexOf(sprite.buildingName) == -1 && this.deck.length < 8) {
                this.yourDeckGroup.add(new Kodo.UIBuildingButton(this.game, sprite.spriteName, this, sprite.previewName, sprite.buildingName, sprite.isUnit));
                this.yourDeckGroup.setAll('anchor.x', 0.5);
                this.yourDeckGroup.setAll('anchor.y', 0.5);
                this.yourDeckGroup.align(4, 2, 110, 90);
                this.game.time.events.add(200, this.updateCostPos.bind(this), this);
                sprite.tint = 0x906666;
                this.deck.push(sprite.buildingName);
            }
        };
        DeckScene.prototype.onOut = function (sprite) {
            sprite.onOut();
        };
        DeckScene.prototype.onDownDeckBuilding = function (sprite) {
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
        };
        DeckScene.prototype.updateCostPos = function () {
            this.yourDeckGroup.forEach(function (item) {
                item.updateTextPos();
            }, this);
        };
        DeckScene.prototype.onOverButton = function (sprite) {
            sprite.scale.setTo(1.02, 1.02);
        };
        DeckScene.prototype.onOutButton = function (sprite) {
            sprite.scale.setTo(1, 1);
        };
        DeckScene.prototype.onBackButton = function () {
            if (this.deck.length == 8) {
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
        };
        return DeckScene;
    }(Phaser.State));
    Kodo.DeckScene = DeckScene;
})(Kodo || (Kodo = {}));
