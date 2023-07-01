import { CarPrefabController } from "./CarPrefabController";
import { FrogieController } from "./FrogieController";
import { GameModel } from "./GameModel";
import { CameraController } from "./CameraController";
import { PauseController } from "./PauseController";
import { AudioController } from "./AudioController";
import { Data, Stage, step, SCENE_NAME } from "../DataType";
import { GameConfig } from "../DataType";
import {_decorator,Collider2D, Component,Contact2DType, Vec3,instantiate, randomRangeInt, IPhysics2DContact, math, sys, UIOpacity, Button, AudioSource, director, Sprite, Animation, EventKeyboard, Input, input} from "cc";
import { PigPrefab } from "./PigPrefab";
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
  private isDie: boolean = false;
  private time: number;
  private touchFinishLine: boolean = false;
  private dataLevel: number[];

  protected onLoad(): void {
    director.resume();
    const data = Data[GameConfig.level];

    let temp = JSON.parse(localStorage.getItem("data_level"));
    temp = temp ? temp : [1, 0, 0, 0, 0];
    this.dataLevel = temp;
    const levelCount = temp.length;
    let currentLevel = GameConfig.level+1;

    // check max level
    if (currentLevel >= levelCount) {
      director.loadScene(SCENE_NAME.End)
    }

    const audioSrc = this.node.getComponent(AudioSource);
    this.gameModel.AudioBackground = audioSrc;

    this.spawnWater();
    this.spawnWood();
    this.spawnFence();
    this.spawnTree();
    this.spawnFinishLine();
    this.spawnRoad();
    this.spawnFloor();
    this.spawnBush();

    //-------------------LOAD ALL POS OBSTACLE---------------------
    this.gameModel.FrogieController.getComponent(FrogieController).loadPos(
      [].concat(data.posTrees, data.posBush, data.posWall, data.posWater));
  }

  
  protected start(): void {
    director.resume();

    // set time
    setTimeout(() => {
      this.time = this.gameModel.TotalTime;
      this.updateTimeLabel();
      this.updateLevelLable();
      this.schedule(function () {
        this.updateTime();
      }, 1);
    }, 0);

    // spawn car
    this.schedule(function () {
      this.spawnCar();
    }, math.randomRangeInt(2, 4));

    // spawn pig
    // setTimeout(function() {
      this.schedule(function() {
        this.spawnPig();
      }, math.randomRangeInt(1, 3));
    // }, 5000);

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
      this.FrogieCollider.node.position = new Vec3(0, -400, 0);
      this.FrogieCollider.apply();
    }
  }

  protected update(dt: number): void {
    //-------------------CHECK TOUCH WATER OR NOT---------------------
    if (
      !this.isDie &&
      this.gameModel.FrogieController.getComponent(FrogieController).getIsDie()
    ) {
      this.isDie = true;
      this.gameModel.FrogieController.frogieFallWater();
      this.gameOver();
    }

    //-------------------CHECK TOUCH FINISH LINE OR NOT---------------------
    if (
      !this.touchFinishLine &&
      this.gameModel.FrogieController.getComponent(
        FrogieController
      ).getFinishLine()
    ) {
      this.dataLevel[GameConfig.level] = 2;

      this.dataLevel[GameConfig.level + 1] =
        this.dataLevel[GameConfig.level + 1] === 0
          ? 1
          : this.dataLevel[GameConfig.level + 1];

      localStorage.setItem("data_level", JSON.stringify(this.dataLevel));
      this.touchFinishLine = true;
      this.gameModel.Finish.showFinish();
      this.scheduleOnce(function () {
        director.pause();
      }, 1);
    }
  }

  //-------------------SPAWN OBSTACLE-------------------
  protected spawnWater(): void {
    const data = Data[GameConfig.level];
    const _posWater: Array<{ x: number; y: number }> = new Array();

    data.posWater.map((location) => {
      for (let i = -6; i <= 6; i++)
        for (let j = -1; j <= 1; j++)
          _posWater.push({ x: location.x + i, y: location.y + j });
    });

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
    this.gameModel.FrogieController.getComponent(FrogieController).loadPosWater(
      _posWater
    );
  }
  protected spawnWood(): void {
    const data = Data[GameConfig.level];
    const _posWood: Array<{ x: number; y: number }> = new Array();

    data.posWood.map((location: { x: number; y: any }) => {
      for (let i = -1; i <= 1; i++)
        _posWood.push({ x: location.x + i, y: location.y });
    });

    for (let i = 0; i < data.posWood.length; i++) {
      let wood = instantiate(this.gameModel.Wood);

      this.gameModel.ContainerObstacle.addChild(wood);
      wood.setPosition(
        new Vec3(data.posWood[i].x * step, data.posWood[i].y * step, 0)
      );
    }

    this.gameModel.FrogieController.getComponent(FrogieController).loadPosWood(
      _posWood
    );
  }

  protected spawnFence(): void {
    const data = Data[GameConfig.level];
    const _posFence: Array<{ x: number; y: number }> = new Array();
    // space froggie cannot move on fence
    data.posFence.map((location) => {
      for (let i = -3; i <= 3; i++)
        _posFence.push({ x: location.x + i, y: location.y });
    });
    // load posFence to show Fence
    for (let i = 0; i < data.posFence.length; i++) {
      let fence = instantiate(this.gameModel.FenceNode);

      this.gameModel.ContainerObstacle.addChild(fence);
      fence.setPosition(
        new Vec3(data.posFence[i].x * step, data.posFence[i].y * step, 0)
      );
      fence.setScale(new Vec3(1, 1));
    }
    this.gameModel.FrogieController.getComponent(FrogieController).loadPos(_posFence);
  }

  protected spawnTree(): void {
    const data = Data[GameConfig.level];

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
  }

  protected spawnFinishLine(): void {
    const _posFinishLine: Array<{ x: number; y: number }> = new Array();
    const data = Data[GameConfig.level];

    data.posFinishLine.map((location) => {
      for (let i = -2; i <= 2; i++)
        for (let j = 0; j <= 1; j++) {
          _posFinishLine.push({ x: location.x + i, y: location.y + j });
        }
    });

    for (let i = 0; i < data.posFinishLine.length; i++) {
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

    this.gameModel.FrogieController.getComponent(
      FrogieController
    ).loadPosFinish(_posFinishLine);
  }

  protected spawnRoad(): void {
    const data = Data[GameConfig.level];
    for (let i = 0; i < data.posRoad.length; i++) {
      var road = instantiate(this.gameModel.Road);
      this.gameModel.ContainerObstacle.addChild(road);
      road.setPosition(
        new Vec3(data.posRoad[i].x * step, data.posRoad[i].y * step, 0)
      );
    }
  }

  protected spawnFloor(): void {
    const data = Data[GameConfig.level];
    for (let i = 0; i < data.posFloor.length; i++) {
      var floor = instantiate(this.gameModel.Floor);
      this.gameModel.ContainerObstacle.addChild(floor);
      floor.setPosition(new Vec3(data.posFloor[i].x * step, data.posFloor[i].y * step, 0));
    }
  }

  protected spawnBush(): void {
    const data = Data[GameConfig.level];
    for (let i = 0; i < data.posBush.length; i++) {
      let bush = instantiate(this.gameModel.BushNode);
      this.gameModel.ContainerObstacle.addChild(bush);
      bush.setPosition( new Vec3(data.posBush[i].x * step, data.posBush[i].y * step, 0));
      bush.setScale(new Vec3(0.3, 0.2));
    }
  }
  //-------------------COLLISION COLLIDER-------------------

  protected onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ): void {
    // GAME OVER
    if (
      otherCollider.node.name.startsWith("Car") ||
      otherCollider.node.name.startsWith("Pig")
    ) {
      this.gameModel.FrogieController.frogieCrash();
      this.cameraController.shakingCamera();
      this.gameModel.AudioAccident.play();
      this.scheduleOnce(function () {
        this.gameOver();
      }, 0.2);
    }
  }
  //-------------------AUDIO-------------------

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
    //-------------------SPAWN CAR AND PIG---------------------

  protected spawnCar(): void {
    if (this.gameModel.CarsNode.children.length < 5) {
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

  protected spawnPig(): void {
    if (this.gameModel.PigNode.children.length < 3) {
      const pigNode = instantiate(this.gameModel.PrefabPig).getComponent(
        PigPrefab
      );
      pigNode.Initt(this.gameModel.PigNode);
      pigNode.getComponent(Collider2D).apply();
    }
  }

  //------------------PAUSE---------------------

  protected onClickIconPause(): void {
    
    let opacityBtnOff = this.iconOff.getComponent(UIOpacity);
    let opacityBtnOn = this.iconShow.getComponent(UIOpacity);
    
    this.pause.IsPause = !this.pause.IsPause;
    if (this.pause.IsPause) {
      input.off(Input.EventType.KEY_DOWN);
      // input.off(Input.EventType.KEY_DOWN);
      // this.iconOff.interactable = false;
      // this.iconShow.interactable = false;
      // opacityBtnOff.opacity = 0;
      // opacityBtnOn.opacity = 0;
      // this.audioController.node.active = false;
      director.pause();
    } else {
      director.resume();
      this.gameModel.FrogieController.handleOnKeyDown();
      // input.on(Input.EventType.KEY_DOWN,this.gameModel.FrogieController.onKeyDown,this)
      // this.iconOff.interactable = true;
      // this.iconShow.interactable = true;
      // this.audioController.node.active = true;
      // opacityBtnOff.opacity = 255;
      // opacityBtnOn.opacity = 255;
    }
  }
  

  // -----------------------------TIME----------------------------

  protected updateTime(): void {
    this.time--;
    if (this.time >= 0) {
      this.updateTimeLabel();
      if (this.time == 0) {
        this.gameOver();
      }
    }
  }

  protected updateTimeLabel(): void {
    this.gameModel.TimeLabel.string = "Time: " + this.time.toString();
  }

  // --------------------- LEVEL TEXT -------------------------------
  protected updateLevelLable(): void {
    let textLevel = GameConfig.level+1;
    this.gameModel.LevelLabel.string = "Level:  " + textLevel;
    console.log("lv", textLevel)
  }
  // --------------------------game over src-------------------------
  protected gameOver(): void {
    this.scheduleOnce(function () {
      this.gameModel.GameOver.showGameOver();
    }, 0.2);
    this.schedule(function () {
      director.pause();
    }, 1);
  }
}
