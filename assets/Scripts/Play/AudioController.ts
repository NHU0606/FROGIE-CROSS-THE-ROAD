import { GameModel } from '../Play/GameModel';
import { _decorator, AudioSource, Component, director, input, Input, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
    @property({type: GameModel})
    private gameModel: GameModel;

    private isIconShown: boolean = false;
    private isMuted: boolean = false;

    @property(AudioSource)
    public audioBackground: AudioSource = null;

    @property(AudioSource)
    private audioFall: AudioSource = null;

    @property(AudioSource)
    private audioAccident: AudioSource = null;

    @property(AudioSource)
    private audioBtn: AudioSource = null;

    @property(AudioSource)
    private audioCar: AudioSource = null;

    public get IsMuted() : boolean {
        return this.isMuted;
    }
    
    public set IsMuted(isMuted : boolean) {
        this.isMuted = isMuted;
    } 

    @property({type: Sprite})
    private iconToShow: Sprite = null;    

    public get IconToShow() : Sprite {
        return this.iconToShow;
    }
    
    public set IconToShow(iconToShow : Sprite) {
        this.iconToShow = iconToShow;
    } 

    @property({type: Sprite})
    private iconToHide: Sprite = null;

    public get IconToHide() : Sprite {
        return this.iconToHide;
    }
    
    public set IconToHide(iconToHide : Sprite) {
        this.iconToHide = iconToHide;
    } 

    start() {
        this.iconToShow.node.active = true;
        this.iconToHide.node.active = false;
    }

    protected onLoad(): void {
        this.iconToShow.node.active = false;
        this.iconToHide.node.active = true;
    }

    onClickIcon () {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.audioBackground.volume = 0;
        } else {
            this.audioBackground.volume = 1;
        }               
    }  

    onToggleButtonClicked() {
        this.isIconShown = !this.isIconShown;
        this.updateIconsVisibility();
    }

    updateIconsVisibility() {
        this.iconToShow.node.active = this.isIconShown;
        this.iconToHide.node.active = !this.isIconShown;
    }

    playAudio() {
        this.audioBackground.volume = 1;
    }

    pauseAudio() {
        this.audioBackground.volume = 0;
    }    
}