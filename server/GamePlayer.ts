import { ServerPlayer } from "./ServerPlayer";
import { Entity } from "./Entity";
import { Unit } from "./Unit";

export class GamePlayer {

    serverPlayer : ServerPlayer;

    entities : Entity[] = [];

    constructor(player : ServerPlayer) {
        this.serverPlayer = player;
    }

    addEntity(e : Entity) {
        this.entities.push(e);
    }

    getAllUnits() : Unit[] {
        var units : Unit[] = [];

        this.entities.forEach(e => {
            if (e instanceof Unit) {
                units.push(e);
            }
        });

        return units;
    }
    getAllEntities() {
        return this.entities;
    }

}