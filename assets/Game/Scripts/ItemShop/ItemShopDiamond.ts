import { _decorator, Component, Node, sys } from 'cc';
import { ItemShopBase } from './ItemShopBase';
import { playerData } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('ItemShopDiamond')
export class ItemShopDiamond extends ItemShopBase {
    updateItemToData(): void {
            playerData.diamondCount = parseInt(playerData.diamondCount) + 1;
            sys.localStorage.setItem("Player", JSON.stringify(playerData));
    }
}


