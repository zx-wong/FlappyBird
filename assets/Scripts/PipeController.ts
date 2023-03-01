import { _decorator, Component, Prefab, instantiate, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipeController')
export class PipeController extends Component {

    @property(Prefab)
    pipePrefab: Prefab = null;

    pipe: Node[] = [null, null, null];

    public allowSpawn: boolean = false;
    public spawned: boolean = false;

    start () {
        this.onPipeSpawn();
    }

    update(deltaTime: number) {
        if (!this.allowSpawn){
            return;
        }

        if (!this.spawned){
            this.onPipeSpawn();
        }

        for (let i = 0; i < this.pipe.length; i++) {
            this.pipe[i].setPosition(this.pipe[i].position.x - 1, this.pipe[i].position.y, 0);

            if (this.pipe[i].position.x <= -400) {
                this.pipe[i].setPosition(200, this.pipe[i].position.y, 0);

                var minY = -60;
                var maxY = 120;
                this.pipe[i].setPosition(this.pipe[i].position.x, (minY + Math.random() * (maxY - minY)), 0);
            }
        }
    }

    onPipeSpawn() {
        for (let i = 0; i < this.pipe.length; i++){
            this.pipe[i] = instantiate(this.pipePrefab);
            this.node.addChild(this.pipe[i]);

            this.pipe[i].setPosition((170 + 200 * i), this.pipe[i].position.y, 0);
            var minY = -60;
            var maxY = 120;
            this.pipe[i].setPosition(this.pipe[i].position.x, (minY + Math.random() * (maxY - minY)), 0);
        }

        this.spawned = true;
    }
}
