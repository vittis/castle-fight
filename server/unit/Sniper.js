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
var Sniper = (function (_super) {
    __extends(Sniper, _super);
    function Sniper(row, col) {
        var _this = _super.call(this, row, col, require('clone')(require('../data/units/sniper.json'))) || this;
        _this.hasAttacked = false;
        _this.data.attackDmg += 4;
        _this.data.attackRange += 2;
        return _this;
    }
    Sniper.prototype.doAction = function (targetTile) {
        _super.prototype.doAction.call(this, targetTile);
        if (this.canAttack()) {
            this.attack(targetTile.entity);
            if (!this.hasAttacked) {
                this.data.attackDmg -= 4;
                this.data.attackRange -= 2;
                this.hasAttacked = true;
            }
        }
    };
    return Sniper;
}(Unit_1.Unit));
exports.Sniper = Sniper;
