import { ServerPlayer, PlayerStatus } from './ServerPlayer';
import { GameCore } from './GameCore'

export class GameServer {
    lastPlayerID = 0;
    lastGameID = 0;

    games : Array<GameCore> = new Array<GameCore>();
    clients : Array<ServerPlayer> = new Array<ServerPlayer>(); 

    public static instance : GameServer = null;

    io : SocketIO.Server;
    constructor(io) {
        GameServer.instance = this;
        this.io = io;
        //debug>
        //var player = this.onConnected();   
        //var player2 = this.onConnected();        
        //this.onMatchmaking(player);
        //this.onMatchmaking(player2);
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

    createGame(host : ServerPlayer, client : ServerPlayer) : GameCore{
        var game = new GameCore(this.lastGameID, host, client);
        this.games.push(game);
        this.lastGameID++;
        
        return game;
    }

    endGame(game : GameCore) : void {
        console.log("qqqq");

        for (var i = 0; i < this.games.length; i++) {
            if (this.games[i].id == game.id) {
                this.games[i] = null;
                this.games.splice(i, 1);
                break;
            }
        }
        game.host.serverPlayer.status = PlayerStatus.connected;
        game.client.serverPlayer.status = PlayerStatus.connected;
        if (game.host.serverPlayer.socket) {
            game.host.serverPlayer.socket.emit('endGame');
        }
        else {
            game.host.serverPlayer.status = PlayerStatus.matchmaking;
        }
        if (game.client.serverPlayer.socket) {
            game.client.serverPlayer.socket.emit('endGame');
        }
        console.log("jogo id "+game.id+" foi finalizado");
    }

    onMatchmaking(player : ServerPlayer) {
        console.log("askMatchmaking requisitado por player id: "+player.id);
        player.status = PlayerStatus.matchmaking;
        var players : Array<ServerPlayer> = this.getPlayersMatchmaking();
        if (players.length == 2) {
            players[0].status = PlayerStatus.ingame;
            players[1].status = PlayerStatus.ingame;
            this.createGame(players[0], players[1]);
        }
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
                   this.getGameByPlayerId(this.clients[i].id).endGame();
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
            if (game.client.serverPlayer.id == id || game.host.serverPlayer.id ) {
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
                players.push({ id: p.id, status: p.status });
            });
            
            playersOnLobby.forEach(p => {
                p.socket.emit('receivePlayers', players);
            });
        }
    }

}