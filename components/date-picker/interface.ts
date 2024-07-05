import { BorderType, InputSiteType } from '../input/input'
import { DisabledDataProps } from './date-picker'

export type WeekTitleType = [string, string, string, string, string, string, string]
export type MonthTitleType = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
]

export interface Locale {
  // locale: string
  'DatePicker.placeholder': string
  'DatePicker.yearPlaceholder': string
  'DatePicker.quarterPlaceholder': string
  'DatePicker.monthPlaceholder': string
  'DatePicker.weekPlaceholder': string
  'DatePicker.timePlaceholder': string
  'DatePicker.now': string
  'DatePicker.confrim': string
  'DatePicker.today': string
  'DatePicker.year': string
  'DatePicker.month': string
  'DatePicker.weekTitle': WeekTitleType
  'DatePicker.monthTitle': MonthTitleType
  'DatePicker.rangePlaceholder': [string, string]
  'DatePicker.rangeYearPlaceholder': [string, string]
  'DatePicker.rangeMonthPlaceholder': [string, string]
  'DatePicker.rangeWeekPlaceholder': [string, string]
  'DatePicker.rangeQuarterPlaceholder': [string, string]
  'DatePicker.rangeTimePlaceholder': [string, string]
}

export interface InnerLocale {
  locale: string
  placeholder: string
  yearPlaceholder: string
  quarterPlaceholder: string
  monthPlaceholder: string
  weekPlaceholder: string
  timePlaceholder: string
  now: string
  confrim: string
  today: string
  year: string
  month: string
  weekTitle: WeekTitleType
  monthTitle: MonthTitleType
  rangePlaceholder: [string, string]
  rangeYearPlaceholder: [string, string]
  rangeMonthPlaceholder: [string, string]
  rangeWeekPlaceholder: [string, string]
  rangeQuarterPlaceholder: [string, string]
  rangeTimePlaceholder: [string, string]
}

export type InnerLocaleKey = keyof InnerLocale

export type PanelMode = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year' | 'decade'

export type PickerMode = Exclude<PanelMode, 'datetime' | 'decade'>

export type DateType = Date

export type CustomFormat = (value: DateType) => string

export type DateFormat = string

export type DateFormats = Array<string>

export type NullableDateType = DateType | null | undefined

export type OnSelect = (value: DateType, type: 'key' | 'mouse' | 'submit') => void
export interface DisabledTimes {
  disabledHours?: () => number[]
  disabledMinutes?: (hour: number) => number[]
  disabledSeconds?: (hour: number, minute: number) => number[]
}

export type DisabledTime = (date: DateType | null) => DisabledTimes

export type OnPanelChange = (value: DateType, mode: PanelMode) => void

export type EventValue = DateType | null
export type RangeValue = [EventValue, EventValue] | null

export type RangeList = {
  label: string
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}[]

export interface Components {
  button?: React.ComponentType | string
  rangeItem?: React.ComponentType | string
}

export interface PanelSharedProps {
  value?: NullableDateType
  defaultPickerValue?: DateType
  locale: InnerLocale
  disabledDate?: DisabledDataProps

  prevIcon?: React.ReactNode
  nextIcon?: React.ReactNode
  superPrevIcon?: React.ReactNode
  superNextIcon?: React.ReactNode

  // 面板操作（焦点操作、键盘操作）next version
  // operationRef: React.MutableRefObject<PanelRefProps>

  // onPanelChange: (mode: PanelMode | null, viewValue: DateType) => void
}

export type DateRender = (currentDate: DateType, today: DateType) => React.ReactNode

export type CellRender = (currentDate: DateType) => React.ReactNode

export type RangeType = 'start' | 'end'

export interface RangeInfo {
  range: RangeType
}

export type RangeDateRender = (currentDate: DateType, today: DateType, info: RangeInfo) => React.ReactNode

export interface SharedTimeProps extends DisabledTimes {
  format?: string
  showNow?: boolean
  showHour?: boolean
  showMinute?: boolean
  showSecond?: boolean
  use12Hours?: boolean
  hourStep?: number
  minuteStep?: number
  secondStep?: number
  hideDisabledOptions?: boolean
  defaultValue?: DateType
}

export interface OutInputCommonProps {
  format: DateFormat
  picker: PickerMode
  id?: string
  autoFocus?: boolean
  allowClear?: boolean
  className?: string
  borderType?: BorderType
  style?: React.CSSProperties
  size?: InputSiteType
  readOnly?: boolean
  suffixIcon?: React.ReactNode
  clearIcon?: React.ReactNode

  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
  onClick?: React.MouseEventHandler<HTMLDivElement>
  onContextMenu?: React.MouseEventHandler<HTMLDivElement>
}

export interface InputCommonProps {
  panelDivRef: React.RefObject<HTMLDivElement>
  needConfirmButton: boolean
  open: boolean
  prefixCls: string
  locale: InnerLocale
  dataOrAriaProps?: Record<string, any>
  status?: 'error'
}

export interface OutPopperProps {
  dropdownClassName?: string
  popupStyle?: React.CSSProperties
  showArrow?: boolean
}

export interface TimeUnit {
  label: React.ReactText
  value: number
  disabled: boolean
}
