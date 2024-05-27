import { _decorator, Button, Component, Label, Node } from 'cc';
import { UICanvas } from './UICanvas';
import { GameManager } from '../GameManager';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('UIFail')
export class UIFail extends UICanvas {
    @property(Button)
    buttonHome: Button

    @property(Label)
    notify: Label

    protected start(): void {
        this.buttonHome.node.on(Button.EventType.CLICK, this.HomeButton, this);
    }

    HomeButton() {
        this.close(0);
        UIManager.Instance.uIHome.open();
    }

    open() {
        super.open();
        this.setup();
    }

    public setup(): void {
        this.notify.string = "Bạn không thể vượt qua Level " + GameManager.Instance.currentMapIndex;
    }
}


