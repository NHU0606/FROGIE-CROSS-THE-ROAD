import { Vec2 } from "cc";

export class GameConfig {
  static level: number = 0;
}

GameConfig.level = 0;

export const Data = [
  {
    id: 1,
    posCamera: {
      maxY : 1150,
      minY : -170,
      maxX: 500,
      minX: -500,
    },
    posWall: {
      maxY : 29,
      minY : -9,
      maxX: 19,
      minX: -19,
    },
    posCar: {
      lane1: 500,
      lane2: 600,
    },
    posWood: [],
    posFinishLine: [
      { x: 0, y: 26 },
      { x: 1, y: 26 },
      { x: 2, y: 26 },
      { x: -1, y: 26 },
      { x: -2, y: 26 },
    ],
    posRoad: [
      { x: 0, y: 10 },
    ],
    posFloor: [
      { x: -10, y: 13 },
      { x: 10, y: 13 },
      { x: -10, y: 7 },
      { x: 10, y: 7 },
    ],
    posWater: [
    
    ],
    posTrees: [
      { x: -16, y: 22 },
      { x: 17, y: 17 },
      { x: 15, y: -1 },
      { x: -14, y: -1 },
      { x: 5, y: 1 },
    ],
    posBush: [
      { x: -5, y: -4 },
      { x: 5, y: -4 },
      { x: 10, y: 15 },
      { x: -5, y: 22 },
      { x: -17, y: 16 },
      { x: 16, y: 24 },
    ],
    posFence: [
      { x: 0, y: 28 },
      { x: 10, y: 26 },
      { x: -10, y: 26 },
   
    ],
  },
  {
    id: 2,
    posCamera: {
      maxY : 1500,
      minY : -170,
      maxX: 800,
      minX: -800,
    },
    posWall: {
      maxY : 35,
      minY : -9,
      maxX: 25,
      minX: -25,
    },
    posCar: {
      lane1: 300,
      lane2: 400,
    },
    posWood:[
      { x: -2, y: 17 },
      { x: 0, y: 18 },
      { x: 1, y: 19 },
      { x: -10, y: 19 },
      { x: 9, y: 17 },
      { x: -15, y: 17 },
      { x: 15, y: 18 },
    ],
    posFinishLine: [
      { x: 0, y: 35 },
      { x: 1, y: 35 },
      { x: 2, y: 35 },
      { x: -1, y: 35 },
      { x: -2, y: 35 },
    ],
    posRoad: [
      { x: -10, y: 6 },
      { x: 10, y: 6 },
    ],
    posWater: [
      { x: -20, y: 18},
      { x: -9, y: 18 },
      { x: 2, y: 18 },
      { x: 13, y: 18 },
      { x: 24, y: 18 },
    ],
    posFloor: [
      { x: -16, y: 9 },
      { x: 3, y: 9 },
      { x: 15, y: 9 },
      { x: -16, y: 3 },
      { x: 5, y: 3 },
      { x: 15, y: 3 },
    ],
    posTrees: [
      { x: 22, y: 22 },
      { x: -22, y: 22 },
      { x: 18, y: -2 },
      { x: -16, y: -4 },
      { x: -6, y: 2 },
      { x: 10, y: 5 },
    ],
    posBush: [
      { x: -5, y: -4 },
      { x: 5, y: -4 },
      { x: 10, y: 15 },
      { x: -5, y: 23 },
      { x: -17, y: 16 },
      { x: 16, y: 24 },
    ],
    posFence: [
      { x: 10, y: 35 },
      { x: 13, y: 35 },
      { x: 12, y: 35 },
      { x: 11, y: 35 },
      { x: 9, y: 35 },
      { x: 8, y: 35 },
      { x: 7, y: 35 },

      { x: -10, y: 35 },
      { x: -13, y: 35 },
      { x: -12, y: 35 },
      { x: -11, y: 35 },
      { x: -9, y: 35 },
      { x: -8, y: 35 },
      { x: -7, y: 35 },

      { x: 20, y: 32 },
      { x: 23, y: 32 },
      { x: 22, y: 32 },
      { x: 21, y: 32 },
      { x: 19, y: 32 },
      { x: 18, y: 32 },
      { x: 17, y: 32 },

      { x: -20, y: 32 },
      { x: -23, y: 32 },
      { x: -22, y: 32 },
      { x: -21, y: 32 },
      { x: -19, y: 32 },
      { x: -18, y: 32 },
      { x: -17, y: 32 },
    ],
  },
];

export const step = 50;

