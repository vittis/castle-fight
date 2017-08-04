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
var Unit_1 = require("../Unit");
var Juggernaut = (function (_super) {
    __extends(Juggernaut, _super);
    function Juggernaut(row, col) {
        return _super.call(this, row, col, require('clone')(require('../data/units/juggernaut.json'))) || this;
    }
    return Juggernaut;
}(Unit_1.Unit));
exports.Juggernaut = Juggernaut;
