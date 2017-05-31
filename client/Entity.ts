module Kodo {
    export interface EntityData {
        name: string;
        width: number;
        height: number;
        maxHP: number;
        hp?: number;
        maxArmor: number;
        armor: number;
    }

     export abstract class Entity extends Phaser.Sprite {

        tile : Tile;
        id : number;
        dataq: EntityData;

        isHost : boolean;

        hpBar : HealthBarSmooth;
        armorBar : ArmorBarSmooth;

        barGroup : Phaser.Group;

        constructor(game: Phaser.Game, tile : Tile, id : number, isHost, texture : string, data : EntityData) {
            super(game, tile.x, tile.y, texture);
            this.tile = tile;
            this.tile.entity = this;
            this.id = id;
            this.dataq = data;
            this.isHost = isHost;

            this.armorBar = new ArmorBarSmooth(this.game, this);
            this.hpBar = new HealthBarSmooth(this.game, this);
            this.barGroup = this.game.add.group();
            this.barGroup.add(this.hpBar);
            this.barGroup.add(this.armorBar);

            //this.events.onInputOver.add(this.onOver.bind(this), this);

            game.add.existing(this);
        }
        onOver() {
            this.hpBar.visible = true;
            this.armorBar.visible = true;
        }

        update() {
            
        }

        updateStep(newData : EntityData, tile? : Tile) {
            if (newData.hp < this.dataq.hp || newData.armor < this.dataq.armor) {
                this.armorBar.receiveDamage(newData.armor);
                this.hpBar.receiveDamage(newData.hp);
                if (this.hpBar.lenght < this.armorBar.lenght)
                    this.barGroup.moveUp(this.armorBar);
                else 
                    this.barGroup.moveUp(this.hpBar);

                this.receiveDamage();
            }

            this.dataq = newData;
        }
        receiveDamage() {
            this.tint = 0xff3030;
            this.game.time.events.add(200, this.resetColor.bind(this), this);
        }
        resetColor() {
            this.tint = 0xFFFFFF;
        }
        onDeath() {
            this.armorBar.destroy();
            this.hpBar.destroy();
            this.destroy();
        }
        
    }
}