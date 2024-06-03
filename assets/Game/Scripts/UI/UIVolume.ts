import { _decorator, Button, Component, Node } from 'cc';
import { UICanvas } from './UICanvas';
import { GameManager, playerData } from '../GameManager';
import { SliderManager } from '../SliderManager';
import { AudioManager } from '../Audio/AudioManager';
import { AudioNut } from '../Audio/AudioNut';
const { ccclass, property } = _decorator;

@ccclass('UIVolume')
export class UIVolume extends UICanvas {

    @property(Button)
    buttonBack: Button

    @property(SliderManager)
    slideVolume: SliderManager

    @property(SliderManager)
    slideSFX: SliderManager

    protected start(): void {
        this.buttonBack.node.on(Button.EventType.CLICK, this.backButton, this);
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
        
    }

    backButton() {
        this.close(0);
        AudioManager.Instance.openAudio(AudioNut);
    }


}


