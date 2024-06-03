import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataItemShop')
export class DataItemShop{
    @property(CCInteger)
    coinBom: number;

    @property(CCInteger)
    coinHealth: number;

    @property(CCInteger)
    coinDa: number;

    @property(CCInteger)
    coinLucky: number;

    @property(CCInteger)
    coinDiamond: number;
}


