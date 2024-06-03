import { _decorator, Component, Enum, Node, Prefab, tween, Vec3, easing } from 'cc';
import { ItemGainType } from '../Line';
import { GameManager, eventTarget } from '../GameManager';
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
            .to(1, posB, {
                easing: easing.bounceOut,
                onUpdate: (target: Vec3, ratio: number) => {
                    this.node.position = target;
                }
            })
            .delay(0.3)
            .to(1, posC, {
                easing: "smooth",
                onUpdate: (target: Vec3, ratio: number) => {
                    this.node.position = target;
                }
            })
            .call(() => {
                this.close()
                GameManager.Instance.pauseGame(false);
                eventTarget.emit("tweenItemGain", this.typeItemGain, coin)
            })
            .start();
    }

}


