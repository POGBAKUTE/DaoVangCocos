import { _decorator, Component, Node, EventTarget, sys, CCFloat, Prefab, instantiate, Vec3} from 'cc';
import { Player } from './Player';
import { MapController } from './MapController';
import { UIManager } from './UI/UIManager';
const { ccclass, property } = _decorator;
export const eventTarget = new EventTarget();

export enum GameState {
    GS_INIT,
    GS_PLAYING,
    GS_END
}

declare global {
    var score: any;
}


globalThis.score = 0;

@ccclass('GameManager')
export class GameManager extends Component {
    public static Instance: GameManager = null
    @property(Player)
    public player: Player | null = null

    
    @property(CCFloat)
    public timePerLevel: number = 60;

    private timeCurrent = 0;
    public currentMapIndex: number = 1;
    private stateGame: GameState;
    private coinCurrent: number;
    private mapCurrent: Node;
    
    @property({
        type: Prefab
    })
    public listMap: Prefab[] = []
    
    onEnable(): void {
        GameManager.Instance = this;
        if(sys.localStorage.getItem("Level") == null) {
            sys.localStorage.setItem("Level", "1")
        }
        if(sys.localStorage.getItem("CoinPlayer") == null) {
            sys.localStorage.setItem("CoinPlayer", "0")
        }
        this.currentMapIndex = parseInt(sys.localStorage.getItem("Level"));
        this.player.node.on("UpdateCoin", this.updateCoin, this)
    }

    onDisable(): void {
        
    }

    protected start(): void {
        this.setCurrentState(GameState.GS_INIT);
    }

    init() {
        // UIHome mo ra
        UIManager.Instance.uIHome.open();
    }

    playing() {
        // UIGamePlay mo ra
        this.activePreparePlay();
        UIManager.Instance.uIGamePLay.open();
    }

    end() {
        if(this.coinCurrent >= MapController.Instance.target) {
            sys.localStorage.setItem('Level', this.currentMapIndex + 1)
            sys.localStorage.setItem('CoinPlayer', this.coinCurrent)
            UIManager.Instance.uIVictory.open();
        }
        else {
            sys.localStorage.setItem('Level', 1)
            sys.localStorage.setItem('CoinPlayer', "0")
            UIManager.Instance.uIFail.open();
        }
        this.currentMapIndex = parseInt(sys.localStorage.getItem('Level'))
    }

    loadMap(): void {
        if(this.mapCurrent != null) {
            this.mapCurrent.destroy();
        }
        this.mapCurrent = instantiate(this.listMap[this.currentMapIndex - 1])
        console.log(this.listMap[this.currentMapIndex - 1])
        this.mapCurrent.setPosition(Vec3.ZERO)
        this.node.parent.addChild(this.mapCurrent);
        this.mapCurrent.setSiblingIndex(0)
    }

    activePreparePlay() {
        this.loadMap();
        this.player.onActive(false)
        this.coinCurrent = parseInt(sys.localStorage.getItem("CoinPlayer"))
    }

    activeStartPlay() {
        this.player.onActive(true);
        this.schedule(this.updateCoundown, 1)
        this.timeCurrent = this.timePerLevel;
    }


    updateCoundown() {
        if(this.timeCurrent > 0) {
            this.timeCurrent --;
            UIManager.Instance.uIGamePLay.updateTime(this.timeCurrent);

        }
        else {
            this.unschedule(this.updateCoundown);
            this.setCurrentState(GameState.GS_END)
        }
    }

    updateCoin(coinGain: number) {
        this.coinCurrent += coinGain;
        UIManager.Instance.uIGamePLay.updateCoin(this.coinCurrent);
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
}


