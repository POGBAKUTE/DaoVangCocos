import { _decorator, CCFloat, Component, EventMouse, input, Input, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { Line } from './Line';

@ccclass('Player')
export class Player extends Component {
    @property(Line)
    line: Line;

    @property(CCFloat)
    angleLimit: number;

    @property(CCFloat)
    speedRotation: number;



    private horizontal: number = 1;
    private isThrow: boolean = true;

    setThrow(coin: number): void {
        this.isThrow = false;
        this.node.emit("UpdateCoin", coin);
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }

    onMouseDown(event: EventMouse) {
        this.isThrow = true;
        this.line.onDespawn(this.isThrow);
        input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }

    start() {

    }

    update(deltaTime: number) {
        if (!this.isThrow) {
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
            input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
            this.line.node.on('CollisionCircle', this.setThrow, this);
        }
        else {
            input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
            this.line.node.off('CollisionCircle', this.setThrow, this);
        }
        this.isThrow = !active;
    }
}


