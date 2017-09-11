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
var Entity_1 = require("./Entity");
var Unit = (function (_super) {
    __extends(Unit, _super);
    function Unit(row, col, unitData) {
        var _this = _super.call(this, row, col, unitData) || this;
        _this.target = null;
        _this.justSpawned = false;
        _this.data.attackData = { hasAttacked: false, row: -1, col: -1 };
        _this.attackRateCounter = _this.data.attackRate;
        return _this;
    }
    Object.defineProperty(Unit.prototype, "data", {
        get: function () {
            return this.dataq;
        },
        enumerable: true,
        configurable: true
    });
    Unit.prototype.addToGame = function (gm) {
        _super.prototype.addToGame.call(this, gm);
        this.data.attackDmg += this.owner.updateManager.attackModifier;
        this.data.attackRate += this.owner.updateManager.atkSpeedModifier;
        this.data.attackRate = Math.max(1, this.data.attackRate);
        this.data.maxHP += this.owner.updateManager.hpModifier;
        this.data.hp += this.owner.updateManager.hpModifier;
        if (this.data.attackRange > 1) {
            this.data.attackRange += this.owner.updateManager.rangeModifier;
        }
    };
    Unit.prototype.moveTo = function (tile) {
        if (tile != null) {
            this.tile.entity = null;
            this.tile = tile;
            tile.entity = this;
        }
    };
    Unit.prototype.receiveAttack = function (unit) {
        _super.prototype.receiveAttack.call(this, unit);
    };
    Unit.prototype.canAttack = function () {
        return this.attackRateCounter >= this.data.attackRate;
    };
    Unit.prototype.inRange = function (targetTile) {
        if (targetTile.entity != null) {
            if (targetTile.entity.getEntityData().width == 1) {
                return (this.gm.getDistance(this.tile.col, this.tile.row, targetTile.col, targetTile.row) <= this.data.attackRange);
            }
            else {
                var target = null;
                var shortestDistance = 100;
                for (var i = 0; i < targetTile.entity.getEntityData().width; i++) {
                    for (var j = 0; j < targetTile.entity.getEntityData().height; j++) {
                        var tile = this.gm.tileAt(targetTile.entity.tile.row + j, targetTile.entity.tile.col + i);
                        var dist = this.gm.aStar.heuristic.getHeuristic(this.tile.col, this.tile.row, 0, tile.col, tile.row, 0);
                        if (dist < shortestDistance) {
                            target = tile;
                            shortestDistance = dist;
                        }
                    }
                }
                return (this.gm.getDistance(this.tile.col, this.tile.row, target.col, target.row) <= this.data.attackRange);
            }
        }
        else {
            return false;
        }
    };
    Unit.prototype.step = function () {
        if (!this.getEntityData().statusData.stunned) {
            if (this.attackRateCounter < this.data.attackRate)
                this.attackRateCounter++;
        }
        else {
            this.stunCounter++;
            if (this.stunCounter >= 2) {
                this.getEntityData().statusData.stunned = false;
                this.stunCounter = 0;
            }
        }
        if (this.target != null) {
            if (this.target.getEntityData().hp <= 0) {
                this.target = null;
            }
        }
        if (this.waitingForShield) {
            this.waitShieldCounter++;
            if (this.waitShieldCounter >= 5) {
                this.waitingForShield = false;
                this.waitShieldCounter = 0;
            }
        }
    };
    Unit.prototype.moveTowards = function (targetTile) {
        if (!this.getEntityData().statusData.stunned) {
            var path = this.gm.aStar.path(this.gm.aStar.getNode(this.tile.col, this.tile.row), this.gm.aStar.getNode(targetTile.col, targetTile.row));
            if (path.length > 1) {
                var pathToTargetTile = this.gm.grid[path[1].y][path[1].x];
                if (pathToTargetTile.entity == null)
                    this.moveTo(pathToTargetTile);
            }
        }
    };
    Unit.prototype.doAction = function (targetTile) {
        this.step();
    };
    Unit.prototype.attack = function (entity) {
        if (entity != null) {
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
            this.target = entity;
            entity.receiveAttack(this);
            this.attackRateCounter = 0;
        }
    };
    Unit.prototype.resetAttackData = function () {
        this.data.attackData.hasAttacked = false;
    };
    return Unit;
}(Entity_1.Entity));
exports.Unit = Unit;
