import type { IPosition } from './map.ts'

export interface ILevelGameData {
  player: IPosition
  map: number[][]
  cargos: IPosition[]
  targets: IPosition[]
}