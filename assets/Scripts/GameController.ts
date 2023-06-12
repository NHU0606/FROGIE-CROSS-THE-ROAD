import { CarPrefabController } from "./CarPrefabController";
import { FrogieController } from "./FrogieController";
import { GameModel } from "./GameModel";
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
  Prefab,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameController")
export class GameController extends Component {
  @property({ type: GameModel })
  private gameModel: GameModel;

  @property({ type: FrogieController })
  private frogieController: FrogieController;

  private frogieNode: FrogieController;

  private stuckLeft: number = 0;
  private compare: number = 0;
  private compare1: number = 0;
  // private cars:Prefab[]=[];
  // protected onLoad(): void {
  //     PhysicsSystem.instance.enable = true;
  // }
  // private initCars():void{
  //     for(let i=0;i<3;i++){

  //     }
  // }
  protected spawnCar(): void {
    const randomCarIndex = randomRangeInt(0, this.gameModel.CarsPrefabs.length);
    const carsPrefab = this.gameModel.CarsPrefabs[randomCarIndex];
    const carsNode = instantiate(carsPrefab).getComponent(CarPrefabController);
    carsNode.Init(this.gameModel.CarsNode);
  }

  protected start(): void {
    this.schedule(function () {
      this.spawnCar();
    }, math.randomRangeInt(5, 25));

    this.frogieNode = this.frogieController.getComponent(FrogieController);
    const frogieCollider = this.frogieNode.getComponent(Collider2D);

    frogieCollider.on(
      Contact2DType.BEGIN_CONTACT,
      (sefl: Collider2D, other: Collider2D, contact:IPhysics2DContact) => {
        console.log("check");
      },
      this
    );
    frogieCollider.node.position = new Vec3(0, 0, 0);
    frogieCollider.apply();
  }
}
