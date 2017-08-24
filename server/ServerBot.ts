import { ServerPlayer, PlayerStatus } from "./ServerPlayer";

export class ServerBot extends ServerPlayer {

    constructor() {
        super(-1);
        this.nick = "Really Dumb Bot";
        this.status = PlayerStatus.ingame;
    }
}