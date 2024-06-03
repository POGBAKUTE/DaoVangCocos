import { _decorator, AudioSource, CCFloat, Component, Enum, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum AudioState {
    PLAYING = 0,
    PAUSE = 1,
    STOP = 2
}


export enum AudioType {
    BACKGROUND = 0,
    SFX = 1,
}

@ccclass('AudioBase')
export class AudioBase extends Component {
    
    @property(AudioSource)
    audioSource: AudioSource;
    
    @property(CCFloat)
    volumeBase: number;

    @property({type: Enum(AudioType)})
    typeAudio: AudioType;

    public stateAudio: AudioState = AudioState.STOP;
    public open() {
        // this.node.active = true;
        this.stateAudio = AudioState.PLAYING;
        this.audioSource.play();

    }

    public setup() {

    }

    public close(time: number) {
        this.scheduleOnce(this.closeDirectionly, time);
    }

    public closeDirectionly() {
        // this.node.active = false;
        this.audioSource.stop();
        this.stateAudio = AudioState.STOP;
    }
}


