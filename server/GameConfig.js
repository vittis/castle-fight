"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig;
(function (GameConfig) {
    GameConfig.GRID_ROWS = 16;
    GameConfig.GRID_COLS = 31;
    GameConfig.STEP_RATE = 700;
    GameConfig.STARTING_GOLD = 350;
    GameConfig.STARTING_WOOD = 300;
    GameConfig.STARTING_INCOME = 15;
    GameConfig.STARTING_INCOME_RATE = 14;
    GameConfig.BALL_SPAM_RATE = 80;
    GameConfig.UPDATE_RATE = 65;
    GameConfig.UNITS = ['Archer', 'Engineer', 'Farmer', 'Footman', 'King', 'Mage', 'Propeller', 'Sniper', 'Thief', 'Witch'];
    GameConfig.BUILDINGS = ['SacrificeChamber', 'HeroShrine', 'ArcheryRange', 'Barn', 'Barracks', 'GravityChamber', 'KingsCourt', 'MagesGuild', 'SpecialFacility', 'StorageBarn', 'TechStation', 'ThiefsTent', 'WitchsHut'];
})(GameConfig = exports.GameConfig || (exports.GameConfig = {}));
