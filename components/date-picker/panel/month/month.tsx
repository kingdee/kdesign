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
  setYearOrMonthOfDate,
} from '../../utils/date-fns'
import Context from '../../context'
import { DateType, RangeValue } from '../../interface'
import useRangeCls from '../../hooks/use-range-cls'
import { DisabledDataProps } from '../../date-picker'

const monthsThreeColumns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11],
]

export interface MonthProps {
  showFullMonth?: boolean
  disabledDate?: DisabledDataProps
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
    locale,
    innerPicker,
    setInnerPicker,
    cellRender,
    range,
  } = context
  const disabledInfo: any = { panelType: 'month', range }
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
    if (innerPicker === undefined) {
      if (!(disabledDate && disabledDate(date, disabledInfo))) {
        onSelect(date, 'mouse')
      }
    } else {
      //
      const _viewDate = viewDate
      onSelect(setYearOrMonthOfDate(_viewDate, date, 'month'), 'inner')
      setInnerPicker(undefined)
    }
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
              if (onDateMouseEnter && !(disabledDate && disabledDate(month, disabledInfo))) {
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
              [`${prefixCls}-month-item-disabled`]: disabledDate && disabledDate(month, disabledInfo),
            },
            getRangeCls(month),
          )
          const originNode = <span className={getMonthClassNames(m)}>{`${locale.monthTitle[m]}`}</span>
          return (
            <div className={monthItemCls} key={j} {..._props}>
              {typeof cellRender === 'function'
                ? cellRender(m + 1, { originNode, panelType: 'month', range, date: month }) || originNode
                : originNode}
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
