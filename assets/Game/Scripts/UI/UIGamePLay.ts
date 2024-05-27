import { _decorator, Button, Component, Label, Node, sys } from 'cc';
import { UICanvas } from './UICanvas';
import { GameManager } from '../GameManager';
import { MapController } from '../MapController';
const { ccclass, property } = _decorator;

@ccclass('UIGamePlay')
export class UIGamePLay extends UICanvas {
    @property(Node) public preparePlay : Node;
    @property(Node) public startPlay : Node;
    @property(Button) public buttonPlay : Button;
    @property(Label) public labelTargetStart : Label;
    @property(Label) public labelTargetPrepare : Label;
    @property(Label) public labelCoinPrepare : Label;
    @property(Label) public labelCoinStart : Label;
    @property(Label) public timeCurrent : Label;

    protected start(): void {
        this.buttonPlay.node.on(Button.EventType.CLICK, this.playButton, this);
    }

    playButton() {
        this.preparePlay.active = false;
        GameManager.Instance.activeStartPlay();
    }

    public open(): void {
        super.open();
        this.preparePlay.active = true;
        this.startPlay.active = true;
        this.updateTarget(MapController.Instance.target);
        this.updateCoin(parseInt(sys.localStorage.getItem("CoinPlayer")))
        this.updateTime(GameManager.Instance.timePerLevel);
    }

    public updateCoin(coin: number): void {
        this.labelCoinStart.string = coin.toString();
        this.labelCoinPrepare.string = coin.toString();
    }

    public updateTarget(target: number): void {
        this.labelTargetStart.string = target.toString();
        this.labelTargetPrepare.string = target.toString();
    }

    public updateTime(time: number): void {
        this.timeCurrent.string = time.toString();
    }
}


