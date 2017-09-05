"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socketio = require("socket.io");
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);
app.use('/client', express.static(__dirname + '/client'));
app.use('/libs', express.static(__dirname + '/libs'));
app.use('/assets', express.static(__dirname + '/assets'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    console.log(req.url);
});
server.listen(process.env.PORT || 80, function () {
    console.log('Listening on ' + server.address().port);
});
var GameServer_1 = require("./server/GameServer");
var gameServer = new GameServer_1.GameServer(io);
setInterval(gameServer.broadCastAllPlayers.bind(gameServer), 5000);
io.on('connection', function (socket) {
    var player = gameServer.onConnected(socket);
    socket.on('askMatchmaking', function (data) {
        if (data.nick == "") {
            player.nick = "Guest_" + player.id;
        }
        else {
            if (gameServer.checkNickExistsAndNotMine(data.nick, player)) {
                player.nick = data.nick + "_" + player.id;
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
    socket.on('disconnect', function () {
        gameServer.onDisconnect(player);
    });
    socket.on('latency', function (startTime, cb) {
        cb(startTime);
    });
    socket.on('chatmessage', function (message) {
        gameServer.onMessage(message);
    });
});
