import { _decorator, Component, misc, Node, Vec3, Animation, tween } from 'cc';
import { FrogieController } from './FrogieController';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
    @property({type: FrogieController})
    private frogieController: FrogieController;

    private anim: Animation | null = null;

    protected start(): void {
        this.anim = this.node.getComponent(Animation)
    }

    update(deltaTime: number) {
        let targerPos = this.frogieController.node.getPosition();
        targerPos.y = misc.clampf(targerPos.y, 0, 1100);
        targerPos.x = misc.clampf(targerPos.x, -500, 500);

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


