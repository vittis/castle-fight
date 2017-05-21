import { ServerPlayer, PlayerStatus } from './ServerPlayer';
import { GameConfig } from './GameConfig';
import { GameServer } from './GameServer';
import { GridManager} from './GridManager';
import { Entity } from "./Entity";
import { Castle } from "./Building";
import { GamePlayer } from "./GamePlayer";
import { Soldado } from "./Unit";
import { AStar } from "./lib/AStar";
import { ManhattenHeuristic } from "./lib/Heuristics/ManhattenHeuristic";

/*
var prompt = require('prompt');

prompt.start();
prompt.get(['username', 'email'], function (err, result) {
            console.log('Command-line input received:');
            console.log('  username: ' + result.username);
            console.log('  email: ' + result.email);
        });*/



var soldado;

export class GameCore {
    id : number;
    host : GamePlayer;
    client  : GamePlayer;

    gridManager : GridManager;

    entities : Entity[] = [];

    constructor(id : number, host : ServerPlayer, client : ServerPlayer) {
        this.id = id;

        this.host = new GamePlayer(host);
        this.client = new GamePlayer(client);

        this.gridManager = new GridManager(GameConfig.GRID_ROWS, GameConfig.GRID_COLS);
        
        if (host.socket) {
            this.host.serverPlayer.socket.emit('startGame', {id: this.id, rows: GameConfig.GRID_ROWS, cols: GameConfig.GRID_COLS, grid: this.gridManager.grid, host: true});
            this.client.serverPlayer.socket.emit('startGame', {id: this.id, rows: GameConfig.GRID_ROWS, cols: GameConfig.GRID_COLS, grid: this.gridManager.grid, host: false});
        }
        
        this.entities.push(new Castle(this.gridManager, 0, 2, 1, 4, this.host));
        //this.entities.push(new Castle(this.gridManager, 3, 1, 3, 2, this.client));

        soldado = new Soldado(this.gridManager, 0, 0, 1, 1, this.host);
        this.entities.push(soldado);

        this.gridManager.printGrid();
            


        var astar = new AStar(new ManhattenHeuristic());
        astar.load(this.gridManager.getNumberGrid());

        var nodeA = astar.getNode(0, 0),
            nodeB = astar.getNode(4, 0);

        var path = astar.path(nodeA, nodeB); 
        for (var i = 0; i < path.length; i++) {
            console.log(path[i].x+", "+path[i].y);
        }


        console.log("jogo id "+this.id+" foi criado");
    }

    endGame() : void {
        console.log("end game chamado");
        GameServer.instance.endGame(this);
    }

    

}