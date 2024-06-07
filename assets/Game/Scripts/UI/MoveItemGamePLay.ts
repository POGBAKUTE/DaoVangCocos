import { _decorator, Component, Node, Sprite, Vec3 } from 'cc';
import { MoveLabel } from '../Popup/MoveLabel';
import { BubleItem } from '../Popup/BubleItem';
const { ccclass, property } = _decorator;

@ccclass('MoveItemGamePLay')
export class MoveItemGamePLay extends Component {
    @property(MoveLabel) public spriteTargetStart: MoveLabel;
    @property(MoveLabel) public spriteCoinStart: MoveLabel;
    @property(MoveLabel) public spriteTimeCurrent: MoveLabel;
    @property(MoveLabel) public spriteLevelCurrent: MoveLabel;
    @property(BubleItem) public spriteBom: BubleItem;
    @property(BubleItem) public spritePause: BubleItem;

    onAnimPlay() {
        this.moveLabelTargetStart(new Vec3(300, 0, 0));
        this.moveLabelCoinStart(new Vec3(300, 0, 0));
        this.moveTimeCurrent(new Vec3(0, -300, 0));
        this.moveLevelCurrent(new Vec3(0, -300, 0));
        this.moveBom();
        this.movePause();
    }

    moveLabelTargetStart(direction: Vec3) {
        this.spriteTargetStart.move(direction);

    }

    moveLabelCoinStart(direction: Vec3) {
        this.spriteCoinStart.move(direction);

    }

    moveTimeCurrent(direction: Vec3) {
        this.spriteTimeCurrent.move(direction);
    }

    moveLevelCurrent(direction: Vec3) {
        this.spriteLevelCurrent.move(direction)
    }

    moveBom() {
        this.spriteBom.move();
    }

    movePause() {
        this.spritePause.move();
    }

    onInit() {
        this.spriteTargetStart.onActive(false);
        this.spriteCoinStart.onActive(false);
        this.spriteTimeCurrent.onActive(false);
        this.spriteLevelCurrent.onActive(false);
        this.spriteBom.onActive(false);
        this.spritePause.onActive(false);
    }
}


