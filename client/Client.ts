module Client { 
    var socket = io.connect();
    var startPingTime=0;

    socket.on('startGame',function(data){
        console.log("Starting game...");
        if (document.hidden) {
            piscaLoop = setInterval(piscaTitulo, 1000);
        }

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
        document.cookie = "nick=" + GameConfig.yourNick;

        GameConfig.opponentNick = data.opponentNick;

        Kodo.MainMenu.instance.startGame();
    });

    socket.on('startGameLoop', function (data) {
        console.log("Starting main game loop");
    });

    socket.on('receiveData', function (data) {
        if (Kodo.GameScene.instance != null && Kodo.Game.instance.state.current == 'GameScene') {
            Kodo.GameScene.instance.player = data.player;
            Kodo.GameScene.instance.ballData = data.ballData;
            Kodo.GameScene.instance.watchCount = data.watchCount;

            Kodo.GameScene.instance.updateEntities(data.entities);
        }
    });

    socket.on('receiveMessage', function (msg) {
        HtmlUI.receiveMessage(msg);
    });

    socket.on('receiveBuildingAndUnitData', function (data) {
        data.buildingData.forEach(element => {
            if (!(element.name == 'Castle' || element.name == "IncomeBall" || element.name == "Tower" || element.name == "TrapDevice"))
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
        console.log("Card data received");
    });

    socket.on('endGame', function (data) {
        console.log("Finishing match, host won? "+data.hostWon);
        if (Kodo.Game.instance.state.current == 'GameScene') {
            Kodo.GameScene.instance.endGame(data.hostWon);
        }
        else {
            Kodo.Game.instance.state.start('MainMenu', true, false);
        }
    });

    socket.on('receiveNick', function (data) {
        GameConfig.yourNick = data;
        document.cookie = "nick=" + GameConfig.yourNick;
    });
    socket.on('onLastMessages', function (last10Messages) {
        if (Kodo.Game.instance.state.current == 'MainMenu') {
            HtmlUI.clearMessages();
            last10Messages.forEach(msg => {
                HtmlUI.receiveMessage(msg);
            });
        }
    });

    socket.on('receivePlayers', function (data) {
         if (Kodo.Game.instance.state.current == 'MainMenu') {
            GameConfig.onlineTop5 = data.onlineTop5;
            GameConfig.top3 = data.top3;
            GameConfig.liveGames = data.liveGames;
            Kodo.MainMenu.instance.updatePlayersConnected(data);
         }
    });

    socket.on('onAnuncio', function (msg) {
        if (Kodo.Game.instance != null) {
            if (Kodo.Game.instance.state.current == 'MainMenu' || Kodo.Game.instance.state.current == 'GameScene' || Kodo.Game.instance.state.current == 'DeckScene') {
                new Kodo.WarningMessage(Kodo.Game.instance, msg, null, 3000);
            }
        }
    });

    export function checkPing() {
        socket.emit('latency', Date.now(), function (startTime) {
            var latency = Date.now() - startTime;
            console.log("Ping: "+latency);
        });
    }
    
    export function askBotGame() {
        socket.emit('askBotGame', { nick: GameConfig.yourNick});
        document.cookie = "nick=" + GameConfig.yourNick;
    }

    export function askMatchmaking() {
        socket.emit('askMatchmaking', {nick: GameConfig.yourNick});
        document.cookie = "nick=" + GameConfig.yourNick;
    }

    export function cancelMatchmaking() {
        socket.emit('cancelMatchmaking');
    }

    export function askUpgrade(upgrade : number) {
        socket.emit('askUpgrade', { upgrade: upgrade, isHost: GameConfig.isHost });
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
    export function sendMessage(msg) {
        socket.emit('chatmessage', msg);
    }
    export function askSurrender() {
        console.log("ask surrender called");
        socket.emit('askSurrender');
    }
    export function askCancelWatch() {
        console.log("ask cancel watch called");
        socket.emit('askCancelWatch');
    }

    export function askLastMessages() {
        console.log("ask last messages called");
        socket.emit('askLastMessages');
    }

    export function askWatchGame(gameId) {
        console.log("ask watch game called");
        socket.emit('askWatchGame', gameId);
    }

    export function askChallenge(playerId) {
        console.log("ask challenge called");
        socket.emit('askChallenge', {nick: GameConfig.yourNick, playerId: playerId});
        document.cookie = "nick=" + GameConfig.yourNick;
    }
  }

function predicateBy(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}


var piscaLoop;
var originalTitle = document.title;
var piscaCounter = 0;
function piscaTitulo() {
    document.title = document.title == originalTitle ? "Match Found!" : originalTitle;

    piscaCounter++;
    if (piscaCounter >= 15) {
        piscaCounter = 0;
        document.title = originalTitle;
        clearInterval(piscaLoop);
    }
}