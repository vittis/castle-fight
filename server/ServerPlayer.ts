export enum PlayerStatus {
    connected,
    matchmaking,
    ingame
}

export class ServerPlayer {
    id;
    socket : SocketIO.Socket;
    status : PlayerStatus;

    constructor(id, socket?) {
        this.id = id;
        this.status = PlayerStatus.connected;

        if (socket)
            this.socket = socket;
    }


}