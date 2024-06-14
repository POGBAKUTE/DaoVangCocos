import { _decorator, Component, Node, sys } from 'cc';
import { ItemShopBase } from './ItemShopBase';
import { playerData } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('ItemShopHealth')
export class ItemShopHealth extends ItemShopBase {
    updateItemToData(): void {
        playerData.healthCount = parseInt(playerData.healthCount) + 1;
        sys.localStorage.setItem("Player", JSON.stringify(playerData));
    }
}


