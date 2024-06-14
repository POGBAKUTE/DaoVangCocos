import { _decorator, Component, Node } from 'cc';
import { AudioBase } from './AudioBase';
const { ccclass, property } = _decorator;

@ccclass('AudioGold')
export class AudioGold extends AudioBase {
    public open(): void {
        super.open();
        this.close(2);
    }
}


