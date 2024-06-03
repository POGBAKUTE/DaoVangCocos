import { _decorator, Button, Component, Label, Node } from 'cc';
import { UICanvas } from './UICanvas';
import { GameManager, GameState, playerData } from '../GameManager';
import { ItemShopBase, ItemShopType } from '../ItemShop/ItemShopBase';
import { AudioManager } from '../Audio/AudioManager';
import { AudioNut } from '../Audio/AudioNut';
import { App } from '../App';
const { ccclass, property } = _decorator;

@ccclass('UIShop')
export class UIShop extends UICanvas {
    @property(Button)
    buttonNext: Button;

    @property(Label)
    coinPlayer: Label;

    // @property(ItemShopBase)
    // itemBom: ItemShopBase;

    // @property(ItemShopBase)
    // itemHealth: ItemShopBase;

    // @property(ItemShopBase)
    // itemDa: ItemShopBase;

    // @property(ItemShopBase)
    // itemLucky: ItemShopBase;

    // @property(ItemShopBase)
    // itemDiamond: ItemShopBase;

    @property(ItemShopBase)
    listItemShop: ItemShopBase[] = [];

    protected start(): void {
        this.buttonNext.node.on(Button.EventType.CLICK, this.nextButton, this);
    }

    nextButton() {
        this.close(0);
        GameManager.Instance.setCurrentState(GameState.GS_PLAYING);
        AudioManager.Instance.openAudio(AudioNut)
    }

    public open(): void {
        super.open();
        this.setup();
    }

    public setup(): void {
        this.updateCoin(playerData.CoinPlayer)
        let countItem = this.getRandomNumber(this.getEnumLength(ItemShopType));
        let arrayTmp = this.generateRandomBooleanArray(countItem, this.getEnumLength(ItemShopType))
        console.log("Array Random: " + arrayTmp)
        for (var i = 0; i < arrayTmp.length; i++) {
            this.setItemShop(arrayTmp[i], this.getCoinByType(i as ItemShopType), this.listItemShop[i]);
        }
        // console.log("countItem " + countItem);
        // console.log("countItem858686 " + 1);
        // let countIndex = 0;
        // if(countIndex < countItem) {
        //     let randomBool = this.getRandomBoolean();
        //     countIndex += this.setItemShop(randomBool, GameManager.Instance.dataShopCurrent.coinBom, this.itemBom);
        // }
        // else {
        //     this.setItemShop(false, GameManager.Instance.dataShopCurrent.coinBom, this.itemBom);
        // }

        // if(countIndex < countItem) {
        //     let randomBool = this.getRandomBoolean();
        //     countIndex += this.setItemShop(randomBool, GameManager.Instance.dataShopCurrent.coinHealth, this.itemHealth);
        // }
        // else {
        //     this.setItemShop(false, GameManager.Instance.dataShopCurrent.coinHealth, this.itemHealth);
        // }

        // if(countIndex < countItem) {
        //     let randomBool = this.getRandomBoolean();
        //     countIndex += this.setItemShop(randomBool, GameManager.Instance.dataShopCurrent.coinDa, this.itemDa);
        // }
        // else {
        //     this.setItemShop(false, GameManager.Instance.dataShopCurrent.coinDa, this.itemDa);
        // }

        // if(countIndex < countItem) {
        //     let randomBool = this.getRandomBoolean();
        //     countIndex += this.setItemShop(randomBool, GameManager.Instance.dataShopCurrent.coinLucky, this.itemLucky);
        // }
        // else {
        //     this.setItemShop(false, GameManager.Instance.dataShopCurrent.coinLucky, this.itemLucky);
        // }

        // if(countIndex < countItem) {
        //     let randomBool = this.getRandomBoolean();
        //     countIndex += this.setItemShop(randomBool, GameManager.Instance.dataShopCurrent.coinDiamond, this.itemDiamond);
        // }
        // else {
        //     this.setItemShop(false, GameManager.Instance.dataShopCurrent.coinDiamond, this.itemDiamond);
        // }
    }

    getCoinByType(type: ItemShopType) {
        switch (type) {
            case ItemShopType.BOM:
                return GameManager.Instance.dataShopCurrent.coinBom
            case ItemShopType.HEALTH:
                return GameManager.Instance.dataShopCurrent.coinHealth
            case ItemShopType.DA:
                return GameManager.Instance.dataShopCurrent.coinDa
            case ItemShopType.DIAMOND:
                return GameManager.Instance.dataShopCurrent.coinDiamond
            case ItemShopType.LUCKY:
                return GameManager.Instance.dataShopCurrent.coinLucky
        }
    }

    generateRandomBooleanArray(k, n) {
        if (k > n) {
            throw new Error("k cannot be greater than n");
        }

        // Tạo mảng với k phần tử true và n-k phần tử false
        let array = new Array(k).fill(true).concat(new Array(n - k).fill(false));

        // Hàm trộn ngẫu nhiên (Fisher-Yates shuffle)
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Đổi chỗ các phần tử
        }

        return array;
    }

    getEnumLength(enumObj: any): number {
        // Lọc ra các key có giá trị kiểu số (tương ứng với giá trị của enum)
        const keys = Object.keys(enumObj).filter(key => !isNaN(Number(enumObj[key])));
        return keys.length;
    }

    getRandomBoolean(): boolean {
        return Math.random() >= 0.5;
    }

    getRandomNumber(count: number): number {
        return Math.floor(Math.random() * count) + 1;
    }

    setItemShop(active: boolean, coin: number, item: ItemShopBase) {
        item.updateCoinItem(coin)
        item.ActiveItem(active)
    }

    updateCoin(coin: number) {
        this.coinPlayer.string = App.formatMoney(coin)
    }
}


