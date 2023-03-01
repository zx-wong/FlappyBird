import { __private, _decorator, Component, Input, input, EventTouch, BoxCollider2D, Contact2DType } from 'cc';
import { AudioController, AudioType } from './AudioController';
const { ccclass, property } = _decorator;

@ccclass('BirdController')
export class BirdController extends Component {

    @property (AudioController)
    audioController: AudioController = null;

    collider: BoxCollider2D;

    speed: number = 0;
    public score: number = 0;

    public lose: boolean = false;

    onLoad() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    start() {
        this.score = 0;
        this.lose = false;

        let collider = this.node.getComponent(BoxCollider2D);
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    update(deltaTime: number) {
        if (this.lose){
            return;
        } else {
            input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        }

        this.speed -= 0.05;
        this.node.setPosition(this.node.position.x, this.node.position.y + this.speed, 0);

        var angle = (this.speed / 2) * 30;
        if (angle >= 30) {
            angle = 30;
        }

        this.node.setRotationFromEuler(0, 0, angle);
    }

    onTouchStart(event: EventTouch) {
        this.speed = 2;
        this.node.setPosition(this.node.position.x, this.node.position.y + this.speed, 0);
        this.audioController.playSound(AudioType.flyAudio);
    }

    onBeginContact (self: BoxCollider2D, other: BoxCollider2D) {
        if (other.node.name != "score"){
            this.audioController.playSound(AudioType.hitAudio);
            this.lose = true;
            input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
            this.audioController.playSound(AudioType.deadAudio);
        } else {
            this.audioController.playSound(AudioType.scoreAudio);
            this.score += 1;
        }
    }
}
