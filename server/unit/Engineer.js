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
var TrapDevice_1 = require("../building/TrapDevice");
var Engineer = (function (_super) {
    __extends(Engineer, _super);
    function Engineer(row, col) {
        return _super.call(this, row, col, require('clone')(require('../data/units/engineer.json'))) || this;
    }
    Engineer.prototype.doAction = function (targetTile) {
        if (this.canAttack()) {
            this.attack(targetTile.entity);
        }
    };
    Engineer.prototype.onDeath = function () {
        this.tile.entity = null;
        this.owner.addEntity(new TrapDevice_1.TrapDevice(this.tile.row, this.tile.col));
        this.owner.removeEntity(this);
    };
    return Engineer;
}(Unit_1.Unit));
exports.Engineer = Engineer;
