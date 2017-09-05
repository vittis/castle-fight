import { ServerPlayer, PlayerStatus } from './ServerPlayer';
import { GameCore } from './GameCore'
import { ServerBot } from "./ServerBot";

export class GameServer {
    lastPlayerID = 0;
    lastGameID = 0;

    games : Array<GameCore> = new Array<GameCore>();
    clients : Array<ServerPlayer> = new Array<ServerPlayer>(); 

    public static instance : GameServer = null;

    //top5Nicks : string[] = [];
    top3Wins : any[] = []; 

    io : SocketIO.Server;
    constructor(io) {
        GameServer.instance = this;
        this.io = io;
        this.top3Wins = [];
        this.top3Wins[0] = { nick: "Guest_35", wins: 0, id:-1};
        this.top3Wins[1] = { nick: "Guest_44", wins: 0, id:-1 };
        this.top3Wins[2] = { nick: "Guest_50", wins: 0, id:-1 };
    }

    addPlayer(socket : SocketIO.Socket): ServerPlayer {
        var player = new ServerPlayer(this.lastPlayerID, socket);
        this.clients.push(player);
        this.lastPlayerID++;
        console.log("player id "+player.id+" se conectou");
        return player;
    }

    onConnected(socket? : SocketIO.Socket) : ServerPlayer {
        if (socket) {
            var glob = require('glob');
            //console.log(glob.sync('**/server/data/buildings/*.json'));

            var buildingData = [];
            var buildingArray = glob.sync('**/server/data/buildings/*.json');

            buildingArray.forEach(element => {
                buildingData.push(require("../"+element));
            });

            var unitData = [];
            var unitArray = glob.sync('**/server/data/units/*.json');

            unitArray.forEach(element => {
                unitData.push(require("../" + element));
            });
            
            socket.emit('receiveBuildingAndUnitData', {buildingData: buildingData, unitData: unitData});
        }
        return this.addPlayer(socket);
    }

    createGame(host : ServerPlayer, client : ServerPlayer) : GameCore {
        var game = new GameCore(this.lastGameID, host, client);
        this.games.push(game);
        this.lastGameID++;
        console.log("Jogo criado id"+game.id);
        return game;
    }

    startBotGame(host : ServerPlayer) {
        host.status = PlayerStatus.ingame;
        var game = new GameCore(this.lastGameID, host, new ServerBot());
        this.games.push(game);
        this.lastGameID++;
    }

    onMatchmaking(player : ServerPlayer) {
        console.log("askMatchmaking requisitado por player id: "+player.id+" "+player.nick);
        player.status = PlayerStatus.matchmaking;
        var players : Array<ServerPlayer> = this.getPlayersMatchmaking();
        if (players.length >= 2) {
            players[0].status = PlayerStatus.ingame;
            players[1].status = PlayerStatus.ingame;
            this.createGame(players[0], players[1]);
        }
    }

    onCancelMatchmaking(player: ServerPlayer) {
        player.status = PlayerStatus.connected;
    }

    getPlayersMatchmaking() : Array<ServerPlayer> {
        var players : Array<ServerPlayer> = new Array<ServerPlayer>();
        this.clients.forEach(p => {
            if (p.status == PlayerStatus.matchmaking)
            players.push(p);
        });
        return players;
    }
    getPlayersOnLobby(): Array<ServerPlayer> {
        var players: Array<ServerPlayer> = new Array<ServerPlayer>();
        this.clients.forEach(p => {
            if (p.status != PlayerStatus.ingame)
                players.push(p);
        });
        return players;
    }

    onDisconnect(player) : void {
        console.log("player id "+player.id+" saiu");
        for (var i = 0; i < this.clients.length; i++) {
            if (this.clients[i].id == player.id) {
                if (this.clients[i].status == PlayerStatus.ingame) {
                    if (this.getGameByPlayerId(this.clients[i].id) != null) {
                        if (this.getGameByPlayerId(this.clients[i].id).client.serverPlayer.id == player.id) {
                            this.getGameByPlayerId(this.clients[i].id).endGame(true);
                        }
                        else {
                            this.getGameByPlayerId(this.clients[i].id).endGame(false);
                        }
                    }
                }
                    this.clients[i] = null;
                    this.clients.splice(i, 1);
                return;
            }
        }
    }

    getGameByPlayerId(id) : GameCore {
        var gameCore = null;
        this.games.forEach(game => {
            if (game.client.serverPlayer.id == id || game.host.serverPlayer.id == id) {
                gameCore = game;
            }
        });
        return gameCore;
    }

    listAllPlayer() : void {
        console.log("players connected: "+this.clients.length)
        this.clients.forEach(player => {
            console.log("id: "+player.id+", status: "+PlayerStatus[player.status]);
        });
        console.log("\n");
    }

    broadCastAllPlayers() : void {
        var playersOnLobby = this.getPlayersOnLobby();
        if (playersOnLobby.length > 0) {
            var players: any[] = [];



            this.clients.forEach(p => {
                 /* if (p.wins > this.top3Wins[0].wins) {
                    let q = this.top3Wins[0];
                    let q2 = this.top3Wins[1];

                    this.top3Wins[0] = { nick: p.nick, wins: p.wins };

                    this.top3Wins[1] = q;
                    if (q2.nick != p.nick)
                        this.top3Wins[2] = q2;
                }
                else if (p.wins > this.top3Wins[1].wins && p.nick != this.top3Wins[0].nick) {
                    let q = this.top3Wins[1];

                    this.top3Wins[1] = { nick: p.nick, wins: p.wins };
                    this.top3Wins[2] = q;
                }
                else if (p.wins > this.top3Wins[2].wins && p.nick != this.top3Wins[1].nick && p.nick != this.top3Wins[0].nick) {
                     console.log(p.nick + " e " + this.top3Wins[0].nick+": "+p.nick != this.top3Wins[0].nick);

                    this.top3Wins[2] = { nick: p.nick, wins: p.wins };
                } */ 
                players.push({ id: p.id, status: p.status, wins: p.wins, nick: p.nick });
            });


            var arr = [];

            players.forEach(p => {
                arr.push({id: p.id, nick: p.nick, wins: p.wins});
            });
            this.top3Wins.forEach(p => {
                var jaTem = false;
                arr.forEach(e => {
                    if (e.nick == p.nick || e.id == p.id) {
                        jaTem = true;
                    }
                });
                if (!jaTem) {
                    arr.push(p);
                }
            });

            arr.sort(predicateBy("wins"));
            arr.reverse();

            this.top3Wins[0] = arr[0];
            this.top3Wins[1] = arr[1];
            this.top3Wins[2] = arr[2];


            playersOnLobby.forEach(p => {
                if (p.socket)
                    p.socket.emit('receivePlayers', {players: players, top3: this.top3Wins});
            });
        }
    }
    endGame(game: GameCore, hostWon, versusBot?): void {
        for (var i = 0; i < this.games.length; i++) {
            if (this.games[i].id == game.id) {
                this.games[i] = null;
                this.games.splice(i, 1);
                break;
            }
        }

        game.host.serverPlayer.status = PlayerStatus.connected;
        if (game.client) {
            game.client.serverPlayer.status = PlayerStatus.connected;
        }
        if (game.host.serverPlayer.socket) {
            game.host.serverPlayer.socket.emit('endGame', {hostWon: hostWon});
            if (!versusBot)
                game.host.serverPlayer.wins++;
        }
        if (game.client) {
            if (game.client.serverPlayer.socket) {
                game.client.serverPlayer.socket.emit('endGame', { hostWon: hostWon });
                game.client.serverPlayer.status = PlayerStatus.connected;
                if (!versusBot)
                    game.client.serverPlayer.wins++;
            }
        }
        console.log("jogo id " + game.id + " foi finalizado");
    }

    onMessage(msg) {
        var playersOnLobby = this.getPlayersOnLobby();
        if (playersOnLobby.length > 0) {
            playersOnLobby.forEach(p => {
                if (p.socket)
                    p.socket.emit('receiveMessage', msg);
            });
        }
    }



}
function predicateBy(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}
function sortNumber(a, b) {
    return a - b;
}