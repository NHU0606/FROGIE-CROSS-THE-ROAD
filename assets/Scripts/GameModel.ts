import { _decorator, Component, Node, Sprite, Prefab, Collider2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({type: Sprite})
    private frogie: Sprite = null;

    @property({type: [Prefab]})
    private carsPrefab: Prefab[] = [];

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

    public get CarsPrefabs(): Prefab[] {
        return this.carsPrefab;
    }
    
    public get CarsNode() : Node {
        return this.carsNode;
    }
    
    public set CarsNode(carsNode : Node) {
        this.carsNode = carsNode;
    }
}


