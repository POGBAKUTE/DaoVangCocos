import { _decorator, Button, Component, Label, Node } from 'cc';
import { UICanvas } from './UICanvas';
import { GameManager, GameState } from '../GameManager';
import { UIManager } from './UIManager';
import { UIShop } from './UIShop';
import { AudioManager } from '../Audio/AudioManager';
import { AudioNut } from '../Audio/AudioNut';
import { AudioWin } from '../Audio/AudioWin';
import { App } from '../App';
const { ccclass, property } = _decorator;

@ccclass('UIVictory')
export class UIVictory extends UICanvas {

    @property(Button)
    buttonNext: Button

    @property(Label)
    coin: Label

    @property(Label)
    target: Label

    protected start(): void {
        
        // this.buttonNext.node.on(Button.EventType.CLICK, this.NextButton, this);
        this.node.on("OffNode", this.NextButton, this);
    }

    public open() : void {
        super.open();
        this.updateState();
        AudioManager.Instance.openAudio(AudioWin);
    }

    NextButton() {
        this.close(0);
        UIManager.Instance.openUI(UIShop)
        AudioManager.Instance.openAudio(AudioNut);
    }

    updateState(): void {
        this.coin.string = App.formatMoney(GameManager.Instance.coinCurrent);
        this.target.string = App.formatMoney(GameManager.Instance.targetCurrent);
    }


}


