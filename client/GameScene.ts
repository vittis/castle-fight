module Kodo {
    export interface PlayerData {
        gold?: number;
        wood?: number;
        income?: number;
        incomeRate?: number;
        incomeRateCounter?;
    }
    export class GameScene extends Phaser.State {

        id : number;

        grid : Tile[][] = [];

        entities : Entity[] = [];
    
        uiBuildingManager : UIBuildingManager;
        uiResourceManager: UIResourceManager;

        player : PlayerData = {incomeRate: 20, incomeRateCounter: 0, gold: 0, wood: 0, income: 10};
        isHost : boolean;

        static instance : GameScene = null;

        create() {
            GameScene.instance = this;
            this.game.stage.backgroundColor = '#29B865';
            this.isHost = GameConfig.isHost;

            var uiArea = this.isHost ? GameConfig.uiWidth : 0; 

            for (var i = 0; i < GameConfig.GRID_ROWS; i++) {
                this.grid[i] = [];
                for (var j = 0; j < GameConfig.GRID_COLS; j++) {
                    this.grid[i][j] = new Tile(this.game, j * GameConfig.tileSize + uiArea, i * GameConfig.tileSize, i, j);
                    if((i >= 6 && i <= 9) && (j >= 8 && j <= 20)){ //para 16x29
                        this.game.add.sprite(j * GameConfig.tileSize + uiArea, i * GameConfig.tileSize, 'arvore1');
                    }
                }
            }

            this.uiBuildingManager = new UIBuildingManager(this.game);
            this.uiResourceManager = new UIResourceManager(this.game);
        }

        update() {
            this.uiBuildingManager.update();
        }

        updateEntities(newEntities : any[]) {
            this.uiResourceManager.updateResources(this.player.incomeRateCounter);     

            newEntities.forEach(newEntity => {
                var entityID = newEntity.id;

                
                if (this.idExists(entityID)) {
                    //this.getEntityById(entityID).moveTo(this.grid[newEntity.row][newEntity.col]);
                    this.getEntityById(entityID).updateStep(newEntity.data, this.grid[newEntity.row][newEntity.col]);

                }
                else {
                    this.entities.push(new Kodo[newEntity.data.name](this.game, this.grid[newEntity.row][newEntity.col], entityID, newEntity.isHost, newEntity.data));
                }
            });
            this.cleanDeadEntities(newEntities);       
        }

        cleanDeadEntities(newEntities : Entity[]) {
            var idArray = [];
            newEntities.forEach(element => {
                idArray.push(element.id);
            });


            for (var i = 0; i < this.entities.length; i++) {
                if (idArray.indexOf(this.entities[i].id) == -1) {//se n tem o id da nova entidade nas minhas entidades
                    this.entities[i].onDeath();
                    this.entities.splice(i, 1);
                }
            }
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
                if (e.id == id) {
                    entity = e;
                }
            });
            return entity;
        }
    }
}