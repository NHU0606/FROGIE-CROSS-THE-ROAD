import { Data, GameConfig, step } from "../DataType";
import {
  _decorator,
  Component,
  EventKeyboard,
  Input,
  input,
  tween,
  KeyCode,
  Node,
  Vec3,
  Animation,
  Collider2D,
  log,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("FrogieController")
export class FrogieController extends Component {
  private anim: Animation | null = null;
  private speed: number = step;
  private posObstacle: Array<{ x: number; y: number }>;

  private posFinishLine: Array<{ x: number; y: number }> = new Array();
  private posWater: Array<{ x: number; y: number }> = new Array();
  private posWood: Array<{ x: number; y: number }> = new Array();
  private isDie: boolean = false;
  private touchFinishLine: boolean = false;

  private check = {
    left: true,
    right: true,
    up: true,
    down: true,
  };

  private pos: { x: number; y: number } = { x: 0, y: -8 };

  protected start(): void {
    this.anim = this.node.getComponent(Animation);
    // this.anim.play("Idle");
  }

  protected onLoad(): void {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    this.node.setPosition(
      new Vec3(this.pos.x * this.speed, this.pos.y * this.speed, 0)
    );
  }

  protected onKeyDown(event: EventKeyboard): void {
    const data = Data[GameConfig.level];

    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        this.anim.play("LeftMove");
        if (!this.check.left || this.pos.x <= data.posWall.minX) break;
        this.pos = { x: this.pos.x - 1, y: this.pos.y };
        const leftDirection = new Vec3(
          this.pos.x * this.speed,
          this.pos.y * this.speed,
          0
        );
        tween(this.node)
          .to(0, { scale: new Vec3(1, 1, 1) })
          .to(0.48, { position: leftDirection })
          .start();
        this.setCheck();
        break;
      case KeyCode.ARROW_RIGHT:
        if (!this.check.right || this.pos.x >= data.posWall.maxX) break;
        this.pos = { x: this.pos.x + 1, y: this.pos.y };
        const rightDirection = new Vec3(
          this.pos.x * this.speed,
          this.pos.y * this.speed,
          0
        );
        this.anim.play("LeftMove");
        tween(this.node)
          .to(0, { scale: new Vec3(-1, 1, 1) })
          .to(0.48, { position: rightDirection })
          .start();
        this.setCheck();
        break;
      case KeyCode.ARROW_UP:
        if (!this.check.up || this.pos.y >= data.posWall.maxY) break;
        this.pos = { x: this.pos.x, y: this.pos.y + 1 };
        const upDirection = new Vec3(
          this.pos.x * this.speed,
          this.pos.y * this.speed,
          0
        );
        this.anim.play("Move");
        tween(this.node).to(0.48, { position: upDirection }).start();
        this.setCheck();
        break;
      case KeyCode.ARROW_DOWN:
        if (!this.check.down || this.pos.y <= data.posWall.minY) break;
        this.pos = { x: this.pos.x, y: this.pos.y - 1 };
        const downDirection = new Vec3(
          this.pos.x * this.speed,
          this.pos.y * this.speed,
          0
        );
        this.anim.play("Move");
        tween(this.node).to(0.48, { position: downDirection }).start();
        this.setCheck();
        break;
    }
  }

  frogieCrash() {
    this.anim.play("Crash");
    this.schedule(function () {
      this.node.active = false;
    }, 0.2);
  }

  frogieFallWater() {
    this.anim.play("FallWater");
  }

  public loadPos(_pos: Array<{ x: number; y: number }>): void {
    this.posObstacle = _pos;
  }

  public loadPosFinish(_pos: Array<{ x: number; y: number }>): void {
    this.posFinishLine = _pos;
  }

  public loadPosWater(_pos: Array<{ x: number; y: number }>): void {
    this.posWater = _pos;
  }

  public loadPosWood(_pos: Array<{ x: number; y: number }>): void {
    this.posWood = _pos;
  }

  public getIsDie(): boolean {
    return this.isDie;
  }

  public getFinishLine(): boolean {
    return this.touchFinishLine;
  }

  public setCheck(): void {
    //-------------------CHECK TOUCH WATER OR NOT---------------------

    if (
      this.posWater.find(
        (item) => JSON.stringify(item) === JSON.stringify(this.pos)
      ) &&
      !this.posWood.find(
        (item) => JSON.stringify(item) === JSON.stringify(this.pos)
      )
    ) {
      this.isDie = true;
    }

    //-------------------CHECK TOUCH FINISH LINE---------------------

    if (
      this.posFinishLine.find(
        (item) => JSON.stringify(item) === JSON.stringify(this.pos)
      )
    ) {
      this.touchFinishLine = true;
    }

    //-------------------CHECK POS OBSTACLE---------------------

    let temp = { x: this.pos.x - 1, y: this.pos.y };
    if (
      !this.posObstacle.find(
        (item) => JSON.stringify(item) === JSON.stringify(temp)
      )
    ) {
      this.check.left = true;
    } else this.check.left = false;

    temp = { x: this.pos.x + 1, y: this.pos.y };
    if (
      !this.posObstacle.find(
        (item) => JSON.stringify(item) === JSON.stringify(temp)
      )
    ) {
      this.check.right = true;
    } else this.check.right = false;

    temp = { x: this.pos.x, y: this.pos.y + 1 };
    if (
      !this.posObstacle.find(
        (item) => JSON.stringify(item) === JSON.stringify(temp)
      )
    ) {
      this.check.up = true;
    } else this.check.up = false;

    temp = { x: this.pos.x, y: this.pos.y - 1 };
    if (
      !this.posObstacle.find(
        (item) => JSON.stringify(item) === JSON.stringify(temp)
      )
    ) {
      this.check.down = true;
    } else this.check.down = false;
  }
}
