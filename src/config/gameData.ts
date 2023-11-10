import type { ILevelGameData, IGameData } from '@/types'

export const levelGameData: ILevelGameData = {
  player: {
    x: 3,
    y: 3,
  },
  map: [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ],
  cargos: [
    {
      x: 4,
      y: 3,
    },
    {
      x: 2,
      y: 3,
    }
  ],
  targets: [
    {
      x: 4,
      y: 4,
    },
    {
      x: 5,
      y: 4,
    }
  ]
}

export const gameData: IGameData = [levelGameData]