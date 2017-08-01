import { GameConfig } from "./GameConfig";

export class ResourceManager {

    gold : number;
    wood : number;

    income : number;
    incomeRate : number;
    incomeRateCounter : number = 0;

    constructor() {
        this.gold = GameConfig.STARTING_GOLD;
        this.wood = GameConfig.STARTING_WOOD;
        this.incomeRate = GameConfig.STARTING_INCOME_RATE;
        this.income = GameConfig.STARTING_INCOME;
    }

    step() {
        this.incomeRateCounter++;
        if (this.incomeRateCounter == this.incomeRate) {
            this.gold += this.income;
            this.incomeRateCounter = 0;
        }
    }
    canBuild(goldCost, woodCost) {
        var canBuild = false;
        if (this.gold >= goldCost && this.wood >= woodCost) {
            canBuild = true;
        }
        return canBuild;
    }
    subtract(goldCost, woodCost) {
        this.gold -= goldCost;
        this.wood -= woodCost;
    }
    add(gold, wood) {
        this.gold += gold;
        this.wood += wood;
    }


    /*addIncome(number) {
        this.income+=
    }




    addGold(number) {
        this.gold += number;
    }
    subtractGold(number) {
        this.gold -= number;
    }
    addWood(number) {
        this.wood += number;
    }
    subtractWood(number) {
        this.wood -= number;
    }*/

}