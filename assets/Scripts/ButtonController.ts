import { _decorator, Component, director, Node, Tween, Vec3 } from 'cc';
import { GameConfig, SCENE_NAME} from './DataType';
const { ccclass, property } = _decorator;

@ccclass('ButtonController')
export class ButtonController extends Component {

    // ------LOAD SCENE------

    protected onClickBtnHome(): void {
        director.loadScene(SCENE_NAME.SelectLevel);
    }

    protected onClickBtnAgain():void {
        director.loadScene(SCENE_NAME.Play);
        GameConfig.level--;
    }

    protected onClickBtnNext():void {
        GameConfig.level++;
        director.loadScene(SCENE_NAME.Play);
    }

    protected onClickBtnPlay():void {
        director.loadScene(SCENE_NAME.Play);
    }
}


