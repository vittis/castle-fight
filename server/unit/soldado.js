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
var Soldado = (function (_super) {
    __extends(Soldado, _super);
    function Soldado(gm, row, col) {
        return _super.call(this, gm, row, col, require('clone')(require('../data/soldado.json'))) || this;
    }
    return Soldado;
}(Unit_1.Unit));
exports.Soldado = Soldado;
