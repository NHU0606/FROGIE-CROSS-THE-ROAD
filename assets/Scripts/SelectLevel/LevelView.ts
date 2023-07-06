import {
  _decorator,
  Component,
  Node,
  SpriteFrame,
  Sprite,
  instantiate,
  Button,
  director,
  Vec3,
} from "cc";
import { GameConfig, SCENE_NAME, Stage } from "../DataType";
const { ccclass, property } = _decorator;

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
    temp = temp ? temp : [1, 0, 0, 0, 0];

    this.dataLevel = temp;
    this.layoutLevel.removeAllChildren();

    let startPos = 0;

    for (let i = 0; i < this.dataLevel.length; i++) {
      let level = instantiate(this.nodeLevel);

      this.layoutLevel.addChild(level);
      level.setPosition(new Vec3(startPos, level.position.y,0));
      startPos += 120;

      level.getComponent(Sprite).spriteFrame =
        this.listFrameLevel[this.dataLevel[i]];

      level.on(Button.EventType.CLICK, () => {
        GameConfig.level = i;
        this.dataLevel[i] > 0 && director.loadScene(SCENE_NAME.Play);
      });
    }
  }

  protected start(): void {
    
  }

  protected onClickReturn(): void {
    director.loadScene(SCENE_NAME.Entry);
  }
}
