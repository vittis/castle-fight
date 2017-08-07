module Kodo {

    export interface SpamBuildingData extends EntityData {
        spamCount?: number;
        spamRate?: number;

        spamData? : SpamData;

        tileRow?: number;
        tileCol?: number;
    }
    export interface SpamData {
        hasSpammed: boolean;
        spamRateCounter: number;
        isTraining : boolean;
    }

    export abstract class SpamBuilding extends Building {

        bar : SpamBarSmooth;

        static spamUnit : string;

        get data(): SpamBuildingData {
            return this.dataq;
        }
        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, texture: string, data: EntityData) {
            super(game, tile, id, isHost, texture, data);
            this.bar = new SpamBarSmooth(game, this);

        }

        updateStep(newData : SpamBuildingData, tile?: Tile) {
            super.updateStep(newData);
            //console.log(newData.tileRow+", "+newData.tileCol);
            if (this.data.spamData.hasSpammed) {
                this.bar.resetCounter();
                /* if (Kodo.GameScene.instance.uiEntityManager.target == this && this.isHost == GameConfig.isHost)
                    Kodo.GameScene.instance.uiEntityManager.appearTrainButton(this); */
            }
            else {
                this.bar.updateCounter(newData.spamData.spamRateCounter);
                
            }
        }
        onOver() {
            super.onOver();
            Kodo.GameScene.instance.uiEntityManager.onOverSpamBuilding(this);
        }
        onOut() {
           super.onOut();
           Kodo.GameScene.instance.uiEntityManager.onOutSpamBuilding(this);
        } 
        onDeath() {
            this.bar.destroy();
            super.onDeath();
        }
    }
}