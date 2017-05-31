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
var SpamBuilding_1 = require("./SpamBuilding");
var Archer_1 = require("../unit/Archer");
var ArcheryRange = (function (_super) {
    __extends(ArcheryRange, _super);
    function ArcheryRange(gm, row, col) {
        return _super.call(this, gm, row, col, require('clone')(require('../data/buildings/archeryRange.json'))) || this;
    }
    ArcheryRange.prototype.spamUnit = function () {
        _super.prototype.spamUnit.call(this, Archer_1.Archer);
    };
    return ArcheryRange;
}(SpamBuilding_1.SpamBuilding));
exports.ArcheryRange = ArcheryRange;
