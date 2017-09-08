export enum PlayerStatus {
    connected,
    matchmaking,
    ingame,
    spectating,
    preMatchmaking
}

export class ServerPlayer {
    id;
    socket : SocketIO.Socket;
    status : PlayerStatus;
    nick;

    wins = 0;

    socketSet = false;

    challengers = [];

    constructor(id, socket?) {
        this.id = id;
        this.status = PlayerStatus.connected;
        this.nick = "Guest_"+id;
        if (socket)
            this.socket = socket;
    }


}