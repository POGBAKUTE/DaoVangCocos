import { _decorator, Component, Node } from 'cc';
import { AudioBase } from './AudioBase';
const { ccclass, property } = _decorator;

@ccclass('AudioItemShop')
export class AudioItemShop extends AudioBase {
    public open(): void {
        super.open();
        this.close(1);
    }
}


