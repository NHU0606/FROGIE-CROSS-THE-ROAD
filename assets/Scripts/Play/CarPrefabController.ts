import {
  _decorator,
  Component,
  Node,
  Vec3,
  Collider2D,
} from "cc";
import { Data, GameConfig } from "../DataType";
const { ccclass, property } = _decorator;

enum CarsDirection {
  Left,
  Right,
}

@ccclass("CarPrefabController")
export class CarPrefabController extends Component {
  private carsSpeed: number = 250;
  private curDirection: CarsDirection = CarsDirection.Left;
  private directionChangeDelay: number = 10;
  private directionChangeTime: number = 0;
  private laneY: number = 0;

  protected start(): void {
    const data = Data[GameConfig.level];

    this.laneY = Math.random() < 0.5 ? data.posCar.laneYBot : data.posCar.laneYTop;

    const carCollider = this.node.getComponent(Collider2D);
    if (carCollider) {
      carCollider.node.position = new Vec3(data.posCar.laneXLeft, this.laneY, 0);
      carCollider.apply();
    }
  }

  public Init(parent: Node): void {
    parent.addChild(this.node);
  }

  protected moveCars(dt: number): void {
    const movement = new Vec3(0, 0, 0);
    const data = Data[GameConfig.level];

    this.curDirection =  this.laneY === data.posCar.laneYBot ? CarsDirection.Right : CarsDirection.Left;

    if (this.curDirection == CarsDirection.Left) {
      movement.x -= this.carsSpeed * dt;
      this.node.angle = 180;
      this.node.scale = new Vec3(
        Math.abs(this.node.scale.x),
        -Math.abs(this.node.scale.y),
        1
      );
    } else if (this.curDirection == CarsDirection.Right) {
      movement.x += this.carsSpeed * dt;
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

    this.laneY = this.laneY === data.posCar.laneYBot ? data.posCar.laneYTop : data.posCar.laneYBot;

    let pos = this.laneY === data.posCar.laneYBot
        ? new Vec3(data.posCar.laneXLeft, this.laneY, 0)
        : new Vec3(data.posCar.laneXRight, this.laneY, 0);

    this.node.setPosition(pos);
  }

  protected update(dt: number): void {
    this.moveCars(dt);
    this.updateDirection(dt);
  }
}
