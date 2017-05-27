module Client { 
    var socket = io.connect();
    var startPingTime=0;


    export function askMatchmaking() {
        socket.emit('askMatchmaking');
    }

    socket.on('startGame',function(data){
        console.log("start game recebido - iniciando jogo!");
        //console.log(data.grid.length + ", " + data.grid[0].length);
        
        /*for (var i = 0; i < data.grid.length; i++) {
            for (var j = 0; j < data.grid[0].length; j++) {
                console.log(data.grid[i][j]);  
            }
        }*/
        Kodo.Game.instance.state.start('GameScene', true, false);
        console.log("ih");
        //Kodo.GameScene.instance.updateState(data.grid);
    });

    socket.on('updateState', function (data) {
        console.log("updateState recebido!");
        Kodo.GameScene.instance.updateState(data);
    });

    socket.on('updateStateEntities', function (data) {
        console.log("updateStateENTITEIS recebido!");
        Kodo.GameScene.instance.updateStateEntities(data);
    });

    socket.on('endGame', function (data) {
        console.log("end game recebido - finalizando jogo!");
        Kodo.Game.instance.state.start('MainMenu', true, false);
    });

    /*
    socket.on('addPlayer',function(data){
        Kodo.GameScene._instance.addNewPlayer(data.id,data.x,data.y, data.name);
    });     

    socket.on('addAllPlayers',function(data){
        for (var key in data) {
            Kodo.GameScene._instance.addNewPlayer(data[key].id,data[key].x,data[key].y, data[key].name);
        }    
    });

     socket.on('setRotation', function(data) {
        Kodo.GameScene._instance.setRotation(data);
    });   

    socket.on('setPlayerID', function(data) {
        Kodo.GameScene._instance.setPlayerID(data);
    });

     socket.on('movePlayer',function(data){
        Kodo.GameScene._instance.movePorInput(data);
    });

    socket.on('updatePos',function(data){
        Kodo.GameScene._instance.updateAllPos(data);
    });

    socket.on('remove',function(id){
        Kodo.GameScene._instance.removePlayer(id);
    });

    socket.on('pongcheck', function (data) {
        var latency = Date.now() - startPingTime;
        console.log('Latency: ' + latency + 'ms');
    });



    

    export function sendInput (keyCode) {
        socket.emit('sendInput', keyCode);
    }
    export function sendTouch (x, y) {
        socket.emit('sendTouch', {x: x, y:x});
    }
    export function pingCheck () {
        startPingTime = Date.now();
        socket.emit('pingCheck', startPingTime);
    }
    export function sendMousePos(rotation) {
        socket.emit('sendMousePos', rotation);
    }*/
  }
