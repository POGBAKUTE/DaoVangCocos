import { _decorator, Component, Label, Node } from 'cc';
import { UICanvas } from './UICanvas';
import { ButtonCustom } from '../Button/ButtonCustom';
import { App } from '../App';
import { eventTarget, playerData } from '../GameManager';
import { ItemActiveIAP } from '../ShopIAP/ItemActiveIAP';
import { ItemShopIAPType } from '../ShopIAP/ItemShopIAPBase';
const { ccclass, property } = _decorator;

@ccclass('UIShopIAP')
export class UIShopIAP extends UICanvas {
    @property(ButtonCustom)
    buttonClose: ButtonCustom;

    @property(Label)
    coinPlayer: Label;

    @property(ItemActiveIAP)
    buttonSuper : ItemActiveIAP;

    @property(ItemActiveIAP)
    buttonRecommend : ItemActiveIAP;

    @property(ItemActiveIAP)
    buttonNew : ItemActiveIAP;

    @property(ItemActiveIAP)
    buttonRemoval : ItemActiveIAP;

    start() {
        this.node.on("OffNode", this.closeButton, this);
        // eventTarget.on("PaySuccess", this.updateStateItem, this);
    }

    closeButton() {
        this.close(0)
    }

    public open(): void {
        super.open();
        this.setup();
        this.onInitButton()
    }

    onInitButton() {
        this.buttonClose.isTouch = true;
    }

    public setup(): void {
        this.updateCoin(playerData.CoinPlayer)
        this.updateStateList()
    }


    updateCoin(coin: number) {
        this.coinPlayer.string = App.formatMoney(coin)
    }

    updateStateList() {
        this.buttonSuper.onActive(playerData.superIAP === "0")
        this.buttonRecommend.onActive(playerData.recommendIAP === "0")
        this.buttonNew.onActive(playerData.newIAP === "0")
        this.buttonRemoval.onActive(playerData.removalIAP === "0")
    }

    // updateStateItem(typeItemIAP: ItemShopIAPType) {
    //     switch (typeItemIAP) {
    //         case ItemShopIAPType.SUPER:
    //             this.buttonSuper.onActive(false)
    //             break;
    //         case ItemShopIAPType.RECOMMEND:
    //             this.buttonRecommend.onActive(false)
    //             break;
    //         case ItemShopIAPType.NEW:
    //             this.buttonNew.onActive(false)
    //             break;
    //         case ItemShopIAPType.REMOVAL:
    //             this.buttonRemoval.onActive(false)
    //             break;
    //     }
    // }
}


