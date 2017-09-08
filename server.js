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
var GameConfig_1 = require("./server/GameConfig");
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
    socket.on('askSurrender', function () {
        console.log("ask surrender called");
        gameServer.onSurrender(player);
    });
    socket.on('askCancelWatch', function () {
        console.log("ask cancel watch called");
        gameServer.onCancelWatch(player);
    });
    socket.on('askWatchGame', function (gameId) {
        console.log("ask watch game called");
        gameServer.onWatchGame(player, gameId);
    });
    socket.on('chatmessage', function (message) {
        console.log(message);
        if (message.indexOf('vittis: /alert-') != -1) {
            io.emit('onAnuncio', message.substr(message.indexOf('-') + 1, message.length));
        }
        else {
            gameServer.onMessage(message);
        }
    });
    socket.on('askBuild', function (data) {
        if (gameServer.getGameByPlayerId(player.id) != null && gameServer.getGameByPlayerId(player.id).host != null && gameServer.getGameByPlayerId(player.id).client != null) {
            if (gameServer.getGameByPlayerId(player.id).gridManager.tileAt(data.row, data.col).entity == null) {
                if (!data.isUnit) {
                    if (gameServer.getGameByPlayerId(player.id).gridManager.tileAt(data.row + 1, data.col + 1).entity == null) {
                        if (GameConfig_1.GameConfig.BUILDINGS.indexOf(data.name) != -1) {
                            if (data.isHost) {
                                if (gameServer.getGameByPlayerId(player.id).host != null) {
                                    gameServer.getGameByPlayerId(player.id).host.buildBuilding(new (require('./server/building/' + data.name))[data.name](data.row, data.col));
                                }
                            }
                            else {
                                if (gameServer.getGameByPlayerId(player.id).client != null) {
                                    gameServer.getGameByPlayerId(player.id).client.buildBuilding(new (require('./server/building/' + data.name))[data.name](data.row, data.col));
                                }
                            }
                        }
                    }
                }
                else {
                    if (GameConfig_1.GameConfig.UNITS.indexOf(data.name) != -1) {
                        if (data.isHost) {
                            if (gameServer.getGameByPlayerId(player.id).host != null) {
                                gameServer.getGameByPlayerId(player.id).host.buildBuilding(new (require('./server/unit/' + data.name))[data.name](data.row, data.col));
                            }
                        }
                        else {
                            if (gameServer.getGameByPlayerId(player.id).client != null) {
                                gameServer.getGameByPlayerId(player.id).client.buildBuilding(new (require('./server/unit/' + data.name))[data.name](data.row, data.col));
                            }
                        }
                    }
                }
            }
        }
    }.bind(gameServer.getGameByPlayerId(player.id)));
    socket.on('askSpamTileMark', function (data) {
        if (gameServer.getGameByPlayerId(player.id) != null) {
            if (gameServer.getGameByPlayerId(player.id).host != null && gameServer.getGameByPlayerId(player.id).client != null) {
                if (data.isHost) {
                    if (gameServer.getGameByPlayerId(player.id).host.getEntityById(data.buildingId) != null) {
                        gameServer.getGameByPlayerId(player.id).host.getEntityById(data.buildingId).data.tileRow = data.row;
                        gameServer.getGameByPlayerId(player.id).host.getEntityById(data.buildingId).data.tileCol = data.col;
                    }
                }
                else {
                    if (gameServer.getGameByPlayerId(player.id).client.getEntityById(data.buildingId) != null) {
                        gameServer.getGameByPlayerId(player.id).client.getEntityById(data.buildingId).data.tileRow = data.row;
                        gameServer.getGameByPlayerId(player.id).client.getEntityById(data.buildingId).data.tileCol = data.col;
                    }
                }
            }
        }
    }.bind(gameServer.getGameByPlayerId(player.id)));
    socket.on('askTrainUnit', function (data) {
        if (gameServer.getGameByPlayerId(player.id) != null) {
            if (gameServer.getGameByPlayerId(player.id).host != null && gameServer.getGameByPlayerId(player.id).client != null) {
                if (data.isHost) {
                    if (gameServer.getGameByPlayerId(player.id).host.idExists(data.buildingId))
                        gameServer.getGameByPlayerId(player.id).host.getEntityById(data.buildingId).data.spamData.isTraining = true;
                }
                else {
                    if (gameServer.getGameByPlayerId(player.id).client.idExists(data.buildingId))
                        gameServer.getGameByPlayerId(player.id).client.getEntityById(data.buildingId).data.spamData.isTraining = true;
                }
            }
        }
    }.bind(gameServer.getGameByPlayerId(player.id)));
    socket.on('askPauseUnit', function (data) {
        if (gameServer.getGameByPlayerId(player.id) != null) {
            if (gameServer.getGameByPlayerId(player.id).host != null && gameServer.getGameByPlayerId(player.id).client != null) {
                if (data.isHost) {
                    if (gameServer.getGameByPlayerId(player.id).host.idExists(data.buildingId))
                        gameServer.getGameByPlayerId(player.id).host.getEntityById(data.buildingId).data.spamData.isTraining = false;
                }
                else {
                    if (gameServer.getGameByPlayerId(player.id).client.idExists(data.buildingId))
                        gameServer.getGameByPlayerId(player.id).client.getEntityById(data.buildingId).data.spamData.isTraining = false;
                }
            }
        }
    }.bind(gameServer.getGameByPlayerId(player.id)));
    socket.on('askUpgrade', function (data) {
        if (gameServer.getGameByPlayerId(player.id) != null) {
            if (data.isHost) {
                if (gameServer.getGameByPlayerId(player.id).host != null)
                    gameServer.getGameByPlayerId(player.id).host.updateManager.upgrade(data.upgrade);
            }
            else {
                if (gameServer.getGameByPlayerId(player.id).client != null)
                    gameServer.getGameByPlayerId(player.id).client.updateManager.upgrade(data.upgrade);
            }
        }
    }.bind(gameServer.getGameByPlayerId(player.id)));
});
