import { Entity } from "./Entity";
import { Tile } from "./Tile";

export module DataSerializer {
    export function SerializeEntity(entity : Entity) {
        var obj: any = {};
        
        obj.row = entity.tile.row;
        obj.col = entity.tile.col;
        obj.data = entity.getEntityData();
        obj.owner = entity.owner.serverPlayer.id;

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
}