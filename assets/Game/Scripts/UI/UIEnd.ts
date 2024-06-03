import { _decorator, Button, Component, Node } from 'cc';
import { UICanvas } from './UICanvas';
import { UIManager } from './UIManager';
import { UIHome } from './UIHome';
import { AudioManager } from '../Audio/AudioManager';
import { AudioNut } from '../Audio/AudioNut';
const { ccclass, property } = _decorator;

@ccclass('UIEnd')
export class UIEnd extends UICanvas {
    @property(Button)
    buttonHome: Button

    protected start(): void {
        this.buttonHome.node.on(Button.EventType.CLICK, this.HomeButton, this);
    }

    HomeButton() {
        this.close(0);
        UIManager.Instance.openUI(UIHome);
        AudioManager.Instance.openAudio(AudioNut)
    }

    open() {
        super.open();
    }
}


