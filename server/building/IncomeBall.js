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
var IncomeBall = (function (_super) {
    __extends(IncomeBall, _super);
    function IncomeBall(row, col, ballManager) {
        var _this = _super.call(this, row, col, require('clone')(require('../data/buildings/IncomeBall.json'))) || this;
        _this.ballManager = ballManager;
        return _this;
    }
    IncomeBall.prototype.doAction = function () {
    };
    IncomeBall.prototype.onDeath = function () {
        console.log("bola morreu doida");
        //this.ballManager.ballInGame = false;
        _super.prototype.onDeath.call(this);
    };
    return IncomeBall;
}(Building_1.Building));
exports.IncomeBall = IncomeBall;
