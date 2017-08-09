"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile = (function () {
    function Tile(row, col) {
        var _this = this;
        this.entity = null;
        this.toString = function () {
            return _this.entity == null ? "*" : "" + _this.entity;
        };
        this.row = row;
        this.col = col;
    }
    Object.defineProperty(Tile.prototype, "walkable", {
        get: function () {
            return this.entity == null;
        },
        enumerable: true,
        configurable: true
    });
    return Tile;
}());
exports.Tile = Tile;
