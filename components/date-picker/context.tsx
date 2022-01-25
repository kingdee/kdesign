import * as React from 'react'
import { DateType, InnerLocale, RangeValue, TimeUnit } from './interface'

export type ContextOperationRefProps = {
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => boolean
  onClose?: () => void
}

export interface SingleContextProps {
  prefixCls: string
  viewDate: DateType
  locale: InnerLocale
  dateValue?: DateType | null
  rangeValue?: RangeValue
  hoverRangedValue?: RangeValue
  panelPosition?: string
  open?: boolean
  originHour?: number
  minute?: number
  second?: number
  hours?: TimeUnit[]
  minutes?: TimeUnit[]
  seconds?: TimeUnit[]
  disabledTimePanel?: boolean
  setViewDate: (date: DateType, index?: 0 | 1) => void
  onSelect: (date: DateType, type: 'key' | 'mouse' | 'submit') => void
  onDateMouseEnter: (date: DateType) => void
  onDateMouseLeave: (arg?: boolean) => void
}

const Context = React.createContext<SingleContextProps>({} as SingleContextProps)

export default Context
