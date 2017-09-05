"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GamePlayer_1 = require("./GamePlayer");
var BotStatus;
(function (BotStatus) {
    BotStatus[BotStatus["START"] = 0] = "START";
    BotStatus[BotStatus["AGRESSIVE"] = 1] = "AGRESSIVE";
    BotStatus[BotStatus["WAITING"] = 2] = "WAITING";
})(BotStatus = exports.BotStatus || (exports.BotStatus = {}));
var GameBot = (function (_super) {
    __extends(GameBot, _super);
    function GameBot(player, isHost, gm) {
        var _this = _super.call(this, player, isHost, gm) || this;
        _this.counter = 0;
        _this.botPoints = [{ row: 11, col: 26 }, { row: 13, col: 27 }, { row: 9, col: 28 }, { row: 9, col: 26 }];
        _this.topPoints = [{ row: 3, col: 26 }, { row: 5, col: 27 }, { row: 1, col: 28 }, { row: 1, col: 26 }];
        _this.middlePoints = [{ row: 7, col: 25 }, { row: 7, col: 29 }];
        _this.meleeBuildings = ["ThiefsTent", "Barracks", "TechStation", "Barn"];
        _this.goldBuildings = ["ThiefsTent", "Barracks", "TechStation", "ArcheryRange", "Barn", "WitchsHut"];
        _this.woodBuildings = ["StorageBarn", "KingsCourt", "GravityChamber", "SpecialFacility", "MagesGuild"];
        _this.nextCard = null;
        _this.state = BotStatus.START;
        _this.waitTime = 8;
        _this.resourceManager.incomeRate += 5;
        return _this;
    }
    GameBot.prototype.step = function () {
        this.counter++;
        if (this.state == BotStatus.START) {
            if (this.counter >= this.waitTime) {
                var pos = this.botPoints[Math.floor(Math.random() * this.botPoints.length)];
                if (this.gm.tileAt(pos.row, pos.col).entity == null) {
                    var building = void 0;
                    if (this.nextCard) {
                        building = this.nextCard;
                        if (this.nextCard == "ArcheryRange") {
                            this.state = BotStatus.WAITING;
                            this.waitTime = 50;
                            this.counter = 0;
                            this.nextCard = "ThiefsTent";
                        }
                        this.nextCard = null;
                    }
                    else {
                        building = this.meleeBuildings[Math.floor(Math.random() * this.meleeBuildings.length)];
                    }
                    this.buildBuilding(new (require('./building/' + building))[building](pos.row, pos.col));
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
                var building = void 0;
                if (this.nextCard) {
                    building = this.nextCard;
                    this.nextCard = null;
                }
                else {
                    building = this.meleeBuildings[Math.floor(Math.random() * this.meleeBuildings.length)];
                }
                var pos = this.topPoints[Math.floor(Math.random() * this.topPoints.length)];
                if (this.gm.tileAt(pos.row, pos.col).entity == null) {
                    this.buildBuilding(new (require('./building/' + building))[building](pos.row, pos.col));
                    this.counter = 0;
                    this.waitTime = 15;
                    this.state = BotStatus.AGRESSIVE;
                }
            }
        }
        if (this.state == BotStatus.AGRESSIVE) {
            if (this.counter >= this.waitTime) {
                var building = void 0;
                if (this.resourceManager.wood >= 160) {
                    building = this.woodBuildings[Math.floor(Math.random() * this.woodBuildings.length)];
                }
                else {
                    building = this.goldBuildings[Math.floor(Math.random() * this.goldBuildings.length)];
                }
                var pos = void 0;
                if (this.gm.tileAt(7, 25).entity == null || this.gm.tileAt(7, 27).entity == null) {
                    if (this.gm.tileAt(7, 26).entity == null) {
                        pos = { row: 7, col: 25 };
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
                    this.buildBuilding(new (require('./building/' + building))[building](pos.row, pos.col));
                    this.counter = 0;
                    this.waitTime = 5;
                }
            }
        }
    };
    return GameBot;
}(GamePlayer_1.GamePlayer));
exports.GameBot = GameBot;
