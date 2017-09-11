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
var Unit_1 = require("../Unit");
var Witch = (function (_super) {
    __extends(Witch, _super);
    function Witch(row, col) {
        var _this = _super.call(this, row, col, require('clone')(require('../data/units/witch.json'))) || this;
        _this.shieldRate = 8;
        _this.shieldRateCounter = 1;
        _this.canShield = false;
        _this.justShielded = false;
        return _this;
    }
    Witch.prototype.doAction = function (targetTile) {
        if (this.canAttack() && !this.justShielded)
            this.attack(targetTile.entity);
    };
    Witch.prototype.step = function () {
        var _this = this;
        _super.prototype.step.call(this);
        this.justShielded = false;
        this.shieldRateCounter++;
        if (this.shieldRateCounter >= this.shieldRate) {
            this.canShield = true;
        }
        if (this.canShield) {
            var jaShieldou = false;
            this.getOuterTilesWithEntity().forEach(function (e) {
                if (e.entity instanceof Unit_1.Unit) {
                    if (e.entity.owner.isHost == _this.owner.isHost && !jaShieldou) {
                        if (e.entity.getEntityData().statusData.shielded == false && !e.entity.waitingForShield) {
                            e.entity.getEntityData().statusData.shielded = true;
                            _this.shieldRateCounter = 0;
                            jaShieldou = true;
                            _this.canShield = false;
                            _this.justShielded = true;
                        }
                    }
                }
            });
            if (!jaShieldou && this.getEntityData().statusData.shielded == false && !this.waitingForShield) {
                this.getEntityData().statusData.shielded = true;
                this.shieldRateCounter = 0;
                jaShieldou = true;
                this.canShield = false;
                this.justShielded = true;
            }
        }
    };
    Witch.prototype.moveTowards = function (targetTile) {
        if (!this.justShielded) {
            _super.prototype.moveTowards.call(this, targetTile);
        }
    };
    return Witch;
}(Unit_1.Unit));
exports.Witch = Witch;
