import { _decorator, Button, Component, Label, Node } from 'cc';
import { UICanvas } from './UICanvas';
import { GameManager, GameState } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIVictory')
export class UIVictory extends UICanvas {
    @property(Button)
    buttonShop: Button

    @property(Button)
    buttonNext: Button

    @property(Label)
    notify: Label

    protected start(): void {
        
        this.buttonNext.node.on(Button.EventType.CLICK, this.NextButton, this);
    }

    public open() : void {
        console.log("jdjdfsfds")
        super.open();
        this.updateNotify();
    }

    NextButton() {
        this.close(0);
        GameManager.Instance.setCurrentState(GameState.GS_PLAYING);
    }

    updateNotify(): void {
        console.log("jdjdfsfds")
        this.notify.string = "Bạn đã vượt qua Level " + GameManager.Instance.currentMapIndex;
    }


}


