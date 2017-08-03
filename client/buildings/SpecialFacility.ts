module Kodo {
    export class SpecialFacility extends SpamBuilding {



        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'specialFacilityh'
            }
            else {
                texture = 'specialFacilityc'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}