import { Entity } from "./Entity";
import { Tile } from "./Tile";
import { GameConfig } from "./GameConfig";

export module DataSerializer {
    export function SerializeEntity(entity : Entity) {
        var obj: any = {};
        
        obj.row = entity.tile.row;
        obj.col = entity.tile.col;
        obj.data = entity.getEntityData();
        obj.owner = entity.owner.serverPlayer.id;
        obj.id = entity.id;
        
        return obj;
    }

    export function SerializeTile(tile : Tile) {
        var obj: any = {};

        obj.row = tile.row
        obj.col = tile.col;
        if (tile.entity == null)
            obj.entity = null;
        else 
            obj.entity = SerializeEntity(tile.entity);


        return obj;
    }
    export function SerializeGrid(grid: Tile[][] = []) {
        var obj : any[][] = [];

        for (var i = 0; i < GameConfig.GRID_ROWS; i++) {
            obj[i] = [];
            for (var j = 0; j < GameConfig.GRID_COLS; j++) {
                obj[i][j] = SerializeTile(grid[i][j]);
            }
        }
        return obj;
    }

}