import { _decorator, Button, Component, Label, Node, Sprite, sys } from 'cc';
import { playerData } from '../GameManager';
import { UIManager } from '../UI/UIManager';
import { UIShop } from '../UI/UIShop';
import { AudioManager } from '../Audio/AudioManager';
import { AudioItemShop } from '../Audio/AudioItemShop';
const { ccclass, property } = _decorator;

export enum ItemShopType {
    BOM = 0,
    HEALTH = 1,
    DA = 2,
    DIAMOND = 3,
    LUCKY  = 4
}

@ccclass('ItemShopBase')
export class ItemShopBase extends Component {
    @property(Button)
    buttonItem: Button;

    @property(Label)
    coinItem: Label;

    @property(Sprite)
    spriteItem: Sprite;

    @property(Sprite)
    spriteCoin: Sprite;

    protected start(): void {
        this.buttonItem.node.on(Button.EventType.CLICK, this.itemButton, this);
    }

    itemButton() {
        let coinPlayer = parseInt(playerData.CoinPlayer);
        let coinItemInt = parseInt(this.coinItem.string);
        if(coinPlayer > coinItemInt) {
            this.ActiveItem(false);
            playerData.CoinPlayer = coinPlayer - coinItemInt;
            sys.localStorage.setItem("Player", JSON.stringify(playerData));
            UIManager.Instance.getUI(UIShop).updateCoin(playerData.CoinPlayer)
            AudioManager.Instance.openAudio(AudioItemShop);
            this.updateItemToData()
        }
    }

    updateItemToData() {

    }

    ActiveItem(active: boolean): void {
        this.getComponent(Sprite).grayscale = !active;
        this.spriteCoin.node.active = active;
        this.spriteItem.grayscale = !active;
        this.buttonItem.interactable = active;
    }

    updateCoinItem(coin: number): void {
        this.coinItem.string = coin.toString();
    }
}


