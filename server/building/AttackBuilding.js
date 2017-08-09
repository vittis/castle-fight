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
var Building_1 = require("../Building");
var AttackBuilding = (function (_super) {
    __extends(AttackBuilding, _super);
    function AttackBuilding(row, col, buildingData) {
        var _this = _super.call(this, row, col, buildingData) || this;
        _this.data.attackData = { hasAttacked: false, row: -1, col: -1 };
        _this.attackRateCounter = _this.data.attackRate;
        return _this;
    }
    Object.defineProperty(AttackBuilding.prototype, "data", {
        get: function () {
            return this.dataq;
        },
        enumerable: true,
        configurable: true
    });
    AttackBuilding.prototype.canAttack = function () {
        return this.attackRateCounter == this.data.attackRate;
    };
    AttackBuilding.prototype.inRange = function (targetTile) {
        //console.log(targetTile.row+", "+targetTile.col);
        // console.log(this.gm.getDistance(tile.col, tile.row, targetTile.col, targetTile.row));
        var shortestDistance = 100;
        var myTile = null;
        for (var i = 0; i < this.getEntityData().width; i++) {
            for (var j = 0; j < this.getEntityData().height; j++) {
                var tile = this.gm.tileAt(this.tile.row + j, this.tile.col + i);
                var dist = this.gm.aStar.heuristic.getHeuristic(tile.col, tile.row, 0, targetTile.col, targetTile.row, 0);
                if (dist < shortestDistance) {
                    myTile = tile;
                    shortestDistance = dist;
                }
            }
        }
        return (this.gm.getDistance(myTile.col, myTile.row, targetTile.col, targetTile.row) <= this.data.attackRange);
    };
    AttackBuilding.prototype.step = function () {
        if (this.attackRateCounter < this.data.attackRate)
            this.attackRateCounter++;
    };
    AttackBuilding.prototype.doAction = function (targetTile) {
        this.step();
    };
    AttackBuilding.prototype.attack = function (entity) {
        this.data.attackData.hasAttacked = true;
        var target = null;
        var shortestDistance = 100;
        for (var i = 0; i < entity.getEntityData().width; i++) {
            for (var j = 0; j < entity.getEntityData().height; j++) {
                var tile = this.gm.tileAt(entity.tile.row + j, entity.tile.col + i);
                var dist = this.gm.aStar.heuristic.getHeuristic(this.tile.col, this.tile.row, 0, tile.col, tile.row, 0);
                if (dist < shortestDistance) {
                    target = tile;
                    shortestDistance = dist;
                }
            }
        }
        this.data.attackData.row = target.row;
        this.data.attackData.col = target.col;
        entity.receiveAttackFromBuilding(this);
        this.attackRateCounter = 0;
    };
    AttackBuilding.prototype.resetAttackData = function () {
        this.data.attackData.hasAttacked = false;
    };
    return AttackBuilding;
}(Building_1.Building));
exports.AttackBuilding = AttackBuilding;