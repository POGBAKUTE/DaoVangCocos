import { _decorator, Button, Component, Label, Node } from 'cc';
import { UICanvas } from './UICanvas';
import { GameManager } from '../GameManager';
import { UIManager } from './UIManager';
import { UIHome } from './UIHome';
import { UIGamePLay } from './UIGamePLay';
import { AudioManager } from '../Audio/AudioManager';
import { AudioNut } from '../Audio/AudioNut';
import { AudioThua } from '../Audio/AudioThua';
import { App } from '../App';
const { ccclass, property } = _decorator;

@ccclass('UIFail')
export class UIFail extends UICanvas {
    @property(Button)
    buttonHome: Button

    @property(Label)
    coin: Label

    @property(Label)
    target: Label

    protected start(): void {
        this.buttonHome.node.on(Button.EventType.CLICK, this.HomeButton, this);
    }

    HomeButton() {
        this.close(0);
        UIManager.Instance.openUI(UIHome);
        UIManager.Instance.closeUI(UIGamePLay, 0);
        AudioManager.Instance.openAudio(AudioNut)
    }

    public open() : void {
        super.open();
        AudioManager.Instance.openAudio(AudioThua)
        this.updateState();
    }

    updateState(): void {
        this.coin.string = App.formatMoney(GameManager.Instance.coinCurrent);
        this.target.string = App.formatMoney(GameManager.Instance.targetCurrent);
    }
}


