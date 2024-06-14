import { _decorator, Component, Node, sys } from 'cc';
import { ItemShopBase } from './ItemShopBase';
import { playerData } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('ItemShopDa')
export class ItemShopDa extends ItemShopBase {
    updateItemToData(): void {
        playerData.daCount = parseInt(playerData.daCount) + 1;
        sys.localStorage.setItem("Player", JSON.stringify(playerData));
    }
}


