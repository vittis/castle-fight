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

    middlePoints = [{ row: 7, col: 26 }, { row: 7, col: 28 }];


    state : BotStatus;

    waitTime;

    meleeBuildings = ["ThiefsTent", "Barracks", "TechStation"];

    nextCard = null;


    constructor(player: ServerPlayer, isHost: boolean, gm: GridManager) {
        super(player, isHost, gm);
        this.state = BotStatus.START;
        this.waitTime=8;
    }


    step() {
        this.counter++;
        console.log(this.state + ", G: " + this.resourceManager.gold + ", W:"+this.resourceManager.wood);
        if (this.state == BotStatus.START) {
            if (this.counter >= this.waitTime) {
                let pos = this.botPoints[Math.floor(Math.random() * this.botPoints.length)];
                if (this.gm.tileAt(pos.row, pos.col).entity == null) {
                    var building;
                    if (this.nextCard) {
                        building = this.nextCard;
                        if (this.nextCard == "ArcheryRange") {
                            this.state = BotStatus.WAITING;
                            this.waitTime = 20;
                            this.counter=0;
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
                let pos = this.topPoints[Math.floor(Math.random() * this.topPoints.length)];
                if (this.gm.tileAt(pos.row, pos.col).entity == null) {
                    if (this.nextCard) {
                        building = this.nextCard;
                        this.nextCard = null;
                    }
                    else {
                        building = this.meleeBuildings[Math.floor(Math.random() * this.meleeBuildings.length)];
                    }
                    this.buildBuilding(new (require('./building/' + building))[building](pos.row, pos.col))
                    this.counter = 0;
                    this.waitTime = 15;
                }
            }
        }




    }
}
