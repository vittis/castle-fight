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
        Kodo.GameScene.instance.updateEntities(data.entities);
        //console.log(data.player);
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
