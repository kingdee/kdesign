import { addMonths, addYears } from 'date-fns'
import { DateFormat, DateType, InnerLocale, PanelMode, PickerMode, SharedTimeProps, TimeUnit } from '../interface'
import { DEFAULT_YEAR_ITEM_NUMBER, localeParse } from './date-fns'

export function toArray<T>(val: T | T[]): T[] {
  if (val === null || val === undefined) {
    return []
  }

  return Array.isArray(val) ? val : [val]
}

export function getValue<T>(values: null | undefined | (T | null)[], index: number): T | null {
  return values ? values[index] : null
}
type UpdateValue<T> = (prev: T) => T

export function updateValues<T, R = [T | null, T | null] | null>(
  values: [T | null, T | null] | null,
  value: T | UpdateValue<T>,
  index: number,
): R {
  const newValues: [T | null, T | null] = [getValue(values, 0), getValue(values, 1)]

  newValues[index] = typeof value === 'function' ? (value as UpdateValue<T | null>)(newValues[index]) : value

  if (!newValues[0] && !newValues[1]) {
    return null as unknown as R
  }

  return newValues as unknown as R
}

export function getClosingViewDate(
  viewDate: DateType,
  picker: PickerMode,
  offset = 1,
  yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER,
): DateType {
  switch (picker) {
    case 'year':
      return addYears(viewDate, offset * yearItemNumber)
    case 'quarter':
    case 'month':
      return addYears(viewDate, offset)
    default:
      return addMonths(viewDate, offset)
  }
}

export function getDefaultFormat(
  format: DateFormat | undefined,
  picker: PickerMode | undefined,
  showTime?:
    | boolean
    | SharedTimeProps
    | (Omit<SharedTimeProps, 'defaultValue'> & {
        defaultValue?: DateType[]
      }),
  use12Hours?: boolean,
) {
  let mergedFormat = format
  if (!mergedFormat) {
    switch (picker) {
      case 'time':
        mergedFormat = use12Hours ? 'hh:mm:ss a' : 'HH:mm:ss'
        break

      case 'week':
        mergedFormat = 'gggg-wo'
        break

      case 'month':
        mergedFormat = 'YYYY-MM'
        break

      case 'quarter':
        mergedFormat = 'YYYY-QQQ'
        break

      case 'year':
        mergedFormat = 'YYYY'
        break

      default:
        if (showTime) {
          if (use12Hours) {
            mergedFormat = 'YYYY-MM-DD hh:mm:ss a'
          } else {
            mergedFormat = 'YYYY-MM-DD HH:mm:ss'
          }
        } else {
          mergedFormat = 'YYYY-MM-DD'
        }
    }
    mergedFormat = localeParse(mergedFormat)
  }

  return mergedFormat
}

export function getPlaceholder(
  picker: PickerMode | undefined,
  locale: InnerLocale,
  customizePlaceholder?: string,
): string {
  if (customizePlaceholder !== undefined) {
    return customizePlaceholder
  }

  if (picker === 'year' && locale.yearPlaceholder) {
    return locale.yearPlaceholder
  }
  if (picker === 'quarter' && locale.quarterPlaceholder) {
    return locale.quarterPlaceholder
  }
  if (picker === 'month' && locale.monthPlaceholder) {
    return locale.monthPlaceholder
  }
  if (picker === 'week' && locale.weekPlaceholder) {
    return locale.weekPlaceholder
  }
  if (picker === 'time' && locale.timePlaceholder) {
    return locale.timePlaceholder
  }
  return locale.placeholder
}

export function getRangePlaceholder(
  picker: PickerMode | undefined,
  locale: InnerLocale,
  customizePlaceholder?: [string, string],
) {
  if (customizePlaceholder !== undefined) {
    return customizePlaceholder
  }

  if (picker === 'year' && locale.rangeYearPlaceholder) {
    return locale.rangeYearPlaceholder
  }
  if (picker === 'quarter' && locale.rangeQuarterPlaceholder) {
    return locale.rangeQuarterPlaceholder
  }
  if (picker === 'month' && locale.rangeMonthPlaceholder) {
    return locale.rangeMonthPlaceholder
  }
  if (picker === 'week' && locale.rangeWeekPlaceholder) {
    return locale.rangeWeekPlaceholder
  }
  if (picker === 'time' && locale.rangeTimePlaceholder) {
    return locale.rangeTimePlaceholder
  }
  return locale.rangePlaceholder
}

export function elementsContains(elements: (HTMLElement | undefined | null)[], target: HTMLElement) {
  return elements.some((ele) => ele && ele.contains(target))
}

export function getInputSize(picker: PickerMode | undefined, format: DateFormat) {
  const defaultSize = picker === 'time' ? 8 : 10
  const length = format.length
  return Math.max(defaultSize, length) + 2
}

export function getDataOrAriaProps(props: any) {
  const retProps: any = {}

  Object.keys(props).forEach((key) => {
    if (
      (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role' || key === 'name') &&
      key.substr(0, 7) !== 'data-__'
    ) {
      retProps[key] = props[key]
    }
  })

  return retProps
}

export function getTimeProps(props: { format?: string; picker?: PickerMode } & SharedTimeProps) {
  const { format, picker, showHour, showMinute, showSecond, use12Hours } = props

  const firstFormat = toArray(format)[0]
  const showTimeObj: SharedTimeProps = { ...props }

  if (firstFormat) {
    if (!firstFormat.includes('s') && showSecond === undefined) {
      showTimeObj.showSecond = false
    }
    if (!firstFormat.includes('m') && showMinute === undefined) {
      showTimeObj.showMinute = false
    }
    if (!firstFormat.includes('H') && !firstFormat.includes('h') && showHour === undefined) {
      showTimeObj.showHour = false
    }

    if ((firstFormat.includes('a') || firstFormat.includes('A')) && use12Hours === undefined) {
      showTimeObj.use12Hours = true
    }
  }

  if (picker === 'time') {
    return showTimeObj
  }

  return {
    showTime: showTimeObj,
  }
}

export function leftPad(str: string | number, length: number, fill = '0') {
  let current = String(str)
  while (current.length < length) {
    current = `${fill}${str}`
  }
  return current
}

export function isVisible(element: HTMLElement | SVGGraphicsElement): boolean {
  if (!element) {
    return false
  }

  if ((element as HTMLElement).offsetParent) {
    return true
  }

  if (element instanceof SVGGraphicsElement) {
    const box = (element as SVGGraphicsElement).getBBox()
    if (box.width || box.height) {
      return true
    }
  }

  if (element instanceof HTMLElement) {
    const box = (element as HTMLElement).getBoundingClientRect()
    if (box.width || box.height) {
      return true
    }
  }

  return false
}

let raf = (callback: FrameRequestCallback) => +setTimeout(callback, 16)
let caf = (num: number) => clearTimeout(num)

if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
  raf = (callback: FrameRequestCallback) => window.requestAnimationFrame(callback)
  caf = (handle: number) => window.cancelAnimationFrame(handle)
}
function wrapperRaf(callback: () => void): number {
  return raf(callback)
}

wrapperRaf.cancel = caf

export function waitElementReady(element: HTMLElement, callback: () => void): () => void {
  let id: number

  function tryOrNextFrame() {
    if (isVisible(element)) {
      callback()
    } else {
      id = wrapperRaf(() => {
        tryOrNextFrame()
      })
    }
  }

  tryOrNextFrame()

  return () => {
    wrapperRaf.cancel(id)
  }
}

const scrollIds = new Map<HTMLElement, number>()

/* eslint-disable no-param-reassign */
export function scrollTo(element: HTMLElement, to: number, duration: number) {
  if (scrollIds.get(element)) {
    cancelAnimationFrame(scrollIds.get(element)!)
  }

  if (duration <= 0) {
    scrollIds.set(
      element,
      requestAnimationFrame(() => {
        element.scrollTop = to
      }),
    )

    return
  }
  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10

  scrollIds.set(
    element,
    requestAnimationFrame(() => {
      element.scrollTop += perTick
      if (element.scrollTop !== to) {
        scrollTo(element, to, duration - 10)
      }
    }),
  )
}

const getYearNextMode = (next: PanelMode): PanelMode => {
  if (next === 'month' || next === 'date') {
    return 'year'
  }
  return next
}

const getMonthNextMode = (next: PanelMode): PanelMode => {
  if (next === 'date') {
    return 'month'
  }
  return next
}

const getQuarterNextMode = (next: PanelMode): PanelMode => {
  if (next === 'month' || next === 'date') {
    return 'quarter'
  }
  return next
}

const getWeekNextMode = (next: PanelMode): PanelMode => {
  if (next === 'date') {
    return 'week'
  }
  return next
}

export const PickerModeMap: Record<PickerMode, ((next: PanelMode) => PanelMode) | null> = {
  year: getYearNextMode,
  month: getMonthNextMode,
  quarter: getQuarterNextMode,
  week: getWeekNextMode,
  time: null,
  date: null,
}

export const getInternalNextMode = (nextMode: PanelMode, picker: PickerMode): PanelMode => {
  const getNextMode = PickerModeMap[picker]
  if (getNextMode) {
    return getNextMode(nextMode)
  }

  return nextMode
}

export const generateUnits = (start: number, end: number, step: number, disabledUnits: number[] | undefined) => {
  const units: TimeUnit[] = []
  for (let i = start; i <= end; i += step) {
    units.push({
      label: leftPad(i, 2),
      value: i,
      disabled: (disabledUnits || []).includes(i),
    })
  }
  return units
}
