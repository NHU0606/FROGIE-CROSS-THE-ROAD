import { _decorator, Component, Label, Node, Sprite, Button, tween, Vec3 } from 'cc';
import { CameraController } from '../Play/CameraController';
const { ccclass, property } = _decorator;

@ccclass('GameOverController')
export class GameOverController extends Component {
    @property({type: CameraController})
    private cameraController: CameraController;

    @property({type: Sprite})
    private overLay: Sprite;

    @property({type: Sprite})
    private board: Sprite;

    @property({type: Button})
    private homeBtn: Button;

    @property({type: Button})
    private playBtn: Button;

    @property({type: Label})
    private overText: Label;

    showGameOver() {
        this.node.active = true;
        const cameraController = this.cameraController.node.getPosition();
        this.node.setPosition(cameraController);
        const downDirection = new Vec3(cameraController.x,cameraController.y-640, 0);

        tween(this.node)
        .to(0.5, {position: downDirection})
        .start();
    }
}

