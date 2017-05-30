module Kodo {

    export class ArmorBar extends Phaser.Image {

        entity: Entity;

        maxArmor: number;
        cuts: number;

        lenght : number;

        constructor(game: Phaser.Game, entity: Entity) {

            var line: Phaser.Line;
            var graphicsLine;
            line = new Phaser.Line(0, 0, 0, GameConfig.tileSize == 64 ? -45 : 26);

            graphicsLine = game.make.graphics(0, 0);
            graphicsLine.lineStyle(GameConfig.tileSize == 64 ? 6 : 4, 0x808080, 1);
            graphicsLine.moveTo(line.start.x, line.start.y);
            graphicsLine.lineTo(line.end.x, line.end.y);
            graphicsLine.endFill();

            super(game, line.start.x, line.start.y, graphicsLine.generateTexture());
            this.visible = false;
            this.entity = entity;
            this.maxArmor = entity.dataq.maxArmor;
            this.cuts = 1 / this.maxArmor;
            this.angle = 180;

            this.lenght = line.end.y;

            game.add.existing(this);
        }


        update() {
            if (this.visible) {
                if (this.entity.isHost) {
                    this.x = this.entity.x + 2 + 5;
                    this.y = this.entity.y + GameConfig.tileSize - 5;
                }
                else {
                    this.x = this.entity.x + GameConfig.tileSize - 5 + 5;
                    this.y = this.entity.y + GameConfig.tileSize - 5;
                }
            }

        }

        receiveDamage(newArmor: number) {
            var line: Phaser.Line;
            var graphicsLine;

            var t = this.maxArmor - newArmor;

            //console.log(Phaser.Math.linear(-45, 0, 0 + this.cuts * t));
            line = new Phaser.Line(0, 0, 0, Phaser.Math.linear(-45, 0, 0 + this.cuts * t));
            this.lenght = line.end.y;

            graphicsLine = this.game.make.graphics(0, 0);
            graphicsLine.lineStyle(GameConfig.tileSize == 64 ? 6 : 4, 0x808080, 1);
            graphicsLine.moveTo(line.start.x, line.start.y);
            graphicsLine.lineTo(line.end.x, line.end.y);
            graphicsLine.endFill();

            this.setTexture(graphicsLine.generateTexture());
            //this.anchor.setTo(0.5, 0.5);
            this.angle = 180;
            this.visible = true;
            this.game.time.events.add(5500, this.hideBar.bind(this), this);
        }
        hideBar() {
            this.visible = false;
        }
    }
}