import { CarPrefabController } from "./CarPrefabController";
import { FinishController } from "./FinishController";
import { FrogieController } from "./FrogieController";
import { GameModel } from "./GameModel";
import { CameraController } from "./CameraController";
import { PauseController } from "./PauseController";
import { AudioController } from "./AudioController";
import { ResultController } from "./ResultController";
import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  Vec3,
  instantiate,
  Node,
  randomRangeInt,
  IPhysics2DContact,
  math,
  PhysicsSystem,
  sys,
  Prefab,
  UIOpacity,
  log,
  Button,
  AudioSource,
  director,
  SpriteFrame,
  Sprite,
  Animation,
  AnimationClip,
  NodePool,
  EventKeyboard,
} from "cc";
import { Data, step } from "./DataType";

const { ccclass, property } = _decorator;

@ccclass("GameController")
export class GameController extends Component {
  @property({ type: GameModel })
  private gameModel: GameModel;

  @property({ type: AudioController })
  private audioController: AudioController;

  @property({ type: CameraController })
  private cameraController: CameraController;

  @property({ type: FrogieController })
  private frogieController: FrogieController;

  private frogieNode: FrogieController;

  @property({ type: Button })
  private iconShow: Button = null;

  @property({ type: Button })
  private iconOff: Button = null;

  @property({ type: PauseController })
  private pause: PauseController;

  @property({ type: ResultController })
  private resultController: ResultController;

  @property({ type: FinishController })
  private FinishController: FinishController;

  @property({ type: SpriteFrame })
  private listSpriteFrame: SpriteFrame[] = [];

  @property({ type: Prefab })
  private prefabCar: Prefab;

  @property({ type: AnimationClip })
  private listAnimationCars: AnimationClip[] = [];

  private variableVolume: number;
  private variableVolumeArray: number[] = [];
  private convertVolume: number;

  private level: number = 0;

  private poolTree: NodePool;

  @property({ type: Node })
  private backgroundNode: Node;

  @property({ type: Node })
  private treeNode: Node;

  protected onLoad(): void {
    director.resume();

    const audioSrc = this.node.getComponent(AudioSource);
    this.gameModel.AudioBackground = audioSrc;

    this.treeNode.setPosition(new Vec3(0, 0, 0));

    const data = Data[0];

    this.frogieController.getComponent(FrogieController).loadPos(data.pos);

    for (let i = 0; i < data.pos.length; i++) {
      let tree = instantiate(this.treeNode);

      this.backgroundNode.addChild(tree);
      tree.setPosition(
        new Vec3(data.pos[i].x * step, data.pos[i].y * step + step  , 0)
      );
      tree.setScale(new Vec3(0.5, 0.5));
    }
  }

  protected spawnCar(): void {
    if (this.gameModel.CarsNode.children.length < 5) {
      const randomCarIndex = randomRangeInt(0, this.listSpriteFrame.length);
      const carsNode = instantiate(this.prefabCar).getComponent(
        CarPrefabController
      );
      carsNode.getComponent(Sprite).spriteFrame =
        this.listSpriteFrame[randomCarIndex];
      carsNode.getComponent(Animation).defaultClip =
        this.listAnimationCars[randomCarIndex];
      carsNode.Init(this.gameModel.CarsNode);

      carsNode.getComponent(Animation).play();
      carsNode.getComponent(Collider2D).apply();
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
      director.pause();
    } else {
      director.resume();
      // this.iconOff.interactable = true;
      // this.iconShow.interactable = true;
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
      this.audioController.playAudio();
      this.iconShow.node.active = true;
      this.iconOff.node.active = false;
    }

    this.convertVolume =
      this.variableVolumeArray[this.variableVolumeArray.length - 1];

    // if (this.convertVolume === 1) {
    //   this.iconShow.node.active = true;
    //   this.iconOff.node.active = false;
    //   this.gameModel.AudioBackground.volume = 1;
    // }
    // else if (this.convertVolume === 0) {
    //   this.iconShow.node.active = false;
    //   this.iconOff.node.active = true;
    //   this.gameModel.AudioBackground.volume = 0;
    // }

    this.frogieNode = this.frogieController.getComponent(FrogieController);
    const frogieCollider = this.frogieNode.getComponent(Collider2D);

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
      this.frogieController.frogieCrash();
      this.cameraController.shakingCamera();
      this.gameModel.AudioAccident.play();

      this.schedule(function () {
        director.pause();
      }, 2);

      this.resultController.showResult();
    }

    // COLLISION WITH FINISHLINE

    if (otherCollider.node.name === "FinishLine") {
      this.FinishController.showFinish();
      this.schedule(function () {
        director.pause();
      }, 2);
    }
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
    this.gameModel.AudioBackground.volume = 1;
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
    this.gameModel.AudioBackground.volume = 0;
  }

  // ------LOAD SCENE------

  onClickBtnHome() {
    director.loadScene("Entry");
  }

  onClickBtnAgain() {
    director.loadScene("Play");
  }
}
