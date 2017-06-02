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
    function SpamBuilding(row, col, buildingData) {
        var _this = _super.call(this, row, col, buildingData) || this;
        _this.data.spamData = { hasSpammed: false, spamRateCounter: _this.data.spamRate };
        return _this;
    }
    Object.defineProperty(SpamBuilding.prototype, "data", {
        get: function () {
            return this.dataq;
        },
        enumerable: true,
        configurable: true
    });
    SpamBuilding.prototype.spamUnit = function (unit) {
        if (this.data.spamData.spamRateCounter == 0) {
            var tile = this.getTileToSpam();
            this.owner.addEntity(new unit(tile.row, tile.col));
            this.data.spamData.spamRateCounter = this.data.spamRate;
            this.data.spamData.hasSpammed = true;
            this.data.spamCount--;
            if (this.data.spamCount <= 0)
                this.onDeath();
        }
        this.data.spamData.spamRateCounter--;
    };
    SpamBuilding.prototype.getTileToSpam = function () {
        var r = Math.floor(Math.random() * this.getOuterTiles().length);
        return this.getOuterTiles()[r];
    };
    SpamBuilding.prototype.resetSpamData = function () {
        this.data.spamData.hasSpammed = false;
    };
    return SpamBuilding;
}(Building_1.Building));
exports.SpamBuilding = SpamBuilding;
