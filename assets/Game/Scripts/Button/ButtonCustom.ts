import { _decorator, Button, Button as CCButton, CCString, Component, Node, tween } from "cc";
import { AudioManager } from "../Audio/AudioManager";
import { AudioNut } from "../Audio/AudioNut";
import { Popup_window } from "../Popup/Popup_window";

const { ccclass, property } = _decorator;

const DURATION = 0.1;

class Vec3 { }

@ccclass("ButtonCustom")
export class ButtonCustom extends Component {
    @property(Button) 
    button: Button;

    @property(Popup_window) 
    popup: Popup_window;

    @property({type: CCString}) 
    key: string;

    public isTouch: boolean = true;
    start() {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
    }

    //    onDisable() {
    //        this.node.off(Node.EventType.TOUCH_START, this.touchStart, this);
    //    }

    touchStart(event) {
        if (this.isTouch) {

            AudioManager.Instance.openAudio(AudioNut);
            this.popup.HidePopup(this.key)
            this.isTouch = false;
        }
    }

    touchEnd() {

    }
}
