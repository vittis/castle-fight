module Kodo {
    export class UIEntityManager {
        
        game: Phaser.Game;

        descricaoString : string;
        descTexto : Phaser.Text;
        descricaoBox : Phaser.Image;

        isShowing : boolean = false;

        target : Entity;

        boxGroup : Phaser.Group;

        hpTexto : Phaser.Text;
        armorTexto: Phaser.Text;

        tileMark : Phaser.Sprite;
        trainButton: Phaser.Button;

        trainButtonTarget : SpamBuilding;

        tileArray : Tile[] = [];

        justOpened : boolean = false;

        tileClickArray : Phaser.Sprite[] = [];

        constructor(game: Phaser.Game) {
            this.game = game;
            this.isShowing = false;
            this.boxGroup = game.add.group();

            this.trainButton = this.game.add.button(0, 0, 'trainButton', this.onClickTrainButton.bind(this), this, 1, 0, 2);
            this.trainButton.events.onInputOut.add(this.onOutTrainingButton.bind(this), this);
            this.trainButton.anchor.setTo(0.5, 0.5);
            this.trainButton.alpha = 0.9;
            this.trainButton.visible = false;
            if (this.game.device.android || this.game.device.iOS) {
                this.trainButton.scale.setTo(1.1, 1.1);
            }
            for (var i = 0; i < 12; i++) {
                let q = this.game.add.sprite(0, 0, 'tileClickMark');
                q.anchor.setTo(0.5, 0.5);
                q.alpha = 0.6;
                q.visible = false;
                this.tileClickArray.push(q);
            }
        }
        onOutTrainingButton() {
            if (!this.trainButtonTarget.getBounds().contains(this.game.input.x, this.game.input.y)) {
                this.trainButton.visible = false;
            }
        }
        updateText() {
            if (this.target != null) {
                if (this.target instanceof Building) {
                    if (this.target instanceof Tower) {
                        this.descTexto.text = this.target.dataq.name + "\n\nDamage: " 
                            + this.target.data.attackDmg + "\nRange: " + this.target.data.attackRange + "\nAtk Speed: " + this.target.data.attackRate;
                        this.hpTexto.text = "" + this.target.dataq.hp;
                        this.armorTexto.text = "" + this.target.dataq.armor;
                    }
                    else if (this.target instanceof SpamBuilding) {
                        this.descTexto.text = this.target.dataq.name + "\n\n" + "Training Time: " + this.target.data.spamRate +"\n" + Kodo[this.target.dataq.name].description;
                        this.hpTexto.text = "" + this.target.dataq.hp;
                        this.armorTexto.text = "" + this.target.dataq.armor;
                    }
                    else {
                        this.descTexto.text = this.target.dataq.name + "\n" + "\n" + Kodo[this.target.dataq.name].description;
                        this.hpTexto.text = ""+this.target.dataq.hp;
                        this.armorTexto.text = "" + this.target.dataq.armor;
                    }
                }
                if (this.target instanceof Unit) {
                    this.descTexto.text = this.target.dataq.name + "\n"+"\nDamage: "
                        + this.target.data.attackDmg + "\nRange: " + this.target.data.attackRange + "\nAtk Speed: " + this.target.data.attackRate+ "\n" + Kodo[this.target.dataq.name].description;
                    this.hpTexto.text = "" + this.target.dataq.hp;
                    this.armorTexto.text = "" + this.target.dataq.armor;
                }
            }
            this.game.world.bringToTop(this.boxGroup);
        }
        onDownTile(tile: Tile) {
            this.tileMark.x = tile.x;
            this.tileMark.y = tile.y;

            //mandar pro server
            Client.askSpamTileMark(tile.row, tile.col, this.target.id);
        }
        update() {
            if (this.isShowing) {
                this.descricaoBox.x = this.target.world.x + this.target.width/2;
                this.descricaoBox.y = this.target.world.y;
                this.descTexto.alignIn(this.descricaoBox, Phaser.TOP_LEFT);
                this.descTexto.x += 10;
                this.descTexto.y += 10;  
                this.boxGroup.getTop().alignIn(this.descTexto, Phaser.TOP_CENTER, 0, -20);

                if (this.game.input.activePointer.isDown && !this.justOpened) {
                    if (!(this.target instanceof SpamBuilding)) {
                        this.isShowing = false;
                        this.target = null;
                        this.boxGroup.removeAll();
                       // this.trainButton.visible = false;
                        if (this.tileMark) {
                            this.tileMark.destroy();
                        }
                        if (this.tileArray.length > 0) {
                            this.tileArray = [];
                        }
                    }
                    else {
                        var clicouNumTile = false;
                        if (this.tileArray.length > 0) {
                            this.tileArray.forEach(tile => {
                                if (tile.contains(this.game.input.x, this.game.input.y)) {
                                    clicouNumTile = true;
                                    this.onDownTile(tile);
                                }
                            });
                        }
                        if (!clicouNumTile) {
                            this.isShowing = false;
                            this.target = null;
                            this.boxGroup.removeAll();
                            //this.trainButton.visible = false;
                            this.tileClickArray.forEach(t => {
                                t.visible = false;
                            });
                            if (this.tileMark) {
                                this.tileMark.destroy();
                            }
                            if (this.tileArray.length > 0) {
                                this.tileArray = [];
                            }
                        }
                    }
                }
            }
        }

        onDownUnit(unit : Unit) {
            var entityManager = Kodo.GameScene.instance.uiEntityManager;
            if (entityManager.descricaoBox) {
                entityManager.boxGroup.removeAll();
                if (entityManager.tileMark) {
                    entityManager.tileMark.destroy();
                }
                if (entityManager.tileArray.length > 0) {
                    entityManager.tileArray = [];
                }
                entityManager.tileClickArray.forEach(t => {
                    t.visible = false;
                });
            }

            if (entityManager.target != unit || !entityManager.isShowing) {

                entityManager.justOpened = true;
                this.game.time.events.add(150, entityManager.justOpenedFalse.bind(this), this);

                entityManager.isShowing = true;
                entityManager.descricaoString = unit.dataq.name + "\n" 
                    + "\nDamage: " + unit.data.attackDmg + "\nRange: " + unit.data.attackRange + "\nAtk Speed: " + unit.data.attackRate + "\n" + Kodo[unit.dataq.name].description;

                var style = {
                    font:"",fill: 'white', wordWrap: false, align: "center"
                };
                entityManager.descTexto = this.game.add.text(200, 100, entityManager.descricaoString, style);
                entityManager.descTexto.fontSize = 16;
                entityManager.descTexto.alpha = 0.85;
                entityManager.descTexto.anchor.setTo(0.5, 0.5);

                var box = this.game.make.graphics(0, 0);
                box.beginFill(0x000000);
                box.lineStyle(5, 0x000000, 1);
                box.moveTo(0, 0);
                box.lineTo(entityManager.descTexto.width + 10, 0);
                box.lineTo(entityManager.descTexto.width + 10, entityManager.descTexto.height + 10);
                box.lineTo((entityManager.descTexto.width + 10) / 2 + 10, entityManager.descTexto.height + 10);
                box.lineTo((entityManager.descTexto.width + 10) / 2, entityManager.descTexto.height + 20);
                box.lineTo((entityManager.descTexto.width + 10) / 2 - 10, entityManager.descTexto.height + 10);

                box.lineTo(0, entityManager.descTexto.height + 10);
                box.lineTo(0, 0);
                box.endFill();
                entityManager.descricaoBox = this.game.add.sprite(entityManager.descTexto.x, entityManager.descTexto.y, box.generateTexture());
                entityManager.descricaoBox.alpha = 0.45;
                entityManager.descricaoBox.anchor.setTo(0.5, 1);
                box.destroy();

                this.game.world.swap(entityManager.descricaoBox, entityManager.descTexto);

                entityManager.descricaoBox.x = unit.world.x + unit.width / 2;
                entityManager.descricaoBox.y = unit.world.y;

                entityManager.descTexto.alignIn(entityManager.descricaoBox, Phaser.TOP_LEFT);
                entityManager.descTexto.x += 10;
                entityManager.descTexto.y += 10;

                var hp_icon = this.game.add.sprite(50, 50, 'hp_icon');
                var armor_icon = this.game.add.sprite(50, 50, 'armor_icon');
                armor_icon.alignTo(hp_icon, Phaser.RIGHT_CENTER, 10);
                style.font = "Baloo Paaji";

                entityManager.hpTexto = this.game.add.text(200, 100, "" + unit.dataq.hp, style);
                entityManager.hpTexto.fontSize = 17;
                entityManager.hpTexto.alpha = 0.85;
                entityManager.hpTexto.alignIn(hp_icon, Phaser.CENTER, 0, 1);

                entityManager.armorTexto = this.game.add.text(200, 100, "" + unit.dataq.armor, style);
                entityManager.armorTexto.fontSize = 17;
                entityManager.armorTexto.alpha = 0.85;
                entityManager.armorTexto.alignIn(armor_icon, Phaser.CENTER, 0, 3);
                style.font = "";

                var iconGroup = this.game.add.group();
                iconGroup.add(hp_icon);
                iconGroup.add(armor_icon);
                iconGroup.add(entityManager.hpTexto);
                iconGroup.add(entityManager.armorTexto);
                iconGroup.alignIn(entityManager.descTexto, Phaser.TOP_CENTER, 0, -20);

                entityManager.boxGroup.add(entityManager.descricaoBox);
                entityManager.boxGroup.add(entityManager.descTexto);
                entityManager.boxGroup.add(iconGroup);

                this.game.world.bringToTop(entityManager.boxGroup);

                entityManager.target = unit;
            }
            else {
                entityManager.isShowing = false;
                entityManager.target = null;
            }
        }

        onDownBuilding(building : Building) {
            var entityManager = Kodo.GameScene.instance.uiEntityManager;
            if (entityManager.descricaoBox) {
                entityManager.boxGroup.removeAll();
                if (entityManager.tileMark) {
                    entityManager.tileMark.destroy();
                }
                if (entityManager.trainButton) {
                    entityManager.trainButton.visible = false;
                }
                if (entityManager.tileArray.length > 0) {
                    entityManager.tileArray = [];
                }
                entityManager.tileClickArray.forEach(t => {
                    t.visible = false;
                });
            }
            if (entityManager.trainButton) {
                entityManager.trainButton.visible = false;
            }
            if (entityManager.target != building || !entityManager.isShowing) {
                entityManager.justOpened = true;
                this.game.time.events.add(150, entityManager.justOpenedFalse.bind(this), this);

                entityManager.isShowing = true; 
                if (building instanceof Tower) {
                    entityManager.descricaoString = building.dataq.name + "\n\nDamage: " 
                         + building.data.attackDmg + "\nRange: " + building.data.attackRange + "\nAtk Speed: " + building.data.attackRate;
                }
                else if (building instanceof SpamBuilding){
                    entityManager.descricaoString = building.dataq.name + "\n\n" + "Training Time: " + building.data.spamRate + "\n"+Kodo[building.dataq.name].description;
                }
                else {
                    entityManager.descricaoString = building.dataq.name + "\n\n" + Kodo[building.dataq.name].description;
                }
                var style = {
                    font: "", fill: 'white', wordWrap: false, align: "center"
                };
                entityManager.descTexto = this.game.add.text(200, 100, entityManager.descricaoString, style);
                entityManager.descTexto.fontSize = 16;
                entityManager.descTexto.alpha = 0.85;
                entityManager.descTexto.anchor.setTo(0.5, 0.5);

                var box = this.game.make.graphics(0, 0);
                box.beginFill(0x000000);
                box.lineStyle(5, 0x000000, 1);
                box.moveTo(0, 0);
                box.lineTo(entityManager.descTexto.width + 10, 0);
                box.lineTo(entityManager.descTexto.width + 10, entityManager.descTexto.height + 10);
                box.lineTo((entityManager.descTexto.width + 10) / 2 + 10, entityManager.descTexto.height + 10);
                box.lineTo((entityManager.descTexto.width + 10) / 2, entityManager.descTexto.height + 20);
                box.lineTo((entityManager.descTexto.width + 10) / 2 - 10, entityManager.descTexto.height + 10);

                box.lineTo(0, entityManager.descTexto.height + 10);
                box.lineTo(0, 0);
                box.endFill();
                entityManager.descricaoBox = this.game.add.sprite(entityManager.descTexto.x, entityManager.descTexto.y, box.generateTexture());
                entityManager.descricaoBox.alpha = 0.45;
                entityManager.descricaoBox.anchor.setTo(0.5, 1);
                box.destroy();

                this.game.world.swap(entityManager.descricaoBox, entityManager.descTexto);

                entityManager.descricaoBox.x = building.world.x + building.width / 2;
                entityManager.descricaoBox.y = building.world.y;

                entityManager.descTexto.alignIn(entityManager.descricaoBox, Phaser.TOP_LEFT);
                entityManager.descTexto.x += 10;
                entityManager.descTexto.y += 10;

                var hp_icon = this.game.add.sprite(50, 50, 'hp_icon');
                var armor_icon = this.game.add.sprite(50, 50, 'armor_icon');
                armor_icon.alignTo(hp_icon, Phaser.RIGHT_CENTER, 10);

                style.font = "Baloo Paaji";
                entityManager.hpTexto = this.game.add.text(200, 100, "" + building.dataq.hp, style);
                entityManager.hpTexto.fontSize = 17;
                entityManager.hpTexto.alpha = 0.85;
                entityManager.hpTexto.alignIn(hp_icon, Phaser.CENTER, 0, 1);

                entityManager.armorTexto = this.game.add.text(200, 100, "" + building.dataq.armor, style);
                entityManager.armorTexto.fontSize = 17;
                entityManager.armorTexto.alpha = 0.85;
                entityManager.armorTexto.alignIn(armor_icon, Phaser.CENTER, 0, 3);
                style.font = "";

                var iconGroup = this.game.add.group();

                iconGroup.add(hp_icon);
                iconGroup.add(armor_icon);
                iconGroup.add(entityManager.hpTexto);
                iconGroup.add(entityManager.armorTexto);
                iconGroup.alignIn(entityManager.descTexto, Phaser.TOP_CENTER, 0, -20);

                entityManager.boxGroup.add(entityManager.descricaoBox);
                entityManager.boxGroup.add(entityManager.descTexto);
                entityManager.boxGroup.add(iconGroup);

                this.game.world.bringToTop(entityManager.boxGroup);

                entityManager.target = building;

                if (building instanceof SpamBuilding && building.isHost == GameConfig.isHost) {
                    entityManager.tileMark = this.game.add.sprite(Kodo.GameScene.instance.grid[building.data.tileRow][building.data.tileCol].x, 
                        Kodo.GameScene.instance.grid[building.data.tileRow][building.data.tileCol].y, 'tileSelected');
                    this.game.world.bringToTop(entityManager.tileMark);

                    var i =0;
                    Kodo.GameScene.instance.getOuterTiles(building).forEach(tile => {
                        entityManager.tileArray.push(tile);
                        if (!(tile.row == building.data.tileRow && tile.col == building.data.tileCol)) {
                            entityManager.tileClickArray[i].x = tile.x + tile.width/2;
                            entityManager.tileClickArray[i].y = tile.y + tile.height / 2;
                            entityManager.tileClickArray[i].visible = true;

                        }
                        i++;
                    });  

                    var texture = building.data.spamData.isTraining ? 'pauseButton' : 'trainButton';
                    entityManager.trainButton.loadTexture(texture);
                    entityManager.trainButton.x = building.x + building.width-8;
                    entityManager.trainButton.y = building.y + building.height-12;
                    entityManager.trainButton.visible = true;
                    this.game.world.bringToTop(entityManager.trainButton);
                }
            }
            else {
                entityManager.isShowing = false; 
                entityManager.target = null;
            }
        }
        onClickTrainButton(button : Phaser.Button) {
            var entityManager = Kodo.GameScene.instance.uiEntityManager;

            if (entityManager.trainButtonTarget.data.spamData.isTraining) {
                button.loadTexture('trainButton');
                Client.askPauseUnit(entityManager.trainButtonTarget.id);
            }
            else {
                button.loadTexture('pauseButton');
                Client.askTrainUnit(entityManager.trainButtonTarget.id);
            }
        }

        onOverSpamBuilding(building) {
            if (this.trainButton.visible == false && GameConfig.isHost == building.isHost) {
                this.trainButton.visible = true;
                var texture = building.data.spamData.isTraining ? 'pauseButton' : 'trainButton';
                this.trainButton.loadTexture(texture);
                this.trainButton.x = building.x + building.width-8;
                this.trainButton.y = building.y + building.height-12;
                this.game.world.bringToTop(this.trainButton);
                this.trainButtonTarget = building;
            }
        } 

        onOutSpamBuilding(building : SpamBuilding) {
            if (!building.getBounds().contains(this.game.input.x, this.game.input.y)) {
                this.trainButton.visible = false;
                if (this.trainButtonTarget == building && !this.isShowing)
                    this.trainButtonTarget = null;
            }
        } 
        justOpenedFalse() {
            var entityManager = Kodo.GameScene.instance.uiEntityManager;

            entityManager.justOpened = false;
        }

    }
}