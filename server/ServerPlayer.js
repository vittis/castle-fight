"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerStatus;
(function (PlayerStatus) {
    PlayerStatus[PlayerStatus["connected"] = 0] = "connected";
    PlayerStatus[PlayerStatus["matchmaking"] = 1] = "matchmaking";
    PlayerStatus[PlayerStatus["ingame"] = 2] = "ingame";
    PlayerStatus[PlayerStatus["spectating"] = 3] = "spectating";
})(PlayerStatus = exports.PlayerStatus || (exports.PlayerStatus = {}));
var ServerPlayer = (function () {
    function ServerPlayer(id, socket) {
        this.wins = 0;
        this.id = id;
        this.status = PlayerStatus.connected;
        this.nick = "Guest_" + id;
        if (socket)
            this.socket = socket;
    }
    return ServerPlayer;
}());
exports.ServerPlayer = ServerPlayer;
