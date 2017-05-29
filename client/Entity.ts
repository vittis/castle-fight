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
        data: EntityData;

        constructor(game: Phaser.Game, tile : Tile, id : number, isHost, texture : string, data : EntityData) {
            super(game, tile.x, tile.y, texture);
            this.id = id;
            this.data = data;
            game.add.existing(this);
        }


        update() {

        }

        updateStep(newData : EntityData, tile? : Tile) {
            if ((newData.hp < this.data.hp) || newData.armor < this.data.armor) {
                this.changeColor();
                //this.game.time.events.add(400, this.changeColor.bind(this), this);
            }
            this.data = newData;
        }
        changeColor() {
            this.tint = 0xff3030;
            this.game.time.events.add(100, this.resetColor.bind(this), this);
        }

        resetColor() {
            this.tint = 0xFFFFFF;
        }
        onDeath() {
            this.destroy();
        }
    }
}