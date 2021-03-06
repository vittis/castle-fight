import { ServerPlayer } from "./ServerPlayer";
import { Entity } from "./Entity";
import { Unit } from "./Unit";
import { Building } from "./Building";
import { SpamBuilding } from "./building/SpamBuilding";
import { ResourceManager } from "./ResourceManager";
import { GridManager } from "./GridManager";
import { AttackBuilding } from "./building/AttackBuilding";
import { UpdateManager } from "./UpdateManager";
import { EffectBuilding } from "./building/EffectBuilding";

export class GamePlayer {
    static lastEntityID = 0;

    serverPlayer : ServerPlayer;

    isHost : boolean;

    entities : Entity[] = [];

    resourceManager : ResourceManager;

    updateManager : UpdateManager;

    gm : GridManager;

    constructor(player : ServerPlayer, isHost : boolean, gm : GridManager) {
        this.serverPlayer = player;
        this.isHost = isHost;
        this.gm = gm;

        this.resourceManager = new ResourceManager();
        this.updateManager = new UpdateManager(this);
    }
    buildBuilding(b) {
        if (this.resourceManager.canBuild(b.data.goldCost, b.data.woodCost)) {
            if (this.gm.tileAt(b.row, b.col).entity == null) {
                if (!(b instanceof Unit)) {
                    this.resourceManager.subtract(b.data.goldCost, b.data.woodCost);
                    if (b.data.woodCost == 0) {
                        this.resourceManager.add(0, b.data.goldCost);
                    }
                    this.resourceManager.income += b.data.incomeGain;
                    this.addEntity(b);
                }
                else {
                    this.resourceManager.subtract(b.data.goldCost, b.data.woodCost);
                    b.justSpawned = true;
                    this.addEntity(b);
                }
            }
        }
        else {
            //console.log("nao ha recursos");
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

    getAttackBuildings(): AttackBuilding[] {
        var buildings: AttackBuilding[] = [];
        this.entities.forEach(e => {
            if (e instanceof AttackBuilding) {
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

    getEffectBuildings(): EffectBuilding[] {
        var buildings: EffectBuilding[] = [];
        this.getAllBuildings().forEach(e => {
            if (e instanceof EffectBuilding) {
                buildings.push(e);
            }
        });
        return buildings;
    }

    getAllEntities() {
        return this.entities;
    }

    getEntityById(id: number): Entity {
        var entity: Entity = null;
        this.entities.forEach(e => {
            if (e.id == id) {
                entity = e;
            }
        });
        return entity;
    }

    removeEntity(entity : Entity) {
        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i] == entity) {
                this.entities.splice(i, 1);
            }            
        }
    }
    idExists(id: number): boolean {
        var jaExisteId: boolean = false;
        this.entities.forEach(e => {
            if (e.id == id) {
                jaExisteId = true;
            }
        });

        return jaExisteId;
    }
}