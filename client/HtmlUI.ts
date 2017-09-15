module HtmlUI {
 
    var liveGameId = [null, null, null];
    var challengePlayersId = [null, null, null, null, null];


    export function onChallenge(pos) {
        if (challengePlayersId[pos] == null) {
            return;
        }

        Client.askChallenge(challengePlayersId[pos]);
        new Kodo.WarningMessage(Kodo.Game.instance, 'Challenge Sent!', null, 2000);
    }

    export function updateLeaderboards(data) {
        var lis = document.getElementById("onlineTop5").getElementsByTagName("li");

        for (let i = 0; i < 5; i++) {
            lis[i].children[1].innerHTML = '';
            lis[i].children[2].innerHTML = '';
        } 

        challengePlayersId = [null, null, null, null, null];

        for (let i = 0; i < GameConfig.onlineTop5.length; i++) {
            lis[i].children[1].innerHTML = GameConfig.onlineTop5[i].nick;
            lis[i].children[2].innerHTML = '- '+GameConfig.onlineTop5[i].wins+' wins';
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
        for (let i = 0; i < GameConfig.top3.length; i++) {
            lis[i].children[0].innerHTML = GameConfig.top3[i].nick;
            lis[i].children[1].innerHTML = '- ' + GameConfig.top3[i].wins + ' wins';
        } 

        lis = document.getElementById("liveMatchesList").getElementsByTagName("li");
        liveGameId = [null, null, null];
        for (let i = 0; i < 3; i++) {
            lis[i].style.display = 'none';            
        }

        for (let i = 0; i < GameConfig.liveGames.length; i++) {
            lis[i].style.display = 'block';

            lis[i].children[0].innerHTML = GameConfig.liveGames[i].host;
            lis[i].children[2].innerHTML = GameConfig.liveGames[i].client;
            lis[i].children[5].innerHTML = GameConfig.liveGames[i].watchCount;
            
            liveGameId[i] = GameConfig.liveGames[i].gameId;
        } 
        


        let serverStatus = document.getElementById("serverStatus");


        serverStatus.children[1].children[0].innerHTML = " " + data.players.length;
        let ingame = 0;
        data.players.forEach(p => {
            if (p.status == 2) {
                ingame++;
            }
        });
        serverStatus.children[1].children[2].innerHTML = " " + ingame;
    }
    export function clearMessages() {
        var myNode = document.getElementById("chatMessages");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }
    export function receiveMessage(msg) {
        msg = msg.replace(/</g, "&lt;");
        var chatMessages = document.getElementById('chatMessages');
        var div = document.createElement('div');
        chatMessages.appendChild(div);
        if (msg.indexOf(':') != -1) {
            var nick = msg.substr(0, msg.indexOf(':'));
            var message = msg.substr(msg.indexOf(':')+1, msg.length)
            div.innerHTML = "<span style='color: #2BB664'>"+nick+":</span> "+message;
        }
        else {
            var nick1 = msg.substr(0, msg.indexOf('-'));
            var nick2 = msg.substr(msg.indexOf('/')+1, msg.length);

            div.innerHTML = "<span style='color: #FF8080'>" + nick1 + "</span> has defeated <span style='color: #FF8080'>" + nick2 + "</span>";
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    export var isShowingIngameChat=false;
    export function hideShowChat() {
        if (!isShowingIngameChat) {
            document.getElementById('bottomLeftBox').style.display = 'block';
            isShowingIngameChat=true;
            document.getElementById('inputChat').focus();
        }
        else if (document.getElementById('inputChat') == document.activeElement) {
            if (document.getElementById('inputChat').value != '') {
                Client.sendMessage(GameConfig.yourNick + ": " + document.getElementById('inputChat').value);
                document.getElementById('inputChat').value = '';
            }
            else {
                document.getElementById('bottomLeftBox').style.display = 'none';
                isShowingIngameChat = false;
            }
        }
        else {
            document.getElementById('inputChat').focus();
        }
    }
    export function hideChat() {
        if (isShowingIngameChat) {
            document.getElementById('bottomLeftBox').style.display = 'none';
            isShowingIngameChat = false;
        }
    }

    window.onload = () => {
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

        /* document.getElementById('inputChat').onkeypress = function (e) {
            console.log(e.keyCode);
            if (!e) e = window.event;
            console.log(e.keyCode);

            if (e.keyCode == 13) {
                if (this.value != ''){
                    Client.sendMessage(GameConfig.yourNick + ": "+this.value);
                    this.value = '';
                }
            }
        } */
    };


}

