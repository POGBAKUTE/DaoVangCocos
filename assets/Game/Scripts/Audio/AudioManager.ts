import { _decorator, Component, instantiate, Node, Prefab, resources, sys } from 'cc';

import { GameManager, playerData } from '../GameManager';
import { AudioBase, AudioState, AudioType } from './AudioBase';
import { AudioMain } from './AudioMain';
import { AudioReceiveItem } from './AudioReceiveItem';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    public static Instance: AudioManager = null

    private canvasActives: Map<Function, Node> = new Map();
    private canvasPrefabs: Map<Function, Prefab> = new Map();

    start() {
        AudioManager.Instance = this;
        this.loadAudio();
    }

    loadAudio() {
        const loadPromise = new Promise<void>((resolve, reject) => {
            resources.loadDir('Audio/', Prefab, (err, prefabs) => {
                if (err) {
                    console.error('Failed to load Audio prefabs', err);
                    reject(err);
                } else {
                    prefabs.forEach(prefab => {
                        const comp = prefab.data.getComponent(AudioBase);
                        if (comp) {
                            this.canvasPrefabs.set(comp.constructor, prefab);
                        }
                    });
                    resolve();
                }
            });
        });
    
        loadPromise.then(() => {
            this.openAudio(AudioMain);
        }).catch(error => {
            console.error('Failed to load Audio prefabs', error);
        });
    }

    openAudio<T extends AudioBase>(AudioClass: new () => T): T {
        const canvas = this.getAudio(AudioClass);
        canvas.open();

        return canvas as T;
    }

    closeAudio<T extends AudioBase>(AudioClass: new () => T, time: number) {
        if (this.isOpenedAudio(AudioClass)) {
            const canvas = this.canvasActives.get(AudioClass);
            if (canvas) {
                canvas.getComponent(AudioBase).close(time);
            }
        }
    }

    closeDirectlyAudio<T extends AudioBase>(AudioClass: new () => T) {
        if (this.isOpenedAudio(AudioClass)) {
            const canvas = this.canvasActives.get(AudioClass);
            if (canvas) {
                canvas.getComponent(AudioBase).closeDirectionly();
            }
        }
    }

    getAudio<T extends AudioBase>(AudioClass: new () => T): T {
        if (!this.isLoadedAudio(AudioClass)) {
            const prefab = this.getAudioPrefab(AudioClass);
            if (prefab) {
                const canvasNode = instantiate(prefab);
                if (canvasNode) { // Kiểm tra xem canvasNode đã được tạo ra thành công chưa
                    canvasNode.parent = this.node;
                    const AudioComponent = canvasNode.getComponent(AudioBase);
                    if (AudioComponent) { // Kiểm tra xem có thành phần AudioBase hay không
                        this.canvasActives.set(AudioClass, canvasNode);
                        return AudioComponent as T;
                    } else {
                        console.error('Failed to get Audio component for', AudioClass.name);
                        return null;
                    }
                } else {
                    console.error('Failed to instantiate Audio for', AudioClass.name);
                    return null;
                }
            }
        }
        return this.canvasActives.get(AudioClass).getComponent(AudioBase) as T;
    }

    isLoadedAudio<T extends AudioBase>(AudioClass: new () => T): boolean {
        return this.canvasActives.has(AudioClass) && this.canvasActives.get(AudioClass) !== null;
    }

    isOpenedAudio<T extends AudioBase>(AudioClass: new () => T): boolean {
        return this.isLoadedAudio(AudioClass) && this.canvasActives.get(AudioClass).active;
    }

    getAudioPrefab<T extends AudioBase>(AudioClass: new () => T): Prefab {
        return this.canvasPrefabs.get(AudioClass);
    }

    closeAllAudio() {
        this.canvasActives.forEach((canvasNode) => {
            if (canvasNode && canvasNode.active) {
                canvasNode.getComponent(AudioBase).close(0);
            }
        });
    }

    changeVolume(ratio: number) {
        this.canvasActives.forEach((canvasNode) => {
            if (canvasNode && canvasNode.active) {
                let audioTpm: AudioBase = canvasNode.getComponent(AudioBase)
                if(audioTpm.typeAudio === AudioType.BACKGROUND) {
                    audioTpm.audioSource.volume = ratio * audioTpm.volumeBase;
                }
            }
        });
        playerData.audioVolume = ratio;
        sys.localStorage.setItem("Player", JSON.stringify(playerData))
    }

    changeSFX(ratio: number) {
        this.canvasActives.forEach((canvasNode) => {
            if (canvasNode && canvasNode.active) {
                let audioTpm: AudioBase = canvasNode.getComponent(AudioBase)
                if(audioTpm.typeAudio === AudioType.SFX) {
                    audioTpm.audioSource.volume = ratio * audioTpm.volumeBase;
                }
            }
        });
        playerData.audioSFX = ratio;
        sys.localStorage.setItem("Player", JSON.stringify(playerData))
    }

    pauseSFX(active: boolean) {
        this.canvasActives.forEach((canvasNode) => {
            if (canvasNode && canvasNode.active) {
                let audioTpm: AudioBase = canvasNode.getComponent(AudioBase)
                if(audioTpm.typeAudio === AudioType.SFX) {
                    if(active) {
                        if(audioTpm.stateAudio === AudioState.PLAYING) {
                            audioTpm.audioSource.pause();
                            audioTpm.stateAudio = AudioState.PAUSE;
                        }
                    }
                    else if(audioTpm.stateAudio === AudioState.PAUSE) {
                        audioTpm.open();
                    }
                }
            }
        });
    }
}


