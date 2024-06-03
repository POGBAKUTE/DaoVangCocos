import { _decorator, Button, Component, director, game, Label, Node, Sprite, sys } from 'cc';
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

    protected start(): void {
        this.buttonPlay.node.on(Button.EventType.CLICK, this.playButton, this);
        this.buttonPause.node.on(Button.EventType.CLICK, this.pauseButton, this);
        this.buttonBom.node.on(Button.EventType.CLICK, this.bomButton, this);
    }

    playButton() {
        this.preparePlay.active = false;
        GameManager.Instance.activeStartPlay();
        AudioManager.Instance.openAudio(AudioNut);
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
    }

    public setup(): void {
        this.preparePlay.active = true;
        this.startPlay.active = true;
        this.updateTarget(GameManager.Instance.targetCurrent);
        this.updateCoin(parseInt(playerData.CoinPlayer))
        this.updateTime(GameManager.Instance.timePerLevel);
        this.updateLevel(GameManager.Instance.currentMapIndex);
        this.updateCountBom(parseInt(playerData.bomCount));
        this.updateStateSprite();
    }

    public updateCoin(coin: number): void {
        this.labelCoinStart.string = App.formatMoney(coin);
        this.labelCoinPrepare.string = App.formatMoney(coin);
    }

    public updateTarget(target: number): void {
        this.labelTargetStart.string = App.formatMoney(target);
        this.labelTargetPrepare.string = App.formatMoney(target);
    }

    public updateTime(time: number): void {
        this.timeCurrent.string = time.toString();
    }

    public updateLevel(levelIndex: number): void {
        this.levelCurrent.string = levelIndex.toString();
    }

    public updateCountBom(count: number): void {
        this.countBom.string = "x " + count;
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
}


