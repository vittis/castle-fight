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
});
server.listen(process.env.PORT || 8081, function () {
    console.log('Listening on ' + server.address().port);
});
//configs^--------------
var GameServer_1 = require("./server/GameServer");
var gameServer = new GameServer_1.GameServer(io);
setInterval(gameServer.broadCastAllPlayers.bind(gameServer), 5000);
//io.sockets.emit
io.on('connection', function (socket) {
    var player = gameServer.onConnected(socket);
    socket.on('askMatchmaking', function (data) {
        if (data.nick == "") {
            player.nick = "Guest_" + player.id;
        }
        else {
            player.nick = data.nick;
        }
        gameServer.onMatchmaking(player);
    });
    socket.on('disconnect', function () {
        gameServer.onDisconnect(player);
    });
});
