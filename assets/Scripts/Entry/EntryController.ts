import { _decorator,  Component, director } from 'cc';
import { SCENE_NAME} from '../DataType';
const { ccclass } = _decorator;

@ccclass('EntryController')
export class EntryController extends Component {
    protected onClickPlayBtn(): void {
        director.loadScene(SCENE_NAME.SelectLevel);
    }

    protected onClickHelpBtn(): void {
        director.loadScene(SCENE_NAME.Help)
    }
}


