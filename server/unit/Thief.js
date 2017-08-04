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
var Thief = (function (_super) {
    __extends(Thief, _super);
    function Thief(row, col) {
        return _super.call(this, row, col, require('clone')(require('../data/units/thief.json'))) || this;
    }
    Thief.prototype.doAction = function (targetTile) {
        _super.prototype.doAction.call(this, targetTile);
        if (this.canAttack()) {
            this.attack(targetTile.entity);
            this.owner.resourceManager.add(3, 0);
        }
    };
    return Thief;
}(Unit_1.Unit));
exports.Thief = Thief;
