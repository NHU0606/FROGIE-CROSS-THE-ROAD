import { CameraController } from '../Play/CameraController';
import { _decorator, Component, Node, Sprite, Button, Label, Vec3, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FinishController')
export class FinishController extends Component {
    @property({type: CameraController})
    private cameraController: CameraController;

    @property({type: Sprite})
    private overLay: Sprite;

    @property({type: Sprite})
    private board: Sprite;

    @property({type: Button})
    private homeBtn: Button;

    @property({type: Button})
    private playAgain: Button;

    @property({type: Button})
    private playNext: Button;

    @property({type: Label})
    private overText: Label;

    showFinish() {
        this.node.active = true;
        const cameraController = this.cameraController.node.getPosition();
        this.node.setPosition(cameraController);
        const downDirection = new Vec3(cameraController.x,cameraController.y-640, 0);

        tween(this.node)
        .to(0.5, {position: downDirection})
        .start();
    }
}


