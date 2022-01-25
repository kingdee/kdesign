import React, { useContext } from 'react'
import classnames from 'classnames'

import {
  getMonth,
  newDate,
  getYear,
  setMonth,
  isAfter,
  isBefore,
  isSameMonth,
  getStartOfMonth,
} from '../../utils/date-fns'
import Context from '../../context'
import { DateType, RangeValue } from '../../interface'
import useRangeCls from '../../hooks/use-range-cls'

export const monthsNumToText = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
  '13月',
]

const monthsThreeColumns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11],
]

export interface MonthProps {
  showFullMonth?: boolean
  disabledDate?(date: DateType): boolean
}

function Month(props: MonthProps) {
  const context = useContext(Context)
  const {
    prefixCls,
    dateValue,
    viewDate,
    onSelect,
    onDateMouseEnter,
    onDateMouseLeave,
    rangeValue,
    panelPosition,
    hoverRangedValue,
  } = context

  const { disabledDate } = props

  let _dateValue: RangeValue | DateType
  if (panelPosition) {
    _dateValue = rangeValue!
  } else {
    _dateValue = dateValue!
  }

  let hasFindSelected = false
  let hasFindToday = false

  const getMonthSelected = (month: number) => {
    if (hasFindSelected) return false
    if (Array.isArray(_dateValue)) {
      return (
        (_dateValue[0] && getMonth(_dateValue[0]) === month && getYear(_dateValue[0]) === getYear(viewDate)) ||
        (_dateValue[1] && getMonth(_dateValue[1]) === month && getYear(_dateValue[1]) === getYear(viewDate))
      )
    } else {
      if (_dateValue && getMonth(_dateValue) === month && getYear(_dateValue) === getYear(viewDate)) {
        hasFindSelected = true
        return true
      }
      return false
    }
  }

  const getMonthToday = (month: number) => {
    if (hasFindToday) return false
    if (getYear(viewDate) === getYear(newDate() as DateType) && month === getMonth(newDate() as DateType)) {
      hasFindToday = true
      if (Array.isArray(_dateValue)) {
        return _dateValue[0]
          ? getMonth(_dateValue[0]) !== month
          : _dateValue[1]
          ? getMonth(_dateValue[1]) !== month
          : true
      } else {
        return _dateValue ? getMonth(_dateValue) !== month : true
      }
    }
  }

  const getMonthClassNames = (i: number) => {
    return classnames(`${prefixCls}-month-text`, {
      [`${prefixCls}-month-text-selected`]: getMonthSelected(i),

      [`${prefixCls}-month-text-today`]: getMonthToday(i),
    })
  }

  const getRangeCls = useRangeCls({
    prefixCls,
    rangeValue,
    hoverRangedValue,
    isRange: !!panelPosition,
    isAfterStart: (date, rangedValue) =>
      rangedValue[0] ? isAfter(getStartOfMonth(date), getStartOfMonth(rangedValue[0])) : false,
    isBeforeEnd: (date, rangedValue) =>
      rangedValue[1] ? isBefore(getStartOfMonth(date), getStartOfMonth(rangedValue[1])) : false,
    isStart: (date, rangedValue) => (rangedValue[0] ? isSameMonth(date, rangedValue[0]) : false),
    isEnd: (date, rangedValue) => (rangedValue[1] ? isSameMonth(date, rangedValue[1]) : false),
  })

  const handleClick = (date: DateType) => {
    if (!(disabledDate && disabledDate(date))) {
      onSelect(date, 'mouse')
    }
  }

  const renderMonthItem = (i: number) => {
    const monthsText = monthsNumToText[i]
    return <span className={getMonthClassNames(i)}>{monthsText}</span>
  }

  const renderMonth = () => {
    const monthLayout = monthsThreeColumns
    const monthLineCls = classnames(`${prefixCls}-month-line`)
    return monthLayout.map((month, i) => (
      <div className={monthLineCls} key={i}>
        {month.map((m, j) => {
          const month = setMonth(viewDate, m)
          const _props = {
            onClick: () => handleClick(month),
            onMouseEnter: () => {
              if (onDateMouseEnter && !(disabledDate && disabledDate(month))) {
                onDateMouseEnter(month)
              }
            },
            onMouseLeave: () => {
              if (onDateMouseLeave) {
                onDateMouseLeave()
              }
            },
          }

          const monthItemCls = classnames(
            `${prefixCls}-month-item`,
            {
              [`${prefixCls}-month-item-disabled`]: disabledDate && disabledDate(month),
            },
            getRangeCls(month),
          )
          return (
            <div className={monthItemCls} key={j} {..._props}>
              {renderMonthItem(m)}
            </div>
          )
        })}
      </div>
    ))
  }

  const monthCls = classnames(`${prefixCls}-month`)
  const monthWarpperCls = classnames(`${prefixCls}-month-warpper`)
  return (
    <div className={monthCls}>
      <div className={monthWarpperCls}>{renderMonth()}</div>
    </div>
  )
}

export default Month
