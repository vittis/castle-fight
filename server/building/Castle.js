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
var Castle = (function (_super) {
    __extends(Castle, _super);
    function Castle(gm, row, col) {
        return _super.call(this, gm, row, col, require('clone')(require('../data/castle.json'))) || this;
    }
    Castle.prototype.doAction = function () {
    };
    return Castle;
}(Building_1.Building));
exports.Castle = Castle;