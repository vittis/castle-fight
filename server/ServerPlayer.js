"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerStatus;
(function (PlayerStatus) {
    PlayerStatus[PlayerStatus["connected"] = 0] = "connected";
    PlayerStatus[PlayerStatus["matchmaking"] = 1] = "matchmaking";
    PlayerStatus[PlayerStatus["ingame"] = 2] = "ingame";
})(PlayerStatus = exports.PlayerStatus || (exports.PlayerStatus = {}));
var ServerPlayer = (function () {
    function ServerPlayer(id, socket) {
        this.id = id;
        this.status = PlayerStatus.connected;
        if (socket)
            this.socket = socket;
    }
    return ServerPlayer;
}());
exports.ServerPlayer = ServerPlayer;
