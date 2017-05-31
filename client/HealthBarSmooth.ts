module Kodo {

    export class HealthBarSmooth extends Phaser.Graphics {

        entity: Entity;

        maxHp: number;
        cuts: number;


        receivedDamage : boolean;

        lenght : number;

        smooth : number;

        constructor(game: Phaser.Game, entity: Entity) {
            super(game, 0, 0);
            this.visible = false;
            this.entity = entity;
            this.maxHp = entity.dataq.maxHP;
            this.cuts = 1 / this.maxHp;


            this.lenght = -45;
            this.smooth = -45;
            game.add.existing(this);
        }


        update() {
            if (this.visible) {
                if (this.entity.isHost) {
                    this.x = this.entity.x + 2 + 4;
                    this.y = this.entity.y + GameConfig.tileSize - 7;                 
                }
                else {
                    this.x = this.entity.x + GameConfig.tileSize - 5 + 5;
                    this.y = this.entity.y + GameConfig.tileSize - 7;
                }
                if (this.smooth < this.lenght) {
                    this.smooth += this.game.time.elapsed / 100 * 6;
                }
                this.clear();
                this.lineStyle(6, 0xd42a2a, 1);
                this.moveTo(0, 0);
                this.lineTo(0, this.smooth);   
            }
            
        }

        receiveDamage(newHealth: number) {
            this.receivedDamage = true;
            var t = this.maxHp - newHealth;

            this.lenght = Phaser.Math.linear(-45, 0, this.cuts * t);
            this.visible = true;
            this.game.time.events.add(5500, this.hideBar.bind(this), this);
        }
        hideBar() {
            this.clear();
            this.visible = false;
            this.receivedDamage = false;
        }
    }
}