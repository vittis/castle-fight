import { GamePlayer } from "./GamePlayer";
import { ServerPlayer } from "./ServerPlayer";
import { GridManager } from "./GridManager";
import { ThiefsTent } from "./building/ThiefsTent";

export enum BotStatus {
    START,
    AGRESSIVE,
    WAITING
}

export class GameBot extends GamePlayer {

    counter = 0;

    botPoints = [{row: 11, col:26}, {row: 13, col:27}, {row:9, col:28}, {row: 9, col:26}];

    topPoints = [{ row: 3, col: 26 }, { row: 5, col: 27 }, { row: 1, col: 28 }, { row: 1, col: 26 }];

    middlePoints = [{ row: 7, col: 25 }, { row: 7, col: 27 }];


    state : BotStatus;

    waitTime;

    meleeBuildings = ["ThiefsTent", "Barracks", "TechStation", "Barn"];

    goldBuildings = ["ThiefsTent", "Barracks", "TechStation", "ArcheryRange", "Barn"];

    woodBuildings = ["StorageBarn", "KingsCourt", "GravityChamber", "SpecialFacility", "MagesGuild"];

    nextCard = null;


    constructor(player: ServerPlayer, isHost: boolean, gm: GridManager) {
        super(player, isHost, gm);
        this.state = BotStatus.START;
        this.waitTime=8;
        this.resourceManager.incomeRate +=5;
    }


    step() {
        this.counter++;
        if (this.state == BotStatus.START) {
            if (this.counter >= this.waitTime) {
                let pos = this.botPoints[Math.floor(Math.random() * this.botPoints.length)];
                if (this.gm.tileAt(pos.row, pos.col).entity == null) {
                    let building;
                    if (this.nextCard) {
                        building = this.nextCard;
                        if (this.nextCard == "ArcheryRange") {
                            this.state = BotStatus.WAITING;
                            this.waitTime = 50;
                            this.counter=0;
                            this.nextCard = "ThiefsTent";
                        }
                        this.nextCard = null;
                    }
                    else {
                        building = this.meleeBuildings[Math.floor(Math.random() * this.meleeBuildings.length)];
                    }
                    this.buildBuilding(new (require('./building/' + building))[building](pos.row, pos.col))
                    this.counter = 0;
                    this.waitTime = 3;
                    this.nextCard = "ThiefsTent";
                    if (this.getSpamBuildings().length == 2) {
                        this.counter = 0;
                        this.waitTime = 18;
                        this.nextCard = "ArcheryRange";
                    }
                }
            }
            
            

        }

        if (this.state == BotStatus.WAITING) {
            if (this.counter >= this.waitTime) {
                let building : string;
                if (this.nextCard) {
                    building = this.nextCard;
                    this.nextCard = null;
                }
                else {
                    building = this.meleeBuildings[Math.floor(Math.random() * this.meleeBuildings.length)];
                }                
                let pos = this.topPoints[Math.floor(Math.random() * this.topPoints.length)];
                if (this.gm.tileAt(pos.row, pos.col).entity == null) {
                    this.buildBuilding(new (require('./building/' + building))[building](pos.row, pos.col))
                    this.counter = 0;
                    this.waitTime = 15;
                    this.state = BotStatus.AGRESSIVE;
                }
                
            }
        }

        if (this.state == BotStatus.AGRESSIVE) {
            if (this.counter >= this.waitTime) {
                let building;
                if (this.resourceManager.wood >= 160) {
                    building = this.woodBuildings[Math.floor(Math.random() * this.woodBuildings.length)];
                }
                else {
                    building = this.goldBuildings[Math.floor(Math.random() * this.goldBuildings.length)];
                }
                let pos;
                if (this.gm.tileAt(7, 25).entity == null || this.gm.tileAt(7, 27).entity == null) {
                    if (this.gm.tileAt(7, 26).entity == null) {
                        pos = {row: 7, col:25};
                    }
                    else {
                        pos = { row: 7, col: 27 };
                    }
                }
                else {
                    if (Math.random() >= 0.5) {
                        pos = this.botPoints[Math.floor(Math.random() * this.botPoints.length)];
                    }
                    else {
                        pos = this.topPoints[Math.floor(Math.random() * this.topPoints.length)];
                    }
                }
                if (this.gm.tileAt(pos.row, pos.col).entity == null) {
                    this.buildBuilding(new (require('./building/' + building))[building](pos.row, pos.col))
                    this.counter = 0;
                    this.waitTime = 5;
                }


            }

        }


    }
}
