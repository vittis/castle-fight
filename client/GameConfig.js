var GameConfig;
(function (GameConfig) {
    GameConfig.tileSize = 48; //32 ou 64
    GameConfig.uiHeight = 70;
    GameConfig.uiWidth = 0;
    GameConfig.updateRate = 500;
    GameConfig.buildingNameData = [];
    GameConfig.unitNameData = [];
    GameConfig.deck = ['Barracks', 'ArcheryRange', 'Barn', 'ThiefsTent', 'StorageBarn', 'GravityChamber', 'SpecialFacility', 'Archer'];
    GameConfig.deckName = "<default deck>";
    GameConfig.yourNick = "";
    GameConfig.opponentNick = "";
})(GameConfig || (GameConfig = {}));
