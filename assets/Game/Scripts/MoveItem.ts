import { _decorator, CCFloat, Component, Node, Tween, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveItem')
export class MoveItem extends Component {
    @property(CCFloat) 
    distance: number;

    @property(CCFloat) 
    duration: number;


    private posLeft: Vec3
    private posRight: Vec3
    private currentTween = null
    start() {
        this.posLeft = new Vec3(this.node.getPosition().x - this.distance, this.node.getPosition().y, this.node.getPosition().z);
        this.posRight = new Vec3(this.node.getPosition().x + this.distance, this.node.getPosition().y, this.node.getPosition().z);
        this.node.setPosition(this.posLeft);
        this.scheduleOnce(this.startTween, this.getRandomStep())
    }

    startTween() {
        // Bắt đầu di chuyển từ pointA đến pointB
        this.moveToB();
    }

    moveToB() {
        const randomDuration = this.getRandomStep();
        this.currentTween = tween(this.node)
            .to(randomDuration, { position: this.posRight })
            .call(() => {
                let tmp = this.node.getScale();
                this.node.setScale(new Vec3(-tmp.x, tmp.y, tmp.z)); // Quay đầu ngay lập tức
                this.moveToA(); // Gọi moveToA sau khi di chuyển đến pointB
            })
            .start();
    }

    moveToA() {
        const randomDuration = this.getRandomStep();
        this.currentTween = tween(this.node)
            .to(randomDuration, { position: this.posLeft })
            .call(() => {
                let tmp = this.node.getScale();
                this.node.setScale(new Vec3(tmp.x * -1, tmp.y, tmp.z)); // Quay đầu ngay lập tức
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

    getRandomStep() {
        // Tạo số ngẫu nhiên từ 0 đến 10, sau đó chia cho 10 để có bước nhảy 0.1
        return (Math.floor(Math.random() * 11) / 10) + 1;
    }
}


