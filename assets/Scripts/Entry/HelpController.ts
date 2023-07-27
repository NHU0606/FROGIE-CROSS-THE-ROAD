import { SCENE_NAME} from '../DataType';
import { _decorator, Component, Node, director } from 'cc';
const { ccclass } = _decorator;

@ccclass('HelpController')
export class HelpController extends Component {
    protected onClickReturnBtn(): void {
        director.loadScene(SCENE_NAME.Entry)
    }
}


