import { Vec2 } from "cc";

export class GameConfig {
  static level: number = 0;
}

GameConfig.level = 0;

export const SCENE_NAME = {
  Play: "Play",
  Help: "Help",
  Entry: "Entry",
  SelectLevel: "SelectLevel",
  End: "End"
};

export let Stage = [1, 0, 0, 0, 0];

export const Data = [
  {
    id: 1,

    posCamera: {
      maxY: 1150,
      minY: -170,
      maxX: 500,
      minX: -500,
    },
    posWall: {
      maxY: 29,
      minY: -9,
      maxX: 19,
      minX: -19,
    },
    posCar: {
      laneXLeft: -1150,
      laneXRight: 1150,
      laneYBot: 500,
      laneYTop: 600,
    },
    posPig: {
      laneXLeft: -1300,
      laneXRight: 1300,
      laneYBot: -1200,
      laneYTop: -1300,
    },
    posWood: [],
    posFinishLine: [{ x: 0, y: 26 }],
    posRoad: [{ x: 0, y: 10 }],
    posFloor: [
      { x: -10, y: 13 },
      { x: 10, y: 13 },
      { x: -10, y: 7 },
      { x: 10, y: 7 },
    ],
    posWater: [],
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
      maxY: 1500,
      minY: -170,
      maxX: 500,
      minX: -500,
    },
    posWall: {
      maxY: 35,
      minY: -9,
      maxX: 19,
      minX: -19,
    },
    posCar: {
      laneXLeft: -1150,
      laneXRight: 1300,
      laneYBot: 300,
      laneYTop: 400,
    },
    posPig: {
      laneXLeft: -1300,
      laneXRight: 1300,
      laneYBot: -1200,
      laneYTop: -1300,
    },
    posWood: [
      { x: -2, y: 17 },
      { x: 0, y: 18 },
      { x: 1, y: 19 },
      { x: -10, y: 19 },
      { x: 9, y: 17 },
      { x: -15, y: 17 },
      { x: 15, y: 18 },
    ],
    posFinishLine: [{ x: 0, y: 35 }],
    posRoad: [
      { x: -10, y: 6 },
      { x: 10, y: 6 },
    ],
    posWater: [
      { x: -20, y: 18 },
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
      { x: -6, y: 1 },
      { x: 10, y: 0 },
    ],
    posBush: [
      { x: -11, y: -4 },
      { x: 10, y: -3 },
      { x: 10, y: 15 },
      { x: -5, y: 23 },
      { x: -17, y: 16 },
      { x: 16, y: 24 },
    ],
    posFence: [
      { x: 10, y: 35 },
      { x: -10, y: 35 },
      { x: 20, y: 32 },
      { x: -20, y: 32 },
    ],
  },
  {
    id: 3,
    posCamera: {
      maxY: 1500,
      minY: -170,
      maxX: 500,
      minX: -500,
    },
    posWall: {
      maxY: 35,
      minY: -9,
      maxX: 19,
      minX: -19,
    },
    posCar: {
      laneXLeft: -1300,
      laneXRight: 1300,
      laneYBot: 850,
      laneYTop: 1000,
    },
    posPig: {
      laneXLeft: -1300,
      laneXRight: 1300,
      laneYBot: -1200,
      laneYTop: 1300,
    },
    posWood: [
      { x: -2, y: 5 },
      { x: 0, y: 4 },
      { x: 1, y: 3 },
      { x: -10, y: 3 },
      { x: -6, y: 4 },
      { x: 10, y: 5 },
      { x: 9, y: 3 },
      { x: 10, y: 4 },
      { x: 15, y: 4 },
      { x: 20, y: 5 },
      { x: -20, y: 5 },
    ],
    posFinishLine: [{ x: 0, y: 35 }],
    posRoad: [
      { x: -10, y: 18 },
      { x: 10, y: 18 },
    ],
    posWater: [
      { x: -20, y: 4 },
      { x: -9, y: 4 },
      { x: 2, y: 4 },
      { x: 13, y: 4 },
      { x: 24, y: 4 },
    ],
    posFloor: [
      { x: -16, y: 21 },
      { x: 3, y: 21 },
      { x: 15, y: 21 },
      { x: -16, y: 15 },
      { x: 5, y: 15 },
      { x: 15, y: 15 },
    ],
    posTrees: [
      { x: 22, y: 30 },
      { x: 18, y: 26 },
      { x: -22, y: 27 },
      { x: -18, y: 28 },
      { x: 18, y: -2 },
      { x: 14, y: -1 },
      { x: -16, y: -4 },
      { x: -20, y: -2 },
      { x: -6, y: 2 },
      { x: -20, y: 29 },
      { x: 20, y: 29 },
      { x: 17, y: 30 },
      { x: 10, y: 7 },
    ],
    posBush: [
      { x: -15, y: -4 },
      { x: 5, y: -2 },
      { x: 10, y: 15 },
      { x: -5, y: 23 },
      { x: -17, y: 10 },
      { x: 16, y: 24 },
    ],
    posFence: [
      { x: 10, y: 34 },
      { x: -10, y: 34 },
      { x: 20, y: 31 },
      { x: -20, y: 31 },
    ],
  },
  {
    id: 4,
    posCamera: {
      maxY: 1500,
      minY: -170,
      maxX: 500,
      minX: -500,
    },
    posWall: {
      maxY: 35,
      minY: -9,
      maxX: 19,
      minX: -19,
    },
    posFloor: [
      { x: -16, y: 5 },
      { x: 3, y: 5 },
      { x: 15, y: 5 },
      { x: -16, y: -1 },
      { x: 5, y: -1 },
      { x: 15, y: -1 },
    ],
    posCar: {
      laneXLeft: -1300,
      laneXRight: 1300,
      laneYBot: 100,
      laneYTop: 200,
    },
    posRoad: [
      { x: -10, y: 2 },
      { x: 10, y: 2 },
    ],
    posPig: {
      laneXLeft: -1300,
      laneXRight: 1300,
      laneYBot: 350,
      laneYTop: 500,
    },
    posWood: [
      { x: -2, y: 15 },
      { x: -10, y: 14 },
      { x: 1, y: 13 },
      { x: -10, y: 14 },
      { x: -6, y: 14 },
      { x: 11, y: 15 },
      { x: 9, y: 13 },
      { x: 10, y: 14 },
      { x: 15, y: 14 },
      { x: 20, y: 15 },
      { x: -20, y: 15 },
    ],
    posFinishLine: [{ x: 0, y: 35 }],
    posWater: [
      { x: -20, y: 14 },
      { x: -9, y: 14 },
      { x: 2, y: 14 },
      { x: 13, y: 14 },
      { x: 24, y: 14 },
    ],
    posTrees: [
      { x: 22, y: 30 },
      { x: 18, y: 26 },
      { x: -22, y: 27 },
      { x: -18, y: 28 },
      { x: 18, y: -2 },
      { x: 14, y: -1 },
      { x: -16, y: -4 },
      { x: -20, y: -2 },
      { x: -6, y: 2 },
      { x: -20, y: 29 },
      { x: 20, y: 29 },
      { x: 17, y: 30 },
      { x: 10, y: 7 },
    ],
    posBush: [
      { x: -15, y: -4 },
      { x: 5, y: -2 },
      { x: 10, y: 15 },
      { x: -5, y: 23 },
      { x: -17, y: 10 },
      { x: 16, y: 24 },
    ],
    posFence: [
      { x: 10, y: 34 },
      { x: -10, y: 34 },
      { x: 20, y: 31 },
      { x: -20, y: 31 },
    ],
  },
  {
    id: 5,
    posCamera: {
      maxY: 1500,
      minY: -170,
      maxX: 500,
      minX: -500,
    },
    posWall: {
      maxY: 35,
      minY: -9,
      maxX: 19,
      minX: -19,
    },
    posCar: {
      laneXLeft: -1300,
      laneXRight: 1300,
      laneYBot: 850,
      laneYTop: 1000,
    },
    posPig: {
      laneXLeft: -1300,
      laneXRight: 1300,
      laneYBot: 1200,
      laneYTop: 1300,
    },
    posWood: [
      { x: -2, y: 5 },
      { x: 0, y: 4 },
      { x: 1, y: 3 },
      { x: -10, y: 3 },
      { x: -6, y: 4 },
      { x: 10, y: 5 },
      { x: 9, y: 3 },
      { x: 10, y: 4 },
      { x: 15, y: 4 },
      { x: 20, y: 5 },
      { x: -20, y: 5 },
    ],
    posFinishLine: [{ x: 0, y: 35 }],
    posRoad: [
      { x: -10, y: 18 },
      { x: 10, y: 18 },
    ],
    posWater: [
      { x: -20, y: 4 },
      { x: -9, y: 4 },
      { x: 2, y: 4 },
      { x: 13, y: 4 },
      { x: 24, y: 4 },
    ],
    posFloor: [
      { x: -16, y: 21 },
      { x: 3, y: 21 },
      { x: 15, y: 21 },
      { x: -16, y: 15 },
      { x: 5, y: 15 },
      { x: 15, y: 15 },
    ],
    posTrees: [
      { x: 22, y: 30 },
      { x: 18, y: 26 },
      { x: -22, y: 27 },
      { x: -18, y: 28 },
      { x: 18, y: -2 },
      { x: 14, y: -1 },
      { x: -16, y: -4 },
      { x: -20, y: -2 },
      { x: -6, y: 2 },
      { x: -20, y: 29 },
      { x: 20, y: 29 },
      { x: 17, y: 30 },
      { x: 10, y: 7 },
    ],
    posBush: [
      { x: -15, y: -4 },
      { x: 5, y: -2 },
      { x: 10, y: 15 },
      { x: -5, y: 23 },
      { x: -17, y: 10 },
      { x: 16, y: 24 },
    ],
    posFence: [
      { x: 10, y: 34 },
      { x: -10, y: 34 },
      { x: 20, y: 31 },
      { x: -20, y: 31 },
    ],
  },
  {
    id: 6,
    posCamera: {
     
    },
    posWall: {
      
    },
    posCar: {
     
    },
    posPig: {
     
    },
    posWood: [
      
    ],
    posFinishLine: [],
    posRoad: [
     
    ],
    posWater: [
     
    ],
    posFloor: [
      
    ],
    posTrees: [
      
    ],
    posBush: [
      
    ],
    posFence: [
      
    ],
  },
];

export const step = 50;
