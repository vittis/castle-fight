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
var Propeller = (function (_super) {
    __extends(Propeller, _super);
    function Propeller(row, col) {
        var _this = _super.call(this, row, col, require('clone')(require('../data/units/propeller.json'))) || this;
        _this.firstAttacked = false;
        return _this;
    }
    Propeller.prototype.doAction = function (targetTile) {
        if (this.canAttack()) {
            this.attack(targetTile.entity);
            this.firstAttacked = true;
        }
    };
    Propeller.prototype.moveTowards = function (targetTile) {
        _super.prototype.moveTowards.call(this, targetTile);
        if (!this.firstAttacked) {
            var path = this.gm.aStar.path(this.gm.aStar.getNode(this.tile.col, this.tile.row), this.gm.aStar.getNode(targetTile.col, targetTile.row));
            if (path.length > 1) {
                var pathToTargetTile = this.gm.grid[path[1].y][path[1].x];
                if (pathToTargetTile.entity == null)
                    this.moveTo(pathToTargetTile);
            }
        }
    };
    return Propeller;
}(Unit_1.Unit));
exports.Propeller = Propeller;
