import { ServerPlayer, PlayerStatus } from './ServerPlayer';


export class GameServer {
    lastPlayerID = 0;

    clients : Array<ServerPlayer> = new Array<ServerPlayer>(); 

    constructor() {
        console.log("gameserver instanciado");
    }

    addPlayer(): ServerPlayer {
        var player = new ServerPlayer(this.lastPlayerID);
        this.clients.push(player);
        this.lastPlayerID++;
        console.log("player id "+player.id+" se conectou");
        return player;
    }

    onConnected() : ServerPlayer{
        return this.addPlayer();
    }

    onMatchmaking(player : ServerPlayer) {
        console.log("askMatchmaking requisitado por player id: "+player.id);
        player.status = PlayerStatus.matchmaking;
    }

    onDisconnect(player): void {
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