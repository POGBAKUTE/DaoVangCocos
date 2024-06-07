import { _decorator, CCFloat, Component, easing, Node, Sprite, tween, Vec3, director, Label} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveLabel')
export class MoveLabel extends Component {
    @property(CCFloat)
    duration: number;

    @property(Label)
    label: Label;

    @property(Sprite)
    sprite: Sprite;

    

    private startPos: Vec3;
    private endPos: Vec3;

    move(direction: Vec3) {
        let currentPos = this.node.getPosition();
        this.endPos = currentPos
        this.startPos = this.node.getPosition().subtract(direction)
        console.log(this.startPos + "---->" +  this.endPos)
        tween(this.node)
            .set({ position: this.startPos })
            .call(() => {
                this.onActive(true);
            })
            .to(this.duration, { position: this.endPos }, { easing: easing.cubicOut })
            .start();
    }

    onActive(active: boolean): void {
        this.label.enabled = active;
        this.sprite.enabled = active;
    }
}


