import { _decorator, Component, Sprite, Button, Input, Label } from 'cc';
import { BirdController } from './BirdController';
import { PipeController } from './PipeController';
const { ccclass, property } = _decorator;

export enum GameState{
    GameReady,
    GamePlay,
    GameEnd
}

@ccclass('BackgroundController')
export class BackgroundController extends Component {

    birdController: BirdController = null;
    pipeController: PipeController = null;

    @property (Sprite)
    backgrounds: Sprite[] = [null, null];

    @property (Sprite)
    gameOverSprite: Sprite = null;

    @property (Sprite)
    startSprite: Sprite = null;

    @property (Button)
    startBtn: Button = null;

    @property (Label)
    scoreLabel: Label = null;

    gameState: GameState = GameState.GameReady;

    onLoad() {
        this.startBtn.node.active = true;
        this.startBtn.node.on(Input.EventType.TOUCH_END, this.onTouchStartBtn, this);

        this.gameOverSprite.node.active = false;
        this.scoreLabel.node.active = false;
    }

    start() {
        this.birdController = this.getComponentInChildren(BirdController);
        this.birdController.node.active = false;

        this.pipeController = this.getComponentInChildren(PipeController);
        this.pipeController.node.active = false;
    }

    update(deltaTime: number) {
        if (this.gameState != GameState.GamePlay){
            return;
        }

        if (this.birdController.lose){
            this.onGameOver();
            return;
        }

        this.scoreLabel.string = this.birdController.score.toString();

        for (let i = 0; i < this.backgrounds.length; i++){
            this.backgrounds[i].node.setPosition(this.backgrounds[i].node.position.x - 1, this.backgrounds[i].node.position.y, 0);

            if (this.backgrounds[i].node.position.x <= -288){
                this.backgrounds[i].node.setPosition(288, this.backgrounds[i].node.position.y, 0);
            }
        }
    }

    onTouchStartBtn() {
        this.startBtn.node.active = false;
        this.gameOverSprite.node.active = false;
        this.startSprite.node.active = false;
        this.scoreLabel.node.active = true;

        this.gameState = GameState.GamePlay;

        this.pipeController.node.active = true;
        this.pipeController.allowSpawn = true;

        this.birdController.node.active = true;
        this.birdController.node.setPosition(this.birdController.node.position.x, 0, 0);
        this.birdController.node.setRotationFromEuler(0, 0, 0);
        this.birdController.speed = 0;
        this.birdController.score = 0;
        this.birdController.lose = false;
    }

    onGameOver(){
        this.startBtn.node.active = true;
        this.gameOverSprite.node.active = true;

        this.pipeController.node.active = false;
        this.pipeController.allowSpawn = false;
        this.pipeController.spawned = false;
        this.pipeController.node.removeAllChildren();

        this.birdController.node.active = false;
        this.birdController.node.setPosition(this.birdController.node.position.x, 0, 0);
        this.birdController.node.setRotationFromEuler(0, 0, 0);

        this.gameState = GameState.GameEnd;
    }
}
