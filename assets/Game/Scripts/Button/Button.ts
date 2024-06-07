import { _decorator, Button as CCButton, Component, Node, tween } from "cc";
import { AudioManager } from "../Audio/AudioManager";
import { AudioNut } from "../Audio/AudioNut";

const { ccclass, property } = _decorator;

const DURATION = 0.1;

class Vec3 {}

@ccclass("Button")
export class Button extends Component {

   start() {
       this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
   }

//    onDisable() {
//        this.node.off(Node.EventType.TOUCH_START, this.touchStart, this);
//    }

   touchStart() {
       AudioManager.Instance.openAudio(AudioNut);
   }

   touchEnd() {
       
   }
}
