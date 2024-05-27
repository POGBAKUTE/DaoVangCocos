import { _decorator, BoxCollider2D, CCFloat, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Size, UITransform, Vec2, Vec3 } from 'cc';
import { CoinItem } from './CoinItem';
const { ccclass, property } = _decorator;

@ccclass('Line')
export class Line extends Component {
    @property(Node)
    colliderLine: Node;

    @property(CCFloat)
    offsetCollider: number;

    @property(CCFloat)
    widthRopeInit: number;

    @property(CCFloat)
    speedRopeDown: number;

    @property(CCFloat)
    speedNoItem: number;

    private lineSize: UITransform;
    private isThrow: boolean = false;
    private isDown: boolean = false;
    private speedRopeUp: number;
    private coinGainPerPick: number = 0;
    private itemGain: CoinItem = null;
    start() {
        this.lineSize = this.node.getComponent(UITransform);
        this.lineSize.contentSize = new Size(83.5, this.widthRopeInit);
        let collider = this.colliderLine.getComponent(Collider2D)

        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null): void {
        if(other.tag == 2) {
            this.isThrow = false;
            this.node.emit("CollisionCircle", this.coinGainPerPick);
            if(this.itemGain != null) {
                this.itemGain.onDeActive();
                this.itemGain = null;
            }
        }
        else if(other.tag == 3) {
            this.isDown = false;
            this.itemGain = other.getComponent(CoinItem);
            this.speedRopeUp = this.itemGain.getSpeed();
            this.coinGainPerPick = this.itemGain.getCoin();
            this.itemGain.onDespawn(true, self.node);
        }
        else if(other.tag == 4) {
            this.isDown = false;
            this.speedRopeUp = this.speedNoItem;
            this.coinGainPerPick = 0;
        }
    }

    onDespawn(active: boolean) {
        this.isThrow = active;
        this.isDown = true;
    }

    update(deltaTime: number) {
        this.colliderLine.setPosition(new Vec3(this.colliderLine.getPosition().x, -(this.lineSize.contentSize.height - this.offsetCollider), 0))
        if(this.isThrow) {
            if(this.isDown) {
                let widthDelta = this.speedRopeDown * deltaTime;
                this.lineSize.contentSize = new Size(83.5, widthDelta + this.lineSize.contentSize.height);
            }
            else {
                let widthDelta = this.speedRopeUp * deltaTime * -1;
                this.lineSize.contentSize = new Size(83.5, widthDelta + this.lineSize.contentSize.height);
            }
        }
        // if()
    }
}


