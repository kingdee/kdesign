import React, { useContext } from 'react'
import classnames from 'classnames'

import Week from './panel/week/week'
import Context from './context'
import {
  getStartOfWeek,
  getStartOfMonth,
  addWeeks,
  addDays,
  getWeekdayShortInLocale,
  getWeekdayMinInLocale,
} from './utils/date-fns'
import { DateType, PickerMode, SharedTimeProps } from './interface'
import { RangeShowTimeObject } from './range-picker'

export interface CalendarProps {
  picker: PickerMode
  useWeekdaysShort?: boolean
  showWeekNumber?: boolean
  showWeeksTitle?: boolean
  showTime?: boolean | SharedTimeProps | RangeShowTimeObject
  disabledDate?: (date: DateType) => boolean
}

const DATE_ROW_COUNT = 6

function Calendar(props: CalendarProps) {
  const context = useContext(Context)
  const { prefixCls, viewDate } = context
  const { picker, useWeekdaysShort, showWeekNumber, showWeeksTitle, showTime, disabledDate } = props

  // const isWeekInMonth = (startOfWeek: DateType) => {
  //   const endOfWeek = addDays(startOfWeek, 6)
  //   return isSameMonth(startOfWeek, viewDate) || isSameMonth(endOfWeek, viewDate)
  // }

  // 获取title部分 周的格式
  const formatWeekday = (day: Date) => {
    return useWeekdaysShort ? getWeekdayShortInLocale(day) : getWeekdayMinInLocale(day)
  }

  // const getEffectTime = () => {

  // }

  const renderWeeksTitle = () => {
    const startOfWeek = getStartOfWeek(viewDate)
    const dayNames = []
    const weekTitleCls = classnames(`${prefixCls}-weektitle`)
    const weekTitleItemCls = classnames(`${prefixCls}-weektitle-item`)
    if (showWeekNumber) {
      const weekTitleNumberItemCls = classnames(`${prefixCls}-weektitle-weeknumber`)
      dayNames.push(<div key="W" className={weekTitleNumberItemCls}></div>)
    }
    return (
      <div className={weekTitleCls}>
        {dayNames.concat(
          [0, 1, 2, 3, 4, 5, 6].map((offset) => {
            const day = addDays(startOfWeek, offset)
            const weekDayName = formatWeekday(day)

            return (
              <div key={offset} className={weekTitleItemCls}>
                {weekDayName}
              </div>
            )
          }),
        )}
      </div>
    )
  }

  const renderWeeks = () => {
    let currentWeekStart = getStartOfWeek(getStartOfMonth(viewDate))
    const weeks = []
    let i = 0

    while (true) {
      weeks.push(
        <Week
          key={i}
          day={currentWeekStart}
          picker={picker}
          showWeekNumber={showWeekNumber}
          showTime={!!showTime}
          disabledDate={disabledDate}
        />,
      )

      i++
      currentWeekStart = addWeeks(currentWeekStart, 1)

      // 最少保证面板包含有六周，保证左右面板及切换面板时周数一致
      if (i >= DATE_ROW_COUNT) {
        break
      }

      // const isNonFixedAndOutOfMonth = !isWeekInMonth(currentWeekStart)
      // if (panelPosition) {
      //   // range 模式时，最少保证面板包含有六周，保证左右面板周数一致
      //   if (i >= DATE_ROW_COUNT) {
      //     break
      //   }
      // } else {
      //   if (isNonFixedAndOutOfMonth) {
      //     break
      //   }
      // }
    }

    return weeks
  }

  const calendarCls = classnames(`${prefixCls}-calendar`)
  const calendarWarpperCls = classnames(`${prefixCls}-calendar-warpper`)
  // let _showWeeksTitle
  // if (picker === 'date' || picker === 'week') {
  //   _showWeeksTitle = showWeeksTitle
  // }
  return (
    <div className={calendarCls}>
      {showWeeksTitle ? renderWeeksTitle() : null}
      <div className={calendarWarpperCls}>{renderWeeks()}</div>
    </div>
  )
}

export default Calendar
