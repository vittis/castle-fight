var GameConfig;
(function (GameConfig) {
    GameConfig.tileSize = 48;
    GameConfig.uiHeight = 70;
    GameConfig.uiWidth = 0;
    GameConfig.updateRate = 500;
    GameConfig.buildingNameData = [];
    GameConfig.unitNameData = [];
    GameConfig.deck = ['Barracks', 'ArcheryRange', 'MagesGuild', 'Archer', 'Engineer', 'Sniper', 'GravityChamber', 'KingsCourt'];
    GameConfig.deckName = "<default deck>";
    GameConfig.yourNick = "";
    GameConfig.opponentNick = "";
})(GameConfig || (GameConfig = {}));
