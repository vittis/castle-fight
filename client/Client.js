var Client;
(function (Client) {
    var socket = io.connect('http://192.168.0.25:8081');
    var startPingTime = 0;
    socket.on('startGame', function (data) {
        console.log("start game recebido - iniciando jogo!");
        var gameId = data.id;
        var rows = data.rows;
        var cols = data.cols;
        var isHost = data.isHost;
        var stepRate = data.stepRate;
        GameConfig.GRID_ROWS = rows;
        GameConfig.GRID_COLS = cols;
        GameConfig.updateRate = stepRate;
        GameConfig.isHost = isHost;
        Kodo.Game.instance.state.start('GameScene', true, false);
    });
    socket.on('receiveData', function (data) {
        Kodo.GameScene.instance.player = data.player;
        Kodo.GameScene.instance.ballData = data.ballData;
        Kodo.GameScene.instance.updateEntities(data.entities);
    });
    socket.on('receiveBuildingAndUnitData', function (data) {
        data.unitData.forEach(function (element) {
            if (Kodo[element.name]) {
                Kodo[element.name].nome = element.name;
                Kodo[element.name].width = element.width;
                Kodo[element.name].height = element.height;
                Kodo[element.name].maxHP = element.maxHP;
                Kodo[element.name].maxArmor = element.maxArmor;
                Kodo[element.name].attackDmg = element.attackDmg;
                Kodo[element.name].attackRate = element.attackRate;
                Kodo[element.name].attackRange = element.attackRange;
                Kodo[element.name].description = element.description;
            }
        });
        data.buildingData.forEach(function (element) {
            if (Kodo[element.name]) {
                Kodo[element.name].nome = element.name;
                Kodo[element.name].goldCost = element.goldCost;
                Kodo[element.name].woodCost = element.woodCost;
                Kodo[element.name].width = element.width;
                Kodo[element.name].height = element.height;
                Kodo[element.name].maxHP = element.maxHP;
                Kodo[element.name].maxArmor = element.maxArmor;
                Kodo[element.name].spamUnit = element.spamUnit;
                Kodo[element.name].spamCount = element.spamCount;
                Kodo[element.name].spamRate = element.spamRate;
                Kodo[element.name].description = element.description;
                Kodo[element.name].incomeGain = element.incomeGain;
            }
        });
        console.log("recebi data");
    });
    socket.on('endGame', function (data) {
        console.log("end game recebido - finalizando jogo!");
        Kodo.Game.instance.state.start('MainMenu', true, false);
    });
    function askMatchmaking() {
        socket.emit('askMatchmaking');
    }
    Client.askMatchmaking = askMatchmaking;
    function askBuild(row, col, name) {
        socket.emit('askBuild', { row: row, col: col, name: name, isHost: Kodo.GameScene.instance.isHost });
    }
    Client.askBuild = askBuild;
    function askSpamTileMark(row, col, buildingId) {
        socket.emit('askSpamTileMark', { row: row, col: col, buildingId: buildingId, isHost: Kodo.GameScene.instance.isHost });
    }
    Client.askSpamTileMark = askSpamTileMark;
    function askTrainUnit(buildingId) {
        socket.emit('askTrainUnit', { buildingId: buildingId, isHost: Kodo.GameScene.instance.isHost });
    }
    Client.askTrainUnit = askTrainUnit;
    function askPauseUnit(buildingId) {
        socket.emit('askPauseUnit', { buildingId: buildingId, isHost: Kodo.GameScene.instance.isHost });
    }
    Client.askPauseUnit = askPauseUnit;
})(Client || (Client = {}));
