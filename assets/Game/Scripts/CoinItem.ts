import { _decorator, CCFloat, CCInteger, Collider2D, Component, Contact2DType, Enum, IPhysics2DContact, Node } from 'cc';
import { MapController } from './MapController';
import { MoveItem } from './MoveItem';
const { ccclass, property } = _decorator;

export enum ItemType {
    BOM = 0,
    DIAMOND = 1,
    GOLD = 2,
    DA = 3,
    LUCKY = 4,
    CHUOT = 5
}

@ccclass('CoinItem')
export class CoinItem extends Component {
    @property(CCFloat)
    speed: number;

    @property(CCInteger)
    coin: number;

    @property({type : Enum(ItemType)})
    typeItem: ItemType = ItemType.GOLD;

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
        if(this.typeItem === ItemType.BOM) {
            MapController.Instance.onDeActiveRadius(this, this.radiusBom);
        }
        else {
            if(this.typeItem === ItemType.CHUOT) {
                this.getComponent(MoveItem).stopTween();
            }
            this.isCollider = active;
            this.target = target;
        }
    }

    onDeActive() {
        if(this.typeItem !== ItemType.BOM) {
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




