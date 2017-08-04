module Kodo {

    export class ArmorBarSmooth extends Phaser.Graphics {

        entity: Entity;

        maxArmor: number;
        cuts: number;


        receivedDamage: boolean;

        lenght: number;

        smooth: number;
        maxLenght: number;

        constructor(game: Phaser.Game, entity: Entity) {
            super(game, 0, 0);
            this.visible = false;
            this.entity = entity;
            this.maxArmor = entity.dataq.maxArmor;
            this.cuts = 1 / this.maxArmor;


            this.maxLenght =  -33 * entity.dataq.height;

            this.lenght = this.maxLenght;
            this.smooth = this.lenght;
            game.add.existing(this);
        }


        update() {
            if (this.visible) {
                if (this.entity.isHost) {
                    this.x = this.entity.x + 2;
                    this.y = this.entity.y + GameConfig.tileSize - 7 + GameConfig.tileSize * (this.entity.dataq.height - 1);
                }
                else {
                    this.x = this.entity.x + GameConfig.tileSize - 5 + 1 + GameConfig.tileSize * (this.entity.dataq.height - 1);
                    this.y = this.entity.y + GameConfig.tileSize - 7 + GameConfig.tileSize * (this.entity.dataq.height - 1);
                }
                if (this.smooth < this.lenght) {
                    this.smooth += this.game.time.elapsed / 100 * 6;
                }
                this.clear();
                this.lineStyle(6, 0x808080, 1);
                this.moveTo(0, 0);
                this.lineTo(0, this.smooth);
            }

        }
        timerEvento;
        receiveDamage(newArmor: number) {
            if (this.maxArmor > 0){
                this.receivedDamage = true;
                var t = this.maxArmor - newArmor;

                this.lenght = Phaser.Math.linear(this.maxLenght, 0, this.cuts * t);
                this.visible = true;

                this.game.time.events.remove(this.timerEvento);
                this.timerEvento = this.game.time.events.add(5500, this.hideBar.bind(this), this);
            }
        }
        hideBar() {
            this.clear();
            this.visible = false;
            this.receivedDamage = false;
        }
    }
}