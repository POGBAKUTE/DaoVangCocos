import { _decorator, CCFloat, Component, EventMouse, EventTouch, input, Input, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { ItemGainType, Line } from './Line';
import { GameManager, GameState } from './GameManager';
import { AudioManager } from './Audio/AudioManager';
import { AudioPullDownItem } from './Audio/AudioPullDownItem';

@ccclass('Player')
export class Player extends Component {
    @property(Line)
    line: Line| null = null;

    @property(CCFloat)
    angleLimit: number| null = 80;

    @property(CCFloat)
    speedRotation: number| null = 500;



    private horizontal: number = 1;
    private isThrow: boolean = true;
    private isPause: boolean = false;

    setThrow(): void {
        this.isThrow = false;
        input.on(Input.EventType.TOUCH_START, this.onMouseDown, this);
    }

    onMouseDown(event: EventTouch) {
        this.isThrow = true;
        this.line.onDespawn(this.isThrow);
        input.off(Input.EventType.TOUCH_START, this.onMouseDown, this);
        AudioManager.Instance.openAudio(AudioPullDownItem);
    }


    update(deltaTime: number) {
        if (!this.isThrow && !this.isPause) {
            this.Rotate(deltaTime);

        }
    }

    Rotate(dt: number) {
        let angleDelta: number = this.speedRotation * dt * this.horizontal;
        this.node.angle += angleDelta;
        if (this.node.angle > this.angleLimit) {
            this.horizontal = -1;
        }
        else if (this.node.angle < -this.angleLimit) {
            this.horizontal = 1;
        }
    }

    public onActive(active: boolean) {
        if (active) {
            input.on(Input.EventType.TOUCH_START, this.onMouseDown, this);
            this.line.node.on('CollisionCircle', this.setThrow, this);
        }
        else {
            input.off(Input.EventType.TOUCH_START, this.onMouseDown, this);
            this.line.node.off('CollisionCircle', this.setThrow, this);
        }
        this.isThrow = !active;
    }

    public pausePlayer(active: boolean): void {
        this.isPause = active;
        this.line.pauseLine(active);
    }
    resetPlayer() {
        this.line.resetLine();
        this.node.angle = 0;
        this.isThrow = true;
    }
}


