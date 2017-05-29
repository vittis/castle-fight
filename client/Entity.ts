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
        hpBar: Phaser.Image;

        constructor(game: Phaser.Game, tile : Tile, id : number, isHost, texture : string, data : EntityData) {
            super(game, tile.x, tile.y, texture);
            this.tile = tile;
            this.tile.entity = this;
            this.id = id;
            this.dataq = data;
            this.isHost = isHost;

            var line: Phaser.Line;
            var graphicsLine;
           
            line = new Phaser.Line(0, 0, 0, GameConfig.tileSize == 64 ? 45 : 26);
   
            graphicsLine = game.make.graphics(0, 0);
            graphicsLine.lineStyle(GameConfig.tileSize == 64 ? 6 : 4, 0xd42a2a, 1);
            graphicsLine.moveTo(line.start.x, line.start.y);
            graphicsLine.lineTo(line.end.x, line.end.y);
            graphicsLine.endFill();


            this.hpBar = game.add.image(line.start.x, line.start.y, graphicsLine.generateTexture());
            this.hpBar.anchor.setTo(0.5, 0.5);
            graphicsLine.destroy();

            this.hpBar.visible = false;

            game.add.existing(this);
        }


        update() {
            if (this.hpBar.visible) {
                if (this.isHost) {
                    this.hpBar.x = this.x + GameConfig.tileSize/12;
                    this.hpBar.y = this.y + GameConfig.tileSize / 2;
                }
                else {
                    this.hpBar.x = this.x + GameConfig.tileSize - GameConfig.tileSize/8;
                    this.hpBar.y = this.y + GameConfig.tileSize / 2;
                }
            }
        }

        updateStep(newData : EntityData, tile? : Tile) {
            if ((newData.hp < this.dataq.hp) || newData.armor < this.dataq.armor) {
                this.receiveDamage();
                //this.game.time.events.add(400, this.receiveDamage.bind(this), this);
            }
            this.dataq = newData;
        }
        receiveDamage() {
            this.tint = 0xff3030;
            this.hpBar.visible = true;
            this.game.time.events.add(200, this.resetColor.bind(this), this);
            this.game.time.events.add(3500, this.hideBar.bind(this), this);
        }
        hideBar() {
            this.hpBar.visible = false;
        }
        resetColor() {
            this.tint = 0xFFFFFF;
        }
        onDeath() {
            this.hpBar.destroy();
            this.destroy();
        }
    }
}