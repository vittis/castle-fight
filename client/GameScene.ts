module Kodo {
    export class GameScene extends Phaser.State {

        id : number;
        host;
        client;

        grid : Tile[][] = [];

        entities : Entity[] = [];
    
        static instance : GameScene = null;
        
        create() {
            GameScene.instance = this;
            this.game.stage.backgroundColor = 'rgb(19,58,43)';

            for (var i = 0; i < GameConfig.GRID_ROWS; i++) {
                this.grid[i] = [];
                for (var j = 0; j < GameConfig.GRID_COLS; j++) {
                    this.grid[i][j] = new Tile(this.game, j * GameConfig.tileSize, i * GameConfig.tileSize, i, j);
                }
            }
        }

        update() {
           
        }


        updateEntities(newEntities : any[]) {
            newEntities.forEach(newEntity => {
                var entityID = newEntity.id;

                if (this.idExists(entityID)) {
                    this.getEntityById(entityID).moveTo(this.grid[newEntity.row][newEntity.col]);
                }
                else {
                    this.entities.push(new Kodo[newEntity.data.name](this.game, this.grid[newEntity.row][newEntity.col], entityID, newEntity.isHost));
                }
            });

            this.cleanDeadEntities(newEntities);
            
        }

        cleanDeadEntities(newEntities : Entity[]) {
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

        idExists(id: number): boolean {
            var jaExisteId: boolean = false;
            this.entities.forEach(e => {
                if (e.id == id) {
                    jaExisteId = true;
                }
            });

            return jaExisteId;
        }
        getEntityById(id: number): Entity {
            var entity: Entity = null;
            this.entities.forEach(e => {
                console.log(id + "  , " + e.id);
                if (e.id == id) {
                    entity = e;
                }
            });
            return entity;
        }
    }
}