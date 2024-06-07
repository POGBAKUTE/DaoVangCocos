import { _decorator, Component, easing, Label, Node, tween, Vec3 } from 'cc';
import { UICanvas } from './UICanvas';
const { ccclass, property } = _decorator;

@ccclass('UICountDownStart')
export class UICountDownStart extends UICanvas {
    @property(Label)
    labelTime: Label;

    public open(): void {
        super.open();
        this.countdown(5);
    }

    countdown(time: number): void {
        if(time === 0) {
            return;
        }
        tween(this.labelTime.node)
        .call(() => {
            this.labelTime.string = time.toString();
        })
        .to(1,{ scale: new Vec3(1.6, 1.6, 1.6)}, {easing: easing.bounceOutIn})
        .call(() => {
            this.countdown(time - 1);
        })
    }
}


