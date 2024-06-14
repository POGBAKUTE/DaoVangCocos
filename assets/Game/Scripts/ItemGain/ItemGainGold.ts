import { _decorator, Component, Label, math, Node, Vec3, tween, easing, Prefab } from 'cc';
import { ItemGainBase } from './ItemGainBase';
import { AudioManager } from '../Audio/AudioManager';
import { AudioSwoosh } from '../Audio/AudioSwoosh';
import { eventTarget } from '../GameManager';
import { GateUtils } from '../Gates/GateUtils';
import { AudioGold } from '../Audio/AudioGold';
const { ccclass, property } = _decorator;

@ccclass('ItemGainGold')
export class ItemGainGold extends ItemGainBase {
    @property(Label)
    coin: Label;

    @property(Prefab)
    coinPrefab: Prefab;

    setup(posA: math.Vec3, coin: number, posB: math.Vec3, posC: math.Vec3): void {
        this.coin.string = coin.toString();
        super.setup(posA, coin, posB, posC)
    }

    startTween(posB: Vec3, posC: Vec3, coin: number) {

        tween(this.node.position)
            .to(0.5, posB, {
                easing: easing.bounceOut,
                onUpdate: (target: Vec3, ratio: number) => {
                    this.node.position = target;
                }
            })
            .delay(0.3)
            .call(() => {
                this.close()
                let amountTmp = 0;
                if(coin > 0 && coin <= 30) {
                    amountTmp = 5;
                }
                else if(coin > 30 && coin <= 100) {
                    amountTmp = 10;
                }
                else if(coin > 100 && coin <= 250) {
                    amountTmp = 15;
                }
                else if(coin > 250 && coin <= 500) {
                    amountTmp = 20;
                }
                else if(coin > 500 && coin <= 700) {
                    amountTmp = 25;
                }
                else if(coin > 700 && coin <= 1000) {
                    amountTmp = 30;
                }
                GateUtils.flyRewardAnimation(
                    {
                        currentNode: this.node,
                        prefab: this.coinPrefab,
                        amount: amountTmp,
                        targetNode: posC,
                        directCurve: 1,
                        highestY: 100,
                        timeFactor: 0.08,
                    },
                    () => {
                        console.log("EMITTTTTT")
                        // AudioManager.Instance.openAudio(AudioAlertGainItem)
                        eventTarget.emit("tweenItemGain", this.typeItemGain, coin)
                    },
                    () => {
                        AudioManager.Instance.openAudio(AudioGold)
                    },
                );
            })
            // .call(() => {
            //     this.close()
            //     // AudioManager.Instance.openAudio(AudioAlertGainItem)
            //     eventTarget.emit("tweenItemGain", this.typeItemGain, coin)
            // })
            .start();
    }
}


