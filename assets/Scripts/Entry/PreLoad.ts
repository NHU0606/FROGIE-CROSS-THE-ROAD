import { _decorator, Component, director, Node, Vec3 } from 'cc';
import {SCENE_NAME } from "../DataType";
const { ccclass, property } = _decorator;

@ccclass('PreLoad')
export class PreLoad extends Component {
    @property(Node)
    loadingBar: Node = null;

    private startTime: number = 0;
    private animationDuration: number = 5000; 
    protected start(): void {
        director.preloadScene(SCENE_NAME.Play)
        this.startTime = performance.now();
        this.loadingBar.setAnchorPoint(new Vec3(0, 7, 0)); 
        this.loadingBar.setPosition(new Vec3(-this.loadingBar.width / 2, 0, 0)); 
    }

    protected loadSceneEntry(): void {
        director.loadScene(SCENE_NAME.Entry);
    }

    update(deltaTime: number) {
        const elapsedTime = performance.now() - this.startTime;
        const progress = Math.min(elapsedTime / this.animationDuration, 1);
        const widthPercentage = progress * 500;
        this.loadingBar.width = widthPercentage;

        if (progress >= 1) {
            this.loadSceneEntry();
        }
    }
}


