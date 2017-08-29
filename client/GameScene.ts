module Kodo {
    export interface PlayerData {
        gold?: number;
        wood?: number;
        income?: number;
        incomeRate?: number;
        incomeRateCounter?;
        updateRateCounter?;
        updateRate?;
        updateCount?;
    }
    export class GameScene extends Phaser.State {

        id : number;

        grid : Tile[][] = [];

        entities : Entity[] = [];
    
        uiBuildingManager : UIBuildingManager;
        uiResourceManager: UIResourceManager;
        uiEntityManager : UIEntityManager;
        incomeBallBar : IncomeBallBar;
        updateManager : UpdateManager;

        player : PlayerData = {incomeRate: 1, incomeRateCounter: 0, gold: 150, wood: 0, income: 10, updateRateCounter: 0, updateRate: 1, updateCount: 0};
        ballData = {spamRate: 1, spamRateCounter: 0, hostMatou: false, clientMatou: false, reward: 0};
        isHost : boolean;

        static instance : GameScene = null;

        lastTimeUpdate;


        create() {
            GameScene.instance = this;
            this.game.stage.backgroundColor = '#29B865';
            this.isHost = GameConfig.isHost;

            for (var i = 0; i < GameConfig.GRID_ROWS; i++) {
                this.grid[i] = [];
                for (var j = 0; j < GameConfig.GRID_COLS; j++) {
                    this.grid[i][j] = new Tile(j * GameConfig.tileSize, i * GameConfig.tileSize, i, j);
                }
            }
            this.game.add.sprite(0, 0, 'tileFundo');
            this.game.add.sprite(this.grid[6][8].x, this.grid[6][8].y, 'arvores');


            this.uiBuildingManager = new UIBuildingManager(this.game);
            this.uiResourceManager = new UIResourceManager(this.game);
            this.uiEntityManager = new UIEntityManager(this.game);
            this.incomeBallBar = new IncomeBallBar(this.game);  
            this.updateManager = new UpdateManager(this.game);  


            var style = { font: "14px Lucida Console", fill: 'white'};
            var yourNickLabel = this.game.add.text(0, 0, GameConfig.yourNick, style);
            yourNickLabel.stroke = '#E27952';
            yourNickLabel.strokeThickness = 4;
            if (!GameConfig.isHost) {
                yourNickLabel.x = this.game.width - yourNickLabel.width;
                yourNickLabel.stroke = '#0D6032';
                yourNickLabel.strokeThickness = 4;
            }

            var opponentNick = this.game.add.text(0, 0, GameConfig.opponentNick, style);
            opponentNick.stroke = '#E27952';
            opponentNick.strokeThickness = 4;
            if (GameConfig.isHost) {
                opponentNick.x = this.game.width - opponentNick.width;
                opponentNick.stroke = '#0D6032';
                opponentNick.strokeThickness = 4;
            }

        }

         update() {
            this.uiBuildingManager.update();
            this.uiEntityManager.update(); 
            this.updateManager.update();
        } 
        
        updateEntities(newEntities : any[]) {
            console.log(Date.now() - this.lastTimeUpdate);
            this.uiResourceManager.updateResources(this.player.incomeRateCounter);     
            this.incomeBallBar.updateCounter(this.ballData.spamRateCounter);
            this.uiBuildingManager.tintBuyable(this.player.gold, this.player.wood);
            this.updateManager.updateCounter(this.player.updateRateCounter);
            if (this.updateManager.uIUpdateButton.allGroup.visible){
                this.world.bringToTop(this.updateManager.uIUpdateButton.allGroup);
                this.updateManager.uIUpdateButton.updateText();
              }

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

            this.lastTimeUpdate = Date.now();
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

        getSpamBuildings(fromHost : boolean) : SpamBuilding[] {
            var buildings: SpamBuilding[] = [];
            this.entities.forEach(e => {
                if (e instanceof SpamBuilding && e.isHost == fromHost) {
                    buildings.push(e);
                }
            });
            return buildings;
        }


    }
}