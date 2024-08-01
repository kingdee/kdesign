import * as React from 'react'
import { RangeValue, PickerMode, DateType } from '../interface'
import { getValue } from '../utils'
import { getWeek, getQuarter, getMonth, getYear, isSameDay, isAfter } from '../utils/date-fns'
import { DisabledDataProps } from '../date-picker'

export default function useRangeDisabled(
  {
    picker,
    selectedValue,
    disabledDate,
    disabled,
  }: {
    picker: PickerMode
    selectedValue: RangeValue
    disabledDate?: DisabledDataProps
    disabled: [boolean, boolean]
  },
  disabledStart: boolean,
  disabledEnd: boolean,
) {
  const startDate = getValue(selectedValue, 0)
  const endDate = getValue(selectedValue, 1)

  function weekNumber(date: DateType) {
    const year = getYear(date)
    const week = getWeek(date)
    return year * 100 + week
  }

  function monthNumber(date: DateType) {
    const year = getYear(date)
    const month = getMonth(date)
    return year * 100 + month
  }

  function quarterNumber(date: DateType) {
    const year = getYear(date)
    const quarter = getQuarter(date)
    return year * 10 + quarter
  }

  const disabledStartDate = React.useCallback(
    (date: DateType, info = undefined) => {
      if (disabledDate && disabledDate(date, info)) {
        return true
      }

      if (disabled[1] && endDate) {
        return !isSameDay(date, endDate) && isAfter(date, endDate)
      }

      if (disabledStart && endDate) {
        switch (picker) {
          case 'quarter':
            return quarterNumber(date) > quarterNumber(endDate)
          case 'month':
            return monthNumber(date) > monthNumber(endDate)
          case 'week':
            return weekNumber(date) > weekNumber(endDate)
          default:
            return !isSameDay(date, endDate) && isAfter(date, endDate)
        }
      }

      return false
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabledDate, disabled[1], endDate, disabledStart],
  )

  const disabledEndDate = React.useCallback(
    (date: DateType, info = undefined) => {
      if (disabledDate && disabledDate(date, info)) {
        return true
      }

      if (disabled[0] && startDate) {
        return !isSameDay(date, endDate) && isAfter(startDate, date)
      }

      if (disabledEnd && startDate) {
        switch (picker) {
          case 'quarter':
            return quarterNumber(date) < quarterNumber(startDate)
          case 'month':
            return monthNumber(date) < monthNumber(startDate)
          case 'week':
            return weekNumber(date) < weekNumber(startDate)
          default:
            return !isSameDay(date, startDate) && isAfter(startDate, date)
        }
      }

      return false
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabledDate, disabled[0], startDate, disabledEnd],
  )

  return [disabledStartDate, disabledEndDate]
}
