module Client { 
    var socket = io.connect();
    var startPingTime=0;

    socket.on('startGame',function(data){
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

        if (GameConfig.yourNick == "") {
            GameConfig.yourNick = "Guest_"+data.playerId;
        }
        
        GameConfig.opponentNick = data.opponentNick;

        Kodo.MainMenu.instance.startGame();
    });

    socket.on('startGameLoop', function (data) {
        console.log("start game LOOP recebido - iniciando loop!");
        Kodo.GameScene.instance.uiResourceManager.startGame();
    });

    socket.on('receiveData', function (data) {
        Kodo.GameScene.instance.player = data.player;
        Kodo.GameScene.instance.ballData = data.ballData;
        Kodo.GameScene.instance.updateEntities(data.entities);
    });


    socket.on('receiveBuildingAndUnitData', function (data) {
        data.buildingData.forEach(element => {
            if (!(element.name == 'Castle' || element.name == "IncomeBall" || element.name == "Tower"))
                GameConfig.buildingNameData.push(element.name);
        });


        data.unitData.forEach(element => {
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
        data.buildingData.forEach(element => {
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
        if (Kodo.GravityChamber.spamUnit) {
            console.log("certo")
        }
        else {
            console.log("deu ruim")
        }
    });

    socket.on('endGame', function (data) {
        console.log("end game recebido - finalizando jogo!");
        Kodo.Game.instance.state.start('MainMenu', true, false);
    });

    socket.on('receivePlayers', function (data : any[]) {
         if (Kodo.Game.instance.state.current == 'MainMenu') {
             Kodo.MainMenu.instance.updatePlayersConnected(data);
         }
    });

    export function askMatchmaking() {
        socket.emit('askMatchmaking', {nick: GameConfig.yourNick});
    }

    export function cancelMatchmaking() {
        socket.emit('cancelMatchmaking');
    }

    export function askBuild(row, col, name, isUnit) {
        socket.emit('askBuild', {row: row, col: col, name: name, isHost: Kodo.GameScene.instance.isHost, isUnit: isUnit});
    }

    export function askSpamTileMark(row, col, buildingId) {
        socket.emit('askSpamTileMark', { row: row, col: col, buildingId: buildingId, isHost: Kodo.GameScene.instance.isHost });
    }

    export function askTrainUnit(buildingId) {
        socket.emit('askTrainUnit', { buildingId: buildingId, isHost: Kodo.GameScene.instance.isHost });
    }
    export function askPauseUnit(buildingId) {
        socket.emit('askPauseUnit', { buildingId: buildingId, isHost: Kodo.GameScene.instance.isHost });
    }
  }
