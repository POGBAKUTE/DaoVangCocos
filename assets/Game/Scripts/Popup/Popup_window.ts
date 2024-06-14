import { _decorator, AudioClip, CCFloat, Component, easing, Node, resources, Sprite, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Popup_window')
export class Popup_window extends Component {
    @property(UIOpacity)
    backGround: UIOpacity;

    @property(Node)
    content: Node


    protected onEnable(): void {
        this.ShowPopup();
    }

    // ShowPopup() {
    //     this.backGround.opacity = 0;
    //     this.content.scale = new Vec3(this.minScale, this.minScale, this.minScale)
    //     tween(this.content)
    //     .to(this.duration,{ scale: new Vec3(this.scale1, this.scale1, this.scale1)})
    //     .to(this.duration /1.5,{ scale: new Vec3(this.scale2, this.scale2, this.scale2)})
    //     .to(this.duration * 1.3 ,{ scale: new Vec3(this.scale3, this.scale3, this.scale3) })
    //     .to(this.duration * 1.3 ,{ scale: new Vec3(this.curentScale, this.curentScale, this.curentScale) })
    //     .start()

    //     tween(this.backGround)
    //     .to(this.duration, {opacity : 255})
    //     .start();
    // }

    ShowPopup() {
        this.playPopupAudio()
        if (this.backGround != null) {
            this.backGround.opacity = 200;
            tween(this.backGround)
                .to(1, { opacity: 255 })
                .start();
        }
        if (this.content != null) {

            this.content.scale = new Vec3(0.8, 0.8, 0.8)
            tween(this.content)
                .to(
                    1,
                    { scale: new Vec3(1, 1, 1) },
                    {
                        easing: (k) => {

                            var s, a = 2, p = 0.35;
                            if (k === 0) {
                                return 0;
                            }
                            if (k === 1) {
                                return 1;
                            }
                            if (!a || a < 1) {
                                a = 1;
                                s = p / 4;
                            }
                            else {
                                s = p * Math.asin(1 / a) / (2 * Math.PI);
                            }
                            return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
                        },
                    }
                )
                .start()
        }


    }

    // ShowPopup() {
    //     this.backGround.opacity = 0;
    //     this.content.scale = new Vec3(this.minScale, this.minScale, this.minScale)
    //     tween(this.content)
    //         .to(
    //             this.duration,
    //             { scale: new Vec3(1, 1, 1) },
    //             {
    //                 easing: easing.elasticOut
    //             }
    //         )
    //         .start()

    //     tween(this.backGround)
    //         .to(this.duration, { opacity: 255 })
    //         .start();
    // }


    HidePopup(customEventData: string) {
        if (this.backGround) {
            this.backGround.opacity = 255;
            tween(this.backGround)
                .to(0.5, { opacity: 200 })
                .start();
        }
        if(this.content) {

            tween(this.content)
                .to(
                    0.5,
                    { scale: new Vec3(0.3, 0.3, 0.3) },
                    { easing: easing.backIn }
    
                )
                .call(() => {
                    this.node.emit("OffNode", customEventData);
                })
                .start()
        }


    }

    playPopupAudio() {
        resources.load("Audio/popup_appear", AudioClip, (err, clip) => {
            if (err) {
                console.log("Khong thay nhac")
                return;
            }

            if (clip) {
                clip.play();
            }
        });
    }
}


