import * as express from 'express';
import * as http from "http";
import * as socketio from "socket.io";

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

import {GameServer} from './server/GameServer';

var gameServer : GameServer = new GameServer();
setInterval(gameServer.listAllPlayer.bind(gameServer), 5000);


io.on('connection',function(socket){

    var player = gameServer.onConnected();

    socket.on('askMatchmaking', function(data) {
        gameServer.onMatchmaking(player);
    });


    socket.on('askNewPlayer', function (data) {
        console.log("askNewPlayer requisitado");

    });

    socket.on('disconnect', function() {
        gameServer.onDisconnect(player);
    });

});
