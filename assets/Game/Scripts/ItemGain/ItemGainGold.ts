import { _decorator, Component, Label, math, Node } from 'cc';
import { ItemGainBase } from './ItemGainBase';
const { ccclass, property } = _decorator;

@ccclass('ItemGainGold')
export class ItemGainGold extends ItemGainBase {
    @property(Label)
    coin: Label;

    setup(posA: math.Vec3, coin: number, posB: math.Vec3, posC: math.Vec3): void {
        this.coin.string = coin.toString();
        super.setup(posA, coin, posB, posC)
    }
}


