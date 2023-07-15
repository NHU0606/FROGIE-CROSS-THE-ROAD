import { GameConfig, SCENE_NAME } from "../DataType";
import { _decorator, Button, Component, Node,director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EndController')
export class EndController extends Component {
    @property({ type: Button})
    private homeBtn: Button;

    private onClickHomeBtn(): void {
        director.loadScene(SCENE_NAME.Entry);
    }
}


