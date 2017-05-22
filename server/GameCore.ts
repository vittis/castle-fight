import { ServerPlayer, PlayerStatus } from './ServerPlayer';
import { GameConfig } from './GameConfig';
import { GameServer } from './GameServer';
import { GridManager} from './GridManager';
import { Entity } from "./Entity";
import { Castle } from "./Building";
import { GamePlayer } from "./GamePlayer";
import { Soldado, Unit } from "./Unit";
import { AStar } from "./lib/AStar";
import { EuclideanHeuristic } from "./lib/Heuristics/EuclideanHeuristic";

/*
var prompt = require('prompt');

prompt.start();
prompt.get(['username', 'email'], function (err, result) {
            console.log('Command-line input received:');
            console.log('  username: ' + result.username);
            console.log('  email: ' + result.email);
        });*/

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

        this.gridManager = new GridManager(new AStar(new EuclideanHeuristic()), GameConfig.GRID_ROWS, GameConfig.GRID_COLS);
        
        if (host.socket) {
            this.host.serverPlayer.socket.emit('startGame', {id: this.id, rows: GameConfig.GRID_ROWS, cols: GameConfig.GRID_COLS, grid: this.gridManager.grid, host: true});
            this.client.serverPlayer.socket.emit('startGame', {id: this.id, rows: GameConfig.GRID_ROWS, cols: GameConfig.GRID_COLS, grid: this.gridManager.grid, host: false});
        }

        this.host.addEntity(new Castle(this.gridManager, GameConfig.GRID_ROWS/2-1, 0, 2, 2, this.host));
        this.client.addEntity(new Castle(this.gridManager, GameConfig.GRID_ROWS/2-1, GameConfig.GRID_COLS-2, 2, 2, this.client));

        this.host.addEntity(new Soldado(this.gridManager, 0, 0, 1, 1, this.host));
        //this.host.addEntity(new Soldado(this.gridManager, 0, 5, 1, 1, this.host));

        //this.client.addEntity(new Soldado(this.gridManager, 10, 6, 1, 1, this.client));
        //this.client.addEntity(new Soldado(this.gridManager, 10, 7, 1, 1, this.client));
        //this.client.addEntity(new Soldado(this.gridManager, 10, 8, 1, 1, this.client));

        process.stdout.write('\x1Bc');
        this.gridManager.printGrid();
            
        setInterval(this.step.bind(this), 1000);
    }

    step() {
        process.stdout.write('\x1Bc');

        this.gridManager.aStar.load(this.gridManager.getNumberGrid());
        
        var hostUnits = this.host.getAllUnits();
        var clientUnits = this.client.getAllUnits();

        var allUnits = hostUnits.concat(clientUnits);
        
        var hostEntities = this.host.getAllEntities();
        var clientEntities = this.client.getAllEntities();

        allUnits.forEach(unit => {
            var target : Entity = null;
            var shortestDistance = 100;
            if (unit.owner == this.host) {

               clientEntities.forEach(c_unit => {

                    var dist = this.gridManager.aStar.heuristic.getHeuristic(unit.tile.col, unit.tile.row, 0, c_unit.tile.col, c_unit.tile.row, 0);
                    if (dist < shortestDistance) {
                        target = c_unit;
                        shortestDistance = dist;
                    }
                });
            }
            else {
                hostEntities.forEach(h_unit => {
                    var dist = this.gridManager.aStar.heuristic.getHeuristic(unit.tile.col, unit.tile.row, 0, h_unit.tile.col, h_unit.tile.row, 0);
                    if (dist < shortestDistance) {
                        target = h_unit;
                        shortestDistance = dist;
                    }
                });
            }

            var nodeA = this.gridManager.aStar.getNode(unit.tile.col, unit.tile.row),
            nodeB = this.gridManager.aStar.getNode(target.tile.col, target.tile.row);
        
            var path = this.gridManager.aStar.path(nodeA, nodeB); 

            if (path.length > 1 ) {
                if (this.gridManager.grid[path[1].y][path[1].x].entity == null)
                    unit.moveTo(this.gridManager.grid[path[1].y][path[1].x]);
            }

        });

        
        this.gridManager.printGrid();
    }

    getAllUnits() : Unit[]{
        return this.host.getAllUnits().concat(this.client.getAllUnits());
    }

    endGame() : void {
        console.log("end game chamado");
        GameServer.instance.endGame(this);
    }

    

}