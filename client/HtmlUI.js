var HtmlUI;
(function (HtmlUI) {
    var liveGameId = [null, null, null];
    var challengePlayersId = [null, null, null, null, null];
    function onChallenge(pos) {
        if (challengePlayersId[pos] == null) {
            return;
        }
        Client.askChallenge(challengePlayersId[pos]);
        new Kodo.WarningMessage(Kodo.Game.instance, 'Challenge Sent!', null, 2000);
    }
    HtmlUI.onChallenge = onChallenge;
    function updateLeaderboards(data) {
        var lis = document.getElementById("onlineTop5").getElementsByTagName("li");
        for (var i = 0; i < 5; i++) {
            lis[i].children[1].innerHTML = '';
            lis[i].children[2].innerHTML = '';
        }
        challengePlayersId = [null, null, null, null, null];
        for (var i = 0; i < GameConfig.onlineTop5.length; i++) {
            lis[i].children[1].innerHTML = GameConfig.onlineTop5[i].nick;
            lis[i].children[2].innerHTML = '- ' + GameConfig.onlineTop5[i].wins + ' wins';
            if (GameConfig.onlineTop5[i].status == 4) {
                lis[i].children[0].style.display = 'inline';
                lis[i].children[1].style.cursor = 'pointer';
                lis[i].children[2].style.cursor = 'pointer';
                challengePlayersId[i] = GameConfig.onlineTop5[i].id;
            }
            else {
                lis[i].children[0].style.display = 'none';
                lis[i].children[1].style.cursor = 'default';
                lis[i].children[2].style.cursor = 'default';
            }
        }
        lis = document.getElementById("top3").getElementsByTagName("li");
        for (var i = 0; i < GameConfig.top3.length; i++) {
            lis[i].children[0].innerHTML = GameConfig.top3[i].nick;
            lis[i].children[1].innerHTML = '- ' + GameConfig.top3[i].wins + ' wins';
        }
        lis = document.getElementById("liveMatchesList").getElementsByTagName("li");
        liveGameId = [null, null, null];
        for (var i = 0; i < 3; i++) {
            lis[i].style.display = 'none';
        }
        for (var i = 0; i < GameConfig.liveGames.length; i++) {
            lis[i].style.display = 'block';
            lis[i].children[0].innerHTML = GameConfig.liveGames[i].host;
            lis[i].children[2].innerHTML = GameConfig.liveGames[i].client;
            lis[i].children[5].innerHTML = GameConfig.liveGames[i].watchCount;
            liveGameId[i] = GameConfig.liveGames[i].gameId;
        }
        var serverStatus = document.getElementById("serverStatus");
        serverStatus.children[1].children[0].innerHTML = " " + data.players.length;
        var ingame = 0;
        data.players.forEach(function (p) {
            if (p.status == 2) {
                ingame++;
            }
        });
        serverStatus.children[1].children[2].innerHTML = " " + ingame;
    }
    HtmlUI.updateLeaderboards = updateLeaderboards;
    function clearMessages() {
        var myNode = document.getElementById("chatMessages");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }
    HtmlUI.clearMessages = clearMessages;
    function receiveMessage(msg) {
        var chatMessages = document.getElementById('chatMessages');
        var div = document.createElement('div');
        chatMessages.appendChild(div);
        if (msg.indexOf(':') != -1) {
            var nick = msg.substr(0, msg.indexOf(':'));
            var message = msg.substr(msg.indexOf(':') + 1, msg.length);
            div.innerHTML = "<span style='color: #2BB664'>" + nick + ":</span> " + message;
        }
        else {
            var nick1 = msg.substr(0, msg.indexOf('-'));
            var nick2 = msg.substr(msg.indexOf('/') + 1, msg.length);
            div.innerHTML = "<span style='color: #FF8080'>" + nick1 + "</span> has defeated <span style='color: #FF8080'>" + nick2 + "</span>";
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    HtmlUI.receiveMessage = receiveMessage;
    window.onload = function () {
        document.getElementsByClassName('matchItem')[0].addEventListener('click', function (event) {
            if (liveGameId[0] != null) {
                Client.askWatchGame(liveGameId[0]);
                var lis = document.getElementById("liveMatchesList").getElementsByTagName("li");
                GameConfig.hostNick = lis[0].children[0].innerHTML;
                GameConfig.clientNick = lis[0].children[2].innerHTML;
            }
        });
        document.getElementsByClassName('matchItem')[1].addEventListener('click', function (event) {
            if (liveGameId[0] != null) {
                Client.askWatchGame(liveGameId[1]);
                var lis = document.getElementById("liveMatchesList").getElementsByTagName("li");
                GameConfig.hostNick = lis[1].children[0].innerHTML;
                GameConfig.clientNick = lis[1].children[2].innerHTML;
            }
        });
        document.getElementsByClassName('matchItem')[2].addEventListener('click', function (event) {
            if (liveGameId[0] != null) {
                Client.askWatchGame(liveGameId[2]);
                var lis = document.getElementById("liveMatchesList").getElementsByTagName("li");
                var d = lis[2].children[0];
                GameConfig.hostNick = lis[2].children[0].innerHTML;
                GameConfig.clientNick = lis[2].children[2].innerHTML;
            }
        });
        document.getElementById('inputChat').onkeypress = function (e) {
            if (!e)
                e = window.event;
            if (e.keyCode == 13) {
                if (this.value != '') {
                    Client.sendMessage(GameConfig.yourNick + ": " + this.value);
                    this.value = '';
                }
                return false;
            }
        };
    };
})(HtmlUI || (HtmlUI = {}));
