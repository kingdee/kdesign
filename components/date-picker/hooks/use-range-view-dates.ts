import * as React from 'react'
import { RangeValue, PickerMode, DateType } from '../interface'
import { getValue, updateValues, getClosingViewDate } from '../utils'
import { newDate, isSameYear, isSameMonth, isValid } from '../utils/date-fns'

function getStartEndDistance(startDate: DateType, endDate: DateType, picker: PickerMode): 'same' | 'closing' | 'far' {
  const startNext = getClosingViewDate(startDate, picker, 1)

  function getDistance(compareFunc: (start: DateType | null, end: DateType | null) => boolean) {
    if (compareFunc(startDate, endDate)) {
      return 'same'
    }
    if (compareFunc(startNext, endDate)) {
      return 'closing'
    }
    return 'far'
  }

  switch (picker) {
    case 'quarter':
    case 'month':
      return getDistance((start, end) => isSameYear(start, end))
    default:
      return getDistance((start, end) => isSameMonth(start, end))
  }
}

function getRangeViewDate(values: RangeValue, index: 0 | 1, picker: PickerMode): DateType | null {
  const startDate = getValue(values, 0)
  const endDate = getValue(values, 1)

  if (index === 0) {
    return startDate
  }

  if (startDate && endDate) {
    const distance = getStartEndDistance(startDate, endDate, picker)
    switch (distance) {
      case 'same':
        return startDate
      case 'closing':
        return startDate
      default:
        return getClosingViewDate(endDate, picker, -1)
    }
  }

  return startDate
}

function checkViewDate(value: DateType | null) {
  if (value && !isValid(value)) {
    return false
  }
  return value
}

export default function useRangeViewDates({
  values,
  picker,
  defaultDates,
}: {
  values: RangeValue
  picker: PickerMode
  defaultDates: RangeValue | undefined
}): [(activePickerIndex: 0 | 1) => DateType, (viewDate: DateType | null, index: 0 | 1) => void] {
  const [defaultViewDates, setDefaultViewDates] = React.useState<[DateType | null, DateType | null]>(() => [
    getValue(defaultDates, 0),
    getValue(defaultDates, 1),
  ])
  const [viewDates, setInternalViewDates] = React.useState<RangeValue>(null)

  const startDate = getValue(values, 0)
  const endDate = getValue(values, 1)

  function getViewDate(index: 0 | 1): DateType {
    if (defaultViewDates[index]) {
      return defaultViewDates[index]!
    }
    return (
      checkViewDate(getValue(viewDates, index)) ||
      checkViewDate(getRangeViewDate(values, index, picker)) ||
      checkViewDate(startDate) ||
      checkViewDate(endDate) ||
      newDate()!
    )
  }

  function setViewDate(viewDate: DateType | null, index: 0 | 1) {
    if (viewDate) {
      let newViewDates = updateValues(viewDates, viewDate, index)
      setDefaultViewDates(updateValues(defaultViewDates, null, index) || [null, null])

      const anotherIndex = (index + 1) % 2
      if (!getValue(values, anotherIndex)) {
        newViewDates = updateValues(newViewDates, viewDate, anotherIndex)
      }

      setInternalViewDates(newViewDates)
    } else if (startDate || endDate) {
      setInternalViewDates(null)
    }
  }

  return [getViewDate, setViewDate]
}
