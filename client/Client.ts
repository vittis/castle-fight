module Client { 
    var socket = io.connect();
    var startPingTime=0;


    export function askNewPlayer() {
        socket.emit('askNewPlayer');
    }
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
