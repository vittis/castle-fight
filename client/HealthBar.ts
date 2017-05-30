module Kodo {

    export class HealthBar extends Phaser.Image {

        entity : Entity;

        maxHp : number;
        cuts : number;

        lenght : number;

        constructor(game: Phaser.Game, entity : Entity) {

            var line: Phaser.Line;
            var graphicsLine;
            line = new Phaser.Line(0, 0, 0, GameConfig.tileSize == 64 ? -45 : 26);
            graphicsLine = game.make.graphics(0, 0);
            graphicsLine.lineStyle(GameConfig.tileSize == 64 ? 6 : 4, 0xd42a2a, 1);
            graphicsLine.moveTo(line.start.x, line.start.y);
            graphicsLine.lineTo(line.end.x, line.end.y);
            graphicsLine.endFill();

            super(game, line.start.x, line.start.y, graphicsLine.generateTexture());
            this.visible = false;
            this.entity = entity;
            this.maxHp = entity.dataq.maxHP;
            this.cuts = 1/this.maxHp;


            this.lenght = line.end.y;

            game.add.existing(this);
        }


        update() {
            if (this.visible) {
                if (this.entity.isHost) {
                    this.x = this.entity.x +2 + 5;
                    this.y = this.entity.y + GameConfig.tileSize - 5;
                }
                else {
                    this.x = this.entity.x + GameConfig.tileSize - 5 + 5;
                    this.y = this.entity.y + GameConfig.tileSize - 5;
                }
            }
            
        }

        receiveDamage(newHealth : number) {
            var line: Phaser.Line;
            var graphicsLine;

            var t = this.maxHp - newHealth;

            //console.log(Phaser.Math.linear(-45, 0, 0 + this.cuts * t));
            line = new Phaser.Line(0, 0, 0, Phaser.Math.linear(-45, 0, 0+this.cuts*t));
            this.lenght = line.end.y;
            graphicsLine = this.game.make.graphics(0, 0);
            graphicsLine.lineStyle(GameConfig.tileSize == 64 ? 6 : 4, 0xd42a2a, 1);
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