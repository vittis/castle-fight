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

var gameServer : GameServer = new GameServer();

io.on('connection',function(socket){
    console.log("alguem se conectou!");
    
    socket.on('askMatchmaking', function(data) {
        console.log("askMatchmaking requisitado");
        var player = gameServer.addPlayer();
    });


    socket.on('askNewPlayer', function (data) {
        console.log("askNewPlayer requisitado");

    });

});
