module Kodo {
    export class StorageBarn extends SpamBuilding {



        constructor(game: Phaser.Game, tile: Tile, id: number, isHost, data) {
            var texture;
            if (isHost) {
                texture = 'storageBarnh'
            }
            else {
                texture = 'storageBarnc'
            }
            super(game, tile, id, isHost, texture, data);

        }


    }
}