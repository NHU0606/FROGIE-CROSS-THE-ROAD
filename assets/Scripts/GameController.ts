import { CarPrefabController } from "./CarPrefabController";
import { FrogieController } from "./FrogieController";
import { GameModel } from "./GameModel";
import { CameraController } from "./CameraController";
import { PauseController } from "./PauseController";
import { AudioController } from "./AudioController";
import { Data, step } from "./DataType";
import { GameConfig } from "./DataType";
import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  Vec3,
  instantiate,
  randomRangeInt,
  IPhysics2DContact,
  math,
  sys,
  UIOpacity,
  Button,
  AudioSource,
  director,
  Sprite,
  Animation,
  cclegacy,
  Color,
  Vec2,
  game,
  RigidBody2D,
  SpriteFrame,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameController")
export class GameController extends Component {
  @property({ type: GameModel })
  private gameModel: GameModel;

  @property({ type: AudioController })
  private audioController: AudioController;

  @property({ type: CameraController })
  private cameraController: CameraController;

  @property({ type: Button })
  private iconShow: Button = null;

  @property({ type: Button })
  private iconOff: Button = null;

  @property({ type: PauseController })
  private pause: PauseController;

  private variableVolume: number;
  private variableVolumeArray: number[] = [];
  private convertVolume: number;
  private FrogieCollider: Collider2D;

  private isOnWood: boolean = false;
  private isOnWater: boolean = false;

  private isDie: boolean = false;

  protected update(dt: number): void {
    if (
      !this.isDie &&
      this.gameModel.FrogieController.getComponent(FrogieController).getIsDie()
    ) {
      this.isDie = true;
      this.gameModel.FrogieController.frogieFallWater();
      this.scheduleOnce(function () {
        this.gameModel.Result.showResult();
      }, 1);
    }
  }
  protected onLoad(): void {
    director.resume();

    const audioSrc = this.node.getComponent(AudioSource);
    this.gameModel.AudioBackground = audioSrc;

    // LOAD DATA OF LEVEL 1
    const data = Data[GameConfig.level];

    // SETTING TREES
    this.gameModel.TreeNode.setPosition(new Vec3(0, 0, 0));

    const _posWater: Array<{ x: number; y: number }> = new Array();
    const _posWood: Array<{ x: number; y: number }> = new Array();

    data.posWater.map((location) => {
      for (let i = -6; i <= 6; i++)
        for (let j = -1; j <= 1; j++)
          _posWater.push({ x: location.x + i, y: location.y + j });
    });

    data.posWood.map((location) => {
      for (let i = -1; i <= 1; i++)
        _posWood.push({ x: location.x + i, y: location.y });
    });

    this.gameModel.FrogieController.getComponent(FrogieController).loadPosWater(
      _posWater
    );
    this.gameModel.FrogieController.getComponent(FrogieController).loadPosWood(
      _posWood
    );

    //Create ....
    const _posObstacle: Array<{ x: number; y: number }> = new Array();

    //Load position fence
    data.posFence.map((location) => {
      for (let i = -3; i <= 3; i++)
        _posObstacle.push({ x: location.x + i, y: location.y });
    });

    this.gameModel.FrogieController.getComponent(FrogieController).loadPos(
      [].concat(
        data.posTrees,
        data.posBush,
        _posObstacle,
        data.posWall,
        data.posFinishLine,
        data.posWater
      )
    );

    for (let i = 0; i < data.posTrees.length; i++) {
      let tree = instantiate(this.gameModel.TreeNode);
      let leaf = instantiate(this.gameModel.ItemLeaf);

      this.gameModel.ContainerObstacle.addChild(tree);
      this.gameModel.ContainerLeaf.addChild(leaf);
      tree.setPosition(
        new Vec3(data.posTrees[i].x * step, data.posTrees[i].y * step + step, 0)
      );

      leaf.setPosition(
        new Vec3(
          data.posTrees[i].x * step + 10,
          data.posTrees[i].y * step + 400,
          0
        )
      );
      tree.setScale(new Vec3(0.5, 0.5));
    }

    //SETTING WATER

    for (let i = 0; i < data.posWater.length; i++) {
      let water = instantiate(this.gameModel.Water);
      let topWater = instantiate(this.gameModel.ItemTopWater);

      this.gameModel.ContainerObstacle.addChild(water);
      this.gameModel.ContainerTopWater.addChild(topWater);
      water.setPosition(
        new Vec3(data.posWater[i].x * step, data.posWater[i].y * step, 0)
      );
      topWater.setPosition(
        new Vec3(
          data.posWater[i].x * step + 10,
          data.posWater[i].y * step + 80,
          0
        )
      );
    }

    //SETTING FINISH LINE
    for (let i = 0; i < data.posFinishLine.length; i += 5) {
      var finishLine = instantiate(this.gameModel.FinishLine);
      this.gameModel.ContainerObstacle.addChild(finishLine);
      finishLine.setPosition(
        new Vec3(
          data.posFinishLine[i].x * step,
          data.posFinishLine[i].y * step,
          0
        )
      );
    }

    //SETTING ROAD
    for (let i = 0; i < data.posRoad.length; i++) {
      var road = instantiate(this.gameModel.Road);
      this.gameModel.ContainerObstacle.addChild(road);
      road.setPosition(
        new Vec3(data.posRoad[i].x * step, data.posRoad[i].y * step, 0)
      );
    }

    //SETTING WOOD

    for (let i = 0; i < data.posWood.length; i++) {
      let wood = instantiate(this.gameModel.Wood);
      wood.name = `${i}_wood`;

      this.gameModel.ContainerObstacle.addChild(wood);
      wood.setPosition(
        new Vec3(data.posWood[i].x * step, data.posWood[i].y * step, 0)
      );
    }

    //SETTING FLOOR
    for (let i = 0; i < data.posFloor.length; i++) {
      var floor = instantiate(this.gameModel.Floor);
      this.gameModel.ContainerObstacle.addChild(floor);
      floor.setPosition(
        new Vec3(data.posFloor[i].x * step, data.posFloor[i].y * step, 0)
      );
    }

    // SETTING BUSH
    this.gameModel.BushNode.setPosition(new Vec3(0, 0, 0));

    for (let i = 0; i < data.posBush.length; i++) {
      let bush = instantiate(this.gameModel.BushNode);

      this.gameModel.ContainerObstacle.addChild(bush);
      bush.setPosition(
        new Vec3(data.posBush[i].x * step, data.posBush[i].y * step, 0)
      );
      bush.setScale(new Vec3(0.3, 0.2));
    }

    // SETTING FENCE
    this.gameModel.FenceNode.setPosition(new Vec3(0, 0, 0));

    for (let i = 0; i < data.posFence.length; i++) {
      let fence = instantiate(this.gameModel.FenceNode);

      this.gameModel.ContainerObstacle.addChild(fence);
      fence.setPosition(
        new Vec3(data.posFence[i].x * step, data.posFence[i].y * step, 0)
      );
      fence.setScale(new Vec3(1, 1));
    }
  }

  protected onClickIconPause(): void {
    let opacityBtnOff = this.iconOff.getComponent(UIOpacity);
    let opacityBtnOn = this.iconShow.getComponent(UIOpacity);

    this.pause.IsPause = !this.pause.IsPause;
    if (this.pause.IsPause) {
      // this.iconOff.interactable = false;
      // this.iconShow.interactable = false;
      // opacityBtnOff.opacity = 0;
      // opacityBtnOn.opacity = 0;
      // this.audioController.node.active = false;
      director.pause();
    } else {
      director.resume();
      // this.iconOff.interactable = true;
      // this.iconShow.interactable = true;
      // this.audioController.node.active = true;
      // opacityBtnOff.opacity = 255;
      // opacityBtnOn.opacity = 255;
    }
  }

  protected start(): void {
    director.resume();

    this.schedule(function () {
      this.spawnCar();
    }, math.randomRangeInt(5, 10));

    var getVolumne = sys.localStorage.getItem("volume");

    if (getVolumne) {
      this.variableVolumeArray = JSON.parse(getVolumne);
      localStorage.setItem("volume", JSON.stringify(this.variableVolumeArray));
    } else {
      this.onAudio();
      this.iconShow.node.active = true;
      this.iconOff.node.active = false;
    }

    this.convertVolume =
      this.variableVolumeArray[this.variableVolumeArray.length - 1];

    if (this.convertVolume === 1) {
      this.iconShow.node.active = true;
      this.iconOff.node.active = false;
      // this.gameModel.AudioBackground.volume = 1;
      this.onAudio();
    } else if (this.convertVolume === 0) {
      this.iconShow.node.active = false;
      this.iconOff.node.active = true;
      this.audioController.pauseAudio();
      // this.gameModel.AudioBackground.volume = 0;
    }

    this.gameModel.FrogieNode =
      this.gameModel.FrogieController.getComponent(FrogieController);
    this.FrogieCollider = this.gameModel.FrogieNode.getComponent(Collider2D);

    if (this.FrogieCollider) {
      this.FrogieCollider.on(
        Contact2DType.BEGIN_CONTACT,
        this.onBeginContact,
        this
      );
      this.FrogieCollider.on(
        Contact2DType.BEGIN_CONTACT,
        this.onBeginContactWood,
        this
      );
      this.FrogieCollider.on(
        Contact2DType.END_CONTACT,
        this.onEndContactWodd,
        this
      );
      this.FrogieCollider.on(
        Contact2DType.BEGIN_CONTACT,
        this.beginwater,
        this
      );
      this.FrogieCollider.on(Contact2DType.STAY_CONTACT, this.beginwater, this);
      this.FrogieCollider.node.position = new Vec3(0, -200, 0);
      this.FrogieCollider.apply();
    }
  }

  protected onBeginContactWood(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (otherCollider.tag === 1) {
      this.isOnWood = true;
    }
  }

  protected onEndContactWodd(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (otherCollider.tag === 1) {
      console.log("out");
      this.isOnWood = false;

      if (this.isOnWater) {
        this.gameModel.FrogieController.frogieFallWater();
        this.scheduleOnce(function () {
          this.gameModel.Result.showResult();
        }, 1);
      }
    }
  }

  protected beginwater(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (otherCollider.tag === 2) {
      this.isOnWater = true;

      if (this.isOnWood) return;
      else {
        this.gameModel.FrogieController.frogieFallWater();
        this.scheduleOnce(function () {
          this.gameModel.Result.showResult();
        }, 1);
      }
    }
  }

  protected onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ): void {
    // GAME OVER

    if (otherCollider.node.name.startsWith("Car")) {
      this.gameModel.FrogieController.frogieCrash();
      this.cameraController.shakingCamera();
      this.gameModel.AudioAccident.play();

      this.schedule(function () {
        director.pause();
      }, 2);

      this.gameModel.Result.showResult();
    }

    // COLLISION WITH FINISHLINE

    if (otherCollider.node.name === "FinishLine") {
      this.gameModel.Finish.showFinish();
      GameConfig.level++;
    }

    // COLLISION WITH WATER
    const wood = otherCollider.node.name === "Wood";
    const water = otherCollider.node.name === "Water";
    const waterCollider = this.gameModel.Water.getComponent(Collider2D);

    // if(otherCollider.tag===1 ) {
    //   console.log('on waterrrrrr')
    //   if (otherCollider.tag!==1) {
    //     this.gameModel.FrogieController.frogieFallWater();
    //     this.scheduleOnce(function () {
    //       this.gameModel.Result.showResult();
    //     }, 1);
    //   } else if (wood) {
    //     console.log('on wood')
    //   }
    // }

    // if (otherCollider.node.name === "Water") {
    //   this.gameModel.FrogieController.frogieFallWater();
    //     this.scheduleOnce(function () {
    //       this.gameModel.Result.showResult();
    //     }, 1);
    // }
    // if (selfCollider.node.name !== "Water") {
    //   console.log("Froggie is on the wood");
    // }

    // if (wood) {
    //   waterCollider.enabled = false;
    // }

    // if (water) {
    //   waterCollider.enabled = true;

    //   this.gameModel.FrogieController.frogieFallWater();
    //   this.scheduleOnce(function () {
    //     this.gameModel.Result.showResult();
    //   }, 1);
    // }
  }

  protected onAudio(): void {
    this.variableVolume = 1;
    this.variableVolumeArray.push(this.variableVolume);
    sys.localStorage.setItem(
      "volume",
      JSON.stringify(this.variableVolumeArray)
    );

    this.iconShow.node.active = true;
    this.iconOff.node.active = false;
    this.audioController.playAudio();
  }

  protected offAudio(): void {
    this.variableVolume = 0;
    this.variableVolumeArray.push(this.variableVolume);
    sys.localStorage.setItem(
      "volume",
      JSON.stringify(this.variableVolumeArray)
    );

    this.iconShow.node.active = false;
    this.iconOff.node.active = true;
    this.audioController.pauseAudio();
  }

  // ------LOAD SCENE------

  onClickBtnHome() {
    director.loadScene("SelectLevel");
  }

  onClickBtnAgain() {
    director.loadScene("Play");
    GameConfig.level--;
  }

  onClickBtnNext() {
    director.loadScene("Play");
    // GameConfig.level++;
  }

  // SETTING CARS
  protected spawnCar(): void {
    if (this.gameModel.CarsNode.children.length < 3) {
      const randomCarIndex = randomRangeInt(
        0,
        this.gameModel.ListFrameCar.length
      );
      const carsNode = instantiate(this.gameModel.PrefabCar).getComponent(
        CarPrefabController
      );
      carsNode.getComponent(Sprite).spriteFrame =
        this.gameModel.ListFrameCar[randomCarIndex];
      carsNode.getComponent(Animation).defaultClip =
        this.gameModel.AnimationCars[randomCarIndex];
      carsNode.Init(this.gameModel.CarsNode);

      carsNode.getComponent(Animation).play();
      carsNode.getComponent(Collider2D).apply();
    }
  }
}
