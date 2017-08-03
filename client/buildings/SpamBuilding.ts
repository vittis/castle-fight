module Kodo {

    export interface SpamBuildingData extends EntityData {
        spamCount?: number;
        spamRate?: number;

        spamData? : SpamData;
    }
    export interface SpamData {
        hasSpammed: boolean;
        spamRateCounter: number;
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
            
            if (this.data.spamData.hasSpammed) {
                this.bar.resetCounter();
            }
            else {
                this.bar.updateCounter(newData.spamData.spamRateCounter);
            }

        }
        onDeath() {
            this.bar.destroy();
            super.onDeath();
        }
    }
}