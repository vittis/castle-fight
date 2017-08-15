module Kodo {

    export class SpamBarSmooth extends Phaser.Graphics {

        building: SpamBuilding;

        spamRate: number;
        cuts: number;

        lenght: number;

        maxLenght : number;

        smooth: number;

        containerBar : Phaser.Image;

        unitsCountBar : Phaser.Image[] = [];

        currentTime = 0;
        timeToMove = GameConfig.updateRate/1000;// + 0.05;
        fadeIn: boolean = false;
        fadeOut: boolean = false;

        constructor(game: Phaser.Game, building: SpamBuilding) {
            super(game, 0, 0);
            this.building = building;
            this.spamRate = building.data.spamRate;
            this.cuts = 1 / this.spamRate;
            
            this.x = this.building.x + GameConfig.tileSize/2 - 2;
            this.y = this.building.y + GameConfig.tileSize * building.data.height - 12;

            this.smooth = 0;
            this.lenght = 0;
            this.maxLenght = 52;
            this.alpha = 0.8;
            game.add.existing(this);
            
            var bar = game.make.graphics(0, 0);
            bar.beginFill();
            bar.lineStyle(6, 0xffffff, 1);
            bar.moveTo(0, 0);
            bar.lineTo(this.maxLenght, 0);
            bar.endFill();
            this.containerBar = game.add.sprite(this.x, this.y, bar.generateTexture());
            bar.destroy();

            game.world.swap(this, this.containerBar);
            this.containerBar.alpha = 0.5;
            this.containerBar.y -= 6;
            this.containerBar.x -= 6;
            for (var i=0; i<building.data.spamCount; i++) {
                var bar2 = game.make.graphics(0, 0);
                bar2.beginFill();
                bar2.lineStyle(5, 0xffd700, 1);
                bar2.moveTo(0, 0);
                bar2.lineTo(this.maxLenght/building.data.spamCount - 5, 0);
                bar2.endFill();
                this.unitsCountBar[i] = game.add.sprite(this.x, this.y, bar2.generateTexture());
                bar2.destroy();
                this.unitsCountBar[i].alpha = 0.9;
                this.unitsCountBar[i].y += 3;
                this.unitsCountBar[i].x -= 5;
                this.unitsCountBar[i].x += i * (this.maxLenght / building.data.spamCount) + 5/2;
            }

        }

        update() {
            if (this.building.data.spamData.isTraining) {
                if (this.smooth < this.maxLenght) {
                    this.currentTime += this.game.time.elapsed * 0.001;
                    this.smooth = Phaser.Math.linear(0, this.maxLenght, this.currentTime/(this.timeToMove*this.spamRate));
                }
                this.clear();
                this.lineStyle(6, 0xffd700, 1);
                this.moveTo(0, 0);
                this.lineTo(this.smooth, 0);
            }

            if (this.fadeOut) {
                var bar = this.unitsCountBar[this.unitsCountBar.length - 1];
                bar.alpha -= this.game.time.elapsed*0.001;
                if (bar.alpha < 0) {
                    bar.destroy();
                    this.unitsCountBar.splice(this.unitsCountBar.length - 1, 1);
                    this.fadeOut = false;
                }

            }

        }
        
        updateCounter(counter : number) {
            if (counter != 0) {
                counter = counter * -1 + this.spamRate;
                this.smooth = Phaser.Math.linear(0, this.maxLenght, this.cuts * counter);
                this.clear();
                this.lineStyle(6, 0xffd700, 1);
                this.moveTo(0, 0);
                this.lineTo(this.smooth, 0);
            }
            
        }

        resetCounter() {
            this.smooth = 0;
            this.currentTime = 0;

            this.fadeOut = true;
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