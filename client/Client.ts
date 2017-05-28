module Client { 
    var socket = io.connect();
    var startPingTime=0;


    export function askMatchmaking() {
        socket.emit('askMatchmaking');
    }

    socket.on('startGame',function(data){
        console.log("start game recebido - iniciando jogo!");
        var gameId = data.id;
        var rows = data.rows;
        var cols = data.cols;
        var isHost = data.host;


        GameConfig.GRID_ROWS = rows;
        GameConfig.GRID_COLS = cols;

        Kodo.Game.instance.state.start('GameScene', true, false);
    });

    socket.on('receiveEntities', function (data) {
        console.log("receive entities recebido!");
        Kodo.GameScene.instance.updateEntities(data);
    });

    socket.on('endGame', function (data) {
        console.log("end game recebido - finalizando jogo!");
        Kodo.Game.instance.state.start('MainMenu', true, false);
    });

  }
