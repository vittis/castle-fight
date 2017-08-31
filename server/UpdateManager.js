"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var Upgrades;
(function (Upgrades) {
    Upgrades[Upgrades["INCOME"] = 0] = "INCOME";
    Upgrades[Upgrades["TRAINING"] = 1] = "TRAINING";
    Upgrades[Upgrades["ATTACK"] = 2] = "ATTACK";
    Upgrades[Upgrades["ATKSPEED"] = 3] = "ATKSPEED";
    Upgrades[Upgrades["RESOURCE"] = 4] = "RESOURCE";
    Upgrades[Upgrades["UNITCOUNT"] = 5] = "UNITCOUNT";
    Upgrades[Upgrades["HP"] = 6] = "HP";
    Upgrades[Upgrades["RANGE"] = 7] = "RANGE";
})(Upgrades = exports.Upgrades || (exports.Upgrades = {}));
var UpdateManager = (function () {
    function UpdateManager(gamePlayer) {
        this.updateRateCounter = 0;
        this.updateCount = 0;
        this.upgradeCosts = [2,
            1,
            2,
            3,
            1,
            3,
            1,
            2];
        this.attackModifier = 0;
        this.atkSpeedModifier = 0;
        this.hpModifier = 0;
        this.armorModifier = 0;
        this.rangeModifier = 0;
        this.spamRateModifier = 0;
        this.unitCountModifier = 0;
        this.gamePlayer = gamePlayer;
        this.updateRate = GameConfig_1.GameConfig.UPDATE_RATE;
    }
    ;
    UpdateManager.prototype.step = function () {
        this.updateRateCounter++;
        if (this.updateRateCounter == this.updateRate) {
            this.updateCount++;
            this.updateRateCounter = 0;
        }
    };
    UpdateManager.prototype.upgrade = function (upgrade) {
        if (this.updateCount >= this.upgradeCosts[upgrade]) {
            this.updateCount -= this.upgradeCosts[upgrade];
            if (upgrade == 0) {
                this.gamePlayer.resourceManager.income += 10;
            }
            else if (upgrade == 1) {
                this.gamePlayer.getSpamBuildings().forEach(function (b) {
                    b.data.spamRate -= 5;
                });
                this.spamRateModifier -= 5;
            }
            else if (upgrade == 2) {
                this.gamePlayer.getAllUnits().forEach(function (u) {
                    u.data.attackDmg += 1;
                });
                this.attackModifier += 1;
            }
            else if (upgrade == 3) {
                this.gamePlayer.getAllUnits().forEach(function (u) {
                    if (u.data.attackRate != 1) {
                        u.data.attackRate -= 1;
                    }
                });
                this.atkSpeedModifier -= 1;
            }
            else if (upgrade == 4) {
                this.gamePlayer.resourceManager.add(50, 50);
            }
            else if (upgrade == 5) {
                this.gamePlayer.getSpamBuildings().forEach(function (b) {
                    b.data.spamCount += 1;
                });
                this.unitCountModifier += 1;
            }
            else if (upgrade == 6) {
                this.gamePlayer.getAllUnits().forEach(function (u) {
                    u.data.maxHP += 1;
                    u.data.hp += 1;
                });
                this.hpModifier += 1;
            }
            else if (upgrade == 7) {
                this.gamePlayer.getAllUnits().forEach(function (u) {
                    if (u.data.attackRange > 1) {
                        u.data.attackRange += 1;
                    }
                });
                this.rangeModifier += 1;
            }
        }
    };
    return UpdateManager;
}());
exports.UpdateManager = UpdateManager;
