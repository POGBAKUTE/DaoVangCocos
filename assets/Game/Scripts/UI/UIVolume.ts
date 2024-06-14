import { _decorator, Button, Component, Node } from 'cc';
import { UICanvas } from './UICanvas';
import { GameManager, playerData } from '../GameManager';
import { SliderManager } from '../SliderManager';
import { AudioManager } from '../Audio/AudioManager';
import { AudioNut } from '../Audio/AudioNut';
import { ButtonCustom } from '../Button/ButtonCustom';
const { ccclass, property } = _decorator;

@ccclass('UIVolume')
export class UIVolume extends UICanvas {

    @property(ButtonCustom)
    buttonBack: ButtonCustom

    @property(SliderManager)
    slideVolume: SliderManager

    @property(SliderManager)
    slideSFX: SliderManager

    protected start(): void {
        // this.buttonBack.node.on(Button.EventType.CLICK, this.backButton, this);
        this.node.on("OffNode", this.backButton, this);
    }

    onInitButton() {
        this.buttonBack.isTouch = true;
    }

    open() {
        super.open();
        this.setup();
        this.onInitButton()
    }

    setup() {
        this.slideSFX.setSLider(parseFloat(playerData.audioSFX))
        this.slideVolume.setSLider(parseFloat(playerData.audioVolume))
    }

    backButton() {
        this.close(0);
        // AudioManager.Instance.openAudio(AudioNut);
    }


}


