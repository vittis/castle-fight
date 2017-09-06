module GameConfig {
    export var GAME_WIDTH;
    export var GAME_HEIGHT;

    export var GRID_ROWS;
    export var GRID_COLS;

    export var tileSize = 48;//32 ou 64
    export var uiHeight = 70;
    export var uiWidth = 0;


    export var updateRate = 500;

    export var isHost;

    export var buildingNameData: string[] = [];
    export var unitNameData: string[] = [];

    export var deck = ['Barracks', 'ArcheryRange', 'WitchsHut', 'Engineer', 'Sniper', 'GravityChamber', 'MagesGuild','KingsCourt'];

    export var deckName = "<default deck>";

    export var yourNick = "";
    export var opponentNick = "";

    export var hostNick = "";
    export var clientNick = "";

}