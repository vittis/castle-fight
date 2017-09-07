module Kodo {
    export class WatchBox {
        game: Phaser.Game; // Added

        space : Phaser.Sprite;

        label : Phaser.Text;

        boxsGroup : Phaser.Group;
        vsGroup : Phaser.Group;

        constructor(game) {
            this.game = game;

            var box = this.game.make.graphics(0, 0);
            box.beginFill(0x000000);
            box.drawRoundedRect(0, 0, 260, 240, 20);
            box.endFill();
            this.space = this.game.add.sprite(0, 350, box.generateTexture());
            box.destroy();
            this.space.alpha = 0.52;

            var style = { font: "26px Baloo Paaji", fill: '#ff8080', align: "center" };

            this.label = this.game.add.text(0, 0, "Live Matches", style)
            this.label.anchor.setTo(0.5, 0.5);


            this.label.alignIn(this.space, Phaser.TOP_CENTER, 0, -3);

            this.boxsGroup = this.game.add.group();
            this.vsGroup = this.game.add.group();

            this.boxsGroup.inputEnableChildren = true;

            style = { font: "18px Baloo Paaji", fill: '#ECEC3A', align: "center" };


            for (var i = 0; i < 3; i++) {
                let box = this.game.make.graphics(0, 0);
                box.beginFill(0x000000);
                box.drawRect(0, 0, 255, 57);
                box.endFill();
                let box2 = this.game.add.sprite(0, 350, box.generateTexture());
                box.destroy();
                box2.alpha = 0.02;
                box2.anchor.setTo(0.5, 0.5);
                
                style.fill = '#d66a6a';
                style.font = '18px Baloo Paaji'

                let vsText = this.game.add.text(0, 0, 'vs', style);
                vsText.anchor.setTo(0.5, 0.5);
                style.fill = '#ffffff';

                let opponent1 = this.game.add.text(0, 0, '', style);
                opponent1.alignTo(vsText, Phaser.LEFT_CENTER, 5);
                let opponent2 = this.game.add.text(0, 0, '', style);
                opponent2.alignTo(vsText, Phaser.RIGHT_CENTER, 5);
                style.font = '15px Baloo Paaji';
                style.fill = '#ff8080'
                let watchCountLabel = this.game.add.text(0, 0, '0', style);
                watchCountLabel.anchor.setTo(0.5, 0.5);
                watchCountLabel.alignTo(vsText, Phaser.BOTTOM_CENTER, 9, -6);
                let eyeSprite = this.game.add.sprite(0, 0, 'eye');
                watchCountLabel.addChild(eyeSprite);
                eyeSprite.x -= 15;
                eyeSprite.y -= 2;

                eyeSprite.anchor.setTo(0.5, 0.5);
                eyeSprite.tint = 0xffffff;
                var group = this.game.add.group();

                group.add(vsText);
                group.add(opponent1);
                group.add(opponent2);
                group.add(watchCountLabel);

                //group.add(watchCountLabel);


                this.vsGroup.add(group);

                /* box2.addChild(vsText);
                box2.addChild(opponent1);
                box2.addChild(opponent2); */
                box2.inputEnabled = true;
                box2.input.useHandCursor = true;
                this.boxsGroup.add(box2);
            }
            this.boxsGroup.align(1, 3, 0, 63);
            this.boxsGroup.alignTo(this.label, Phaser.BOTTOM_CENTER, 0, 5);
            this.vsGroup.align(1, 3, 0, 63);
            this.vsGroup.alignTo(this.label, Phaser.BOTTOM_CENTER, 0, 22);


            this.boxsGroup.onChildInputOver.add(this.onHover.bind(this), this);
            this.boxsGroup.onChildInputDown.add(this.onDown.bind(this), this);
            this.boxsGroup.onChildInputOut.add(this.onOut.bind(this), this);

        }
        onHover(sp) {
            sp.alpha = 0.3;
        }
        onOut(sp) {
            sp.alpha = 0.02;
        }
        onDown(sp) {
            console.log(sp.data.gameId);
            if (sp.data.gameId != null) {
                Client.askWatchGame(sp.data.gameId);
                GameConfig.hostNick = this.vsGroup.children[sp.data.clickedBox].getChildAt(1).text;
                GameConfig.clientNick = this.vsGroup.children[sp.data.clickedBox].getChildAt(2).text;
            }
        }


        updateLiveGames(liveGames : any[]) {
            for (var i = 0; i < liveGames.length; i++) {
                this.vsGroup.children[i].getChildAt(1).text = liveGames[i].host;
                this.vsGroup.children[i].getChildAt(1).alignTo(this.vsGroup.children[i].getChildAt(0), Phaser.LEFT_CENTER, 5);

                this.vsGroup.children[i].getChildAt(2).text = liveGames[i].client;
                this.vsGroup.children[i].getChildAt(2).alignTo(this.vsGroup.children[i].getChildAt(0), Phaser.RIGHT_CENTER, 5);

                this.vsGroup.children[i].getChildAt(3).text = liveGames[i].watchCount;


                this.boxsGroup.children[i].data.gameId = liveGames[i].gameId;
                this.boxsGroup.children[i].data.clickedBox = i;

            }
        }



    }
}