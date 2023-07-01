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
      [].concat(this.spawnFence(), data.posTrees, data.posBush, data.posWall, data.posWater));
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
    let _posWater: Array<{ x: number; y: number }> = new Array();
    _posWater = this.spawnObstacleVelHor(data.posWater)
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
    let _posWood: Array<{ x: number; y: number }> = new Array();
    _posWood = this.spawnObstacleHor(data.posWood)

    this.setPosWood(data.posWood, this.gameModel.Wood, this.gameModel);
    this.gameModel.FrogieController.getComponent(FrogieController).loadPosWood(
      _posWood
    );
  }

  protected spawnFence() {
    const data = Data[GameConfig.level];
    let _posFence: Array<{ x: number; y: number }> = new Array();
    _posFence = this.spawnObstacleHor(data.posFence, -3, 3)
    
    this.setPosWood(data.posFence, this.gameModel.FenceNode, this.gameModel)
    this.gameModel.FrogieController.getComponent(FrogieController).loadPos(_posFence);
    return _posFence;
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
    const data = Data[GameConfig.level];
    console.log("dataFinish", data.posFinishLine)
    let _posFinishLine: Array<{ x: number; y: number }> = new Array();
    _posFinishLine = this.spawnObstacleVelHor(data.posFinishLine, -2, 2, 0, 1);

    this.setPosWood(data.posFinishLine, this.gameModel.FinishLine, this.gameModel)
    this.gameModel.FrogieController.getComponent(
      FrogieController
    ).loadPosFinish(_posFinishLine);
  }

  protected spawnRoad(): void {
    const data = Data[GameConfig.level];
    this.setPosWood(data.posRoad, this.gameModel.Road, this.gameModel);
  }

  protected spawnFloor(): void {
    const data = Data[GameConfig.level];
    this.setPosWood(data.posFloor, this.gameModel.Floor, this.gameModel);
  }

  protected spawnBush(): void {
    const data = Data[GameConfig.level];
    this.setPosWood(data.posBush, this.gameModel.BushNode, this.gameModel);
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

  protected spawnObstacleHor(dataPosWood, from = -1, to = 1) {
    const _posWood: Array<{ x: number; y: number }> = new Array();

    dataPosWood.map((location: { x: number; y: any }) => {
      for (let i = from; i <= to; i++)
        _posWood.push({ x: location.x + i, y: location.y });
    });
    return _posWood;
  }
  
  protected spawnObstacleVelHor(dataPosWater, from1 = -6, to1 = 6, from2 = -1, to2 = 1) {
    const _posWater: Array<{ x: number; y: number }> = new Array();

    dataPosWater.map((location: { x: number; y: any }) => {
      for (let i = from1; i <= to1; i++)
        for (let j = from2; j <= to2; j++)
          _posWater.push({ x: location.x + i, y: location.y + j });
    });
    return _posWater;
  }

  protected setPosWood(dataPosWood, gameModelName, gameModel) {
    for (let i = 0; i < dataPosWood.length; i++) {
      let wood = instantiate(gameModelName);
      gameModel.ContainerObstacle.addChild(wood);
      wood.setPosition(
        new Vec3(dataPosWood[i].x * step, dataPosWood[i].y * step, 0)
      );
    }
  }
}
