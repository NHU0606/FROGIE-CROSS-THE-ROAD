import { Data, GameConfig } from "../DataType";
import { _decorator, Collider2D, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

enum PigDirection {
    Left, Right
}

@ccclass('PigPrefab')
export class PigPrefab extends Component {
    private pigSpeed: number = 400;
    private curDirection: PigDirection = PigDirection.Left;
    private directionChangeDelay: number = 15;
    private directionChangeTime: number = 0;
    private laneY: number = 0;

    start() {
        const data = Data[GameConfig.level];

        this.laneY = Math.random() < 0.5 ? data.posPig.laneYBot : data.posPig.laneYTop;
    
        const pigCollider = this.node.getComponent(Collider2D);
        if (pigCollider) {
            pigCollider.node.position = new Vec3(data.posPig.laneXLeft, this.laneY, 0);
            pigCollider.apply();
        }
    }

    public Initt(parent: Node): void {
        parent.addChild(this.node);
    }

    protected movePig(dt: number): void {
        const movement = new Vec3(0, 0, 0);
        const data = Data[GameConfig.level];
    
        this.curDirection =
          this.laneY === data.posPig.laneYBot ? PigDirection.Right : PigDirection.Left;
    
        if (this.curDirection == PigDirection.Left) {
          movement.x -= this.pigSpeed * dt;
          this.node.angle = 180;
          this.node.scale = new Vec3(
            Math.abs(this.node.scale.x),
            -Math.abs(this.node.scale.y),
            1
          );
        } else if (this.curDirection == PigDirection.Right) {
          movement.x += this.pigSpeed * dt;
          this.node.angle = 0;
          this.node.scale = new Vec3(
            Math.abs(this.node.scale.x),
            Math.abs(this.node.scale.y),
            1
          );
        }
        this.node.position = this.node.position.add(movement);
        this.node.getComponent(Collider2D).apply();
    }

    protected updateDirection(dt: number): void {
        this.directionChangeTime -= dt;
        if (this.directionChangeTime <= 0) {
          this.setDirection();
          this.directionChangeTime = this.directionChangeDelay;
        }
      }
    
    protected setDirection(): void {
        const data = Data[GameConfig.level];
    
        this.laneY = this.laneY === data.posPig.laneYBot ? data.posPig.laneYTop : data.posPig.laneYBot;
    
        let pos =
          this.laneY === data.posPig.laneYBot
            ? new Vec3(data.posPig.laneXLeft, this.laneY, 0)
            : new Vec3(data.posPig.laneXRight, this.laneY, 0);
    
        this.node.setPosition(pos);
    }

    protected update(dt: number): void {
        this.movePig(dt);
        this.updateDirection(dt);
      }
}


