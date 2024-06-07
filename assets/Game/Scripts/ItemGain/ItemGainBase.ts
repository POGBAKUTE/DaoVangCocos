import { _decorator, Component, Enum, Node, Prefab, tween, Vec3, easing } from 'cc';
import { ItemGainType } from '../Line';
import { GameManager, eventTarget } from '../GameManager';
import { AudioManager } from '../Audio/AudioManager';
import { AudioSwoosh } from '../Audio/AudioSwoosh';
import { AudioAlertGainItem } from '../Audio/AudioAlertGainItem';
const { ccclass, property } = _decorator;

@ccclass('ItemGainBase')
export class ItemGainBase extends Component {
    @property({ type: Enum(ItemGainType) })
    typeItemGain: ItemGainType;


    open(posA: Vec3, coin: number, posB: Vec3, posC: Vec3) {
        this.node.active = true;
        this.setup(posA, coin, posB, posC);
    }

    setup(posA: Vec3, coin: number, posB: Vec3, posC: Vec3) {
        this.node.setPosition(posA)
        this.startTween(posB, posC, coin);
    }

    close() {
        this.node.active = false;
    }

    startTween(posB: Vec3, posC: Vec3, coin: number) {
        // tween(this.node)
        //     .to(1, { position: posB })
        //     .call(() => {
        //         // Sau khi hoàn thành tween từ A tới B, tiếp tục tween từ B tới C sau 1 giây
        //         tween(this.node)
        //             .to(1, {
        //                 position: posC
        //             })
        //             .call(() => {
        //                 // Sau khi hoàn thành tween từ B tới C, in ra thông báo vào console
        //                 this.close()

        //             })
        //             .start();
        //     })
        //     .start();

        tween(this.node.position)
            .to(0.5, posB, {
                easing: easing.bounceOut,
                onUpdate: (target: Vec3, ratio: number) => {
                    this.node.position = target;
                }
            })
            .delay(0.3)
            .call(() => {
                setTimeout(() => {
                    AudioManager.Instance.openAudio(AudioSwoosh);

                }, 500)
            })
            .to(0.8, posC, {
                easing: easing.elasticIn,
                onUpdate: (target: Vec3, ratio: number) => {
                    this.node.position = target;
                }
            })
            .call(() => {
                this.close()
                // AudioManager.Instance.openAudio(AudioAlertGainItem)
                eventTarget.emit("tweenItemGain", this.typeItemGain, coin)
            })
            .start();
    }

}


