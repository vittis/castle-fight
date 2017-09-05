var Kodo;
(function (Kodo) {
    var ChatBox = (function () {
        function ChatBox(game) {
            this.game = game;
            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x000000);
            box.drawRoundedRect(0, 0, 340, 365, 10);
            box.endFill();
            this.chatSpace = this.game.add.sprite(10, this.game.height, box.generateTexture());
            box.destroy();
            this.chatSpace.anchor.setTo(0, 1);
            this.chatSpace.alpha = 0.45;
            this.inputField = this.game.add.inputField(10, 90, {
                font: '17px Baloo Paaji',
                fill: '#ffffff',
                placeHolderColor: '#ffffff',
                cursorColor: '#ffffff',
                fontWeight: 'normal',
                textAlign: 'center',
                width: this.chatSpace.width - 20,
                padding: 3,
                borderWidth: 1,
                max: '45',
                backgroundColor: '#1f864a',
                borderColor: '#1f864a',
                borderRadius: 8,
                placeHolder: 'Enter Message',
                type: PhaserInput.InputType.text,
            });
            this.inputField.alignIn(this.chatSpace, Phaser.BOTTOM_CENTER, -3, -5);
            this.inputField.focusOut.add(this.onFocusOut.bind(this), this);
            this.messageGroup = this.game.add.group();
            this.messageGroup.alignIn(this.chatSpace, Phaser.TOP_LEFT, -5, -5);
            this.onReceivedNewMessage("Pro Tip: Press shift to start typing.");
            var enterKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SHIFT);
            enterKey.onDown.add(this.onEnter.bind(this), this);
        }
        ChatBox.prototype.onEnter = function () {
            this.inputField.startFocus();
        };
        ChatBox.prototype.onFocusOut = function () {
            if (GameConfig.yourNick != '') {
                if (this.inputField.value.length > 0) {
                    Client.sendMessage(GameConfig.yourNick + ": " + this.inputField.value);
                    this.inputField.setText('');
                }
            }
            else {
                this.inputField.setText("Enter your nick first! ò_ó");
            }
        };
        ChatBox.prototype.onReceivedNewMessage = function (message) {
            var style = { font: "16px Baloo Paaji", fill: 'white' };
            var newMessage = this.game.add.text(0, 0, message, style);
            if (newMessage.width > this.chatSpace.width) {
                newMessage.destroy();
                var string1 = message.substring(0, 43);
                var string2 = message.substring(43, message.length);
                var newMessage1 = this.game.add.text(0, 0, string1, style);
                var newMessage2 = this.game.add.text(0, 0, string2, style);
                while (this.messageGroup.length >= 14) {
                    this.messageGroup.remove(this.messageGroup.getChildAt(0), true);
                    this.messageGroup.remove(this.messageGroup.getChildAt(0), true);
                }
                newMessage1.addColor('#2bb664', 0);
                newMessage1.addColor('#ffffff', newMessage.text.indexOf(':') + 1);
                this.messageGroup.add(newMessage1);
                this.messageGroup.add(newMessage2);
                this.messageGroup.align(1, 15, 0, 22);
            }
            else {
                while (this.messageGroup.length >= 15) {
                    this.messageGroup.remove(this.messageGroup.getChildAt(0), true);
                }
                newMessage.addColor('#2bb664', 0);
                newMessage.addColor('#ffffff', newMessage.text.indexOf(':') + 1);
                this.messageGroup.add(newMessage);
                this.messageGroup.align(1, 15, 0, 22);
            }
        };
        return ChatBox;
    }());
    Kodo.ChatBox = ChatBox;
})(Kodo || (Kodo = {}));
