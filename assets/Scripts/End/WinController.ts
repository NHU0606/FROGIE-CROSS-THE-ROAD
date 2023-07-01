import { _decorator, Button, Component, Label, Node, Sprite, tween, Vec3 } from 'cc';
import { CameraController } from '../Play/CameraController';
const { ccclass, property } = _decorator;

@ccclass('WinController')
export class WinController extends Component {
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
    private winText: Label;

    showWin() {
        this.node.active = true;
        const cameraController = this.cameraController.node.getPosition();
        this.node.setPosition(cameraController);
        const downDirection = new Vec3(0,cameraController.y-640, 0);
        // const downDirection = new Vec3(cameraController.x,cameraController.y-640, 0);

        tween(this.node)
        .to(0.5, {position: downDirection})
        .start();
    }
}


