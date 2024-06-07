import { _decorator, Component, easing, Label, Node, tween, UIOpacity, Vec3 } from 'cc';
import { UICanvas } from './UICanvas';
import { GameManager } from '../GameManager';
import { AudioManager } from '../Audio/AudioManager';
import { AudioReady } from '../Audio/AudioReady';
import { AudioSwoosh } from '../Audio/AudioSwoosh';
import { AudioCountDownReady } from '../Audio/AudioCountDownReady';
const { ccclass, property } = _decorator;

@ccclass('UICountDownStart')
export class UICountDownStart extends UICanvas {
    @property(Label)
    labelTime: Label;

    @property(UIOpacity)
    backGround: UIOpacity;

    public open(): void {
        super.open();
        this.countdown(3);
        AudioManager.Instance.openAudio(AudioCountDownReady)
    }

    countdown(time: number): void {
        if (time === 0) {
            tween(this.labelTime.node)
                .call(() => {
                    this.labelTime.string = "READY";
                    AudioManager.Instance.openAudio(AudioReady)
                    setTimeout(() => {
                        AudioManager.Instance.openAudio(AudioSwoosh)
                    },600)
                })
                .set({ scale: new Vec3(1, 1, 1) })
                // .to(1, { scale: new Vec3(1, 1, 1) }, { easing: easing.elasticIn })
                .by(1, { position: new Vec3(1500, 0, 0) }, { easing: easing.elasticIn })
                .call(() => {
                    this.tweenBackGround();
                    GameManager.Instance.activeStartPlay();
                })
                .start()
            return;
        }
        tween(this.labelTime.node)
            .set({ position: Vec3.ZERO})
            .call(() => {
                this.labelTime.string = time.toString();
            })
            .set({ scale: new Vec3(1.6, 1.6, 1.6) })
            .to(1, { scale: new Vec3(0.3, 0.3, 0.3) }, { easing: easing.elasticIn })
            .call(() => {
                this.countdown(time - 1);
            })
            .start()
    }

    tweenBackGround() {
        tween(this.backGround)
        .to(0.5, {opacity : 0})
        .start();
    }
}


