import { _decorator, Button, Component, Node } from 'cc';
import { UICanvas } from './UICanvas';
import { UIManager } from './UIManager';
import { GameManager, GameState } from '../GameManager';
import { UISetting } from './UISetting';
import { UIVolume } from './UIVolume';
import { AudioManager } from '../Audio/AudioManager';
import { AudioNut } from '../Audio/AudioNut';
import { playAnim } from '../playAnim';
const { ccclass, property } = _decorator;

@ccclass('UIHome')
export class UIHome extends UICanvas {
    @property(Button)
    buttonPlay : Button;

    @property(Button)
    buttonAudio : Button;


    protected start(): void {
        this.buttonPlay.node.on(Button.EventType.CLICK, this.playButton, this);
        this.buttonAudio.node.on(Button.EventType.CLICK, this.audioButton, this);
    }

    public open(): void {
        super.open();
        // this.buttonPlay.getComponent(playAnim).startScaleAnimation();
    }

    playButton() {
        this.close(0);
        GameManager.Instance.setCurrentState(GameState.GS_PLAYING);
        AudioManager.Instance.openAudio(AudioNut);
    }

    audioButton() {
        UIManager.Instance.openUI(UIVolume);
        AudioManager.Instance.openAudio(AudioNut);
    }
}


