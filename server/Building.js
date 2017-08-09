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
var Building = (function (_super) {
    __extends(Building, _super);
    function Building(row, col, buildingData) {
        return _super.call(this, row, col, buildingData) || this;
    }
    Object.defineProperty(Building.prototype, "data", {
        get: function () {
            return this.dataq;
        },
        enumerable: true,
        configurable: true
    });
    Building.prototype.getOuterTiles = function () {
        var tiles = [];
        for (var i = 0; i < this.data.width; i++) {
            for (var j = 0; j < this.data.height; j++) {
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
    return Building;
}(Entity_1.Entity));
exports.Building = Building;
