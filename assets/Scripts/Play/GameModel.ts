import { _decorator, Component, Node, AnimationClip, SpriteFrame, Button, AudioSource, Sprite, Prefab, Collider2D, Label, CCInteger } from 'cc';
import { FrogieController } from "./FrogieController";
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {

    // ------FROGGIE------
    @property({type: Sprite})
    private frogie: Sprite = null;

    public get Frogie() : Sprite {
        return this.frogie;
    }
    
    public set Frogie(frogie : Sprite) {
        this.frogie = frogie;
    }

    @property({ type: FrogieController })
    private frogieController: FrogieController;

    public get FrogieController() : FrogieController {
        return this.frogieController;
    }
    
    public set FrogieController(frogieController : FrogieController) {
        this.frogieController = frogieController;
    }

    private frogieNode: FrogieController;

    public get FrogieNode() : FrogieController {
        return this.frogieNode;
    }
    
    public set FrogieNode(frogieNode : FrogieController) {
        this.frogieNode = frogieNode;
    }

    // OBSTACLES
    @property({type: Node})
    private house: Node;

    public get House() : Node {
        return this.house;
    }
    
    public set House(house : Node) {
        this.house = house;
    }

    @property({type: Node})
    private water: Node;

    public get Water() : Node {
        return this.water;
    }
    
    public set Water(water : Node) {
        this.water = water;
    }

    @property({type: Node})
    private floor: Node;

    public get Floor() : Node {
        return this.floor;
    }
    
    public set Floor(floor : Node) {
        this.floor = floor;
    }

    @property({type: Node})
    private road: Node;

    public get Road() : Node {
        return this.road;
    }
    
    public set Road(road : Node) {
        this.road = road;
    }

    @property({type: Node})
    private finishLine: Node;

    public get FinishLine() : Node {
        return this.finishLine;
    }
    
    public set FinishLine(finishLine : Node) {
        this.finishLine = finishLine;
    }

    @property({type: Node})
    private carsNode: Node;

    public get CarsNode() : Node {
        return this.carsNode;
    }
    
    public set CarsNode(carsNode : Node) {
        this.carsNode = carsNode;
    }

    @property({type: Node})
    private pigNode: Node;

    public get PigNode() : Node {
        return this.pigNode;
    }
    
    public set PigNode(pigNode : Node) {
        this.pigNode = pigNode;
    }

    @property({ type: Prefab })
    private prefabPig: Prefab;

    public get PrefabPig() : Prefab {
        return this.prefabPig;
    }
    
    public set PrefabPig(prefabPig : Prefab) {
        this.prefabPig = prefabPig;
    }

    @property({type: Node})
    private wood: Node;

    public get Wood() : Node {
        return this.wood;
    }
    
    public set Wood(wood : Node) {
        this.wood = wood;
    }

    @property({ type: SpriteFrame })
    private listSpriteFrameCar: SpriteFrame[] = [];

    public get ListFrameCar() : SpriteFrame[] {
        return this.listSpriteFrameCar;
    }
    
    public set ListFrameCar(listSpriteFrameCar : SpriteFrame[]) {
        this.listSpriteFrameCar = listSpriteFrameCar;
    }

    @property({ type: Prefab })
    private prefabCar: Prefab;

    public get PrefabCar() : Prefab {
        return this.prefabCar;
    }
    
    public set PrefabCar(prefabCar : Prefab) {
        this.prefabCar = prefabCar;
    }

    @property({ type: AnimationClip })
    private listAnimationCars: AnimationClip[] = [];

    public get AnimationCars() : AnimationClip[] {
        return this.listAnimationCars;
    }
    
    public set AnimationCars(listAnimationCars : AnimationClip[]) {
        this.listAnimationCars = listAnimationCars;
    }

    @property({ type: Node })
    private treeNode: Node;

    public get TreeNode() : Node {
        return this.treeNode;
    }
    
    public set TreeNode(treeNode : Node) {
        this.treeNode = treeNode;
    }
    
    @property({ type: Node })
    private bushNode: Node;

    public get BushNode() : Node {
        return this.bushNode;
    }
    
    public set BushNode(bushNode : Node) {
        this.bushNode = bushNode;
    }

    @property({ type: Node })
    private fenceNode: Node;  

    public get FenceNode() : Node {
        return this.fenceNode;
    }
    
    public set FenceNode(fenceNode : Node) {
        this.fenceNode = fenceNode;
    }

    @property({ type: Node })
    private containerObstacle: Node;

    public get ContainerObstacle() : Node {
        return this.containerObstacle;
    }
    
    public set ContainerObstacle(containerObstacle : Node) {
        this.containerObstacle = containerObstacle;
    }

    @property({ type: Node })
    private containerLeaf: Node;

    public get ContainerLeaf() : Node {
        return this.containerLeaf;
    }
    
    public set ContainerLeaf(containerLeaf : Node) {
        this.containerLeaf = containerLeaf;
    }

    @property({ type: Node })
    private itemLeaf: Node;
  
    public get ItemLeaf() : Node {
        return this.itemLeaf;
    }
    
    public set ItemLeaf(itemLeaf : Node) {
        this.itemLeaf = itemLeaf;
    }

    @property({ type: SpriteFrame})
    private flowerFrame: SpriteFrame[] = [] ;

    public get FlowerFrame() : SpriteFrame[] {
        return this.flowerFrame;
    }
    
    public set FlowerFrame(flowerFrame : SpriteFrame[]) {
        this.flowerFrame = flowerFrame;
    }

    // -----
    @property({ type: Node })
    private containerTopWater: Node;

    public get ContainerTopWater() : Node {
        return this.containerTopWater;
    }
    
    public set ContainerTopWater(containerTopWater : Node) {
        this.containerTopWater = containerTopWater;
    }

    @property({ type: Node })
    private itemTopWater: Node;
  
    public get ItemTopWater() : Node {
        return this.itemTopWater;
    }
    
    public set ItemTopWater(itemTopWater : Node) {
        this.itemTopWater = itemTopWater;
    }

    // FINISH + RESULT + WIN NODE 
    
    @property({ type: Node })
    private finishNode: Node;

    public get FinishNode() : Node {
        return this.finishNode;
    }
    
    public set FinishNode(FinishController : Node) {
        this.finishNode = FinishController;
    } 
   
    @property({ type: Node })
    private gameOver: Node;    

    public get GameOver() : Node {
        return this.gameOver;
    }
    
    public set GameOver(gameOver : Node) {
        this.gameOver = gameOver;
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

    //BACKGROUND
    @property({ type: Node})
    private background: Node = null;

    public get Background() : Node {
        return this.background;
    }
    
    public set Background(background : Node) {
        this.background = background;
    }

    //LABEL
    @property({type: Label})
    private timeLabel: Label;
    
    public get TimeLabel() : Label {
        return this.timeLabel;
    }
    
    public set TimeLabel(timeLabel : Label) {
        this.timeLabel = timeLabel;
    }

    @property({type: CCInteger})
    private totalTime: number;

    public get TotalTime() : number {
        return this.totalTime;
    }
    
    public set TotalTime(totalTime : number) {
        this.totalTime = totalTime;
    }

    @property({type: CCInteger})
    private timeIncrement: number;

    public get TimeIncrement():number {
        return this.timeIncrement;
    }

    public set TimeIncrement(timeIncrement: number) {
        this.timeIncrement = timeIncrement;
    }

    @property({type: Label})
    private levelLabel: Label;
    
    public get LevelLabel() : Label {
        return this.levelLabel;
    }
    
    public set LevelLabel(levelLabel : Label) {
        this.levelLabel = levelLabel;
    }
}


