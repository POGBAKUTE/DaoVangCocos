import { _decorator, Component, Node, sys } from 'cc';
import { ItemShopBase } from './ItemShopBase';
import { playerData } from '../GameManager';
import { UIShop } from '../UI/UIShop';
import { UIManager } from '../UI/UIManager';
const { ccclass, property } = _decorator;

@ccclass('ItemShopLucky')
export class ItemShopLucky extends ItemShopBase {
    updateItemToData(): void {
        playerData.luckyCount = parseInt(playerData.luckyCount) + 1;
        sys.localStorage.setItem("Player", JSON.stringify(playerData));
    }

    getRandomNumberAroundX(x: number): number {
        const min = x - 200;
        const max = x + 200;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}


