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
var Sniper_1 = require("../unit/Sniper");
var SpecialFacility = (function (_super) {
    __extends(SpecialFacility, _super);
    function SpecialFacility(row, col) {
        return _super.call(this, row, col, require('clone')(require('../data/buildings/specialFacility.json'))) || this;
    }
    SpecialFacility.prototype.spamUnit = function () {
        _super.prototype.spamUnit.call(this, Sniper_1.Sniper);
    };
    return SpecialFacility;
}(SpamBuilding_1.SpamBuilding));
exports.SpecialFacility = SpecialFacility;
