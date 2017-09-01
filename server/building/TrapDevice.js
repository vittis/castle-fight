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
var TrapDevice = (function (_super) {
    __extends(TrapDevice, _super);
    function TrapDevice(row, col) {
        return _super.call(this, row, col, require('clone')(require('../data/buildings/trapDevice.json'))) || this;
    }
    TrapDevice.prototype.onDeath = function () {
        var _this = this;
        this.getOuterTilesWithEntity().forEach(function (t) {
            if (t.entity.owner.isHost != _this.owner.isHost) {
                t.entity.takeDamageFromNonUnitSource(4);
            }
        });
        _super.prototype.onDeath.call(this);
    };
    return TrapDevice;
}(Building_1.Building));
exports.TrapDevice = TrapDevice;
