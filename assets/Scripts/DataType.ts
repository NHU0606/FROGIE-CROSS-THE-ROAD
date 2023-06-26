import { Vec2 } from "cc";

export const Data = [
  {
    id: 1,
    posWall: {
      maxY : 29,
      minY : -9,
      maxX: 19,
      minX: -19,
    },
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
    posTrees: [
      { x: -16, y: 22 },
      { x: 17, y: 17 },
      { x: 15, y: -1 },
      { x: -14, y: -1 },
      { x: 5, y: 1 },
    ],
    posBush: [
      { x: -5, y: -5 },
      { x: 5, y: -5 },
      { x: 10, y: 15 },
      { x: -5, y: 22 },
      { x: -17, y: 16 },
      { x: 16, y: 24 },
    ],
    posFence: [
      { x: 0, y: 28 },
      { x: -3, y: 28 },
      { x: -2, y: 28 },
      { x: -1, y: 28 },
      { x: 1, y: 28 },
      { x: 2, y: 28 },
      { x: 3, y: 28 },

      { x: 10, y: 26 },
      { x: 13, y: 26 },
      { x: 12, y: 26 },
      { x: 11, y: 26 },
      { x: 9, y: 26 },
      { x: 8, y: 26 },
      { x: 7, y: 26 },

      { x: -10, y: 26 },
      { x: -13, y: 26 },
      { x: -12, y: 26 },
      { x: -11, y: 26 },
      { x: -9, y: 26 },
      { x: -8, y: 26 },
      { x: -7, y: 26 },
    ],
  },
  {
    id: 2,
    posTrees: [
      { x: 0, y: -9 },
    ],
  },
  {
    id: 3,

    pos: [{ x: 200, y: 200 }],
  },
];

export const step = 50;

