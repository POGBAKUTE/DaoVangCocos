import { _decorator, Button, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemActiveIAP')
export class ItemActiveIAP extends Component {
    @property(Sprite)
    background: Sprite

    @property(Sprite)
    label: Sprite

    onActive(active: boolean) {
        this.background.grayscale = !active;
        this.label.grayscale = !active;
        this.getComponent(Button).interactable = active;
    }
}


