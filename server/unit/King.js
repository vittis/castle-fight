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
var King = (function (_super) {
    __extends(King, _super);
    function King(row, col) {
        var _this = _super.call(this, row, col, require('clone')(require('../data/units/king.json'))) || this;
        _this.grappleRate = 10;
        _this.grappleCounter = 10;
        _this.canGrapple = true;
        _this.data.attackRange = 6;
        return _this;
    }
    King.prototype.step = function () {
        _super.prototype.step.call(this);
        if (this.grappleCounter < this.grappleRate)
            this.grappleCounter++;
        else {
            this.canGrapple = true;
            this.data.attackRange = 6;
        }
    };
    King.prototype.doAction = function (targetTile) {
        if (this.canGrapple) {
            if (targetTile.entity instanceof Unit_1.Unit) {
                if (this.gm.getDistance(this.tile.col, this.tile.row, targetTile.col, targetTile.row) <= 6 && this.gm.getDistance(this.tile.col, this.tile.row, targetTile.col, targetTile.row) >= 2) {
                    this.grapple(targetTile.entity);
                    this.data.attackRange = 1;
                    this.grappleCounter = 0;
                    this.canGrapple = false;
                }
                else {
                    if (this.canAttack())
                        this.attack(targetTile.entity);
                }
            }
            else {
                this.data.attackRange = 1;
                if (this.canAttack() && this.inRange(targetTile))
                    this.attack(targetTile.entity);
            }
        }
        else {
            if (this.canAttack())
                this.attack(targetTile.entity);
        }
    };
    King.prototype.grapple = function (unit) {
        if (!this.owner.isHost) {
            if (this.gm.tileAt(this.tile.row, this.tile.col - 1) != null) {
                if (this.gm.tileAt(this.tile.row, this.tile.col - 1).entity == null)
                    unit.moveTo(this.gm.grid[this.tile.row][this.tile.col - 1]);
            }
            else if (this.gm.tileAt(this.tile.row + 1, this.tile.col - 1) != null) {
                if (this.gm.tileAt(this.tile.row + 1, this.tile.col - 1).entity == null)
                    unit.moveTo(this.gm.grid[this.tile.row + 1][this.tile.col - 1]);
            }
            else if (this.gm.tileAt(this.tile.row - 1, this.tile.col - 1) != null) {
                if (this.gm.tileAt(this.tile.row - 1, this.tile.col - 1).entity == null)
                    unit.moveTo(this.gm.grid[this.tile.row - 1][this.tile.col - 1]);
            }
        }
        else {
            if (this.gm.tileAt(this.tile.row, this.tile.col + 1) != null) {
                if (this.gm.tileAt(this.tile.row, this.tile.col + 1).entity == null)
                    unit.moveTo(this.gm.grid[this.tile.row][this.tile.col + 1]);
            }
            else if (this.gm.tileAt(this.tile.row + 1, this.tile.col + 1) != null) {
                if (this.gm.tileAt(this.tile.row + 1, this.tile.col + 1).entity == null)
                    unit.moveTo(this.gm.grid[this.tile.row + 1][this.tile.col + 1]);
            }
            else if (this.gm.tileAt(this.tile.row - 1, this.tile.col + 1) != null) {
                if (this.gm.tileAt(this.tile.row - 1, this.tile.col + 1).entity == null)
                    unit.moveTo(this.gm.grid[this.tile.row - 1][this.tile.col + 1]);
            }
        }
    };
    return King;
}(Unit_1.Unit));
exports.King = King;
