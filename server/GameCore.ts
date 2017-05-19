import { ServerPlayer, PlayerStatus } from './ServerPlayer';
import { GameConfig } from './GameConfig';

export class GameCore {
    id : number;
    host : ServerPlayer;
    client  : ServerPlayer;

    grid : number[][] = [];

    constructor(id : number, host : ServerPlayer, client : ServerPlayer) {
        this.id = id;

        this.host = host;
        this.client = client;

        for (var i = 0; i < GameConfig.GRID_ROWS; i++) {
            this.grid[i] = [];
            for (var j = 0; j < GameConfig.GRID_COLS; j++) {
                this.grid[i][j] = 0;
            }
        }

        host.socket.emit('startGame', {id: this.id, grid: this.grid, host: true});
        client.socket.emit('startGame', {id: this.id, grid: this.grid, host: false});

        console.log("jogo id "+this.id+" foi criado");
    }


    printGrid() : void {
        for (var i = 0; i < GameConfig.GRID_ROWS; i++) {
            for (var j = 0; j < GameConfig.GRID_COLS; j++) {
                process.stdout.write(""+this.grid[i][j]);  
            }
            console.log("\n");
        }
    }


}