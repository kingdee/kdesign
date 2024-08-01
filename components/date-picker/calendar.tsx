import React, { useContext } from 'react'
import classnames from 'classnames'

import Week from './panel/week/week'
import Context from './context'
import { getStartOfWeek, getStartOfMonth, addWeeks } from './utils/date-fns'
import { PickerMode, SharedTimeProps } from './interface'
import { RangeShowTimeObject } from './range-picker'
import { DisabledDataProps } from './date-picker'

export interface CalendarProps {
  picker: PickerMode
  useWeekdaysShort?: boolean
  showWeekNumber?: boolean
  showWeeksTitle?: boolean
  showTime?: boolean | SharedTimeProps | RangeShowTimeObject
  disabledDate?: DisabledDataProps
}

const DATE_ROW_COUNT = 6

function Calendar(props: CalendarProps) {
  const context = useContext(Context)
  const { prefixCls, viewDate, locale } = context
  const { picker, showWeekNumber, showWeeksTitle, showTime, disabledDate } = props

  const renderWeeksTitle = () => {
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
            const weekDayName = locale.weekTitle[offset]

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
