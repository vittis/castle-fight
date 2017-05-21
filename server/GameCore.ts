import { ServerPlayer, PlayerStatus } from './ServerPlayer';
import { GameConfig } from './GameConfig';
import { GameServer } from './GameServer';
import { GridManager} from './GridManager';
import { Entity } from "./Entity";
import { Castle } from "./Building";


var prompt = require('prompt');
prompt.start();
/*prompt.get(['username', 'email'], function (err, result) {
            console.log('Command-line input received:');
            console.log('  username: ' + result.username);
            console.log('  email: ' + result.email);
        });*/


export class GameCore {
    id : number;
    host : ServerPlayer;
    client  : ServerPlayer;

    gridManager : GridManager;

    entities : Entity[] = [];

    constructor(id : number, host : ServerPlayer, client : ServerPlayer) {
        this.id = id;

        this.host = host;
        this.client = client;

        this.gridManager = new GridManager(GameConfig.GRID_ROWS, GameConfig.GRID_COLS);

        //host.socket.emit('startGame', {id: this.id, grid: this.gridManager.grid, host: true});
        //client.socket.emit('startGame', {id: this.id, grid: this.gridManager.grid, host: false});

        console.log("jogo id "+this.id+" foi criado");

        this.entities.push(new Castle(this.gridManager, 0, 1, 1, 1));

        this.gridManager.printGrid();
    }

    endGame() : void {
        console.log("end game chamado");
        GameServer.instance.endGame(this);
    }

    

}