import { _decorator, Component, Node } from 'cc';
import { AudioBase } from './AudioBase';
const { ccclass, property } = _decorator;

@ccclass('AudioReady')
export class AudioReady extends AudioBase {
    public open(): void {
        super.open();
        this.close(2);
    }
}


