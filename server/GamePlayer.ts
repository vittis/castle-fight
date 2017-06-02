import { ServerPlayer } from "./ServerPlayer";
import { Entity } from "./Entity";
import { Unit } from "./Unit";
import { Building } from "./Building";
import { SpamBuilding } from "./building/SpamBuilding";
import { ResourceManager } from "./ResourceManager";
import { GridManager } from "./GridManager";

export class GamePlayer {
    static lastEntityID = 0;

    serverPlayer : ServerPlayer;

    isHost : boolean;

    entities : Entity[] = [];

    resourceManager : ResourceManager;

    gm : GridManager;

    constructor(player : ServerPlayer, isHost : boolean, gm : GridManager) {
        this.serverPlayer = player;
        this.isHost = isHost;
        this.gm = gm;

        this.resourceManager = new ResourceManager();
    }
    buildBuilding(b : Building) {
        if (this.resourceManager.canBuild(b.data.goldCost, b.data.woodCost)) {
            this.resourceManager.subtract(b.data.goldCost, b.data.woodCost);
            this.addEntity(b);
        }
        else {
            //throw Error("n tem recursos");
        }
    }

    
    addEntity(e : Entity) {
        e.owner = this;
        e.id = GamePlayer.lastEntityID;
        GamePlayer.lastEntityID++;
        this.entities.push(e);
        e.addToGame(this.gm);
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