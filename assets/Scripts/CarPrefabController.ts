import { _decorator, Component, Node, math, Vec3, Collider2D, SpriteFrame, random, Sprite } from 'cc';
const { ccclass, property } = _decorator;

enum CarsDirection {
    Left, Right
}

@ccclass('CarPrefabController')
export class CarPrefabController extends Component {
    private carsSpeed: number = 200;
    private curDirection: CarsDirection = CarsDirection.Left;
    private directionChangeDelay: number = 20;
    private directionChangeTime: number = 0;

    protected start(): void {
        const carCollider = this.node.getComponent(Collider2D);
        if (carCollider) {
            carCollider.node.position = new Vec3(-1150,math.randomRangeInt(450, 550),0);
            carCollider.apply();
        }
    }
    public Init(parent: Node): void {
        parent.addChild(this.node);
    }
    
    protected moveCars(dt: number): void {
        const movement = new Vec3(0, 0, 0);
        if(this.curDirection == CarsDirection.Left) {
            movement.x -= this.carsSpeed*dt;
            this.node.angle = 180;
            this.node.scale = new Vec3(Math.abs(this.node.scale.x), -Math.abs(this.node.scale.y), 1);
        } else if(this.curDirection == CarsDirection.Right) {
            movement.x += this.carsSpeed*dt;
            this.node.angle = 0;
            this.node.scale = new Vec3(Math.abs(this.node.scale.x), Math.abs(this.node.scale.y), 1);
        }
        this.node.position = this.node.position.add(movement);
        this.node.getComponent(Collider2D).apply();
    }

    protected updateDirection(dt: number): void {
        this.directionChangeTime -= dt;
        if(this.directionChangeTime <= 0) {
            this.setDirection();
            this.directionChangeTime = this.directionChangeDelay;
        }
    }

    protected setDirection(): void {
        const directionCount = Object.keys(CarsDirection).length/2;
        const nextDirection = (this.curDirection + 1) % directionCount;
        this.curDirection = nextDirection;
    }

    protected update(dt: number): void {
        this.moveCars(dt);
        this.updateDirection(dt);
    }
}


