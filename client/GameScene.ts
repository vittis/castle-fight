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
        uiEntityManager : UIEntityManager;
        incomeBallBar : IncomeBallBar;

        player : PlayerData = {incomeRate: 1, incomeRateCounter: 0, gold: 0, wood: 0, income: 10};
        ballData = {spamRate: 1, spamRateCounter: 0};
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
                    if((i >= 6 && i <= 9) && (j >= 8 && j <= 22)){ //para 16x31
                        this.game.add.sprite(j * GameConfig.tileSize + uiArea, i * GameConfig.tileSize, 'arvore1');
                    }
                }
            }

            this.uiBuildingManager = new UIBuildingManager(this.game);
            this.uiResourceManager = new UIResourceManager(this.game);
            this.uiEntityManager = new UIEntityManager(this.game);
            this.incomeBallBar = new IncomeBallBar(this.game);

            //var q = this.game.add.sprite(this.grid[10][4].x, this.grid[10][4].y, 'tileSelected');
        }

        update() {
            this.uiBuildingManager.update();
            this.uiEntityManager.update();
        }

        updateEntities(newEntities : any[]) {
            this.uiResourceManager.updateResources(this.player.incomeRateCounter);     
            this.incomeBallBar.updateCounter(this.ballData.spamRateCounter);

            this.uiBuildingManager.buildingsGroup.forEachAlive(function(item) {
                this.world.bringToTop(item.tudoGroup);
            }.bind(this), this);

            this.world.bringToTop(this.uiBuildingManager.buildingsGroup);
            
            newEntities.forEach(newEntity => {
                var entityID = newEntity.id;
                if (this.idExists(entityID)) {
                    this.getEntityById(entityID).updateStep(newEntity.data, this.grid[newEntity.row][newEntity.col]);
                }
                else {
                    this.entities.push(new Kodo[newEntity.data.name](this.game, this.grid[newEntity.row][newEntity.col], entityID, newEntity.isHost, newEntity.data));
                }
            });
            this.cleanDeadEntities(newEntities);  
            
            this.uiEntityManager.updateText();
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

        getOuterTiles(building : Building): Tile[] {
            var tiles: Tile[] = [];

            for (var i = 0; i < building.dataq.width; i++) {
                for (var j = 0; j < building.dataq.height; j++) {
                    var currentTile = this.grid[building.tile.row + j][building.tile.col + i];
                    this.getNeighbors(currentTile).forEach(t => {
                        if (t.entity == null) {
                            if (tiles.indexOf(t) == -1)
                                tiles.push(t);
                        }
                    });
                }

            }

            return tiles;
        }
        getNeighbors(tile: Tile): Tile[] {
            var tiles: Tile[] = [];
            for (var dx = -1; dx <= 1; dx++) {
                for (var dy = -1; dy <= 1; dy++) {
                    if (dx != 0 || dy != 0) {
                        if (this.isValid(tile.row + dx, tile.col + dy)) {
                            tiles.push(this.grid[tile.row + dx][tile.col + dy]);
                        }
                    }
                }
            }
            return tiles;
        }
        isValid(row, col): boolean {
            if ((row >= 0 && row < GameConfig.GRID_ROWS) && (col >= 0 && col < GameConfig.GRID_COLS)) {
                return true;
            }
            return false;
        }
    }
}