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
var soldado_1 = require("../unit/soldado");
var Barracks = (function (_super) {
    __extends(Barracks, _super);
    function Barracks(gm, row, col) {
        return _super.call(this, gm, row, col, require('clone')(require('../data/barracks.json'))) || this;
    }
    Barracks.prototype.spamUnit = function () {
        if (this.spamRateCounter == 0) {
            var tile = this.getTileToSpam();
            this.owner.addEntity(new soldado_1.Soldado(this.gm, tile.row, tile.col));
            _super.prototype.spamUnit.call(this);
            this.spamRateCounter = this.data.spamRate;
        }
        this.spamRateCounter--;
    };
    return Barracks;
}(SpamBuilding_1.SpamBuilding));
exports.Barracks = Barracks;
