import { _decorator, Component, Node, EventTarget, sys, CCFloat, Prefab, instantiate, Vec3, CCInteger } from 'cc';
import { Player } from './Player';
import { UIManager } from './UI/UIManager';
import { UIGamePLay } from './UI/UIGamePLay';
import { UIVictory } from './UI/UIVictory';
import { UIFail } from './UI/UIFail';
import { AudioManager } from './Audio/AudioManager';
import { AudioReceiveItem } from './Audio/AudioReceiveItem';
import { DataItemShop } from './ItemShop/DataItemShop';
import { ItemGainType } from './Line';
import { ItemGainBase } from './ItemGain/ItemGainBase';
import { AudioWin } from './Audio/AudioWin';
import { AudioNut } from './Audio/AudioNut';
const { ccclass, property } = _decorator;
export const eventTarget = new EventTarget();

export enum GameState {
    GS_INIT,
    GS_PLAYING,
    GS_END
}

export let playerData;


@ccclass('GameManager')
export class GameManager extends Component {
    public static Instance: GameManager = null
    @property(Player)
    public player: Player | null = null


    @property(CCFloat)
    public timePerLevel: number = 60;

    @property(Prefab)
    toastPrefab: Prefab = null;

    @property({
        type: Prefab
    })
    public listMap: Prefab[] = []

    @property({
        type: CCInteger
    })
    public listTargetLevel: number[] = []

    @property({
        type: DataItemShop
    })
    public listShopLevel: DataItemShop[] = []

    @property({
        type: ItemGainBase
    })
    public listSpriteItemGain: ItemGainBase[] = []

    @property({
        type: Node
    })
    public posC1: Node

    @property({
        type: Node
    })
    public posC2: Node

    private timeCurrent = 0;
    private mapCurrent: Node;
    private toastNode: Node;

    public coinCurrent: number;
    public currentMapIndex: number = 1;
    public stateGame: GameState;
    public targetCurrent: number = 0;
    public dataShopCurrent: DataItemShop;
    onEnable(): void {
        GameManager.Instance = this;
        this.showLoadingToast();
        // localStorage.clear();
        if (sys.localStorage.getItem("Player") == null) {
            playerData = {
                Level: "1",
                Target: "0",
                CoinPlayer: "0",
                audioSFX: "1",
                audioVolume: "1",
                bomCount: "0",
                daCount: "0",
                healthCount: "0",
                diamondCount: "0",
                luckyCount: "0"
            };
            sys.localStorage.setItem("Player", JSON.stringify(playerData));
        }
        else {
            playerData = JSON.parse(sys.localStorage.getItem("Player"));
        }
        this.currentMapIndex = parseInt(playerData.Level);
        this.targetCurrent = parseInt(playerData.Target);
        eventTarget.on("UpdateCoin", this.updateCoin, this)
        eventTarget.on("tweenItemGain", this.onHandleItemGain, this)
    }

    onDisable(): void {

    }

    protected start(): void {
        this.setCurrentState(GameState.GS_INIT);
    }

    init() {
        // UIHome mo ra
        //UIManager.Instance.openUI(UIHome);
    }

    playing() {
        // UIGamePlay mo ra
        this.activePreparePlay();
        UIManager.Instance.openUI(UIGamePLay);
    }

    end() {
        if (this.coinCurrent >= this.targetCurrent) {
            playerData.Level = (this.currentMapIndex + 1).toString();
            playerData.CoinPlayer = this.coinCurrent.toString();
            let dataShopIndex = (this.currentMapIndex - 1) % this.listShopLevel.length
            this.dataShopCurrent = this.listShopLevel[dataShopIndex];
            UIManager.Instance.openUI(UIVictory);
        }
        else {
            // playerData.Level = "1";
            // playerData.CoinPlayer = "0";
            // playerData.bomCount = 0;
            // playerData.Target = "0"
            // this.targetCurrent = 0;
            UIManager.Instance.openUI(UIFail);
            this.resetHome();
        }
        this.resetItemShopPerLevel();
        sys.localStorage.setItem("Player", JSON.stringify(playerData));
        this.currentMapIndex = parseInt(playerData.Level);

    }

    resetHome() {
        playerData.Level = "1";
        playerData.CoinPlayer = "0";
        playerData.bomCount = 0;
        playerData.Target = "0"
        this.targetCurrent = 0;
        this.resetItemShopPerLevel();
        sys.localStorage.setItem("Player", JSON.stringify(playerData));
        this.currentMapIndex = parseInt(playerData.Level);
    }

    loadMap(): void {
        if (this.mapCurrent != null) {
            this.mapCurrent.destroy();
        }
        let mapIndex = (this.currentMapIndex - 1) % this.listMap.length;
        this.mapCurrent = instantiate(this.listMap[mapIndex])
        this.mapCurrent.setPosition(Vec3.ZERO)
        this.node.parent.addChild(this.mapCurrent);
        this.mapCurrent.setSiblingIndex(0)
        let targetIndex = (this.currentMapIndex - 1) % this.listTargetLevel.length;
        playerData.Target = this.targetCurrent;
        sys.localStorage.setItem("Player", JSON.stringify(playerData));
        if (targetIndex == 0) {
            this.targetCurrent += this.listTargetLevel[targetIndex];
        }
        else {
            this.targetCurrent += this.listTargetLevel[targetIndex] - this.listTargetLevel[targetIndex - 1];
        }
    }

    activePreparePlay() {
        this.loadMap();
        this.player.onActive(false)
        this.coinCurrent = parseInt(playerData.CoinPlayer);
        this.pauseGame(true);
        this.player.resetPlayer();
    }

    activeStartPlay() {
        this.player.onActive(true);
        this.schedule(this.updateCoundown, 1)
        this.timeCurrent = this.timePerLevel;
        this.pauseGame(false);
    }


    updateCoundown() {
        if (this.timeCurrent > 0) {
            this.timeCurrent--;
            UIManager.Instance.getUI(UIGamePLay).updateTime(this.timeCurrent);

        }
        else {
            this.unschedule(this.updateCoundown);
            this.setCurrentState(GameState.GS_END)
        }
    }

    updateCoin(coinGain: number, itemGainType: ItemGainType) {
        this.pauseGame(true);
        AudioManager.Instance.openAudio(AudioReceiveItem)
        AudioManager.Instance.closeAudio(AudioReceiveItem, 1)
        let posA, posB, posC: Vec3;
        switch (itemGainType) {
            case ItemGainType.GOLD:
                posA = this.player.node.getPosition().subtract(new Vec3(0, 100, 0));
                posB = this.player.node.getPosition().subtract(new Vec3(150, 0, 0));
                posC = this.posC1.getPosition();
                break;
            case ItemGainType.BOM:
                posA = this.player.node.getPosition().subtract(new Vec3(0, 100, 0));
                posB = this.player.node.getPosition().subtract(new Vec3(0, -100, 0));
                posC = this.posC2.getPosition();
                break;
            case ItemGainType.DA:
                posA = this.player.node.getPosition().subtract(new Vec3(0, 100, 0));
                posB = this.player.node.getPosition().subtract(new Vec3(0, -100, 0));
                posC = this.player.node.getPosition().subtract(new Vec3(0, -50, 0));
                break;
            case ItemGainType.DIAMOND:
                posA = this.player.node.getPosition().subtract(new Vec3(0, 100, 0));
                posB = this.player.node.getPosition().subtract(new Vec3(0, -100, 0));
                posC = this.player.node.getPosition().subtract(new Vec3(0, -50, 0));
                break;
            case ItemGainType.HEALTH:
                posA = this.player.node.getPosition().subtract(new Vec3(0, 100, 0));
                posB = this.player.node.getPosition().subtract(new Vec3(0, -100, 0));
                posC = this.player.node.getPosition().subtract(new Vec3(0, -50, 0));
                break;
            default:
                break;
        }
        this.listSpriteItemGain[itemGainType as number].open(posA, coinGain, posB, posC)
    }

    onHandleItemGain(typeItemGain: ItemGainType, coinGain: number) {
        switch (typeItemGain) {
            case ItemGainType.GOLD:
                this.coinCurrent += coinGain;
                UIManager.Instance.getUI(UIGamePLay).updateCoin(this.coinCurrent);
                break;
            case ItemGainType.BOM:
                playerData.bomCount = parseInt(playerData.bomCount) + 1;
                sys.localStorage.setItem("Player", JSON.stringify(playerData));
                UIManager.Instance.getUI(UIGamePLay).updateCountBom(playerData.bomCount);
                break;
            case ItemGainType.DA:
                playerData.daCount = parseInt(playerData.daCount) + 1;
                sys.localStorage.setItem("Player", JSON.stringify(playerData));
                break;
            case ItemGainType.DIAMOND:
                playerData.diamondCount = parseInt(playerData.diamondCount) + 1;
                sys.localStorage.setItem("Player", JSON.stringify(playerData));
                break;
            case ItemGainType.HEALTH:
                playerData.healthCount = parseInt(playerData.healthCount) + 1;
                sys.localStorage.setItem("Player", JSON.stringify(playerData));
                break;
            default:
                break;
        }
    }

    setCurrentState(state: GameState) {
        switch (state) {
            case GameState.GS_INIT:
                this.init();
                break;
            case GameState.GS_PLAYING:
                this.playing();
                break;
            case GameState.GS_END:
                this.end();
                break;
        }
        this.stateGame = state;
    }


    showLoadingToast() {
        // Tạo và hiển thị node "toast"
        if (this.toastPrefab) {
            this.toastNode = instantiate(this.toastPrefab);
            // Thêm toastNode vào một parent node nào đó (ví dụ, một Canvas)
            this.toastNode.parent = this.node; // Gán parent là node của Component hiện tại
        }
    }

    hideLoadingToast() {
        // Ẩn hoặc xóa node "toast"
        if (this.toastNode) {
            this.toastNode.destroy();
            this.toastNode = null;
        }
    }

    pauseTime(active: boolean) {
        if (active) {
            this.unschedule(this.updateCoundown);

        }
        else {
            this.schedule(this.updateCoundown, 1)
        }
    }

    pauseGame(active: boolean) {
        this.player.pausePlayer(active);
        this.pauseTime(active);
        AudioManager.Instance.pauseSFX(active);
        // this.pauseItemGain(active);
    }

    // pauseItemGain(active : boolean) {
    //     this.listSpriteItemGain.forEach(item => {
    //         if(item.node.active) {
    //             item.pauseItem(active);
    //         }
    //     })
    // }

    resetItemShopPerLevel() {
        playerData.daCount = 0;
        playerData.healthCount = 0;
        playerData.luckyCount = 0;
        playerData.diamondCount = 0;
        sys.localStorage.setItem("Player", JSON.stringify(playerData));
    }

}


