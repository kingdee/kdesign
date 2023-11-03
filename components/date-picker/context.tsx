import * as React from 'react'
import { DateType, InnerLocale, RangeValue, TimeUnit } from './interface'
import { CellRenderProp, IInnerPicker } from './date-picker'

export type ContextOperationRefProps = {
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => boolean
  onClose?: () => void
}

export type ISelectType = 'key' | 'mouse' | 'submit' | 'inner'

export interface SingleContextProps {
  prefixCls: string
  viewDate: DateType
  locale: InnerLocale
  dateValue?: DateType | null
  rangeValue?: RangeValue
  hoverRangedValue?: RangeValue
  panelPosition?: 'right' | 'left'
  open?: boolean
  originHour?: number
  minute?: number
  second?: number
  hours?: TimeUnit[]
  minutes?: TimeUnit[]
  seconds?: TimeUnit[]
  disabledTimePanel?: boolean
  setViewDate: (date: DateType, index?: 0 | 1) => void
  onSelect: (date: DateType, type: ISelectType) => void
  onDateMouseEnter: (date: DateType) => void
  onDateMouseLeave: (arg?: boolean) => void
  innerPicker: IInnerPicker
  setInnerPicker: (p: IInnerPicker) => void
  cellRender?: CellRenderProp
  range?: 'start' | 'end'
}

const Context = React.createContext<SingleContextProps>({} as SingleContextProps)

export default Context
