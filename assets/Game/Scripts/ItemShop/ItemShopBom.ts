import { _decorator, Component, Node, sys } from 'cc';
import { ItemShopBase } from './ItemShopBase';
import { playerData } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('ItemShopBom')
export class ItemShopBom extends ItemShopBase {
    itemButton(): void {
        super.itemButton();
        let coinPlayer = parseInt(playerData.CoinPlayer);
        let coinItemInt = parseInt(this.coinItem.string);
        if(coinPlayer > coinItemInt) {
            playerData.bomCount = parseInt(playerData.bomCount) + 1;
            sys.localStorage.setItem("Player", JSON.stringify(playerData));
        }
    }
}


