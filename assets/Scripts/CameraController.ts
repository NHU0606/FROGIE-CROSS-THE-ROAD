import { _decorator, Component, misc, Node, Vec3, Animation, tween } from 'cc';
import { FrogieController } from './FrogieController';
import { Data, GameConfig } from './DataType';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
    @property({type: FrogieController})
    private frogieController: FrogieController;

    private anim: Animation | null = null;
  camera: any;
  camera: any;

    protected start(): void {
        this.anim = this.node.getComponent(Animation)
    }

    update(deltaTime: number) {
        const data = Data[GameConfig.level];
        let targerPos = this.frogieController.node.getPosition();
        targerPos.y = misc.clampf(targerPos.y, data.posCamera.minY, data.posCamera.maxY);
        targerPos.x = misc.clampf(targerPos.x, data.posCamera.minX, data.posCamera.maxX);

        let curPos = this.node.getPosition();
        curPos.lerp(targerPos, 0.2);
        this.node.setPosition(curPos);
    }

    shakingCamera() {
        const frogiePosition = this.frogieController.node.getPosition();
        this.node.setPosition(frogiePosition);

        const leftDirection = new Vec3(frogiePosition.x-50,frogiePosition.y, 0);
        const rightDirection = new Vec3(frogiePosition.x+50,frogiePosition.y, 0);

        tween(this.node)
        .to(0.05, {position: leftDirection})
        .to(0.05, {position: rightDirection})
        .to(0.05, {position: leftDirection})
        .to(0.05, {position: rightDirection})
        .start();
    }
}


