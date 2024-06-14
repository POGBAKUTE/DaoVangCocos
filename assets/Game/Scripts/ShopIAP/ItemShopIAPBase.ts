import { _decorator, Button, CCString, Component, Enum, Label, Node } from 'cc';
import { eventTarget } from '../GameManager';
import { ItemActiveIAP } from './ItemActiveIAP';
const { ccclass, property } = _decorator;

export enum ItemShopIAPType {
    SUPER = 0,
    RECOMMEND = 1,
    NEW = 2,
    REMOVAL = 3
}

@ccclass('ItemShopIAPBase')
export class ItemShopIAPBase extends Component {
    @property({type : Enum(ItemShopIAPType)})
    typeItemSHopIAP: ItemShopIAPType;

    @property(Button)
    buttonItem: Button;

    @property(CCString)
    cost: string;

    @property(Label)
    labelCost: Label;

    protected start(): void {
        this.buttonItem.node.on(Button.EventType.CLICK, this.onHandlePay, this);
        this.updateLabel();
    }

    onHandlePay(event: Event): void {
        eventTarget.emit("PayItemShopIAP", this.typeItemSHopIAP, this.cost)
        console.log("MUAAAAA HETTTTT")
        // this.buttonItem.node.off(Button.EventType.CLICK, this.onHandlePay, this);
    }




    updateLabel() {
        this.labelCost.string = this.cost;
    }

    
}


