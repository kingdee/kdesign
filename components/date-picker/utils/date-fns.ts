import isDate from 'date-fns/isDate'
import isValidDate from 'date-fns/isValid'
import format from 'date-fns/format'
import addMinutes from 'date-fns/addMinutes'
import addHours from 'date-fns/addHours'
import addDays from 'date-fns/addDays'
import addWeeks from 'date-fns/addWeeks'
import addMonths from 'date-fns/addMonths'
import addYears from 'date-fns/addYears'
import subMinutes from 'date-fns/subMinutes'
import subHours from 'date-fns/subHours'
import subDays from 'date-fns/subDays'
import subWeeks from 'date-fns/subWeeks'
import subMonths from 'date-fns/subMonths'
import subYears from 'date-fns/subYears'
import getSeconds from 'date-fns/getSeconds'
import getMinutes from 'date-fns/getMinutes'
import getHours from 'date-fns/getHours'
import getDay from 'date-fns/getDay'
import getDate from 'date-fns/getDate'
import dfgetWeek from 'date-fns/getWeek'
import getMonth from 'date-fns/getMonth'
import getQuarter from 'date-fns/getQuarter'
import getYear from 'date-fns/getYear'
import getTime from 'date-fns/getTime'
import setSeconds from 'date-fns/setSeconds'
import setMinutes from 'date-fns/setMinutes'
import setHours from 'date-fns/setHours'
import setMonth from 'date-fns/setMonth'
import setQuarter from 'date-fns/setQuarter'
import setYear from 'date-fns/setYear'
import startOfDay from 'date-fns/startOfDay'
import startOfWeek from 'date-fns/startOfWeek'
import startOfMonth from 'date-fns/startOfMonth'
import startOfQuarter from 'date-fns/startOfQuarter'
import startOfYear from 'date-fns/startOfYear'
import endOfWeek from 'date-fns/endOfWeek'
import dfIsEqual from 'date-fns/isEqual'
import dfIsSameDay from 'date-fns/isSameDay'
import dfIsSameMonth from 'date-fns/isSameMonth'
import dfIsSameYear from 'date-fns/isSameYear'
import dfIsSameQuarter from 'date-fns/isSameQuarter'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import toDate from 'date-fns/toDate'
import parse from 'date-fns/parse'
import parseISO from 'date-fns/parseISO'

import { DateFormat, DateType, InnerLocale } from '../interface'

export const DEFAULT_YEAR_ITEM_NUMBER = 12
function parseWeek(text: string) {
  const matchText = text.match(/[-\d]+/g)
  if (!matchText || matchText![0] !== text) {
    return null
  }
  const year = matchText!.join('').split('-')[0]
  const weekStr = matchText!.join('').split('-')[1]
  if (year && weekStr) {
    const firstDate = startOfYear(new Date(year))
    for (let j = 0; j <= 52; j += 1) {
      const nextWeek = addWeeks(firstDate, j)
      const nextWeekStr = format(nextWeek, 'w')
      if (nextWeekStr === weekStr) {
        return nextWeek
      }
    }
  }
  return null
}

export const localeParse = (format: string) => {
  return format
    .replace(/Y/g, 'y')
    .replace(/D/g, 'd')
    .replace(/gggg/, 'yyyy')
    .replace(/g/g, 'G')
    .replace(/([Ww])o/g, 'wo')
}

export function isNullEqual<T>(value1: T, value2: T): boolean | undefined {
  if (!value1 && !value2) {
    return true
  }
  if (!value1 || !value2) {
    return false
  }
  return undefined
}

export function newDate<DateType extends Date | string | number>(value?: DateType) {
  const d = value
    ? typeof value === 'string' || value instanceof String
      ? parseISO(value as string)
      : toDate(value as Date | number)
    : new Date()
  return isValid(d) ? d : null
}

export function parseDate(value: string, dateFormat: DateFormat, locale?: InnerLocale): Date | null {
  let parsedDate = null
  const strictParsingValueMatch = true

  if (dateFormat.includes('wo')) {
    return parseWeek(value)
  }

  // If locale has months/monthsShort, replace locale month names with numeric values before parsing
  let normalizedValue = value
  let normalizedFormat = dateFormat
  if (locale) {
    if (dateFormat.includes('MMMM') && locale.months) {
      // Sort by length descending to match longest first (e.g., "十一月" before "一月")
      const sortedIndices = locale.months
        .map((m, i) => ({ name: m, index: i }))
        .sort((a, b) => b.name.length - a.name.length)
      const matched = sortedIndices.find(({ name }) => value.includes(name))
      if (matched) {
        normalizedValue = normalizedValue.replace(matched.name, String(matched.index + 1).padStart(2, '0'))
        normalizedFormat = normalizedFormat.replace('MMMM', 'MM')
      }
    } else if (dateFormat.includes('MMM') && locale.monthsShort) {
      const sortedIndices = locale.monthsShort
        .map((m, i) => ({ name: m, index: i }))
        .sort((a, b) => b.name.length - a.name.length)
      const matched = sortedIndices.find(({ name }) => value.includes(name))
      if (matched) {
        normalizedValue = normalizedValue.replace(matched.name, String(matched.index + 1).padStart(2, '0'))
        normalizedFormat = normalizedFormat.replace('MMM', 'MM')
      }
    }
  }

  parsedDate = parse(normalizedValue, localeParse(normalizedFormat), new Date())
  if (!isValid(parsedDate)) {
    if (normalizedValue.length > 0) {
      parsedDate = parse(normalizedValue, localeParse(normalizedFormat).slice(0, normalizedValue.length), new Date())
    }

    if (!isValid(parsedDate)) {
      parsedDate = new Date(normalizedValue)
    }
  }

  return isValid(parsedDate) && strictParsingValueMatch ? parsedDate : null
}

export { isDate }

export function isValid(date: DateType) {
  return isValidDate(date) && isAfter(date, new Date('1/1/1000'))
}

export function formatDate(date: DateType, _format: DateFormat, _locale?: string | InnerLocale) {
  if (!isValid(date)) {
    return null
  }

  // If locale object is provided and format contains MMM/MMMM, replace with locale month names
  if (_locale && typeof _locale === 'object') {
    const monthIndex = getMonth(date)
    let result = localeParse(_format)

    // Replace MMMM (full month name) first, then MMM (short month name)
    // Escape single quotes in month names to avoid breaking date-fns literal syntax
    if (result.includes('MMMM') && _locale.months) {
      const escaped = _locale.months[monthIndex].replace(/'/g, "''")
      result = result.replace(/MMMM/g, `'${escaped}'`)
    } else if (result.includes('MMM') && _locale.monthsShort) {
      const escaped = _locale.monthsShort[monthIndex].replace(/'/g, "''")
      result = result.replace(/MMM/g, `'${escaped}'`)
    }

    return format(date, result)
  }

  return format(date, localeParse(_format))
}

export function setTime(date: DateType, { hour = 0, minute = 0, second = 0 }) {
  return setHours(setMinutes(setSeconds(date, second), minute), hour)
}

export { setMinutes, setHours, setMonth, setQuarter, setYear }

export { getSeconds, getMinutes, getHours, getMonth, getQuarter, getYear, getDay, getDate, getTime }

export function getWeek(date: DateType) {
  return dfgetWeek(date)
}

export function getStartOfDay(date: DateType) {
  return startOfDay(date)
}

export function getStartOfWeek(date: DateType) {
  return startOfWeek(date)
}

export function getStartOfMonth(date: DateType) {
  return startOfMonth(date)
}

export function getStartOfYear(date: DateType) {
  return startOfYear(date)
}

export function getStartOfQuarter(date: DateType) {
  return startOfQuarter(date)
}

export function getEndOfWeek(date: DateType) {
  return endOfWeek(date)
}

export { addMinutes, addDays, addWeeks, addMonths, addYears, addHours }

export { subMinutes, subHours, subDays, subWeeks, subMonths, subYears }

export { isBefore, isAfter }

export function isSameYear(date1: DateType | null, date2: DateType | null) {
  const equal = isNullEqual(date1, date2)
  if (typeof equal === 'boolean') {
    return equal
  }
  if (date1 && date2) {
    return dfIsSameYear(date1, date2)
  } else {
    return !date1 && !date2
  }
}

export function isSameMonth(date1: DateType | null, date2: DateType | null) {
  const equal = isNullEqual(date1, date2)
  if (typeof equal === 'boolean') {
    return equal
  }
  if (date1 && date2) {
    return dfIsSameMonth(date1, date2)
  } else {
    return !date1 && !date2
  }
}

export function isSameQuarter(date1: DateType | null, date2: DateType | null) {
  const equal = isNullEqual(date1, date2)
  if (typeof equal === 'boolean') {
    return equal
  }
  if (date1 && date2) {
    return dfIsSameQuarter(date1, date2)
  } else {
    return !date1 && !date2
  }
}

export function isSameDay(date1: DateType | null, date2: DateType | null) {
  const equal = isNullEqual(date1, date2)
  if (typeof equal === 'boolean') {
    return equal
  }
  if (date1 && date2) {
    return dfIsSameDay(date1, date2)
  } else {
    return !date1 && !date2
  }
}

export function isEqual(date1: DateType | null, date2: DateType | null) {
  if (date1 && date2) {
    return dfIsEqual(date1, date2)
  } else {
    return !date1 && !date2
  }
}

export function getFormattedWeekdayInLocale(date: DateType, formatFunc: (a: string | null) => void, locale: string) {
  return formatFunc(formatDate(date, 'EEEE', locale))
}

export function getWeekdayMinInLocale(date: DateType, locale?: string) {
  return formatDate(date, 'EEEEEE', locale)
}

export function getWeekdayShortInLocale(date: DateType, locale?: string) {
  return formatDate(date, 'EEE', locale)
}

export function getMonthInLocale(month: number, locale: string) {
  return formatDate(setMonth(newDate() as Date, month), 'LLLL', locale)
}

export function getMonthShortInLocale(month: number, locale: string) {
  return formatDate(setMonth(newDate() as Date, month), 'LLL', locale)
}

export function getQuarterShortInLocale(quarter: number, locale: string) {
  return formatDate(setQuarter(newDate() as Date, quarter), 'QQQ', locale)
}

export function getYearsPeriod(date: DateType, yearItemNumber: number) {
  const endPeriod = Math.ceil(getYear(date) / yearItemNumber) * yearItemNumber
  const startPeriod = endPeriod - (yearItemNumber - 1)
  return { startPeriod, endPeriod }
}

export function getLowerBoundTime(
  hour: number,
  minute: number,
  second: number,
  hourStep: number,
  minuteStep: number,
  secondStep: number,
): [number, number, number] {
  const lowerBoundHour = Math.floor(hour / hourStep) * hourStep
  if (lowerBoundHour < hour) {
    return [lowerBoundHour, 60 - minuteStep, 60 - secondStep]
  }
  const lowerBoundMinute = Math.floor(minute / minuteStep) * minuteStep
  if (lowerBoundMinute < minute) {
    return [lowerBoundHour, lowerBoundMinute, 60 - secondStep]
  }
  const lowerBoundSecond = Math.floor(second / secondStep) * secondStep
  return [lowerBoundHour, lowerBoundMinute, lowerBoundSecond]
}

export const setYearOrMonthOfDate = (date1: DateType, date2: DateType, type = 'year') => {
  const d1 = new Date(date1 || 0)
  const d2 = new Date(date2 || 0)

  if (type === 'year' && d1.getFullYear() !== d2.getFullYear()) {
    d1.setDate(1)
    d1.setFullYear(d2.getFullYear())
  }

  if (type === 'month' && d1.getMonth() !== d2.getMonth()) {
    d1.setDate(1)
    d1.setMonth(d2.getMonth())
  }

  return d1
}
