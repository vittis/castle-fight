module Kodo {
    export class MagesGuild extends SpamBuilding {

        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'magesGuildh'
            }
            else {
                texture = 'magesGuildc'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}
