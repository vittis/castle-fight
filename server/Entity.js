"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entity = (function () {
    function Entity(row, col, data) {
        var _this = this;
        this.toString = function () {
            return _this.dataq.name[0];
        };
        this.dataq = data;
        this.dataq.hp = data.maxHP;
        this.dataq.armor = data.maxArmor;
        this.row = row;
        this.col = col;
        //this.addToGame(gm);
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
        this.takeDamage(Math.max(unit.data.attackDmg - this.dataq.armor, 0));
        if (this.dataq.armor > 0)
            this.dataq.armor--;
    };
    Entity.prototype.receiveAttackFromBuilding = function (unit) {
        this.takeDamage(Math.max(unit.data.attackDmg - this.dataq.armor, 0));
        if (this.dataq.armor > 0)
            this.dataq.armor--;
    };
    Entity.prototype.takeDamage = function (dmg) {
        this.dataq.hp -= dmg;
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
    return Entity;
}());
exports.Entity = Entity;
