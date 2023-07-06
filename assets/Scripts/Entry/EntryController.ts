import { _decorator, AudioSource, Button, Component, director, Node, sys } from 'cc';
import { GameConfig, SCENE_NAME} from '../DataType';
const { ccclass, property } = _decorator;

@ccclass('EntryController')
export class EntryController extends Component {
    protected onClickPlayBtn(): void {
        director.loadScene(SCENE_NAME.SelectLevel);
    }

    protected onClickHelpBtn(): void {
        director.loadScene(SCENE_NAME.Help)
    }
}


