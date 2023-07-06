import {
  _decorator,
  Component,
  director,
  input,
  Node,
  Tween,
  Vec3,
  Input,
} from "cc";
import { GameConfig, SCENE_NAME } from "./DataType";
const { ccclass, property } = _decorator;

@ccclass("ButtonController")
export class ButtonController extends Component {
  // ------LOAD SCENE------

  protected start(): void {
    this.node.on(Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
  }

  protected onMouseEnter(): void {
    this.node.scale = new Vec3(1, 1, 1);
  }

  protected onClickBtnHome(): void {
    director.preloadScene(SCENE_NAME.SelectLevel, () => {
      director.loadScene(SCENE_NAME.SelectLevel);
    });
  }

  protected onClickBtnAgain(): void {
    director.loadScene(SCENE_NAME.Play);
  }

  protected onClickBtnNext(): void {
    if (GameConfig.level < 4) {
      GameConfig.level++;
      director.loadScene(SCENE_NAME.Play);
    } else{
      director.loadScene(SCENE_NAME.End);
    }
  }

  protected onClickBtnPlay(): void {
    director.loadScene(SCENE_NAME.Play);
  }
}
