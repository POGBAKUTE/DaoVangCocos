import { _decorator, Button, Component, director, game, Label, Node, Sprite, sys, Tween, CCFloat, Color, Vec3, tween } from 'cc';
import { UICanvas } from './UICanvas';
import { eventTarget, GameManager, playerData } from '../GameManager';
import { MapController } from '../MapController';
import { AudioManager } from '../Audio/AudioManager';
import { AudioMain } from '../Audio/AudioMain';
import { UIManager } from './UIManager';
import { UISetting } from './UISetting';
import { App } from '../App';
import { AudioNut } from '../Audio/AudioNut';
import { AudioBom } from '../Audio/AudioBom';
import { AudioClock } from '../Audio/AudioClock';
import { MoveLabel } from '../Popup/MoveLabel';
import { MoveItemGamePLay } from './MoveItemGamePLay';
import { UICountDownStart } from './UICountDownStart';
import { BubleItem } from '../Popup/BubleItem';
const { ccclass, property } = _decorator;

@ccclass('UIGamePlay')
export class UIGamePLay extends UICanvas {
    @property(Node) public preparePlay : Node;
    @property(Node) public startPlay : Node;
    @property(Button) public buttonPlay : Button;
    @property(Button) public buttonPause : Button;
    @property(Button) public buttonBom : Button;


    @property(Label) public labelTargetStart : Label;
    @property(Label) public labelTargetPrepare : Label;
    @property(Label) public labelCoinPrepare : Label;
    @property(Label) public labelCoinStart : Label;
    @property(Label) public timeCurrent : Label;
    @property(Label) public levelCurrent : Label;
    @property(Label) public countBom : Label;


    @property(Sprite) public spriteLucky : Sprite;
    @property(Sprite) public spriteDa : Sprite;
    @property(Sprite) public spriteHealth : Sprite;
    @property(Sprite) public spriteDiamond : Sprite;

    @property(MoveItemGamePLay)
    moveItemPlay: MoveItemGamePLay;

    @property(CCFloat) public changeTime : number;

    private currentCoinLabel: number = 0;
    private targetCoinLabel: number = 0;

    protected start(): void {
        // this.buttonPlay.node.on(Button.EventType.CLICK, this.playButton, this);
        this.buttonPause.node.on(Button.EventType.CLICK, this.pauseButton, this);
        this.buttonBom.node.on(Button.EventType.CLICK, this.bomButton, this);
        this.node.on("OffNode", this.playButton, this);
    }

    playButton() {
        this.preparePlay.active = false;
        this.startPlay.active = true;
        GameManager.Instance.mapCurrent.getComponent(MapController).onBubleItem();
        UIManager.Instance.openUI(UICountDownStart);
        setTimeout(() => {

            this.moveItemPlay.onAnimPlay()
        },1)
        // GameManager.Instance.activeStartPlay();
        // AudioManager.Instance.openAudio(AudioNut);
        // AudioManager.Instance.closeAudio(AudioMain, 0);
    }
    pauseButton() {
        GameManager.Instance.pauseGame(true);
        UIManager.Instance.openUI(UISetting)
        AudioManager.Instance.openAudio(AudioNut);
    }

    bomButton() {
        eventTarget.emit("OnBom");
        this.updateCountBom(parseInt(playerData.bomCount));
        // AudioManager.Instance.openAudio(AudioBom)
    }

    public open(): void {
        super.open();
        this.setup();
        this.moveItemPlay.onInit()
    }

    public setup(): void {
        this.preparePlay.active = true;
        this.startPlay.active = false;
        this.updateTarget(GameManager.Instance.targetCurrent);
        this.updateCoin(parseInt(playerData.CoinPlayer))
        this.updateTime(GameManager.Instance.timePerLevel);
        this.updateLevel(GameManager.Instance.currentMapIndex);
        this.updateCountBom(parseInt(playerData.bomCount));
        this.updateStateSprite();
    }

    public updateCoin(coin: number): void {
        // this.labelCoinStart.string = App.formatMoney(coin);
        this.labelCoinStart.node.getParent().getComponent(BubleItem).move();
        this.changeNumber(this.labelCoinStart, this.currentCoinLabel, coin, this.changeTime)
        this.labelCoinPrepare.string = App.formatMoney(coin);
        this.currentCoinLabel = coin;
        if(coin >= this.targetCoinLabel) {
            this.labelCoinStart.color = Color.GREEN; 
        }
        else {
            this.labelCoinStart.color = Color.WHITE; 
        }
    }

    public updateTarget(target: number): void {
        this.targetCoinLabel = target;
        this.labelTargetStart.string = App.formatMoney(target);
        this.labelTargetPrepare.string = App.formatMoney(target);
    }

    public updateTime(time: number): void {
        this.timeCurrent.string = time.toString();
        if(time < 10) {
            AudioManager.Instance.openAudio(AudioClock);
            this.timeCurrent.color = Color.RED;
        }
        else {
            this.timeCurrent.color = Color.WHITE;
        }
    }

    public updateLevel(levelIndex: number): void {
        this.levelCurrent.string = levelIndex.toString();
    }

    public updateCountBom(count: number): void {
        this.countBom.string = "x " + count;
        this.countBom.node.getParent().getComponent(BubleItem).move();
    }

    updateStateSprite() {
        this.setStateSprite(this.spriteLucky, parseInt(playerData.luckyCount));
        this.setStateSprite(this.spriteHealth, parseInt(playerData.healthCount));
        this.setStateSprite(this.spriteDa, parseInt(playerData.daCount));
        this.setStateSprite(this.spriteDiamond, parseInt(playerData.diamondCount));
    }


    setStateSprite(sprite: Sprite, count: number): void {
        if(count > 0) {
            sprite.grayscale = false;
        }
        else {
            sprite.grayscale = true;
        }
    }

    changeNumber(numberLabel: Label, a: number, b: number, totalTime: number): void {
        let currentNumber = a;
        let increment = a < b ? 1 : -1;
        let steps = Math.abs(b - a);
        let delayTime = totalTime / steps; // Thời gian chờ giữa mỗi lần thay đổi
        if(steps > 0 && steps <= 30) {
            increment *= 1;
        }
        else if(steps > 30 && steps <= 100) {
            increment *= 3;
        }
        else if(steps > 100 && steps <= 250) {
            increment *= 6;
        }
        else if(steps > 250 && steps <= 500) {
            increment *= 7;
        }
        else if(steps > 500 && steps <= 700) {
            increment *= 9;
        }
        else if(steps > 700 && steps <= 1000) {
            increment *= 11;
        }
        this.schedule(() => {
            numberLabel.string = App.formatMoney(currentNumber);
            currentNumber += increment;

            if (currentNumber > b + increment) {
                numberLabel.string = App.formatMoney(b);
                this.unscheduleAllCallbacks(); // Dừng lại khi đạt tới số b
            }
        }, delayTime);
    }

    
}


