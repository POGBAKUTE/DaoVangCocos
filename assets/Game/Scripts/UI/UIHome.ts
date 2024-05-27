import { _decorator, Button, Component, Node } from 'cc';
import { UICanvas } from './UICanvas';
import { UIManager } from './UIManager';
import { GameManager, GameState } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIHome')
export class UIHome extends UICanvas {
    @property(Button)
    buttonPlay : Button;


    protected start(): void {
        this.buttonPlay.node.on(Button.EventType.CLICK, this.playButton, this);
    }

    playButton() {
        this.close(0);
        GameManager.Instance.setCurrentState(GameState.GS_PLAYING);
    }
}


