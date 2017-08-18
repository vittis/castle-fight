export enum PlayerStatus {
    connected,
    matchmaking,
    ingame
}

export class ServerPlayer {
    id;
    socket : SocketIO.Socket;
    status : PlayerStatus;
    nick;

    constructor(id, socket?) {
        this.id = id;
        this.status = PlayerStatus.connected;
        this.nick = "Guest_"+id;
        if (socket)
            this.socket = socket;
    }


}