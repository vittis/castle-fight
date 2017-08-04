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
var Farmer = (function (_super) {
    __extends(Farmer, _super);
    function Farmer(row, col) {
        return _super.call(this, row, col, require('clone')(require('../data/units/farmer.json'))) || this;
    }
    Farmer.prototype.addToGame = function (gm) {
        _super.prototype.addToGame.call(this, gm);
        var farmersInGame = 0;
        this.owner.getAllUnits().forEach(function (unit) {
            if (unit instanceof Farmer) {
                farmersInGame++;
            }
        });
        if (farmersInGame > 3) {
            this.data.maxHP = this.data.maxHP + 3;
            this.data.hp = this.data.maxHP;
            this.data.attackDmg = this.data.attackDmg * 2;
        }
    };
    Farmer.prototype.doAction = function (targetTile) {
        _super.prototype.doAction.call(this, targetTile);
        if (this.canAttack())
            this.attack(targetTile.entity);
    };
    return Farmer;
}(Unit_1.Unit));
exports.Farmer = Farmer;
