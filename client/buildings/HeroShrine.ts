module Kodo {
    export class HeroShrine extends EffectBuilding {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'heroShrineh'
            }
            else {
                texture = 'heroShrinec'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}