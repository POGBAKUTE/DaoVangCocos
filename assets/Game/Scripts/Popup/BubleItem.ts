import { _decorator, CCFloat, Component, Label, Node, Sprite, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BubleItem')
export class BubleItem extends Component {
    @property(Sprite)
    sprite: Sprite;

    @property(Label)
    label: Label;

    move() {
        this.node.scale = new Vec3(0.7, 0.7, 0.7)
        tween(this.node)
            .call(() => {
                this.onActive(true)
            })
            .to(
                1,
                { scale: new Vec3(1, 1, 1) },
                {
                    easing: (k) => {

                        var s, a = 1, p = 0.4;
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

    moveItemMap() {
        this.node.scale = new Vec3(0.5, 0.5, 0.5)
        tween(this.node)
            .call(() => {
                this.onActive(true)
            })
            .to(
                1.5,
                { scale: new Vec3(1, 1, 1) },
                {
                    easing: (k) => {

                        var s, a = 2.5, p = 0.4;
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

    onActive(active: boolean) {
        this.sprite.enabled = active
        if (this.label != null) {
            this.sprite.enabled = active
        }
    }


}


