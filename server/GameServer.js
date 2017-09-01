"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerPlayer_1 = require("./ServerPlayer");
var GameCore_1 = require("./GameCore");
var ServerBot_1 = require("./ServerBot");
var GameServer = (function () {
    function GameServer(io) {
        this.lastPlayerID = 0;
        this.lastGameID = 0;
        this.games = new Array();
        this.clients = new Array();
        GameServer.instance = this;
        this.io = io;
    }
    GameServer.prototype.addPlayer = function (socket) {
        var player = new ServerPlayer_1.ServerPlayer(this.lastPlayerID, socket);
        this.clients.push(player);
        this.lastPlayerID++;
        console.log("player id " + player.id + " se conectou");
        return player;
    };
    GameServer.prototype.onConnected = function (socket) {
        if (socket) {
            var glob = require('glob');
            var buildingData = [];
            var buildingArray = glob.sync('**/server/data/buildings/*.json');
            buildingArray.forEach(function (element) {
                buildingData.push(require("../" + element));
            });
            var unitData = [];
            var unitArray = glob.sync('**/server/data/units/*.json');
            unitArray.forEach(function (element) {
                unitData.push(require("../" + element));
            });
            socket.emit('receiveBuildingAndUnitData', { buildingData: buildingData, unitData: unitData });
        }
        return this.addPlayer(socket);
    };
    GameServer.prototype.createGame = function (host, client) {
        var game = new GameCore_1.GameCore(this.lastGameID, host, client);
        this.games.push(game);
        this.lastGameID++;
        console.log("Jogo criado id" + game.id);
        return game;
    };
    GameServer.prototype.startBotGame = function (host) {
        host.status = ServerPlayer_1.PlayerStatus.ingame;
        var game = new GameCore_1.GameCore(this.lastGameID, host, new ServerBot_1.ServerBot());
        this.games.push(game);
        this.lastGameID++;
    };
    GameServer.prototype.onMatchmaking = function (player) {
        console.log("askMatchmaking requisitado por player id: " + player.id + " " + player.nick);
        player.status = ServerPlayer_1.PlayerStatus.matchmaking;
        var players = this.getPlayersMatchmaking();
        if (players.length >= 2) {
            players[0].status = ServerPlayer_1.PlayerStatus.ingame;
            players[1].status = ServerPlayer_1.PlayerStatus.ingame;
            this.createGame(players[0], players[1]);
        }
    };
    GameServer.prototype.onCancelMatchmaking = function (player) {
        player.status = ServerPlayer_1.PlayerStatus.connected;
    };
    GameServer.prototype.getPlayersMatchmaking = function () {
        var players = new Array();
        this.clients.forEach(function (p) {
            if (p.status == ServerPlayer_1.PlayerStatus.matchmaking)
                players.push(p);
        });
        return players;
    };
    GameServer.prototype.getPlayersOnLobby = function () {
        var players = new Array();
        this.clients.forEach(function (p) {
            if (p.status != ServerPlayer_1.PlayerStatus.ingame)
                players.push(p);
        });
        return players;
    };
    GameServer.prototype.onDisconnect = function (player) {
        console.log("player id " + player.id + " saiu");
        for (var i = 0; i < this.clients.length; i++) {
            if (this.clients[i].id == player.id) {
                if (this.clients[i].status == ServerPlayer_1.PlayerStatus.ingame) {
                    if (this.getGameByPlayerId(this.clients[i].id) != null) {
                        this.getGameByPlayerId(this.clients[i].id).endGame();
                    }
                }
                this.clients[i] = null;
                this.clients.splice(i, 1);
                return;
            }
        }
    };
    GameServer.prototype.getGameByPlayerId = function (id) {
        var gameCore = null;
        this.games.forEach(function (game) {
            if (game.client.serverPlayer.id == id || game.host.serverPlayer.id == id) {
                gameCore = game;
            }
        });
        return gameCore;
    };
    GameServer.prototype.listAllPlayer = function () {
        console.log("players connected: " + this.clients.length);
        this.clients.forEach(function (player) {
            console.log("id: " + player.id + ", status: " + ServerPlayer_1.PlayerStatus[player.status]);
        });
        console.log("\n");
    };
    GameServer.prototype.broadCastAllPlayers = function () {
        var playersOnLobby = this.getPlayersOnLobby();
        if (playersOnLobby.length > 0) {
            var players = [];
            this.clients.forEach(function (p) {
                players.push({ id: p.id, status: p.status });
            });
            playersOnLobby.forEach(function (p) {
                if (p.socket)
                    p.socket.emit('receivePlayers', players);
            });
        }
        if (this.clients.length > 0)
            console.log("online players: " + this.clients.length);
    };
    GameServer.prototype.endGame = function (game) {
        for (var i = 0; i < this.games.length; i++) {
            if (this.games[i].id == game.id) {
                this.games[i] = null;
                this.games.splice(i, 1);
                break;
            }
        }
        game.host.serverPlayer.status = ServerPlayer_1.PlayerStatus.connected;
        if (game.client) {
            game.client.serverPlayer.status = ServerPlayer_1.PlayerStatus.connected;
        }
        if (game.host.serverPlayer.socket) {
            game.host.serverPlayer.socket.emit('endGame');
        }
        else {
            game.host.serverPlayer.status = ServerPlayer_1.PlayerStatus.matchmaking;
        }
        if (game.client) {
            if (game.client.serverPlayer.socket) {
                game.client.serverPlayer.socket.emit('endGame');
            }
        }
        console.log("jogo id " + game.id + " foi finalizado");
    };
    GameServer.instance = null;
    return GameServer;
}());
exports.GameServer = GameServer;
