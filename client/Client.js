var Client;
(function (Client) {
    var socket = io.connect();
    var startPingTime = 0;
    socket.on('startGame', function (data) {
        console.log("Starting game...");
        var gameId = data.id;
        var rows = data.rows;
        var cols = data.cols;
        var isHost = data.isHost;
        var stepRate = data.stepRate;
        GameConfig.GRID_ROWS = rows;
        GameConfig.GRID_COLS = cols;
        GameConfig.updateRate = stepRate;
        GameConfig.isHost = isHost;
        if (GameConfig.yourNick == "") {
            GameConfig.yourNick = "Guest_" + data.playerId;
        }
        GameConfig.opponentNick = data.opponentNick;
        Kodo.MainMenu.instance.startGame();
    });
    socket.on('startGameLoop', function (data) {
        console.log("Starting main game loop");
        Kodo.GameScene.instance.uiResourceManager.startGame();
    });
    socket.on('receiveData', function (data) {
        if (Kodo.GameScene.instance != null) {
            Kodo.GameScene.instance.player = data.player;
            Kodo.GameScene.instance.ballData = data.ballData;
            Kodo.GameScene.instance.updateEntities(data.entities);
        }
    });
    socket.on('receiveBuildingAndUnitData', function (data) {
        data.buildingData.forEach(function (element) {
            if (!(element.name == 'Castle' || element.name == "IncomeBall" || element.name == "Tower" || element.name == "TrapDevice"))
                GameConfig.buildingNameData.push(element.name);
        });
        data.unitData.forEach(function (element) {
            GameConfig.unitNameData.push(element.name);
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
                Kodo[element.name].goldCost = element.goldCost;
                Kodo[element.name].woodCost = element.woodCost;
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
        console.log("Card data received");
    });
    socket.on('endGame', function (data) {
        console.log("Finishing match, host won? " + data.hostWon);
        Kodo.GameScene.instance.endGame(data.hostWon);
    });
    socket.on('receivePlayers', function (data) {
        if (Kodo.Game.instance.state.current == 'MainMenu') {
            Kodo.MainMenu.instance.updatePlayersConnected(data);
        }
    });
    function checkPing() {
        socket.emit('latency', Date.now(), function (startTime) {
            var latency = Date.now() - startTime;
            console.log("Ping: " + latency);
        });
    }
    Client.checkPing = checkPing;
    function askBotGame() {
        socket.emit('askBotGame', { nick: GameConfig.yourNick });
    }
    Client.askBotGame = askBotGame;
    function askMatchmaking() {
        socket.emit('askMatchmaking', { nick: GameConfig.yourNick });
    }
    Client.askMatchmaking = askMatchmaking;
    function cancelMatchmaking() {
        socket.emit('cancelMatchmaking');
    }
    Client.cancelMatchmaking = cancelMatchmaking;
    function askUpgrade(upgrade) {
        socket.emit('askUpgrade', { upgrade: upgrade, isHost: GameConfig.isHost });
    }
    Client.askUpgrade = askUpgrade;
    function askBuild(row, col, name, isUnit) {
        socket.emit('askBuild', { row: row, col: col, name: name, isHost: Kodo.GameScene.instance.isHost, isUnit: isUnit });
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
