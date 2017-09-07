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
var Mage = (function (_super) {
    __extends(Mage, _super);
    function Mage(row, col) {
        return _super.call(this, row, col, require('clone')(require('../data/units/mage.json'))) || this;
    }
    Mage.prototype.doAction = function (targetTile) {
        var _this = this;
        if (this.canAttack()) {
            this.attack(targetTile.entity);
            if (targetTile.entity != null) {
                var attackedId = [];
                attackedId.push(targetTile.entity.id);
            }
            if (targetTile.entity != null) {
                targetTile.entity.getOuterTilesWithEntity().forEach(function (t) {
                    if (t.entity != null) {
                        if (t.entity.owner.isHost != _this.owner.isHost) {
                            if (attackedId.indexOf(t.entity.id) == -1) {
                                var currentAttack = _this.data.attackDmg;
                                _this.data.attackDmg = 2;
                                t.entity.receiveAttack(_this);
                                _this.data.attackDmg = currentAttack;
                                attackedId.push(t.entity.id);
                            }
                        }
                    }
                });
            }
        }
    };
    return Mage;
}(Unit_1.Unit));
exports.Mage = Mage;
