import { GameConfig } from "./GameConfig";
import { GamePlayer } from "./GamePlayer";
import { SacrificeChamber } from "./building/SacrificeChamber";


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

    updateRateCounter = 1;
    updateRate;


    updateCount=0;;

    upgradeCosts = [2, //income
                    1, //training
                    2, //attack
                    3, //atk speed
                    1, //resource
                    3, //unitcount
                    1, //hp
                    2];//range

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
                this.gamePlayer.resourceManager.income += 15;
            }
            else if (upgrade == 1) {
                this.gamePlayer.getSpamBuildings().forEach(b => {
                    b.data.spamRate -= 5;
                });
                this.gamePlayer.getEffectBuildings().forEach(b => {
                    if (!(b instanceof SacrificeChamber))
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
                this.gamePlayer.resourceManager.add(65, 65);
            }
            else if (upgrade == 5) {
                this.gamePlayer.getSpamBuildings().forEach(b => {
                    b.data.spamCount += 1;
                });
                this.gamePlayer.getEffectBuildings().forEach(b => {
                    if (!(b instanceof SacrificeChamber))
                        b.data.spamCount += 1;
                });

                this.unitCountModifier +=1;
            }
            else if (upgrade == 6) {
                this.gamePlayer.getAllUnits().forEach(u => {
                    u.data.maxHP += 1;
                    u.data.hp += 1;
                });
                this.hpModifier += 1;
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
