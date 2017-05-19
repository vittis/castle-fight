import { ServerPlayer, PlayerStatus } from './ServerPlayer';

export class GameCore {
    id : number;
    host : ServerPlayer;
    client  : ServerPlayer;

    constructor(id : number, host : ServerPlayer, client : ServerPlayer) {
        this.id = id;

        this.host = host;
        this.client = client;

        console.log("jogo id "+this.id+" foi criado");

    }
    
}