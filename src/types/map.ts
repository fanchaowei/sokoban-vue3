export interface IPosition {
  x: number
  y: number
}

export const enum MapTile {
  WALL = 1,
  FLOOR = 2,
}

export type IMap = MapTile[][]
