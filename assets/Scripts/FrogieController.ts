import { _decorator, Component, EventKeyboard, Input, input, tween, KeyCode, Node, Vec3, Animation, Collider2D, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FrogieController')
export class FrogieController extends Component {
    anim: Animation | null = null;
    speed: number = 80;
    private dt: number;

    protected start(): void {
        this.anim = this.node.getComponent(Animation);
        this.anim.play('Idle');
    }
    
    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        // input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected update(dt: number): void {

    }
    
    protected onKeyDown(event: EventKeyboard): void {
        // console.log(this.dt);
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

        // protected onKeyUp(event: EventKeyboard): void {
        //     switch (event.keyCode){
        //         case KeyCode.ARROW_LEFT:
        //             this.schedule(function () {
        //                 this.anim.play('LeftIdle')
        //             }, 0.48);
        //             break;
        //         case KeyCode.ARROW_RIGHT:
        //             this.anim.play('LeftIdle')
        //          break;
        //         case KeyCode.ARROW_UP:
        //             this.anim.play('Idle')
        //             break;
        //         case KeyCode.ARROW_DOWN:
        //             this.anim.play('Idle')
        //             break;
        //     }
        // }
        
    frogieCrash() {
        this.anim.play('Crash');
        this.schedule(function () {
            this.node.active = false;
        }, 0.25);
    }
}


