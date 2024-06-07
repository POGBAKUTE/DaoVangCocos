import { _decorator, Component, Node } from 'cc';
import { AudioBase } from './AudioBase';
const { ccclass, property } = _decorator;

@ccclass('AudioSwoosh')
export class AudioSwoosh extends AudioBase {
    public open(): void {
        super.open();
        this.close(2);
    }
}

