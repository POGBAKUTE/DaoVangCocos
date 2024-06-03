import { _decorator, CCInteger, Component, Node, RigidBody2D, SpringJoint2D, UITransform, Vec3} from 'cc';
import { CoinItem } from './CoinItem';
const { ccclass, property } = _decorator;

@ccclass('MapController')
export class MapController extends Component {
    public static Instance: MapController = null
    @property({ type: Node })
    parentPoint: Node;

    listItem: Array<CoinItem>;

    onLoad() {
        MapController.Instance = this
        this.listItem = new Array<CoinItem>();

        for (var i = 0; i < this.parentPoint.children.length; i++) {
            this.listItem.push(this.parentPoint.children[i].getComponent(CoinItem))
        }
    }
    showList() {
        this.listItem.forEach(childItem => {
            console.log(childItem.name)
        })
    }

    onDeActiveRadius(pos: CoinItem, radius: number) {
        console.log("NamePOS: " + pos.name)
        this.listItem.forEach(nodeItem => {
            if (nodeItem !== pos) { // Bỏ qua node gốc
                const distance = Math.sqrt(pos.node.getPosition().subtract(nodeItem.node.getPosition()).length());
                console.log("Distance: " + distance)
                if (distance <= radius) {
                    setTimeout(() => {
                        nodeItem.node.active = false;

                    }, 0.5);
                }
            }
        });
        setTimeout(() => {
            pos.node.active = false;
        }, 0.5);
    }
}


