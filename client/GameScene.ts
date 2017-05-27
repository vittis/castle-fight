module Kodo {
    export class GameScene extends Phaser.State {

        id : number;
        host;
        client;

        grid : Tile[][] = [];

        entities : Entity[] = [];
    
        static instance : GameScene = null;

        create() {
            console.log("aeho");
            GameScene.instance = this;
            this.game.stage.backgroundColor = 'rgb(19,58,43)';

            for (var i = 0; i < 12; i++) {
                this.grid[i] = [];
                for (var j = 0; j < 20; j++) {
                    this.grid[i][j] = new Tile(this.game, j*64, i*64, i, j);
                }
            }
            //setTimeout(this.q.bind(this), 5000);

        }
        q() {
           this.entities.push(new Entity(this.game, this.grid[0][1], 1)); 
        }
        update() {
           
        }

        updateState(newGrid) {
            for (var i = 0; i < 12; i++) {
                for (var j = 0; j < 20; j++) {
                    if (newGrid[i][j].entity != null) {
                        var entityID = newGrid[i][j].entity.id;
                        var jaExisteId : boolean = false;
                        this.entities.forEach(e => {
                            if (e.id == entityID) {
                                jaExisteId = true;
                            }
                        });

                        if (jaExisteId) {
                            this.entities.forEach(e => {
                                if (e.id == entityID) {
                                    e.moveTo(this.grid[i][j]);
                                }
                            });
                        }
                        else {
                            this.entities.push(new Entity(this.game, this.grid[i][j], entityID)); 
                        }
                    }
                }
            }
        }

        updateStateEntities(newEntities : any[]) {
            newEntities.forEach(newEntity => {
                var entityID = newEntity.id;
                var jaExisteId: boolean = false;
                this.entities.forEach(e => {
                    if (e.id == entityID) {
                        jaExisteId = true;
                    }
                });

                if (jaExisteId) {
                    this.entities.forEach(e => {
                        if (e.id == entityID) {
                            e.moveTo(this.grid[newEntity.row][newEntity.col]);
                        }
                    });
                }
                else {
                    this.entities.push(new Entity(this.game, this.grid[newEntity.row][newEntity.col], entityID));
                }
            });

            var idArray = [];
            newEntities.forEach(element => {
                idArray.push(element.id);
            });


            this.entities.forEach(myEntity => {
                if (idArray.indexOf(myEntity.id) == -1) {//se n tem o id da nova entidade nas minhas entidades
                    myEntity.destroy();
                }
            });

        }
    }
}