var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Kodo;
(function (Kodo) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloadBar');
            this.preloadBar.anchor.setTo(0.5, 0.5);
            this.load.setPreloadSprite(this.preloadBar);
            this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
            if (GameConfig.tileSize == 32) {
                this.game.load.image('tile0', 'assets/32/tile0_32.png');
                this.game.load.image('tile1', 'assets/32/tile1_32.png');
                this.game.load.image('footmanh', 'assets/32/footmanh_32.png');
                this.game.load.image('footmanc', 'assets/32/footmanc_32.png');
                this.game.load.image('archerc', 'assets/32/archerc_32.png');
                this.game.load.image('archerh', 'assets/32/archerh_32.png');
                this.game.load.image('castleh', 'assets/32/castleh_32.png');
                this.game.load.image('castlec', 'assets/32/castlec_32.png');
                this.game.load.image('barracksc', 'assets/32/barracksc_32.png');
                this.game.load.image('barracksh', 'assets/32/barracksh_32.png');
                this.game.load.image('archeryRangeh', 'assets/32/archeryRangeh_32.png');
                this.game.load.image('archeryRangec', 'assets/32/archeryRangec_32.png');
                this.game.load.image('tiro', 'assets/32/tiro_32.png');
            }
            else if (GameConfig.tileSize == 64) {
                this.game.load.image('tile0', 'assets/64/tile0_64.png');
                this.game.load.image('tile1', 'assets/64/tile1_64.png');
                this.game.load.image('footmanh', 'assets/64/footmanh_64.png');
                this.game.load.image('footmanc', 'assets/64/footmanc_64.png');
                this.game.load.image('archerh', 'assets/64/archerh_64.png');
                this.game.load.image('archerc', 'assets/64/archerc_64.png');
                this.game.load.image('castleh', 'assets/64/castleh_64.png');
                this.game.load.image('castlec', 'assets/64/castlec_64.png');
                this.game.load.image('barracksh', 'assets/64/barracksh_64.png');
                this.game.load.image('barracksc', 'assets/64/barracksc_64.png');
                this.game.load.image('archeryRangeh', 'assets/64/archeryRangeh_64.png');
                this.game.load.image('archeryRangec', 'assets/64/archeryRangec_64.png');
                this.game.load.image('tiro', 'assets/64/tiro_64.png');
            }
            else {
                this.game.load.image('footmanh', 'assets/48/footmanh_48.png');
                this.game.load.image('footmanc', 'assets/48/footmanc_48.png');
                this.game.load.image('archerh', 'assets/48/archerh_48.png');
                this.game.load.image('archerc', 'assets/48/archerc_48.png');
                this.game.load.image('castleh', 'assets/48/castleh_48.png');
                this.game.load.image('castlec', 'assets/48/castlec_48.png');
                this.game.load.image('barracksh', 'assets/48/barracksh_48.png');
                this.game.load.image('barracksc', 'assets/48/barracksc_48.png');
                this.game.load.image('archeryRangeh', 'assets/48/archeryRangeh_48.png');
                this.game.load.image('archeryRangec', 'assets/48/archeryRangec_48.png');
                this.game.load.image('tiro', 'assets/48/tiro_48.png');
                this.game.load.image('barnh', 'assets/48/barnh_48.png');
                this.game.load.image('barnc', 'assets/48/barnc_48.png');
                this.game.load.image('storageBarnh', 'assets/48/storageBarnh_48.png');
                this.game.load.image('storageBarnc', 'assets/48/storageBarnc_48.png');
                this.game.load.image('specialFacilityh', 'assets/48/specialFacilityh_48.png');
                this.game.load.image('specialFacilityc', 'assets/48/specialFacilityc_48.png');
                this.game.load.image('kingsCourth', 'assets/48/kingsCourth_48.png');
                this.game.load.image('kingsCourtc', 'assets/48/kingsCourtc_48.png');
                this.game.load.image('thiefsTenth', 'assets/48/thiefsTenth_48.png');
                this.game.load.image('thiefsTentc', 'assets/48/thiefsTentc_48.png');
                this.game.load.image('towerh', 'assets/48/towerh_48.png');
                this.game.load.image('towerc', 'assets/48/towerc_48.png');
                this.game.load.image('gravityChamberc', 'assets/48/gravityChamberc_48.png');
                this.game.load.image('gravityChamberh', 'assets/48/gravityChamberh_48.png');
                this.game.load.image('techStationh', 'assets/48/techStationh_48.png');
                this.game.load.image('techStationc', 'assets/48/techStationc_48.png');
                this.game.load.image('magesGuildc', 'assets/48/magesGuildc_48.png');
                this.game.load.image('magesGuildh', 'assets/48/magesGuildh_48.png');
                this.game.load.image('farmerh', 'assets/48/farmerh_48.png');
                this.game.load.image('farmerc', 'assets/48/farmerc_48.png');
                this.game.load.image('sniperh', 'assets/48/sniperh_48.png');
                this.game.load.image('sniperc', 'assets/48/sniperc_48.png');
                this.game.load.image('kingh', 'assets/48/kingh_48.png');
                this.game.load.image('kingc', 'assets/48/kingc_48.png');
                this.game.load.image('thiefh', 'assets/48/thiefh_48.png');
                this.game.load.image('thiefc', 'assets/48/thiefc_48.png');
                this.game.load.image('propellerc', 'assets/48/propellerc_48.png');
                this.game.load.image('propellerh', 'assets/48/propellerh_48.png');
                this.game.load.image('engineerh', 'assets/48/engineerh_48.png');
                this.game.load.image('engineerc', 'assets/48/engineerc_48.png');
                this.game.load.image('magec', 'assets/48/magec_48.png');
                this.game.load.image('mageh', 'assets/48/mageh_48.png');
                this.game.load.spritesheet('barracks_ui_h', 'assets/48/ui/barracks_ui_h.png', 66, 66);
                this.game.load.spritesheet('archeryRange_ui_h', 'assets/48/ui/archeryRange_ui_h.png', 66, 66);
                this.game.load.spritesheet('barracks_ui_c', 'assets/48/ui/barracks_ui_c.png', 66, 66);
                this.game.load.spritesheet('archeryRange_ui_c', 'assets/48/ui/archeryRange_ui_c.png', 66, 66);
                this.game.load.spritesheet('barn_ui_h', 'assets/48/ui/barn_ui_h.png', 66, 66);
                this.game.load.spritesheet('barn_ui_c', 'assets/48/ui/barn_ui_c.png', 66, 66);
                this.game.load.spritesheet('storageBarn_ui_h', 'assets/48/ui/storageBarn_ui_h.png', 66, 66);
                this.game.load.spritesheet('storageBarn_ui_c', 'assets/48/ui/storageBarn_ui_c.png', 66, 66);
                this.game.load.spritesheet('specialFacility_ui_h', 'assets/48/ui/specialFacility_ui_h.png', 66, 66);
                this.game.load.spritesheet('specialFacility_ui_c', 'assets/48/ui/specialFacility_ui_c.png', 66, 66);
                this.game.load.spritesheet('kingsCourt_ui_h', 'assets/48/ui/kingsCourt_ui_h.png', 66, 66);
                this.game.load.spritesheet('kingsCourt_ui_c', 'assets/48/ui/kingsCourt_ui_c.png', 66, 66);
                this.game.load.spritesheet('thiefsTent_ui_h', 'assets/48/ui/thiefsTent_ui_h.png', 66, 66);
                this.game.load.spritesheet('thiefsTent_ui_c', 'assets/48/ui/thiefsTent_ui_c.png', 66, 66);
                this.game.load.spritesheet('gravityChamber_ui_c', 'assets/48/ui/gravityChamber_ui_c.png', 66, 66);
                this.game.load.spritesheet('gravityChamber_ui_h', 'assets/48/ui/gravityChamber_ui_h.png', 66, 66);
                this.game.load.spritesheet('techStation_ui_h', 'assets/48/ui/techStation_ui_h.png', 66, 66);
                this.game.load.spritesheet('techStation_ui_c', 'assets/48/ui/techStation_ui_c.png', 66, 66);
                this.game.load.spritesheet('magesGuild_ui_h', 'assets/48/ui/magesGuild_ui_h.png', 66, 66);
                this.game.load.spritesheet('magesGuild_ui_c', 'assets/48/ui/magesGuild_ui_c.png', 66, 66);
                this.game.load.spritesheet('archer_ui_c', 'assets/48/ui/archer_ui_c.png', 66, 66);
                this.game.load.spritesheet('farmer_ui_c', 'assets/48/ui/farmer_ui_c.png', 66, 66);
                this.game.load.spritesheet('footman_ui_c', 'assets/48/ui/footman_ui_c.png', 66, 66);
                this.game.load.spritesheet('propeller_ui_c', 'assets/48/ui/propeller_ui_c.png', 66, 66);
                this.game.load.spritesheet('king_ui_c', 'assets/48/ui/king_ui_c.png', 66, 66);
                this.game.load.spritesheet('thief_ui_c', 'assets/48/ui/thief_ui_c.png', 66, 66);
                this.game.load.spritesheet('engineer_ui_c', 'assets/48/ui/engineer_ui_c.png', 66, 66);
                this.game.load.spritesheet('sniper_ui_c', 'assets/48/ui/sniper_ui_c.png', 66, 66);
                this.game.load.spritesheet('mage_ui_c', 'assets/48/ui/mage_ui_c.png', 66, 66);
                this.game.load.spritesheet('archer_ui_h', 'assets/48/ui/archer_ui_h.png', 66, 66);
                this.game.load.spritesheet('farmer_ui_h', 'assets/48/ui/farmer_ui_h.png', 66, 66);
                this.game.load.spritesheet('footman_ui_h', 'assets/48/ui/footman_ui_h.png', 66, 66);
                this.game.load.spritesheet('propeller_ui_h', 'assets/48/ui/propeller_ui_h.png', 66, 66);
                this.game.load.spritesheet('king_ui_h', 'assets/48/ui/king_ui_h.png', 66, 66);
                this.game.load.spritesheet('thief_ui_h', 'assets/48/ui/thief_ui_h.png', 66, 66);
                this.game.load.spritesheet('engineer_ui_h', 'assets/48/ui/engineer_ui_h.png', 66, 66);
                this.game.load.spritesheet('sniper_ui_h', 'assets/48/ui/sniper_ui_h.png', 66, 66);
                this.game.load.spritesheet('mage_ui_h', 'assets/48/ui/mage_ui_h.png', 66, 66);
                this.game.load.image('upgrade_button', 'assets/48/ui/upgrade_button_48.png');
                this.game.load.image('gold_icon', 'assets/48/ui/gold_icon.png');
                this.game.load.image('wood_icon', 'assets/48/ui/wood_icon.png');
                this.game.load.image('hp_icon', 'assets/48/ui/hp_icon.png');
                this.game.load.image('armor_icon', 'assets/48/ui/armor_icon.png');
                this.game.load.image('incomeBall', 'assets/48/incomeBall_48.png');
                this.game.load.image('tileSelected', 'assets/48/tileSelected_48.png');
                this.game.load.image('tileClickMark', 'assets/48/tileClickMark_48.png');
                this.game.load.spritesheet('trainButton', 'assets/48/trainButton_48.png', 26, 26);
                this.game.load.spritesheet('pauseButton', 'assets/48/pauseButton_48.png', 26, 26);
                this.game.load.image('tileFundo', 'assets/48/tileFundo_48.png');
                this.game.load.image('arvores', 'assets/48/arvores_48.png');
                this.game.load.image('tileFundoMaior', 'assets/48/tileFundoMaior_48.png');
                this.game.load.image('editDeck', 'assets/48/menu_ui/editDeck.png');
                this.game.load.image('panelGrande', 'assets/48/menu_ui/panelGrande.png');
                this.game.load.image('panelMenor', 'assets/48/menu_ui/panelMenor.png');
                this.game.load.image('playButton', 'assets/48/menu_ui/playButton.png');
                this.game.load.image('roomsButton', 'assets/48/menu_ui/roomsButton.png');
                this.game.load.image('backButton', 'assets/48/menu_ui/backButton.png');
                this.game.load.image('deckbuildingGuide', 'assets/48/menu_ui/deckbuildingGuide.png');
                this.game.load.image('howToPlay-changelog', 'assets/48/menu_ui/howToPlay-changelog.png');
                this.game.load.image('moreButton', 'assets/48/menu_ui/moreButton.png');
            }
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    }(Phaser.State));
    Kodo.Preloader = Preloader;
})(Kodo || (Kodo = {}));
