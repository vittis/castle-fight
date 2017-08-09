"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var ResourceManager = (function () {
    function ResourceManager() {
        this.incomeRateCounter = 0;
        this.gold = GameConfig_1.GameConfig.STARTING_GOLD;
        this.wood = GameConfig_1.GameConfig.STARTING_WOOD;
        this.incomeRate = GameConfig_1.GameConfig.STARTING_INCOME_RATE;
        this.income = GameConfig_1.GameConfig.STARTING_INCOME;
    }
    ResourceManager.prototype.step = function () {
        this.incomeRateCounter++;
        if (this.incomeRateCounter == this.incomeRate) {
            this.gold += this.income;
            this.incomeRateCounter = 0;
        }
    };
    ResourceManager.prototype.canBuild = function (goldCost, woodCost) {
        var canBuild = false;
        if (this.gold >= goldCost && this.wood >= woodCost) {
            canBuild = true;
        }
        return canBuild;
    };
    ResourceManager.prototype.subtract = function (goldCost, woodCost) {
        this.gold -= goldCost;
        this.wood -= woodCost;
    };
    ResourceManager.prototype.add = function (gold, wood) {
        this.gold += gold;
        this.wood += wood;
    };
    return ResourceManager;
}());
exports.ResourceManager = ResourceManager;
