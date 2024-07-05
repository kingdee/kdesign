import React, { useContext } from 'react'
import classnames from 'classnames'

import Context from '../../context'

import {
  getYearsPeriod,
  getYear,
  newDate,
  setYear,
  isAfter,
  getStartOfYear,
  isSameYear,
  isBefore,
  setYearOrMonthOfDate,
} from '../../utils/date-fns'
import { DateType, PickerMode, RangeValue } from '../../interface'
import useRangeCls from '../../hooks/use-range-cls'
import { getClosingViewDate } from '../../utils'
import { DisabledDataProps } from '../../date-picker'

export interface YearProps {
  yearItemNumber: number
  minDate?: DateType
  maxDate?: DateType
  disabledDate?: DisabledDataProps
  picker?: PickerMode
}

function Year(props: YearProps) {
  const context = useContext(Context)
  const {
    prefixCls,
    dateValue,
    viewDate,
    onDateMouseEnter,
    onDateMouseLeave,
    onSelect,
    rangeValue,
    panelPosition,
    hoverRangedValue,
    innerPicker,
    setInnerPicker,
    cellRender,
    range,
  } = context
  const disabledInfo: any = { panelType: 'year', range }
  const { yearItemNumber, disabledDate, picker = 'date' } = props

  let _dateValue: RangeValue | DateType
  if (panelPosition) {
    _dateValue = rangeValue!
  } else {
    _dateValue = dateValue!
  }

  let hasFindSelected = false
  let hasFindToday = false

  const getYearSelected = (year: number) => {
    if (hasFindSelected) return false
    if (Array.isArray(_dateValue)) {
      return (_dateValue[0] && getYear(_dateValue[0]) === year) || (_dateValue[1] && getYear(_dateValue[1]) === year)
    } else {
      if (_dateValue && getYear(_dateValue) === year) {
        hasFindSelected = true
        return true
      }
      return false
    }
  }

  const getYearToday = (year: number) => {
    if (hasFindToday) return false
    if (year === getYear(newDate() as DateType)) {
      hasFindToday = true
      if (Array.isArray(_dateValue)) {
        return _dateValue[0]
          ? getYear(_dateValue[0]) !== getYear(newDate() as DateType)
          : _dateValue[1]
          ? getYear(_dateValue[1]) !== getYear(newDate() as DateType)
          : true
      } else {
        return _dateValue ? getYear(_dateValue) !== year : true
      }
    }
  }

  function getYearClassNames(y: number) {
    return classnames(`${prefixCls}-year-text`, {
      [`${prefixCls}-year-text-selected`]: getYearSelected(y),
      [`${prefixCls}-year-text-today`]: getYearToday(y),
    })
  }

  const getRangeCls = useRangeCls({
    prefixCls,
    rangeValue,
    hoverRangedValue,
    isRange: !!panelPosition,
    isAfterStart: (date, rangedValue) =>
      rangedValue[0] ? isAfter(getStartOfYear(date), getStartOfYear(rangedValue[0])) : false,
    isBeforeEnd: (date, rangedValue) =>
      rangedValue[1] ? isBefore(getStartOfYear(date), getStartOfYear(rangedValue[1])) : false,
    isStart: (date, rangedValue) => (rangedValue[0] ? isSameYear(date, rangedValue[0]) : false),
    isEnd: (date, rangedValue) => (rangedValue[1] ? isSameYear(date, rangedValue[1]) : false),
  })

  const handleClick = (date: DateType) => {
    if (innerPicker === undefined) {
      if (!(disabledDate && disabledDate(date, disabledInfo))) {
        onSelect(date, 'mouse')
      }
    } else {
      //
      let _viewDate = viewDate
      if (panelPosition) {
        _viewDate = getClosingViewDate(viewDate, picker, -1)
      }
      // date = addYears(_viewDate, 1)

      onSelect(setYearOrMonthOfDate(_viewDate, date), 'inner')
      setInnerPicker(undefined)
    }
  }

  function getYearList() {
    const yearsList = []
    const { startPeriod, endPeriod } = getYearsPeriod(viewDate, yearItemNumber)
    for (let y = startPeriod; y <= endPeriod; y++) {
      const year = setYear(viewDate, y)
      const _props = {
        onClick: () => handleClick(year),
        onMouseEnter: () => {
          if (onDateMouseEnter && !(disabledDate && disabledDate(year, disabledInfo))) {
            onDateMouseEnter(year)
          }
        },
        onMouseLeave: () => {
          if (onDateMouseLeave) {
            onDateMouseLeave()
          }
        },
      }

      const originNode = <span className={getYearClassNames(y)}>{y}</span>

      yearsList.push(
        <div
          className={classnames(
            `${prefixCls}-year-item`,
            {
              [`${prefixCls}-year-item-disabled`]: disabledDate && disabledDate(year, disabledInfo),
            },
            getRangeCls(year),
          )}
          key={y}
          {..._props}
        >
          {typeof cellRender === 'function'
            ? cellRender(y, { originNode, panelType: 'year', range, date: year }) || originNode
            : originNode}
        </div>,
      )
    }
    return yearsList
  }

  const yearCls = classnames(`${prefixCls}-year`)
  const yearWarpperCls = classnames(`${prefixCls}-year-warpper`)
  return (
    <div className={yearCls}>
      <div className={yearWarpperCls}>{getYearList()}</div>
    </div>
  )
}

export default Year
