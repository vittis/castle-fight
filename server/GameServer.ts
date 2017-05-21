import { ServerPlayer, PlayerStatus } from './ServerPlayer';
import { GameCore } from './GameCore'

export class GameServer {
    lastPlayerID = 0;
    lastGameID = 0;

    games : Array<GameCore> = new Array<GameCore>();
    clients : Array<ServerPlayer> = new Array<ServerPlayer>(); 

    public static instance : GameServer = null;

    constructor() {
        GameServer.instance = this;
        //debug>
        var player = this.onConnected();   
        var player2 = this.onConnected();        
        this.onMatchmaking(player);
        this.onMatchmaking(player2);

    }

    addPlayer(socket : SocketIO.Socket): ServerPlayer {
        var player = new ServerPlayer(this.lastPlayerID, socket);
        this.clients.push(player);
        this.lastPlayerID++;
        console.log("player id "+player.id+" se conectou");
        return player;
    }

    onConnected(socket? : SocketIO.Socket) : ServerPlayer {
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
                this.games.splice(i, 1);
                break;
            }
        }
        game.host.status = PlayerStatus.connected;
        game.client.status = PlayerStatus.connected;

        game.host.socket.emit('endGame');
        game.client.socket.emit('endGame');
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

    onDisconnect(player) : void {
        console.log("player id "+player.id+" saiu");
        for (var i = 0; i < this.clients.length; i++) {
            if (this.clients[i].id == player.id) {
                this.clients.splice(i, 1);
                return;
            }
        }
    }

    listAllPlayer() : void {
        console.log("players connected: "+this.clients.length)
        this.clients.forEach(player => {
            console.log("id: "+player.id+", status: "+PlayerStatus[player.status]);
        });
        console.log("\n");
    }
}