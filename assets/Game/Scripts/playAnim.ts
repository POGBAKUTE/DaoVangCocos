import { _decorator, CCFloat, Component, easing, Node, Sprite, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playAnim')
export class playAnim extends Component {
    @property(CCFloat)
    duration: number;

    @property(CCFloat)
    scaleUp: number;

    @property(CCFloat)
    scaleDown: number;

    private currentTween = null

    startTween() {
        // Bắt đầu di chuyển từ pointA đến pointB
        this.moveToB();
    }

    start() {
        this.scheduleOnce(this.startTween, 0.5)
    }

    moveToB() {
        this.currentTween = tween(this.node)
            .to(this.duration, { scale: new Vec3(this.scaleUp, this.scaleUp, this.scaleUp) })
            .call(() => {
                this.moveToA(); // Gọi moveToA sau khi di chuyển đến pointB
            })
            .start();
    }

    moveToA() {
        this.currentTween = tween(this.node)
            .to(this.duration ,{ scale: new Vec3(this.scaleDown, this.scaleDown, this.scaleDown) })
            .call(() => {
                this.moveToB(); // Gọi moveToB sau khi di chuyển đến pointA
            })
            .start();
    }

    stopTween() {
        if (this.currentTween) {
            this.currentTween.stop();
            this.currentTween = null;
        }
    }
}
