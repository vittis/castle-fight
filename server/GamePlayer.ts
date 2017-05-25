import { ServerPlayer } from "./ServerPlayer";
import { Entity } from "./Entity";
import { Unit } from "./Unit";
import { Building } from "./Building";
import { SpamBuilding } from "./building/SpamBuilding";

export class GamePlayer {

    serverPlayer : ServerPlayer;

    entities : Entity[] = [];

    constructor(player : ServerPlayer) {
        this.serverPlayer = player;
    }

    addEntity(e : Entity) {
        e.owner = this;
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

    getAllBuildings() : Building[] {
        var buildings : Building[] = [];
        this.entities.forEach(e => {
            if (e instanceof Building) {
                buildings.push(e);
            }
        });
        return buildings;
    }
    getSpamBuildings() : SpamBuilding[] {
        var buildings : SpamBuilding[] = [];
        this.getAllBuildings().forEach(e => {
            if (e instanceof SpamBuilding) {
                buildings.push(e);
            }
        });
        return buildings;
    }

    getAllEntities() {
        return this.entities;
    }

    removeEntity(entity : Entity) {
        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i] == entity) {
                this.entities.splice(i, 1);
            }            
        }
    }

}