import { Data, GameConfig, step } from "../DataType";
import { _decorator, Component,EventKeyboard, Input,input,tween,KeyCode,Vec3, Animation, Vec2,CCFloat, v3,} from "cc";
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
  @property({type: CCFloat})

	private axis: Vec2 = new Vec2();
 
  protected start(): void {
    this.anim = this.node.getComponent(Animation);
  }

  public handleOnKeyDown(): void {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  protected onLoad(): void {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    this.node.setPosition(
      new Vec3(this.pos.x * this.speed, this.pos.y * this.speed, 0)
    );
  }

  protected update(dt: number): void {
		var offset = this.speed*dt;
		// this.node.setPosition(this.node.position.add(v3(this.axis.x*offset, this.axis.y*offset, 0.0)));
	}

  public OnMove(event: Event, customEventData: Vec2) {
    
    this.axis = customEventData;
    const { x, y } = this.pos;
    const data = Data[GameConfig.level];
    
    let newPosition: Vec3 = new Vec3(x * this.speed, y * this.speed, 0);

    if (this.axis.x !== 0) {
        const newX = x + Math.sign(this.axis.x);
        if (this.pos.x >= data.posWall.minX && this.pos.x <= data.posWall.maxX) {
            newPosition.x = newX * this.speed;
            this.pos.x = newX;
            this.anim.play("LeftMove");
        }
    } else if (this.axis.y !== 0) {
        const newY = y + Math.sign(this.axis.y);
        if (this.pos.y >= data.posWall.minY && this.pos.y <= data.posWall.maxY) {
            newPosition.y = newY * this.speed;
            this.pos.y = newY;
            this.anim.play("Move");
        }
    }
    tween(this.node)
        .to(0.48, { position: newPosition })
        .start();
    this.setCheck();
}

  public onKeyDown(event: EventKeyboard): void {
    const data = Data[GameConfig.level];
    const { x, y } = this.pos;
    const directionMap = {
      [KeyCode.ARROW_LEFT]: {
        animation: "LeftMove",
        check: this.check.left,
        condition: x > data.posWall.minX,
        newPosition: { x: x - 1, y },
        scale: new Vec3(1, 1, 1),
      },
      [KeyCode.ARROW_RIGHT]: {
        animation: "LeftMove",
        check: this.check.right,
        condition: x < data.posWall.maxX,
        newPosition: { x: x + 1, y },
        scale: new Vec3(-1, 1, 1),
      },
      [KeyCode.ARROW_UP]: {
        animation: "Move",
        check: this.check.up,
        condition: y < data.posWall.maxY,
        newPosition: { x, y: y + 1 },
        scale: new Vec3(1, 1, 1),
      },
      [KeyCode.ARROW_DOWN]: {
        animation: "Move",
        check: this.check.down,
        condition: y > data.posWall.minY,
        newPosition: { x, y: y - 1 },
        scale: new Vec3(1, 1, 1),
      },
    };

    const direction = directionMap[event.keyCode];

    if (direction && direction.check && direction.condition) {
      this.pos = direction.newPosition;
      const newPosition = new Vec3(
        this.pos.x * this.speed,
        this.pos.y * this.speed,
        0
      );
      this.anim.play(direction.animation);
      tween(this.node)
        .to(0, { scale: direction.scale })
        .to(0.48, { position: newPosition })
        .start();
      this.setCheck();
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
    console.log(this.pos)
    const { x, y } = this.pos;

    //-------------------CHECK TOUCH WATER OR NOT---------------------

    this.isDie =
      this.posWater.some((item) => item.x === x && item.y === y) &&
      !this.posWood.some((item) => item.x === x && item.y === y);

    //-------------------CHECK TOUCH FINISH LINE---------------------

    this.touchFinishLine = this.posFinishLine.some(
      (item) =>  item.x === x && item.y === y
    );

    //-------------------CHECK POS OBSTACLE---------------------

    const checkPositions = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ];

    checkPositions.forEach((pos, index) => {
      const direction = ["left", "right", "up", "down"][index];
      this.check[direction] = !this.posObstacle.some(
        (item) => item.x === pos.x && item.y === pos.y
      );
    });
  }  
}
