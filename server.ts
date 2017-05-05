import * as express from 'express';
import * as http from "http";
import * as socketio from "socket.io";

import {GameServer} from './server/GameServer';

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

app.use('/client',express.static(__dirname + '/client'));
app.use('/libs',express.static(__dirname + '/libs'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.listen(process.env.PORT || 8081, function () {
    console.log('Listening on '+server.address().port);
});            
//configs^--------------

io.on('connection',function(socket){
    console.log("alguem se conectou!");

    socket.on('askNewPlayer', function (data) {
        console.log("askNewPlayer requisitado");
    });

    /*socket.on('askNewPlayer',function(data){
        var player = gameServer.addPlayer(randomInt(0, 800), randomInt(0, 500), data);
        console.log("jogador id "+player.id+" se conectou");

        console.log(gameServer.clients);
        socket.emit('addAllPlayers', gameServer.clients);
        socket.broadcast.emit('addPlayer', player);
        socket.emit('setPlayerID', player.id);
        

        socket.on('pingCheck', function (data) {
            socket.emit('pongcheck');
        });
        
        socket.on('sendInput',function(data){
            player.movePlayer(data);
            io.emit('movePlayer', player);
        });

        socket.on('sendMousePos',function(data){
            var _data = {id:player.id, rotation: data};
            io.emit('setRotation', _data);
        });

        socket.on('disconnect',function(){
            console.log("player id: "+player.id+"se desconectou");
            gameServer.onDisconnect(player.id);
            io.emit('remove', player.id);
        });
    });*/
});

/*function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}*/
