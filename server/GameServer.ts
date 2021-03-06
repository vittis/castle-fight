import { ServerPlayer, PlayerStatus } from './ServerPlayer';
import { GameCore } from './GameCore'
import { ServerBot } from "./ServerBot";
import { GameBot } from "./GameBot";
import { GameConfig } from "./GameConfig";


export class GameServer {
    lastPlayerID = 0;
    lastGameID = 0;

    games : Array<GameCore> = new Array<GameCore>();
    clients : Array<ServerPlayer> = new Array<ServerPlayer>(); 

    public static instance : GameServer = null;

    last10messages = [];

    //top5Nicks : string[] = [];
    top3Wins: any[] = []; /* = [{ nick: "Pychkin", wins: 19, id: -1 }, { nick: "lel_664", wins: 17, id: -1 }, { nick: "lel is back", wins: 17, id: -1 }] */

    io : SocketIO.Server;
    constructor(io) {
        GameServer.instance = this;
        this.io = io;
        this.top3Wins = [];
        /* this.top3Wins[0] = { nick: "Guest_35", wins: 0, id:-1 };
        this.top3Wins[1] = { nick: "Guest_44", wins: 0, id:-1 };
        this.top3Wins[2] = { nick: "Guest_50", wins: 0, id:-1 }; */
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
        host.challengers = [];
        client.challengers = [];
        host.status = PlayerStatus.ingame;
        client.status = PlayerStatus.ingame;
        var game = new GameCore(this.lastGameID, host, client);
        this.games.push(game);
        this.lastGameID++;
        console.log("Jogo criado id"+game.id);
        host.lastMsgSent="";
        client.lastMsgSent="";
        return game;
    }

    startBotGame(host : ServerPlayer) {
        host.status = PlayerStatus.ingame;
        var game = new GameCore(this.lastGameID, host, new ServerBot());
        this.games.push(game);
        this.lastGameID++;
        console.log("started bot match! with "+host.nick);
    }
    onCancelWatch(player: ServerPlayer) {
        player.status = PlayerStatus.connected;
        let game = this.getGameByPlayerId(player.id);

        if (game != null) {
            game.removeObserver(player.id);
        }
    }
    onSurrender(player: ServerPlayer) {
        if (player.status == PlayerStatus.ingame) {
            if (this.getGameByPlayerId(player.id) != null) {
                if (this.getGameByPlayerId(player.id).client.serverPlayer.id == player.id) {
                    this.getGameByPlayerId(player.id).endGame(true);
                }
                else {
                    this.getGameByPlayerId(player.id).endGame(false);
                }
            }
        }


        player.status = PlayerStatus.connected;
    }

    getOnlineTop5() {
        var players = [];

        this.clients.forEach(p => {
            players.push({ id: p.id, status: p.status, wins: p.wins, nick: p.nick });
        });
        players.sort(predicateBy("wins"));
        players.reverse();

        players.splice(5, players.length - 5);

        return players;
    }


    checkIfPlayerOnTop5(player : ServerPlayer) : boolean{
        var isOnTop5 = false;

        var players =[];


        this.clients.forEach(p => {
            players.push({ id: p.id, status: p.status, wins: p.wins, nick: p.nick });
        });

        players.sort(predicateBy("wins"));
        players.reverse();

        players.splice(5, players.length-5);

        for (var i = 0; i < players.length; i++) {
            if (players[i].id == player.id) {
                isOnTop5 = true;
            }
        }
        return isOnTop5;
    }

    onMatchmaking(player : ServerPlayer) {
        console.log("askMatchmaking requisitado por player id: " + player.id + " " + player.nick);

        if (!this.checkIfPlayerOnTop5(player)) {
            console.log("entrando em matchmaking normal player " + player.nick);
            player.status = PlayerStatus.matchmaking;
            player.challengers = [];
            var players : Array<ServerPlayer> = this.getPlayersMatchmaking();
            if (players.length >= 2) {
                player.challengers = [];

                players[0].status = PlayerStatus.ingame;
                players[1].status = PlayerStatus.ingame;
                this.createGame(players[0], players[1]);
            }
        }
        else {
            if (player.status != PlayerStatus.preMatchmaking) {
                console.log("entrando em pre-matchmaking player "+player.nick);
                player.status = PlayerStatus.preMatchmaking;
                this.broadCastAllPlayers();
                setTimeout(this.resolveMatchmaking.bind(this, player.id), 5000);
            }
        }
    }

    resolveMatchmaking(playerId) {
        console.log("resolveMatchmaking called por "+playerId);

        var player = this.getPlayerById(playerId);
        if (player == null)
            return;
        if (player.status == PlayerStatus.ingame || player.status == PlayerStatus.spectating || player.status == PlayerStatus.connected)
            return;
        if (player.challengers.length >0){
            var arr = [];
            player.challengers.forEach(p => {
                let challenger : ServerPlayer = this.getPlayerById(p);
                if (challenger != null) {
                    arr.push({id: challenger.id, wins: challenger.wins, status: challenger.status});
                }
            });

            arr.sort(predicateBy("wins"));
            arr.reverse();

            var jaAchou=false;
            arr.forEach(p => {
                if (!(p.status == PlayerStatus.ingame || p.status == PlayerStatus.spectating) && !jaAchou) {
                    console.log("iniciando match com challenger id "+p.id);
                    player.challengers = [];

                    let challenger = this.getPlayerById(p.id); 
                    challenger.status = PlayerStatus.ingame;
                    player.status = PlayerStatus.ingame;
                    this.createGame(player, challenger);
                    jaAchou = true;
                }
            });
        }
        else {
            console.log("sem challengers... entrando em matchmaking normal player " + player.nick);
            player.status = PlayerStatus.matchmaking;
            var players: Array<ServerPlayer> = this.getPlayersMatchmaking();
            if (players.length >= 2) {
                players[0].status = PlayerStatus.ingame;
                players[1].status = PlayerStatus.ingame;
                this.createGame(players[0], players[1]);
            }
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
        console.log("player id "+player.id+" "+player.nick+" saiu");
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
                else if (this.clients[i].status == PlayerStatus.spectating) {
                    let game = this.getGameByPlayerId(this.clients[i].id)
                    if (game != null) {
                        game.removeObserver(this.clients[i].id);
                    }
                }
                    this.clients[i] = null;
                    this.clients.splice(i, 1);
                return;
            }
        }
    }

    onChallengePlayer(player, id) {
        var playerChallenged = this.getPlayerById(id);

        if (playerChallenged == null) {
            return;
        }
        if (!(playerChallenged.status == PlayerStatus.ingame || playerChallenged.status == PlayerStatus.spectating))
            playerChallenged.challengers.push(player.id);
    }

    getGameByPlayerId(id) : GameCore {
        var gameCore = null;
        this.games.forEach(game => {
            if (game.client.serverPlayer.id == id || game.host.serverPlayer.id == id) {
                gameCore = game;
            }
            game.observers.forEach(obs => {
                if (obs.id == id) {
                    gameCore = game;
                }
            });
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
                players.push({ id: p.id, status: p.status, wins: p.wins, nick: p.nick });
            });


            var arr = [];

            players.forEach(p => {
                arr.push({id: p.id, nick: p.nick, wins: p.wins});
            });

            this.top3Wins.forEach(k => {
                var jaTem = false;
                arr.forEach(e => {
                    if (k && e){
                        if (e.nick == k.nick || e.id == k.id) {
                            jaTem = true;
                        }
                    }
                });
                if (!jaTem) {
                    arr.push(k);
                }
            });

            arr.sort(predicateBy("wins"));
            arr.reverse();
            if (arr[0])
                this.top3Wins[0] = arr[0];
            if (arr[1])
                this.top3Wins[1] = arr[1];
            if (arr[2])
                this.top3Wins[2] = arr[2];

            var liveGames = [];

            arr = players;
            arr.sort(predicateBy("wins"));
            arr.reverse();

            var aux =0;
            var gameIdsAdded = [];
            arr.forEach(p => {
                if (p.status == PlayerStatus.ingame && aux < 3) {
                    let game = this.getGameByPlayerId(p.id);
                    if (gameIdsAdded.indexOf(game.id) == -1 && !(game.client instanceof GameBot)) {
                        liveGames.push({gameId: game.id, host: game.host.serverPlayer.nick, client: game.client.serverPlayer.nick, watchCount: game.observers.length});
                        aux++;
                        gameIdsAdded.push(game.id);
                    }
                }
            });
            playersOnLobby.forEach(p => {
                if (p.socket) {
                    p.socket.emit('receivePlayers', {players: players, top3: this.top3Wins, onlineTop5: this.getOnlineTop5(),liveGames: liveGames});
                }
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
            if (!versusBot && hostWon)
                game.host.serverPlayer.wins++;
        }
        if (game.client) {
            if (game.client.serverPlayer.socket) {
                game.client.serverPlayer.socket.emit('endGame', { hostWon: hostWon });
                game.client.serverPlayer.status = PlayerStatus.connected;
                if (!versusBot && !hostWon)
                    game.client.serverPlayer.wins++;
            }
        }
        console.log("jogo id " + game.id + " foi finalizado");
        if (!versusBot) {
            let winnerNick = hostWon? game.host.serverPlayer.nick : game.client.serverPlayer.nick;
            let loserNick = !hostWon ? game.host.serverPlayer.nick : game.client.serverPlayer.nick;
            this.onMessage(winnerNick+"- has defeated /"+loserNick);
        }
    }
    checkNickExistsAndNotMine(nick, player) {
        var exists = false;
        this.clients.concat(this.top3Wins).forEach(client => {
            if (client.nick == nick && client.id != player.id) {
                exists = true;
            }
        });
        return exists;
    }
    onMessage(msg, player? : ServerPlayer) {
        if (player) {
            if (player.lastMsgSent != msg) {
                /* let playersOnLobby = this.getPlayersOnLobby();
                if (playersOnLobby.length > 0) {
                    playersOnLobby.forEach(p => {
                        if (p.socket)
                            p.socket.emit('receiveMessage', msg);
                    });
                } */
                this.io.emit('receiveMessage', msg);
                this.last10messages.push(msg);
                if (this.last10messages.length > 11) {
                    this.last10messages.splice(0, 1);
                }

                player.lastMsgSent = msg;
            }
        }
        else {
            let playersOnLobby = this.getPlayersOnLobby();
            if (playersOnLobby.length > 0) {
                playersOnLobby.forEach(p => {
                    if (p.socket)
                        p.socket.emit('receiveMessage', msg);
                });
            }
            this.last10messages.push(msg);
            if (this.last10messages.length > 11) {
                this.last10messages.splice(0, 1);
            }
        }
    }
    onWatchGame(player : ServerPlayer, gameId) {
        var game = this.getGameById(gameId);
        if (game != null) {
            player.challengers = [];
            player.status = PlayerStatus.spectating;
            player.socket.emit('startGame', { id: game.id, rows: GameConfig.GRID_ROWS, cols: GameConfig.GRID_COLS, 
                isHost: null, stepRate: GameConfig.STEP_RATE, playerId: player.id, opponentNick: game.client.serverPlayer.nick });
            game.observers.push(player);
        }
    }

    getGameById(id):GameCore{
        var game=null;
        this.games.forEach(g => {
            if (g.id == id) {
                game = g;
            }
        });
        return game;
    }
    getPlayerById(id) : ServerPlayer {
        var player = null;
        this.clients.forEach(c => {
            if (c.id == id) {
                player = c
            }
        });
        return player;
    }
    getPlayerByNick(nick): ServerPlayer {
        var player = null;
        this.clients.forEach(c => {
            if (c.nick == nick) {
                player = c
            }
        });
        return player;
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