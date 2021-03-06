module Kodo {

    export class SpamBarSmooth32 extends Phaser.Graphics {

        building: SpamBuilding;

        spamRate: number;
        cuts: number;

        lenght: number;

        maxLenght: number;

        smooth: number;

        containerBar: Phaser.Image;

        unitsCountBar: Phaser.Image[] = [];

        currentTime = 0;
        timeToMove = 0.58;
        fadeIn: boolean = false;
        fadeOut: boolean = false;

        constructor(game: Phaser.Game, building: SpamBuilding) {
            super(game, 0, 0);
            this.building = building;
            this.spamRate = building.data.spamRate;
            this.cuts = 1 / this.spamRate;

            this.x = this.building.x + GameConfig.tileSize / 2 - 4/2;
            this.y = this.building.y + GameConfig.tileSize * building.data.height + 3/2;

            this.smooth = 0;
            this.lenght = 0;
            this.maxLenght = 68/2;
            this.alpha = 0.8;
            game.add.existing(this);

            var bar = game.make.graphics(0, 0);
            bar.beginFill();
            bar.lineStyle(6/2, 0xffffff, 1);
            bar.moveTo(0, 0);
            bar.lineTo(this.maxLenght, 0);
            bar.endFill();
            this.containerBar = game.add.sprite(this.x, this.y, bar.generateTexture());
            bar.destroy();

            game.world.swap(this, this.containerBar);
            this.containerBar.alpha = 0.5;
            this.containerBar.y -= 6/2;
            this.containerBar.x -= 6/2;
            for (var i = 0; i < building.data.spamCount; i++) {
                var bar2 = game.make.graphics(0, 0);
                bar2.beginFill();
                bar2.lineStyle(5/2, 0xffd700, 1);
                bar2.moveTo(0, 0);
                bar2.lineTo(this.maxLenght / building.data.spamCount - 5/2, 0);
                bar2.endFill();
                this.unitsCountBar[i] = game.add.sprite(this.x, this.y, bar2.generateTexture());
                bar2.destroy();
                this.unitsCountBar[i].alpha = 0.9;
                this.unitsCountBar[i].y += 3/2;
                this.unitsCountBar[i].x -= 5/2;
                this.unitsCountBar[i].x += i * (this.maxLenght / building.data.spamCount) + 5 / 2 / 2;
            }
            //this.fadeUnitBarIn();
            //this.game.time.events.add(4000, this.fadeUnitBarOut.bind(this), this);
        }
        /*fadeUnitBarIn() {
            this.fadeIn = true;
            this.unitsCountBar.forEach(element => {
                element.alpha = 0;
            });
        }
        fadeUnitBarOut() {
            this.fadeOut = true;
            this.unitsCountBar.forEach(element => {
                element.alpha = 1;
            });
        }*/
        update() {
            if (this.smooth < this.maxLenght) {
                this.currentTime += this.game.time.elapsed / 1000;
                this.smooth = Phaser.Math.linear(0, this.maxLenght, this.currentTime / (this.timeToMove * this.spamRate));
            }
            this.clear();
            this.lineStyle(3, 0xffd700, 1);
            this.moveTo(0, 0);
            this.lineTo(this.smooth, 0);


            /*if (this.fadeIn) {
                this.unitsCountBar.forEach(element => {
                    element.alpha += this.game.time.elapsed/1000;
                    if (element.alpha > 1) {
                        this.fadeIn = false;
                    }
                });
            }*/
            if (this.fadeOut) {
                var bar = this.unitsCountBar[this.unitsCountBar.length - 1];
                bar.alpha -= this.game.time.elapsed / 1000;
                if (bar.alpha < 0) {
                    bar.destroy();
                    this.unitsCountBar.splice(this.unitsCountBar.length - 1, 1);
                    this.fadeOut = false;
                }

            }

        }

        updateCounter(counter: number) {
            if (counter != 0) {
                counter = counter * -1 + this.spamRate;
                this.smooth = Phaser.Math.linear(0, this.maxLenght, this.cuts * counter);
            }

        }

        resetCounter() {
            this.smooth = 0;
            this.currentTime = 0;

            this.fadeOut = true;
            //this.fadeUnitBarIn();
            //this.game.time.events.add(4000, this.fadeUnitBarOut.bind(this), this);

        }
        destroy() {
            this.unitsCountBar.forEach(element => {
                element.destroy();
            });
            this.containerBar.destroy();
            super.destroy();
        }
    }
}