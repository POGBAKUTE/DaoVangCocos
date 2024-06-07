import { _decorator, CCFloat, Component, Label, Node, Sprite, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BubleItem')
export class BubleItem extends Component {
    @property(Sprite)
    sprite: Sprite;

    @property(Label)
    label: Label;

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

    move() {
        tween(this.node)
        .call(() => {
            this.onActive(true);
        })
        .to(this.duration,{ scale: new Vec3(this.scale1, this.scale1, this.scale1)})
        .to(this.duration /1.5,{ scale: new Vec3(this.scale2, this.scale2, this.scale2)})
        .to(this.duration * 1.3 ,{ scale: new Vec3(this.scale3, this.scale3, this.scale3) })
        .to(this.duration * 1.3 ,{ scale: new Vec3(this.curentScale, this.curentScale, this.curentScale) })
        .start()
    }

    moveItemMap() {
        let random: number = Math.random() * 2;
        tween(this.node)
        .call(() => {
            this.onActive(true);
        })
        .to(0.2,{ scale: new Vec3(1.6, 1.6, 1.6)})
        .to(0.2 /1.5,{ scale: new Vec3(1, 1, 1)})
        .to(0.2 * 1.3 ,{ scale: new Vec3(1.1, 1.1, 1.1) })
        .to(0.2 * 1.3 ,{ scale: new Vec3(1, 1, 1) })
        .start()
    }

    onActive(active: boolean) {
        this.sprite.enabled = active
        if(this.label != null) {
            this.sprite.enabled = active
        }
    }

    
}


