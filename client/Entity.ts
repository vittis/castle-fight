module Kodo {
    export interface EntityData {
        name: string;
        width: number;
        height: number;
        maxHP: number;
        hp?: number;
        maxArmor: number;
        armor: number;
        statusData: StatusData;
    }
    export interface StatusData {
        stunned?: boolean;
        shielded?: boolean;
        heroBuff?: boolean
    }
     export abstract class Entity extends Phaser.Sprite {

        tile : Tile;
        id : number;
        dataq: EntityData;

        isHost : boolean;

        hpBar : HealthBarSmooth;
        armorBar : ArmorBarSmooth;

        barGroup : Phaser.Group;

        static nome;
        static width;
        static height;
        static description;

        descricaoBox: Phaser.Image;
        descTexto: Phaser.Text;
        descricaoString: string;
        
        fade;
        
        constructor(game: Phaser.Game, tile : Tile, id : number, isHost, texture : string, data : EntityData) {
            super(game, tile.x, tile.y, texture);
            this.id = id;
            this.dataq = data;
            this.isHost = isHost;

            var row = tile.row;
            var col = tile.col;

            this.tile = tile;
            
            for (var i = 0; i < this.dataq.width; i++) {
                for (var j = 0; j < this.dataq.height; j++) {
                    Kodo.GameScene.instance.grid[row + j][col + i].entity = this;
                }
            }

            this.armorBar = new ArmorBarSmooth(this.game, this);
            this.hpBar = new HealthBarSmooth(this.game, this);
            this.barGroup = this.game.add.group();
            this.barGroup.add(this.hpBar);
            this.barGroup.add(this.armorBar);

            this.inputEnabled = true;
            this.input.useHandCursor = true;
            this.events.onInputOver.add(this.onOver.bind(this), this);
            this.events.onInputOut.add(this.onOut.bind(this), this);

            this.fade = this.game.add.tween(this).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None);
            this.fade.onComplete.add(function destroyMe() {
                this.destroy();
            }, this);


            game.add.existing(this);
        }

        onOver() {
            this.hpBar.visible = true;
            if (this.dataq.maxArmor > 0)
                this.armorBar.visible = true;

        }
         onOut() {
             this.hpBar.visible = false;
             this.armorBar.visible = false;
         }

        updateStep(newData : EntityData, tile? : Tile) {
            if (newData.hp < this.dataq.hp || newData.armor < this.dataq.armor) {
                this.armorBar.receiveDamage(newData.armor);
                this.hpBar.receiveDamage(newData.hp);
                if (this.hpBar.lenght < this.armorBar.lenght)
                    this.barGroup.moveUp(this.armorBar);
                else 
                    this.barGroup.moveUp(this.hpBar);

                this.dataq = newData;
                this.receiveDamage();
            }
            else {
                if (newData.statusData.stunned) {
                    this.tint = 0xbedbff;
                }
                else {
                    this.resetColor();
                } 
                this.dataq = newData;
            } 

        }
        receiveDamage() {
            this.tint = 0xff3030;
            if(this.game != null)
                this.game.time.events.add(200, this.resetColor.bind(this), this);
        }
        resetColor() {
            if (!this.dataq.statusData.stunned) {
                this.tint = 0xFFFFFF;
            }
            else {
                this.tint = 0xbedbff;
            }
        }
        onDeath() {
            for (var i = 0; i < this.dataq.width; i++) {
                for (var j = 0; j < this.dataq.height; j++) {
                    Kodo.GameScene.instance.grid[this.tile.row + j][this.tile.col + i].entity = null;
                }
            }
            this.armorBar.destroy();
            this.hpBar.destroy();
/*             let fade = this.game.add.tween(this).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None);
            fade.onComplete.add(function destroyMe() {
                this.destroy();
            }, this); */ 
            this.fade.start();
            //this.destroy(); 
             if (Kodo.GameScene.instance.uiEntityManager.target == this) {
                 Kodo.GameScene.instance.uiEntityManager.target = null;
                if (this instanceof SpamBuilding) {
                    if (Kodo.GameScene.instance.uiEntityManager.isShowing) {
                        if (Kodo.GameScene.instance.uiEntityManager.tileMark != null) {
                            Kodo.GameScene.instance.uiEntityManager.tileMark.destroy();
                            Kodo.GameScene.instance.uiEntityManager.tileClickArray.forEach(t => {
                                t.visible = false;
                            });
                        }
                    }
                    Kodo.GameScene.instance.uiEntityManager.trainButton.visible = false;
                }
                Kodo.GameScene.instance.uiEntityManager.isShowing = false;
                Kodo.GameScene.instance.uiEntityManager.boxGroup.removeAll();

            } 
        }
        
    }
}