import { _decorator, AudioSource, Component, director, input, Input, Node, Sprite, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
    private isiconToShown: boolean = false;
    private isMuted: boolean = false;

    @property(AudioSource)
    public audioBackground: AudioSource = null;

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

        private variableVolume: number;
        private variableVolumeArray: number[] = [];
        private convertVolume: number;
        
    protected start(): void {
        this.iconToShow.node.active = true;
        this.iconToHide.node.active = false;
    
        var getVolumne = sys.localStorage.getItem("volume");
    
        if (getVolumne) {
          this.variableVolumeArray = JSON.parse(getVolumne);
          localStorage.setItem("volume", JSON.stringify(this.variableVolumeArray));
        } else {
          this.onAudio();
          this.iconToShow.node.active = true;
          this.iconToHide.node.active = false;
        }
    
        this.convertVolume = this.variableVolumeArray[this.variableVolumeArray.length - 1];
        if (this.convertVolume === 1) {
          this.iconToShow.node.active = true;
          this.iconToHide.node.active = false;
          this.onAudio();
        } else if (this.convertVolume === 0) {
          this.iconToShow.node.active = false;
          this.iconToHide.node.active = true;
          this.audioBackground.volume = 0;

        }
    
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
        this.isiconToShown = !this.isiconToShown;
        this.updateIconsVisibility();
    }

    updateIconsVisibility() {
        this.iconToShow.node.active = this.isiconToShown;
        this.iconToHide.node.active = !this.isiconToShown;
    }

    protected onAudio(): void {
        this.variableVolume = 1;
        this.variableVolumeArray.push(this.variableVolume);
        sys.localStorage.setItem("volume",JSON.stringify(this.variableVolumeArray));
    
        this.iconToShow.node.active = true;
        this.iconToHide.node.active = false;
        this.audioBackground.volume = 1;
      }
    
    protected offAudio(): void {
        this.variableVolume = 0;
        this.variableVolumeArray.push(this.variableVolume);
        sys.localStorage.setItem("volume",JSON.stringify(this.variableVolumeArray));
    
        this.iconToShow.node.active = false;
        this.iconToHide.node.active = true;
        this.audioBackground.volume = 1;
        this.audioBackground.volume = 0;
      }
}