import { _decorator, CCInteger, Component, Node, RigidBody2D, SpringJoint2D, UITransform, Vec3} from 'cc';
import { CoinItem, ItemType } from './CoinItem';
import { BubleItem } from './Popup/BubleItem';
const { ccclass, property } = _decorator;

@ccclass('MapController')
export class MapController extends Component {
    @property({ type: Node })
    parentPoint: Node;

    listItem: Array<CoinItem>;
    listItemFull: Array<BubleItem>;

    // onLoad() {
    //     this.listItem = new Array<CoinItem>();

    //     for (var i = 0; i < this.parentPoint.children.length; i++) {
    //         if(this.parentPoint.children[i].getComponent(CoinItem).typeItem != ItemType.BOM) {

    //             this.listItem.push(this.parentPoint.children[i].getComponent(CoinItem))
    //         }
    //     }
    // }

    onInit() {
        this.listItem = new Array<CoinItem>();
        this.listItemFull = new Array<BubleItem>();

        for (var i = 0; i < this.parentPoint.children.length; i++) {
            if(this.parentPoint.children[i].getComponent(CoinItem).typeItem != ItemType.BOM) {

                this.listItem.push(this.parentPoint.children[i].getComponent(CoinItem))
            }
            this.listItemFull.push(this.parentPoint.children[i].getComponent(BubleItem))
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
            if (nodeItem !== pos && nodeItem.node.active) { // Bỏ qua node gốc
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

    onBubleItem() {
        this.listItemFull.forEach(nodeItem => {
            let random = Math.random();
            setTimeout(() => {
                nodeItem.moveItemMap();

            }, random * 1000);
        });
    }
}


