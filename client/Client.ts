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

        Kodo.Game.instance.state.start('GameScene', true, false);
    });

    socket.on('receiveData', function (data) {
        Kodo.GameScene.instance.player = data.player;
        Kodo.GameScene.instance.updateEntities(data.entities);
        //console.log(data.player);
    });


    socket.on('receiveBuildingAndUnitData', function (data) {
        /*data.unitData.forEach(element => {
            console.log(element);
        });*/
        data.buildingData.forEach(element => {
            if (Kodo[element.name]) {
                Kodo[element.name].nome = element.name;
                Kodo[element.name].goldCost = element.goldCost;
                Kodo[element.name].woodCost = element.woodCost;
                Kodo[element.name].width = element.width;
                Kodo[element.name].height = element.height;
                Kodo[element.name].maxHP = element.maxHP;
                Kodo[element.name].maxArmor = element.maxArmor;
                Kodo[element.name].spamCount = element.spamCount;
                Kodo[element.name].spamRate = element.spamRate;
            }
        });
    });

    socket.on('endGame', function (data) {
        console.log("end game recebido - finalizando jogo!");
        Kodo.Game.instance.state.start('MainMenu', true, false);
    });


    export function askMatchmaking() {
        socket.emit('askMatchmaking');
    }

    export function askBuild(row, col, name) {
        socket.emit('askBuild', {row: row, col: col, name: name, isHost: Kodo.GameScene.instance.isHost});
    }


  }
