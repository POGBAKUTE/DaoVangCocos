import { _decorator, Component, Node, sys } from 'cc';
import { ItemShopBase } from './ItemShopBase';
import { playerData } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('ItemShopHealth')
export class ItemShopHealth extends ItemShopBase {
    itemButton(): void {
        super.itemButton();
        let coinPlayer = parseInt(playerData.CoinPlayer);
        let coinItemInt = parseInt(this.coinItem.string);
        if(coinPlayer > coinItemInt) {
            playerData.healthCount = parseInt(playerData.healthCount) + 1;
            sys.localStorage.setItem("Player", JSON.stringify(playerData));
        }
    }
}


