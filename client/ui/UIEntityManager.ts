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


        tileArray : Tile[] = [];

        constructor(game: Phaser.Game) {
            this.game = game;
            this.isShowing = false;
            this.boxGroup = game.add.group();
        }
        updateText() {
            if (this.descTexto) {
                if (this.target instanceof Building) {
                    if (this.target instanceof Tower) {
                        this.descTexto.text = this.target.dataq.name + "\n\nDamage: " 
                            + this.target.data.attackDmg + "\nRange: " + this.target.data.attackRange + "\nAtk Speed: " + this.target.data.attackRate;
                    }
                    else {
                        this.descTexto.text = this.target.dataq.name + "\n" + "\n" + Kodo[this.target.dataq.name].description;
                        this.hpTexto.text = ""+this.target.dataq.hp;
                        this.armorTexto.text = "" + this.target.dataq.armor;
                    }
                }
                if (this.target instanceof Unit) {
                    this.descTexto.text = this.target.dataq.name + "\n"+"\nDamage: "
                        + this.target.data.attackDmg + "\nRange: " + this.target.data.attackRange + "\nAtk Speed: " + this.target.data.attackRate;
                    this.hpTexto.text = "" + this.target.dataq.hp;
                    this.armorTexto.text = "" + this.target.dataq.armor;
                }
            }
            this.game.world.bringToTop(this.boxGroup);
        }
        update() {
            if (this.isShowing) {
                this.descricaoBox.x = this.target.world.x + this.target.width/2;
                this.descricaoBox.y = this.target.world.y;
                this.descTexto.alignIn(this.descricaoBox, Phaser.TOP_LEFT);
                this.descTexto.x += 10;
                this.descTexto.y += 10;  
                this.boxGroup.getTop().alignIn(this.descTexto, Phaser.TOP_CENTER, 0, -20);
            }
        }

        onDownUnit(unit : Unit) {
            var entityManager = Kodo.GameScene.instance.uiEntityManager;
            if (entityManager.descricaoBox) {
                entityManager.boxGroup.removeAll();
                
                if (entityManager.tileArray.length > 0) {
                    entityManager.tileArray.forEach(tile => {
                        if (tile.inputEnabled == true) {
                            tile.inputEnabled = false;
                            tile.input.useHandCursor = false;
                            tile.events.onInputDown.removeAll();
                        }
                    });
                    entityManager.tileArray = [];
                }
            }

            if (entityManager.target != unit || !entityManager.isShowing) {
                entityManager.isShowing = true;
                entityManager.descricaoString = unit.dataq.name + "\n" 
                    + "\nDamage: " + unit.data.attackDmg + "\nRange: " + unit.data.attackRange + "\nAtk Speed: " + unit.data.attackRate;

                var style = {
                    font: "Baloo Paaji", fill: 'white', wordWrap: false, align: "center"
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
                entityManager.descricaoBox.alpha = 0.5;
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

                entityManager.hpTexto = this.game.add.text(200, 100, "" + unit.dataq.hp, style);
                entityManager.hpTexto.fontSize = 16;
                entityManager.hpTexto.alpha = 0.9;
                entityManager.hpTexto.alignIn(hp_icon, Phaser.CENTER, 0, 1);

                entityManager.armorTexto = this.game.add.text(200, 100, "" + unit.dataq.armor, style);
                entityManager.armorTexto.fontSize = 16;
                entityManager.armorTexto.alpha = 0.9;
                entityManager.armorTexto.alignIn(armor_icon, Phaser.CENTER, 0, 3);

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
                    entityManager.trainButton.destroy();
                }
                if (entityManager.tileArray.length > 0) {
                    entityManager.tileArray.forEach(tile => {
                        if (tile.inputEnabled == true) {
                            tile.inputEnabled = false;
                            tile.input.useHandCursor = false;
                            tile.events.onInputDown.removeAll();
                        }
                    });
                    entityManager.tileArray = [];
                }

            }
            if (entityManager.trainButton) {
                entityManager.trainButton.destroy();
            }
            if (entityManager.target != building || !entityManager.isShowing) {
                entityManager.isShowing = true; 
                if (building instanceof Tower) {
                    entityManager.descricaoString = building.dataq.name + "\n\nDamage: " 
                         + building.data.attackDmg + "\nRange: " + building.data.attackRange + "\nAtk Speed: " + building.data.attackRate;
                }
                else {
                    entityManager.descricaoString = building.dataq.name + "\n" + "\n"+Kodo[building.dataq.name].description;
                }
                var style = {
                    font: "Baloo Paaji", fill: 'white', wordWrap: false, align: "center"
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
                entityManager.descricaoBox.alpha = 0.5;
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

                entityManager.hpTexto = this.game.add.text(200, 100, "" + building.dataq.hp, style);
                entityManager.hpTexto.fontSize = 16;
                entityManager.hpTexto.alpha = 0.9;
                entityManager.hpTexto.alignIn(hp_icon, Phaser.CENTER, 0, 1);

                entityManager.armorTexto = this.game.add.text(200, 100, "" + building.dataq.armor, style);
                entityManager.armorTexto.fontSize = 16;
                entityManager.armorTexto.alpha = 0.9;
                entityManager.armorTexto.alignIn(armor_icon, Phaser.CENTER, 0, 3);

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


                    Kodo.GameScene.instance.getOuterTiles(building).forEach(tile => {
                        tile.inputEnabled = true;
                        tile.input.useHandCursor = true;
                        tile.events.onInputDown.add(entityManager.onDownTile.bind(this), this);

                        entityManager.tileArray.push(tile);
                        //tile.events.onInputOut.add(this.onOut.bind(this), this);
                    });  

                    var texture = building.data.spamData.isTraining ? 'pauseButton' : 'trainButton';

                    entityManager.trainButton = this.game.add.button(building.x + building.width / 2, building.y + building.height / 2, texture, entityManager.onClickTrainButton.bind(this), this, 1, 0, 2);
                    entityManager.trainButton.anchor.setTo(0.5, 0.5);
                    entityManager.trainButton.alpha = 0.9;
                }
            }
            else {
                entityManager.isShowing = false; 
                entityManager.target = null;
            }
        }
        onClickTrainButton(button : Phaser.Button) {
            var entityManager = Kodo.GameScene.instance.uiEntityManager;

            if (entityManager.target.data.spamData.isTraining) {
                button.loadTexture('trainButton');
                Client.askPauseUnit(entityManager.target.id);
            }
            else {
                button.loadTexture('pauseButton');
                Client.askTrainUnit(entityManager.target.id);
            }
        }
        /* onClickPauseButton(button: Phaser.Button) {
            var entityManager = Kodo.GameScene.instance.uiEntityManager;

            Client.askPauseUnit(entityManager.target.id);

            button.loadTexture('trainButton');
            button.events.onInputDown.removeAll();
            button.events.onInputDown.add(entityManager.onClickTrainButton.bind(this), this);
        } */
        /* appearTrainButton(building) {
            this.trainButton = this.game.add.button(building.x + building.width / 2, building.y + building.height / 2, 'trainButton', this.onClickTrainButton.bind(this), this, 1, 0, 2);
            this.trainButton.anchor.setTo(0.5, 0.5);
            this.trainButton.alpha = 0.9;
        } */
        onDownTile(tile : Tile) {
            var entityManager = Kodo.GameScene.instance.uiEntityManager;

            entityManager.tileMark.x = tile.x;
            entityManager.tileMark.y = tile.y;

            //mandar pro server
            Client.askSpamTileMark(tile.row, tile.col, entityManager.target.id);
        }
    }
}