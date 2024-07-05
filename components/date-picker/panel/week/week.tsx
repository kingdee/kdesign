import React, { useContext } from 'react'
import classnames from 'classnames'

import Context from '../../context'
import {
  getDate,
  getStartOfWeek,
  addDays,
  newDate,
  getWeek,
  getMonth,
  isAfter,
  isSameMonth,
  getEndOfWeek,
  setTime,
} from '../../utils/date-fns'
import { DateType, PickerMode, RangeValue, TimeUnit } from '../../interface'
import { getHours, getMinutes, getSeconds, isBefore, isSameDay, isSameWeek } from 'date-fns'
import useRangeCls from '../../hooks/use-range-cls'
import { DisabledDataProps } from '../../date-picker'

export interface WeekProps {
  day: DateType
  picker: PickerMode
  showWeekNumber?: boolean
  showTime?: boolean
  disabledDate?: DisabledDataProps
}

const formatWeekNumber = (date: DateType) => {
  return getWeek(date)
}

const isDisabledTime = (value: number, units: TimeUnit[]) => {
  return units.find((n) => n.value === value)?.disabled
}

function Week(props: WeekProps) {
  const context = useContext(Context)
  const {
    prefixCls,
    dateValue,
    rangeValue,
    panelPosition,
    hoverRangedValue,
    viewDate,
    hours = [],
    minutes = [],
    seconds = [],
    disabledTimePanel,
    onSelect,
    onDateMouseEnter,
    onDateMouseLeave,
    cellRender,
    range,
  } = context
  const { showWeekNumber, day, picker, showTime, disabledDate } = props

  const currentMonth = getMonth(viewDate)

  let _dateValue: RangeValue | DateType
  if (panelPosition) {
    _dateValue = rangeValue!
  } else {
    _dateValue = dateValue!
  }

  let hasFindToday = false
  let hasFindSelected = false

  const getSelected = (date: DateType) => {
    if (hasFindSelected) return false
    if (Array.isArray(_dateValue)) {
      return (_dateValue[0] && isSameDay(_dateValue[0], date)) || (_dateValue[1] && isSameDay(_dateValue[1], date))
    } else {
      if (_dateValue && isSameDay(_dateValue, date)) {
        hasFindSelected = true
        return true
      }
      return false
    }
  }

  const getToday = (date: DateType) => {
    if (hasFindToday) return false
    hasFindToday = isSameDay(date, newDate() as DateType)
    // 如果 today 被选中则返回 false
    if (hasFindToday) {
      if (Array.isArray(_dateValue)) {
        return !((_dateValue[0] && isSameDay(_dateValue[0], date)) || (_dateValue[1] && isSameDay(_dateValue[1], date)))
      } else {
        return _dateValue ? !isSameDay(_dateValue, date) : true
      }
    }
  }

  const getWeekToday = (date: DateType) => {
    if (hasFindToday) return false
    hasFindToday = isSameDay(date, newDate() as DateType)
    return hasFindToday
  }

  const getWeekSelected = (date: DateType) => {
    if (hasFindSelected) return false
    if (Array.isArray(_dateValue)) {
      // 如果是 endSelected 需要判断选中的周最后一天是否为本月
      return (
        (_dateValue[0] && isSameWeek(_dateValue[0], date)) ||
        (_dateValue[1] && isSameWeek(_dateValue[1], date) && isSameMonth(getEndOfWeek(_dateValue[1]), viewDate))
      )
    } else {
      if (_dateValue && isSameWeek(_dateValue, date)) {
        hasFindSelected = true
        return true
      }
      return false
    }
  }

  const getDayClassNames = (date: DateType) => {
    return picker === 'date'
      ? classnames(`${prefixCls}-calendar-text`, {
          [`${prefixCls}-calendar-text-selected`]: getSelected(date),
          [`${prefixCls}-calendar-text-today`]: getToday(date),
        })
      : picker === 'week'
      ? classnames(`${prefixCls}-calendar-${picker}-text`, {
          [`${prefixCls}-calendar-${picker}-text-today`]: getWeekToday(date),
        })
      : ''
  }

  const getRangeCls = useRangeCls({
    prefixCls,
    rangeValue,
    hoverRangedValue,
    isRange: picker !== 'time',
    isCurrentMonth: (date) => isSameMonth(date, viewDate),
    isAfterStart: (date, rangedValue) => (rangedValue[0] ? isAfter(date, rangedValue[0]) : false),
    isBeforeEnd: (date, rangedValue) => (rangedValue[1] ? isBefore(date, rangedValue[1]) : false),
    isStart: (date, rangedValue) => (rangedValue[0] ? isSameDay(date, rangedValue[0]) : false),
    isEnd: (date, rangedValue) => {
      if (rangedValue[1] && isSameDay(date, rangedValue[1])) {
        if (picker === 'date') {
          return true
        } else {
          return isSameMonth(getStartOfWeek(date), getEndOfWeek(date))
        }
      }
      return false
    },
  })

  const getEffectTime = (date: DateType) => {
    if (showTime && !disabledTimePanel) {
      // debugger
      const dateHour = getHours(date)
      const dateMinute = getMinutes(date)
      const dateSecond = getSeconds(date)
      const hour = isDisabledTime(dateHour, hours) ? hours.find((n) => !n.disabled)!.value : dateHour
      const minute = isDisabledTime(dateMinute, minutes) ? minutes.find((n) => !n.disabled)!.value : dateMinute
      const second = isDisabledTime(dateSecond, seconds) ? seconds.find((n) => !n.disabled)!.value : dateSecond
      date = setTime(date, { hour, minute, second })
    }
    return date
  }

  const handleDayClick = (day: DateType) => {
    if (!(disabledDate && disabledDate(day))) {
      onSelect(day, 'mouse')
    }
  }

  const renderDays = () => {
    const startOfWeek = getStartOfWeek(day)

    const days: React.ReactNode[] = []
    const weekNumber = formatWeekNumber(startOfWeek)
    if (showWeekNumber) {
      const calenderWeekNumberCls = classnames(`${prefixCls}-calendar-weeknumber`)
      days.push(
        <div key="W" className={calenderWeekNumberCls}>
          {weekNumber}
        </div>,
      )
    }

    const week = days.concat(
      [0, 1, 2, 3, 4, 5, 6].map((offset) => {
        const day = addDays(startOfWeek, offset)
        const date = getDate(day)
        let now
        if (panelPosition === 'left') {
          now = (rangeValue && rangeValue[0]) || viewDate
        } else if (panelPosition === 'right') {
          now = (rangeValue && rangeValue[1]) || viewDate
        } else {
          now = dateValue || viewDate
        }
        const dayTime = setTime(day, { hour: getHours(now), minute: getMinutes(now), second: getSeconds(now) })
        const _props = {
          onClick: () => handleDayClick(getEffectTime(dayTime)),
          onMouseEnter: () => {
            if (onDateMouseEnter) {
              if (!(disabledDate && disabledDate(dayTime))) {
                picker === 'week' ? onDateMouseEnter(startOfWeek) : onDateMouseEnter(getEffectTime(dayTime))
              }
            }
          },
          onMouseLeave: () => {
            if (onDateMouseLeave) {
              onDateMouseLeave()
            }
          },
        }
        const originNode = <div className={getDayClassNames(day)}>{date}</div>

        return (
          <div
            key={day.valueOf()}
            className={classnames(
              `${prefixCls}-calendar-item`,
              {
                [`${prefixCls}-calendar-item-disabled`]: disabledDate && disabledDate(day),
                [`${prefixCls}-calendar-current`]: currentMonth === getMonth(day),
              },
              getRangeCls(day),
            )}
            {..._props}
          >
            {typeof cellRender === 'function'
              ? cellRender(day, { originNode, panelType: 'date', range, date: day }) || originNode
              : originNode}
          </div>
        )
      }),
    )

    const originNode = (
      <div
        className={classnames({
          [`${prefixCls}-calendar-line`]: picker !== 'week',
          [`${prefixCls}-calendar-week-line`]: picker === 'week',
          [`${prefixCls}-calendar-week-selected`]: picker === 'week' && getWeekSelected(startOfWeek),
        })}
      >
        {week}
      </div>
    )
    return typeof cellRender === 'function'
      ? cellRender(weekNumber, { originNode, panelType: 'week', range, date: startOfWeek }) || originNode
      : originNode
  }

  return <>{renderDays()}</>
}

export default Week
