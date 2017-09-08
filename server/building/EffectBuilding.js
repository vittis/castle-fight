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
var Building_1 = require("../Building");
var EffectBuilding = (function (_super) {
    __extends(EffectBuilding, _super);
    function EffectBuilding(row, col, buildingData) {
        var _this = _super.call(this, row, col, buildingData) || this;
        _this.data.spamData = { hasSpammed: false, spamRateCounter: 0, isTraining: true };
        return _this;
    }
    Object.defineProperty(EffectBuilding.prototype, "data", {
        get: function () {
            return this.dataq;
        },
        enumerable: true,
        configurable: true
    });
    EffectBuilding.prototype.addToGame = function (gm) {
        _super.prototype.addToGame.call(this, gm);
    };
    EffectBuilding.prototype.step = function () {
        if (this.data.spamData.spamRateCounter >= this.data.spamRate) {
            if (this.canDoEffect()) {
                this.doEffect();
                this.data.spamData.spamRateCounter = 0;
                this.data.spamData.hasSpammed = true;
                this.data.spamCount--;
                if (this.data.spamCount <= 0)
                    this.onDeath();
            }
        }
        if (this.data.spamData.isTraining) {
            this.data.spamData.spamRateCounter++;
        }
    };
    EffectBuilding.prototype.resetSpamData = function () {
        this.data.spamData.hasSpammed = false;
    };
    return EffectBuilding;
}(Building_1.Building));
exports.EffectBuilding = EffectBuilding;
