  protected onLoad(): void {
    let temp = JSON.parse(localStorage.getItem('data_level'));
    temp = temp ? temp : [1, 0, 0, 0, 0];
    this.dataLevel = temp;
  
    director.resume();
    const audioSrc = this.node.getComponent(AudioSource);
    this.gameModel.AudioBackground = audioSrc;
  
    const data = Data[GameConfig.level];
  
    const createAndPositionObject = (objectModel: any, container: any, position: { x: number; y: number }, scale?: Vec3) => {
      const object = instantiate(objectModel);
      container.addChild(object);
      object.setPosition(new Vec3(position.x * step, position.y * step, 0));
      if (scale) {
        object.setScale(scale);
      }
    };
  
    const createAndPositionObjectsFromArray = (objectModel: any, container: any, positions: Array<{ x: number; y: number }>, scale?: Vec3) => {
      positions.forEach((position) => {
        createAndPositionObject(objectModel, container, position, scale);
      });
    };
  
    // CREATE WATER
    const _posWater: Array<{ x: number; y: number }> = [];
    data.posWater.forEach((location) => {
      for (let i = -6; i <= 6; i++) {
        for (let j = -1; j <= 1; j++) {
          _posWater.push({ x: location.x + i, y: location.y + j });
        }
      }
    });
    createAndPositionObjectsFromArray(this.gameModel.Water, this.gameModel.ContainerObstacle, data.posWater);
    createAndPositionObjectsFromArray(this.gameModel.ItemTopWater, this.gameModel.ContainerTopWater, data.posWater, new Vec3(1, 1));
  
    this.gameModel.FrogieController.getComponent(FrogieController).loadPosWater(_posWater);
  
    // CREATE WOOD
    const _posWood: Array<{ x: number; y: number }> = [];
    data.posWood.forEach((location) => {
      for (let i = -1; i <= 1; i++) {
        _posWood.push({ x: location.x + i, y: location.y });
      }
    });
    createAndPositionObjectsFromArray(this.gameModel.Wood, this.gameModel.ContainerObstacle, data.posWood);
    this.gameModel.FrogieController.getComponent(FrogieController).loadPosWood(_posWood);
  
    // CREATE FENCE
    const _posFence: Array<{ x: number; y: number }> = [];
    data.posFence.forEach((location) => {
      for (let i = -3; i <= 3; i++) {
        _posFence.push({ x: location.x + i, y: location.y });
      }
    });
    createAndPositionObjectsFromArray(this.gameModel.FenceNode, this.gameModel.ContainerObstacle, data.posFence);
    
    // CREATE TREES
    data.posTrees.forEach((position) => {
      createAndPositionObject(this.gameModel.TreeNode, this.gameModel.ContainerObstacle, position, new Vec3(0.5, 0.5));
    });
    createAndPositionObjectsFromArray(this.gameModel.ItemLeaf, this.gameModel.ContainerLeaf, data.posTrees, new Vec3(1, 1));
  
    // CREATE FINISH LINE
    const _posFinishLine: Array<{ x: number; y: number }> = [];
    data.posFinishLine.forEach((location) => {
      for (let i = -2; i <= 2; i++) {
        for (let j = 0; j <= 1; j++) {
          _posFinishLine.push({ x: location.x + i, y: location.y + j });
        }
      }
    });
    createAndPositionObjectsFromArray(this.gameModel.FinishLine, this.gameModel.ContainerObstacle, data.posFinishLine);
  
    this.gameModel.FrogieController.getComponent(FrogieController).loadPosFinish(_posFinishLine);
  
    // CREATE ROAD
    createAndPositionObjectsFromArray(this.gameModel.Road, this.gameModel.ContainerObstacle, data.posRoad);
  
    // CREATE FLOOR
    createAndPositionObjectsFromArray(this.gameModel.Floor, this.gameModel.ContainerObstacle, data.posFloor);
  
    // CREATE BUSH
    data.posBush.forEach((position) => {
      createAndPositionObject(this.gameModel.BushNode, this.gameModel.ContainerObstacle, position, new Vec3(0.3, 0.2));
    });
  
    const allPosObstacle = [].concat(data.posTrees, data.posBush, _posFence, data.posWall, data.posWater);
    this.gameModel.FrogieController.getComponent(FrogieController).loadPos(allPosObstacle);
  }