module Kodo {

    export interface EffectBuildingData extends EntityData {
        spamCount?: number;
        spamRate?: number;

        spamData?: SpamData;

    }
    export interface EffectData {
        hasSpammed: boolean;
        spamRateCounter: number;
        isTraining: boolean;
    }

    export abstract class EffectBuilding extends Building {

        bar: SpamBarSmooth;

        get data(): EffectBuildingData {
            return this.dataq;
        }
        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, texture: string, data: EntityData) {
            super(game, tile, id, isHost, texture, data);
            this.bar = new SpamBarSmooth(game, this);

        }

        updateStep(newData: SpamBuildingData, tile?: Tile) {
            super.updateStep(newData);

            if (this.data.spamData.hasSpammed) {
                this.bar.resetCounter();
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