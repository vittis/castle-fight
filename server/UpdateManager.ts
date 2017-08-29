import { GameConfig } from "./GameConfig";
import { GamePlayer } from "./GamePlayer";


export enum Upgrades {
    INCOME,
    TRAINING,
    ATTACK,
    ATKSPEED,
    RESOURCE,
    UNITCOUNT,
    HP,
    RANGE
}


export class UpdateManager {

    updateRateCounter = 0;
    updateRate;


    updateCount=0;;

    upgradeCosts = [2, 1, 1, 2, 1, 3, 1, 2];

    gamePlayer : GamePlayer;



    attackModifier=0;
    atkSpeedModifier=0;
    hpModifier=0;
    armorModifier=0;
    rangeModifier=0;
    spamRateModifier=0;
    unitCountModifier=0;



    constructor(gamePlayer : GamePlayer) {
        this.gamePlayer = gamePlayer;
        this.updateRate = GameConfig.UPDATE_RATE;
    }


    step() {
        this.updateRateCounter++;
        if (this.updateRateCounter == this.updateRate) {
            this.updateCount++;
            this.updateRateCounter=0;
        }
    }

    upgrade(upgrade : number) {
        if (this.updateCount >= this.upgradeCosts[upgrade]) {
            this.updateCount -= this.upgradeCosts[upgrade];    
            if (upgrade == 0) {
                this.gamePlayer.resourceManager.income += 10;
            }
            else if (upgrade == 1) {
                this.gamePlayer.getSpamBuildings().forEach(b => {
                    b.data.spamRate -= 5;
                });
                this.spamRateModifier -= 5;
            }
            else if (upgrade == 2) {//atk
                this.gamePlayer.getAllUnits().forEach(u => {
                    u.data.attackDmg += 1;
                });
                this.attackModifier += 1;
            }
            else if (upgrade == 3) {//atk speed
                this.gamePlayer.getAllUnits().forEach(u => {
                    if (u.data.attackRate != 1) {
                        u.data.attackRate -= 1;
                    }
                });
                this.atkSpeedModifier -= 1;
            }
            else if (upgrade == 4) {
                this.gamePlayer.resourceManager.add(75, 75);
            }
            else if (upgrade == 5){
                this.gamePlayer.getSpamBuildings().forEach(b => {
                    b.data.spamCount += 1;
                });
                this.unitCountModifier +=1;
            }
            else if (upgrade == 6) {
                this.gamePlayer.getAllUnits().forEach(u => {
                    u.data.maxHP += 2;
                    u.data.hp += 2;
                });
                this.hpModifier += 2;
            }
            else if (upgrade == 7) {
                this.gamePlayer.getAllUnits().forEach(u => {
                    if (u.data.attackRange > 1) {
                        u.data.attackRange += 1;
                    }
                });
                this.rangeModifier += 1;
            }
        }
    }

}
