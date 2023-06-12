import { _decorator, Component, EventKeyboard, Input, input, tween, KeyCode, Node, Vec3, Animation, Collider2D } from 'cc';
import { GameModel } from './GameModel';
const { ccclass, property } = _decorator;

@ccclass('FrogieController')
export class FrogieController extends Component {
    private anim: Animation | null = null;
    speed: number = 80;

    protected start(): void {
        this.anim = this.node.getComponent(Animation);
    }
    
    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    
    protected onKeyDown(event: EventKeyboard): void {
        switch (event.keyCode){
            case KeyCode.ARROW_LEFT:
                const leftDirection = new Vec3(this.node.position.x-this.speed,this.node.position.y, 0);
                    tween(this.node)
                    .to(0, {scale: new Vec3(1, 1, 1)})
                    .to(0.48, {position: leftDirection})
                    .start();
                this.anim.play('LeftMove')
                break;
            case KeyCode.ARROW_RIGHT:
                this.anim.play('LeftMove')
                const rightDirection = new Vec3(this.node.position.x+this.speed,this.node.position.y, 0);
                    tween(this.node)
                    .to(0, {scale: new Vec3(-1, 1, 1)})
                    .to(0.48,{position: rightDirection})
                    .start();
                break;
            case KeyCode.ARROW_UP:
                this.anim.play('Move')
                const upDirection = new Vec3(this.node.position.x,this.node.position.y+this.speed, 0);
                tween(this.node)
                .to(0.48, { position: upDirection})
                .start();
                break;
            case KeyCode.ARROW_DOWN:
                this.anim.play('Move')
                const downDirection = new Vec3(this.node.position.x,this.node.position.y-this.speed, 0);
                tween(this.node)
                .to(0.48, { position: downDirection})
                .start();
                break;
        }
    }

    protected update(dt: number): void {
    }
}


