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
var Heuristic_1 = require("./Heuristic");
var ManhattenHeuristic = (function (_super) {
    __extends(ManhattenHeuristic, _super);
    function ManhattenHeuristic() {
        return _super.call(this) || this;
    }
    ManhattenHeuristic.prototype.getHeuristic = function (x1, y1, z1, x2, y2, z2) {
        return Math.abs(x2 - x1) + Math.abs(y2 - y1) + Math.abs(z2 - z1);
    };
    return ManhattenHeuristic;
}(Heuristic_1.Heuristic));
exports.ManhattenHeuristic = ManhattenHeuristic;
