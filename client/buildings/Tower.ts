module Kodo {
    export class Tower extends Building {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'towerh'
            }
            else {
                texture = 'towerc'
            }
            super(game, tile, id, isHost, texture, data);

        }

        attack(tile: Tile) {
            new Projectile(this.game, this.x + this.width/2, this.y + this.height/2, tile, this.isHost).scale.setTo(1.6, 1.6);
        }

        updateStep(newData: UnitData, tile: Tile) {
            super.updateStep(newData);

            if (this.data.attackData.hasAttacked) {
                this.attack(Kodo.GameScene.instance.grid[this.data.attackData.row][this.data.attackData.col]);
            }
        }
    }
}