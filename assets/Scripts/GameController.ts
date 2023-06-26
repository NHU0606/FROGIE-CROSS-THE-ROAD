import { CarPrefabController } from "./CarPrefabController";
import { FrogieController } from "./FrogieController";
import { GameModel } from "./GameModel";
import { CameraController } from "./CameraController";
import { PauseController } from "./PauseController";
import { AudioController } from "./AudioController";
import { Data, step } from "./DataType";
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
} from "cc";

const { ccclass, property } = _decorator;

@ccclass("GameController")
export class GameController extends Component {
  public static gameLevel = 0;

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

  protected onLoad(): void {
    console.log(GameController.gameLevel)
    director.resume();

    const audioSrc = this.node.getComponent(AudioSource);
    this.gameModel.AudioBackground = audioSrc;

    // LOAD DATA OF LEVEL 1
    const data = Data[GameController.gameLevel];
    console.log('data', data)

    //SETTING FINISH LINE
    for(let i = 0; i < data.posFinishLine.length; i += 5) {
      var finishLine = instantiate(this.gameModel.FinishLine);
      this.gameModel.ContainerObstacle.addChild(finishLine);
      finishLine.setPosition(new Vec3(data.posFinishLine[i].x * step, data.posFinishLine[i].y * step, 0));
    }

    //SETTING ROAD
    for(let i = 0; i < data.posRoad.length; i++) {
      var road = instantiate(this.gameModel.Road);
      this.gameModel.ContainerObstacle.addChild(road);
      road.setPosition(new Vec3(data.posRoad[i].x * step, data.posRoad[i].y * step, 0));
    }

    //SETTING FLOOR
    for(let i = 0; i < data.posFloor.length; i++) {
      var floor = instantiate(this.gameModel.Floor);
      this.gameModel.ContainerObstacle.addChild(floor);
      floor.setPosition(new Vec3(data.posFloor[i].x * step, data.posFloor[i].y * step, 0));
    }

    // SETTING TREES
    this.gameModel.TreeNode.setPosition(new Vec3(0, 0, 0));
    this.gameModel.FrogieController
      .getComponent(FrogieController)
      .loadPos([].concat(data.posTrees, data.posBush, data.posFence, data.posWall, data.posFinishLine));

    for (let i = 0; i < data.posTrees.length; i++) {
      let tree = instantiate(this.gameModel.TreeNode);
      let leaf = instantiate(this.gameModel.ItemLeaf);

      this.gameModel.ContainerObstacle.addChild(tree);
      this.gameModel.ContainerLeaf.addChild(leaf);
      tree.setPosition(
        new Vec3(data.posTrees[i].x * step, data.posTrees[i].y * step + step, 0)
      );

      leaf.setPosition(new Vec3(data.posTrees[i].x * step, data.posTrees[i].y * step + 80,  0))
      tree.setScale(new Vec3(0.5, 0.5));
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

    for (let i = 0; i < data.posFence.length; i += 7) {
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
    }
    else if (this.convertVolume === 0) {
      this.iconShow.node.active = false;
      this.iconOff.node.active = true;
      this.audioController.pauseAudio();
      // this.gameModel.AudioBackground.volume = 0;
    }

    this.gameModel.FrogieNode = this.gameModel.FrogieController.getComponent(FrogieController);
    const frogieCollider = this.gameModel.FrogieNode.getComponent(Collider2D);

    if (frogieCollider) {
      frogieCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      frogieCollider.node.position = new Vec3(0, -200, 0);
      frogieCollider.apply();
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
      GameController.gameLevel++;
      console.log(GameController.gameLevel)
      
      // this.schedule(function () {
      //   director.pause();
      // }, 2);
    }
  }

  protected onAudio(): void {
    this.variableVolume = 1;
    this.variableVolumeArray.push(this.variableVolume);
    sys.localStorage.setItem(
      'volume',
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
      'volume',
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
  }

  onClickBtnNext() {
    // director.loadScene('')
  }

  // SETTING CARS
  protected spawnCar(): void {
    if (this.gameModel.CarsNode.children.length < 5) {
      const randomCarIndex = randomRangeInt(0, this.gameModel.ListFrameCar.length);
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

  // PASS LEVEL
  

  // MAX LEVEL

  
}
