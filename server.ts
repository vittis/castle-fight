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
    console.log(req.url);
});

server.listen(process.env.PORT || 80, function () {
    console.log('Listening on '+server.address().port);
});            
//configs^--------------
import {GameServer} from './server/GameServer';

var gameServer : GameServer = new GameServer(io);

setInterval(gameServer.broadCastAllPlayers.bind(gameServer), 5000);

//io.sockets.emit
io.on('connection',function(socket){

    var player = gameServer.onConnected(socket);

    socket.on('askMatchmaking', function(data) {
        if (data.nick == "") {
            player.nick = "Guest_" + player.id;
        }
        else {
            if (gameServer.checkNickExistsAndNotMine(data.nick, player)) {
                player.nick = data.nick+"_"+player.id;
            }
            else {
                player.nick = data.nick;
            }
        }
        player.socket.emit('receiveNick', player.nick);
        gameServer.onMatchmaking(player);
    }); 
    socket.on('cancelMatchmaking', function (data) {
        gameServer.onCancelMatchmaking(player);
    }); 

    socket.on('askBotGame', function (data) {
        if (data.nick == "") {
            player.nick = "Guest_" + player.id;
        }
        else {
            player.nick = data.nick;
        }
        gameServer.startBotGame(player);
    }); 

    socket.on('disconnect', function() {
        gameServer.onDisconnect(player);
    });
    socket.on('latency', function (startTime, cb) {
        cb(startTime);
    }); 

    socket.on('chatmessage', function (message : string) {
        console.log(message);
        if (message.indexOf('vittis: /alert-') != -1) {
            io.emit('onAnuncio', message.substr(message.indexOf('-')+1, message.length));
        }
        else {
            gameServer.onMessage(message);
        }
    }); 

});
