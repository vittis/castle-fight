module Kodo {

    export interface UnitData extends EntityData {
        attackRange?: number;
        attackDmg?: number;
        attackRate?: number;
        attackData?: AttackData;
    }

    export interface AttackData {
        hasAttacked: boolean;
        row: number;
        col: number;
    }

    export abstract class Unit extends Entity {

        static maxHP;
        static maxArmor;

        static attackDmg;
        static attackRange;
        static attackRate;

        static goldCost = 0;
        static woodCost = 0;

        shield : Phaser.Sprite = null;

        get data(): UnitData {
            return this.dataq;
        }
        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, texture: string, data : EntityData) {
            super(game, tile, id, isHost, texture, data);
            this.events.onInputDown.add(Kodo.GameScene.instance.uiEntityManager.onDownUnit, this);
        }
        update() {
            super.update();
        }
        
        moveTo(tile: Tile) {
            this.tile.entity = null;
            this.tile = tile;
            this.tile.entity = this;
            this.game.add.tween(this).to({ x: tile.x, y: tile.y }, GameConfig.updateRate+75, Phaser.Easing.Linear.None, true);
        }

        attack(tile: Tile) {
            
        }

        updateStep(newData : UnitData, tile : Tile) {
            super.updateStep(newData);
            if (tile != this.tile) {
                if (Phaser.Math.distance(this.x, this.y, tile.x, tile.y) > 1) {
                    this.moveTo(tile);
                }
            }
            if (this.data.attackData.hasAttacked) {
                this.attack(Kodo.GameScene.instance.grid[this.data.attackData.row][this.data.attackData.col]);
            }
            if (newData.statusData.shielded) {
                if (this.shield == null) {
                    this.shield = this.game.add.sprite(0, 0, 'shield');
                    this.shield.tint = this.isHost ? 0xe27952 : 0x1b914d;
                    this.addChild(this.shield);
                }
            }
            else {
                if (this.shield != null) {
                    this.removeChild(this.shield);
                    this.shield.destroy();
                    this.shield = null;
                }
            }
        }
        onDeath() {
            super.onDeath();
        }

    }
}