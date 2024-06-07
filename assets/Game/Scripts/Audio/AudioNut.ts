import { _decorator, Component, Node } from 'cc';
import { AudioBase } from './AudioBase';
const { ccclass, property } = _decorator;

@ccclass('AudioNut')
export class AudioNut extends AudioBase {
    public open(): void {
        super.open();
        this.close(1.5);
    }
}


