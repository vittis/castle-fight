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
var ServerPlayer_1 = require("./ServerPlayer");
var ServerBot = (function (_super) {
    __extends(ServerBot, _super);
    function ServerBot() {
        var _this = _super.call(this, -1) || this;
        _this.nick = "Really Dumb Bot";
        _this.status = ServerPlayer_1.PlayerStatus.ingame;
        return _this;
    }
    return ServerBot;
}(ServerPlayer_1.ServerPlayer));
exports.ServerBot = ServerBot;
