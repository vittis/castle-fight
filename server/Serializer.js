"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var DataSerializer;
(function (DataSerializer) {
    function SerializeEntity(entity) {
        var obj = {};
        obj.row = entity.tile.row;
        obj.col = entity.tile.col;
        obj.data = entity.getEntityData();
        obj.isHost = entity.owner.isHost;
        obj.id = entity.id;
        return obj;
    }
    DataSerializer.SerializeEntity = SerializeEntity;
    function SerializePlayer(player) {
        var obj = {};
        obj.gold = player.resourceManager.gold;
        obj.wood = player.resourceManager.wood;
        obj.income = player.resourceManager.income;
        obj.incomeRate = player.resourceManager.incomeRate;
        obj.incomeRateCounter = player.resourceManager.incomeRateCounter;
        obj.updateCount = player.updateManager.updateCount;
        obj.updateRate = player.updateManager.updateRate;
        obj.updateRateCounter = player.updateManager.updateRateCounter;
        return obj;
    }
    DataSerializer.SerializePlayer = SerializePlayer;
    function SerializeBall(bm) {
        var obj = {};
        obj.spamRate = bm.spamRate;
        obj.spamRateCounter = bm.spamRateCounter;
        obj.hostMatou = bm.hostMatou;
        obj.clientMatou = bm.clientMatou;
        obj.reward = bm.baseReward;
        return obj;
    }
    DataSerializer.SerializeBall = SerializeBall;
    function SerializeTile(tile) {
        var obj = {};
        obj.row = tile.row;
        obj.col = tile.col;
        if (tile.entity == null)
            obj.entity = null;
        else
            obj.entity = SerializeEntity(tile.entity);
        return obj;
    }
    DataSerializer.SerializeTile = SerializeTile;
    function SerializeGrid(grid) {
        if (grid === void 0) { grid = []; }
        var obj = [];
        for (var i = 0; i < GameConfig_1.GameConfig.GRID_ROWS; i++) {
            obj[i] = [];
            for (var j = 0; j < GameConfig_1.GameConfig.GRID_COLS; j++) {
                obj[i][j] = SerializeTile(grid[i][j]);
            }
        }
        return obj;
    }
    DataSerializer.SerializeGrid = SerializeGrid;
})(DataSerializer = exports.DataSerializer || (exports.DataSerializer = {}));
