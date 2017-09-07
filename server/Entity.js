"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entity = (function () {
    function Entity(row, col, data) {
        var _this = this;
        this.stunCounter = 0;
        this.toString = function () {
            return _this.dataq.name[0];
        };
        this.dataq = data;
        this.dataq.hp = data.maxHP;
        this.dataq.armor = data.maxArmor;
        this.row = row;
        this.col = col;
        this.dataq.statusData = { stunned: false, shielded: false, heroBuff: false };
    }
    Entity.prototype.addToGame = function (gm) {
        this.gm = gm;
        this.tile = gm.tileAt(this.row, this.col);
        for (var i = 0; i < this.dataq.width; i++) {
            for (var j = 0; j < this.dataq.height; j++) {
                gm.tileAt(this.row + j, this.col + i).entity = this;
            }
        }
    };
    Entity.prototype.receiveAttack = function (unit) {
        if (!this.dataq.statusData.shielded) {
            this.takeDamage(Math.max(unit.data.attackDmg - this.dataq.armor, 0));
            if (this.dataq.armor > 0)
                this.dataq.armor--;
        }
        else {
            this.dataq.statusData.shielded = false;
        }
    };
    Entity.prototype.receiveAttackFromBuilding = function (unit) {
        if (!this.dataq.statusData.shielded) {
            this.takeDamage(Math.max(unit.data.attackDmg - this.dataq.armor, 0));
            if (this.dataq.armor > 0)
                this.dataq.armor--;
        }
        else {
            this.dataq.statusData.shielded = false;
        }
    };
    Entity.prototype.takeDamage = function (dmg) {
        this.dataq.hp -= dmg;
    };
    Entity.prototype.takeDamageFromNonUnitSource = function (damage) {
        if (!this.dataq.statusData.shielded) {
            this.takeDamage(Math.max(damage - this.dataq.armor, 0));
            if (this.dataq.armor > 0)
                this.dataq.armor--;
        }
        else {
            this.dataq.statusData.shielded = false;
        }
    };
    Entity.prototype.onDeath = function () {
        for (var i = 0; i < this.dataq.width; i++) {
            for (var j = 0; j < this.dataq.height; j++) {
                this.gm.tileAt(this.tile.row + j, this.tile.col + i).entity = null;
            }
        }
        this.owner.removeEntity(this);
    };
    Entity.prototype.getEntityData = function () {
        return this.dataq;
    };
    Entity.prototype.getOuterTiles = function () {
        var tiles = [];
        for (var i = 0; i < this.dataq.width; i++) {
            for (var j = 0; j < this.dataq.height; j++) {
                var currentTile = this.gm.tileAt(this.tile.row + j, this.tile.col + i);
                this.gm.getNeighbors(currentTile).forEach(function (t) {
                    if (t.entity == null) {
                        if (tiles.indexOf(t) == -1)
                            tiles.push(t);
                    }
                });
            }
        }
        return tiles;
    };
    Entity.prototype.getOuterTilesWithEntity = function () {
        var tiles = [];
        for (var i = 0; i < this.dataq.width; i++) {
            for (var j = 0; j < this.dataq.height; j++) {
                var currentTile = this.gm.tileAt(this.tile.row + j, this.tile.col + i);
                this.gm.getNeighbors(currentTile).forEach(function (t) {
                    if (t.entity != null) {
                        if (tiles.indexOf(t) == -1)
                            tiles.push(t);
                    }
                });
            }
        }
        return tiles;
    };
    return Entity;
}());
exports.Entity = Entity;
