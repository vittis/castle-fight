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
var SpamBuilding = (function (_super) {
    __extends(SpamBuilding, _super);
    function SpamBuilding(gm, row, col, buildingData) {
        var _this = _super.call(this, gm, row, col, buildingData) || this;
        _this.spamRateCounter = _this.data.spamRate;
        return _this;
    }
    SpamBuilding.prototype.spamUnit = function () {
        this.data.spamCount--;
        if (this.data.spamCount <= 0)
            this.onDeath();
    };
    SpamBuilding.prototype.getTileToSpam = function () {
        var r = Math.floor(Math.random() * this.getOuterTiles().length);
        return this.getOuterTiles()[r];
    };
    return SpamBuilding;
}(Building_1.Building));
exports.SpamBuilding = SpamBuilding;
