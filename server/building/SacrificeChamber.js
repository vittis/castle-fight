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
var SacrificeChamber = (function (_super) {
    __extends(SacrificeChamber, _super);
    function SacrificeChamber(row, col) {
        var _this = _super.call(this, row, col, require('clone')(require('../data/buildings/sacrificeChamber.json'))) || this;
        _this.unitsKilled = 0;
        return _this;
    }
    SacrificeChamber.prototype.canDoEffect = function () {
        var canDo = false;
        if (this.owner.getAllUnits().length > 0) {
            this.owner.getAllUnits().forEach(function (unit) {
                if (unit.data.maxHP == unit.data.hp) {
                    canDo = true;
                }
            });
        }
        else {
            canDo = false;
        }
        return canDo;
    };
    SacrificeChamber.prototype.doEffect = function () {
        var allUnits = this.owner.getAllUnits();
        var unit;
        do {
            unit = allUnits[Math.floor(Math.random() * allUnits.length)];
        } while (unit.data.hp != unit.data.maxHP);
        unit.data.hp = 0;
        this.unitsKilled++;
    };
    SacrificeChamber.prototype.onDeath = function () {
        this.owner.resourceManager.add(50 * this.unitsKilled, 0);
        _super.prototype.onDeath.call(this);
    };
    return SacrificeChamber;
}(EffectBuilding_1.EffectBuilding));
exports.SacrificeChamber = SacrificeChamber;
