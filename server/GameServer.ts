import { ServerPlayer } from './ServerPlayer';


export class GameServer {
    lastPlayerID = 0;

    clients: { [key : number] : ServerPlayer; } = {};

    constructor() {
        console.log("gameserver instanciado");
    }

    addPlayer(): ServerPlayer {
        var player = new ServerPlayer(this.lastPlayerID);
        this.clients[player.id] = player;
        this.lastPlayerID++;
        return player;
    }

    onDisconnect(id): void {
        delete this.clients[id];
    }

    getClientsLenght() : number {
        return Object.keys(this.clients).length;
    }
}