import { _decorator, Component, Node, sys } from 'cc';
import { ItemShopBase } from './ItemShopBase';
import { playerData } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('ItemShopBom')
export class ItemShopBom extends ItemShopBase {
    updateItemToData(): void {
        playerData.bomCount = parseInt(playerData.bomCount) + 1;
        sys.localStorage.setItem("Player", JSON.stringify(playerData));
    }
}


