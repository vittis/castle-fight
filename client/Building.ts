module Kodo {
    export abstract class Building extends Entity {

        static goldCost = 0;
        static woodCost = 0;
        static maxHP;
        static maxArmor;
        static spamCount;
        static spamRate;
        static incomeGain;

        
        get data(): UnitData {
            return this.dataq;
        }

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, texture: string, data : EntityData) {
            super(game, tile, id, isHost, texture, data);
       
            this.events.onInputDown.add(Kodo.GameScene.instance.uiEntityManager.onDownBuilding, this);
        }

        updateStep(data, tile? : Tile) {
            super.updateStep(data);
        }

    }
}