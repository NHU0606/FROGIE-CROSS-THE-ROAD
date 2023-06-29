import {
  _decorator,
  Component,
  Node,
  SpriteFrame,
  Sprite,
  instantiate,
  Button,
  director,
} from "cc";
import { GameConfig, SCENE_NAME, Stage } from "../DataType";
const { ccclass, property } = _decorator;

enum LevelState {
  Key,
  Playing,
  PlayDone,
}

@ccclass("LevelView")
export class LevelView extends Component {
  @property({ type: SpriteFrame })
  private listFrameLevel: SpriteFrame[] = [];

  @property(Node)
  private layoutLevel: Node;

  @property(Node)
  private nodeLevel: Node;

  private dataLevel: number[];

  protected onLoad(): void {
    let temp = JSON.parse(localStorage.getItem("data_level"));
    temp = temp ? temp : [0, 2, 2, 2, 2];

    this.dataLevel = temp;

    this.layoutLevel.removeAllChildren();

    for (let i = 0; i < this.dataLevel.length; i++) {
      let level = instantiate(this.nodeLevel);
      level.parent = this.layoutLevel;

      level.getComponent(Sprite).spriteFrame =
        this.listFrameLevel[this.dataLevel[i]];

      level.on(Button.EventType.CLICK, () => {
        GameConfig.level = i;

        this.dataLevel[i] < 2 && director.loadScene(SCENE_NAME.Play);
      });
    }
  }

  protected onClickReturn(): void {
    director.loadScene(SCENE_NAME.Entry);
  }
}
