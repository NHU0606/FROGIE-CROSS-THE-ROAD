import { _decorator, Component, Node, Button, AudioSource, Sprite, Prefab, Collider2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({type: Sprite})
    private frogie: Sprite = null;

   

    @property({type: Node})
    private carsNode: Node;

    @property({type: Node})
    private wallColliderNode: Node;

    public get WallColliderNode() : Node {
        return this.wallColliderNode;
    }
    
    public set WallColliderNode(wallColliderNode: Node) {
        this.wallColliderNode = wallColliderNode;
    }

    public get Frogie() : Sprite {
        return this.frogie;
    }
    
    public set Frogie(frogie : Sprite) {
        this.frogie = frogie;
    }

    
    public get CarsNode() : Node {
        return this.carsNode;
    }
    
    public set CarsNode(carsNode : Node) {
        this.carsNode = carsNode;
    }

    // BTN AUDIO 

    @property({type: Button})
    private iconShow: Button = null;    

    @property({type: Button})
    private iconOff: Button = null;  

    public get IconShow() : Button {
        return this.iconShow;
    }
    
    public set IconShow(iconShow : Button) {
        this.iconShow = iconShow;
    }

    public get IconOff() : Button {
        return this.iconOff;
    }
    
    public set IconOff(iconOff : Button) {
        this.iconOff = iconOff;
    }

    // AUDIO
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

    public get AudioBackground() : AudioSource {
        return this.audioBackground;
    }
    
    public set AudioBackground(audioBackground : AudioSource) {
        this.audioBackground = audioBackground;
    }

    public get AudioFall() : AudioSource {
        return this.audioFall;
    }
    
    public set AudioFall(audioFall : AudioSource) {
        this.audioFall = audioFall;
    }

    public get AudioAccident() : AudioSource {
        return this.audioAccident;
    }
    
    public set AudioAccident(audioAccident : AudioSource) {
        this.audioAccident = audioAccident;
    }

    public get AudioBtn() : AudioSource {
        return this.audioBtn;
    }
    
    public set AudioBtn(audioBtn : AudioSource) {
        this.audioBtn = audioBtn;
    }

    public get AudioCar() : AudioSource {
        return this.audioCar;
    }
    
    public set AudioCar(audioCar : AudioSource) {
        this.audioCar = audioCar;
    }
}


