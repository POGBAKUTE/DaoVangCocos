import { _decorator, Component, Enum, Node, ProgressBar, Slider } from 'cc';
import { AudioManager } from './Audio/AudioManager';
const { ccclass, property } = _decorator;

export enum AudioType {
    Volume = 0,
    SFX = 1,
}

@ccclass('SliderManager')
export class SliderManager extends Component {
    @property(Slider)
    slider: Slider;

    @property(ProgressBar)
    progressBar: ProgressBar;

    @property({ type: Enum(AudioType) })
    stateAudio: AudioType = AudioType.Volume


    start() {
        this.slider.node.on('slide', this.onChangeSlider, this);
    }

    onChangeSlider() {
        this.progressBar.progress = this.slider.progress;
        switch (this.stateAudio) {
            case AudioType.Volume:
                AudioManager.Instance.changeVolume(this.progressBar.progress);
                break;
            case AudioType.SFX:
                AudioManager.Instance.changeSFX(this.progressBar.progress);
                break;
            default:
                break;
        }

    }

    setSLider(ratio: number) {
        this.slider.progress = ratio;
        this.onChangeSlider();
    }
}


