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
var AttackBuilding_1 = require("./AttackBuilding");
var Tower = (function (_super) {
    __extends(Tower, _super);
    function Tower(row, col) {
        var _this = _super.call(this, row, col, require('clone')(require('../data/buildings/tower.json'))) || this;
        console.log(_this.data);
        return _this;
    }
    Tower.prototype.doAction = function (targetTile) {
        _super.prototype.doAction.call(this, targetTile);
        if (this.canAttack())
            this.attack(targetTile.entity);
    };
    return Tower;
}(AttackBuilding_1.AttackBuilding));
exports.Tower = Tower;
