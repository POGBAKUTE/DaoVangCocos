import { _decorator, Button, Component, Node } from 'cc';
import { UICanvas } from './UICanvas';
import { GameManager, playerData } from '../GameManager';
import { SliderManager } from '../SliderManager';
import { AudioManager } from '../Audio/AudioManager';
import { AudioNut } from '../Audio/AudioNut';
import { UIManager } from './UIManager';
import { UIHome } from './UIHome';
import { UIGamePLay } from './UIGamePLay';
const { ccclass, property } = _decorator;

@ccclass('UISetting')
export class UISetting extends UICanvas {
    @property(Button)
    buttonHome: Button

    @property(Button)
    buttonBack: Button

    @property(SliderManager)
    slideVolume: SliderManager

    @property(SliderManager)
    slideSFX: SliderManager

    protected start(): void {
        // this.buttonHome.node.on(Button.EventType.CLICK, this.homeButton, this);
        // this.buttonBack.node.on(Button.EventType.CLICK, this.backButton, this);
        this.node.on("OffNode", this.onHandleButton, this);
    }

    open() {
        super.open();
        this.setup();
    }

    setup() {
        this.slideSFX.setSLider(parseFloat(playerData.audioSFX))
        this.slideVolume.setSLider(parseFloat(playerData.audioVolume))
    }

    homeButton() {
        this.close(0)
        // AudioManager.Instance.openAudio(AudioNut);
        UIManager.Instance.closeAllUI()
        UIManager.Instance.openUI(UIHome)
        GameManager.Instance.resetHome();
    }

    backButton() {
        this.close(0);
        GameManager.Instance.pauseGame(false);
        // AudioManager.Instance.openAudio(AudioNut);
    }

    onHandleButton(customEventData: string) {
        console.log("custom data: " + customEventData);
        switch (customEventData) {
            case "back":
                console.log("custom data: " + "back11111");
                this.backButton();
                break;
            case "home":
                console.log("custom data: " + "home11111");
                this.homeButton();
                break;
        }
    }
}


