import { _decorator, CCFloat, CCInteger, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
import { MapController } from './MapController';
const { ccclass, property } = _decorator;

@ccclass('CoinItem')
export class CoinItem extends Component {
    @property(CCFloat)
    speed: number;

    @property(CCInteger)
    coin: number;

    @property(CCInteger)
    typeItem: number = 0;

    @property(CCFloat)
    radiusBom: number = 0;

    private isCollider: boolean = false;
    private target: Node;
    start() {
        // let collider = this.node.getComponent(Collider2D);
        // console.log(collider);
        // collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    // onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null): void {
    //     console.log(self.name +" " + other.name);
    // }

    update(deltaTime: number) {
        if(this.isCollider) {
            this.node.setWorldPosition(this.target.getWorldPosition());
        }
    }

    onDespawn(active: boolean, target: Node) {
        if(this.typeItem === 0) {
            this.isCollider = active;
            this.target = target;
        }
        else if(this.typeItem === 1) {
            MapController.Instance.onDeActiveRadius(this, this.radiusBom);
        }
    }

    onDeActive() {
        if(this.typeItem == 0) {
            setTimeout(() => {
    
               if(this != null) {

                   this.node.active = false;
               }
                this.isCollider = false;
    
            }, 0.5);

        }
    }

    getSpeed() {
        return this.speed;
    }

    getCoin() {
        return this.coin;
    }
}




