import { tuple } from '../_utils/type'
export const Statuses = tuple('wait', 'process', 'finish', 'error')
export type Status = typeof Statuses[number]
export interface Icons {
  finish?: React.ReactNode
  error?: React.ReactNode
  wait?: React.ReactNode
  process?: React.ReactNode
}

export const Directions = tuple('horizontal', 'vertical')
export type Direction = typeof Directions[number]

export const LabelPlacements = tuple('left', 'right', 'top', 'bottom')
export type LabelPlacement = typeof LabelPlacements[number]
