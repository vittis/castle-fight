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
var EffectBuilding_1 = require("./EffectBuilding");
var HeroShrine = (function (_super) {
    __extends(HeroShrine, _super);
    function HeroShrine(row, col) {
        return _super.call(this, row, col, require('clone')(require('../data/buildings/heroShrine.json'))) || this;
    }
    HeroShrine.prototype.canDoEffect = function () {
        var canDo = false;
        if (this.owner.getAllUnits().length > 0) {
            this.owner.getAllUnits().forEach(function (unit) {
                if (unit.data.statusData.heroBuff == false) {
                    canDo = true;
                }
            });
        }
        else {
            canDo = false;
        }
        return canDo;
    };
    HeroShrine.prototype.doEffect = function () {
        var allUnits = this.owner.getAllUnits();
        var unit;
        do {
            unit = allUnits[Math.floor(Math.random() * allUnits.length)];
        } while (unit.data.statusData.heroBuff == true);
        unit.data.maxHP += 10;
        unit.data.hp += 10;
        unit.data.attackDmg += 3;
        unit.data.attackRate = Math.max(1, unit.data.attackRate - 2);
        unit.data.statusData.heroBuff = true;
    };
    return HeroShrine;
}(EffectBuilding_1.EffectBuilding));
exports.HeroShrine = HeroShrine;
