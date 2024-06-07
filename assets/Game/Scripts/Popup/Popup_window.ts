import { _decorator, CCFloat, Component, easing, Node, Sprite, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Popup_window')
export class Popup_window extends Component {
    @property(UIOpacity)
    backGround: UIOpacity;

    @property(Node)
    content: Node

    @property(CCFloat)
    minScale: number;

    @property(CCFloat)
    scale1: number;

    @property(CCFloat)
    scale2: number;

    @property(CCFloat)
    scale3: number;

    @property(CCFloat)
    curentScale: number;

    @property(CCFloat)
    duration: number;

    protected onEnable(): void {
        this.ShowPopup();
    }

    ShowPopup() {
        this.backGround.opacity = 0;
        this.content.scale = new Vec3(this.minScale, this.minScale, this.minScale)
        tween(this.content)
        .to(this.duration,{ scale: new Vec3(this.scale1, this.scale1, this.scale1)})
        .to(this.duration /1.5,{ scale: new Vec3(this.scale2, this.scale2, this.scale2)})
        .to(this.duration * 1.3 ,{ scale: new Vec3(this.scale3, this.scale3, this.scale3) })
        .to(this.duration * 1.3 ,{ scale: new Vec3(this.curentScale, this.curentScale, this.curentScale) })
        .start()
        
        tween(this.backGround)
        .to(this.duration, {opacity : 255})
        .start();
    }

    HidePopup(deltaTime: number, customEventData: string) {
        this.backGround.opacity = 255;
        tween(this.content)
        .to(this.duration,{ scale: new Vec3(1.2, 1.2, 1.2)})
        .to(this.duration / 1.2 ,{ scale: new Vec3(0.3, 0.3, 0.3) })
        .call(() => {
            this.node.emit("OffNode", customEventData);
        })
        .start()
        
        tween(this.backGround)
        .to(this.duration, {opacity : 0})
        .start();
    }
}


