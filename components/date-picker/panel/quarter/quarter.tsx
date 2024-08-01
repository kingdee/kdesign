import React, { useContext } from 'react'
import classnames from 'classnames'

import Context from '../../context'
import {
  getQuarter,
  getStartOfQuarter,
  getYear,
  isAfter,
  isBefore,
  isSameQuarter,
  newDate,
  setQuarter,
} from '../../utils/date-fns'
import { DateType, RangeValue } from '../../interface'
import useRangeCls from '../../hooks/use-range-cls'
import { DisabledDataProps } from '../../date-picker'

const quarterList = ['Q1', 'Q2', 'Q3', 'Q4']

interface QuarterProps {
  disabledDate?: DisabledDataProps
}

function Quarter(props: QuarterProps) {
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
    cellRender,
    range,
  } = context
  const disabledInfo: any = { panelType: 'quarter', range }
  const { disabledDate } = props

  let _dateValue: RangeValue | DateType
  if (panelPosition) {
    _dateValue = rangeValue!
  } else {
    _dateValue = dateValue!
  }

  let hasFindSelected = false
  let hasFindToday = false

  const getQuarterSelected = (quarter: number) => {
    if (hasFindSelected) return false
    if (Array.isArray(_dateValue)) {
      return (
        (_dateValue[0] && getQuarter(_dateValue[0]) === quarter && getYear(_dateValue[0]) === getYear(viewDate)) ||
        (_dateValue[1] && getQuarter(_dateValue[1]) === quarter && getYear(_dateValue[1]) === getYear(viewDate))
      )
    } else {
      if (_dateValue && getQuarter(_dateValue) === quarter && getYear(_dateValue) === getYear(viewDate)) {
        hasFindSelected = true
        return true
      }
      return false
    }
  }

  const getQuarterToday = (quarter: number) => {
    if (hasFindToday) return false
    if (getYear(viewDate) === getYear(newDate() as DateType) && quarter === getQuarter(newDate() as DateType)) {
      hasFindToday = true
      if (Array.isArray(_dateValue)) {
        return _dateValue[0]
          ? getQuarter(_dateValue[0]) !== quarter
          : _dateValue[1]
          ? getQuarter(_dateValue[1]) !== quarter
          : true
      } else {
        return _dateValue ? getQuarter(_dateValue) !== quarter : true
      }
    }
  }

  const getQuarterClassNames = (q: number) => {
    return classnames(`${prefixCls}-quarter-text`, {
      [`${prefixCls}-quarter-text-selected`]: getQuarterSelected(q),
      [`${prefixCls}-quarter-text-today`]: getQuarterToday(q),
    })
  }

  const getRangeCls = useRangeCls({
    prefixCls,
    rangeValue,
    hoverRangedValue,
    isRange: !!panelPosition,
    isAfterStart: (date, rangedValue) =>
      rangedValue[0] ? isAfter(getStartOfQuarter(date), getStartOfQuarter(rangedValue[0])) : false,
    isBeforeEnd: (date, rangedValue) =>
      rangedValue[1] ? isBefore(getStartOfQuarter(date), getStartOfQuarter(rangedValue[1])) : false,
    isStart: (date, rangedValue) => (rangedValue[0] ? isSameQuarter(date, rangedValue[0]) : false),
    isEnd: (date, rangedValue) => (rangedValue[1] ? isSameQuarter(date, rangedValue[1]) : false),
  })

  const handleClick = (date: DateType) => {
    if (!(disabledDate && disabledDate(date, disabledInfo))) {
      onSelect(date, 'mouse')
    }
  }

  const renderQuarter = () => {
    return quarterList.map((n, i) => {
      const quarter = setQuarter(viewDate, i + 1)
      const _props = {
        onClick: () => handleClick(quarter),
        onMouseEnter: () => {
          if (onDateMouseEnter && !(disabledDate && disabledDate(quarter, disabledInfo))) {
            onDateMouseEnter(quarter)
          }
        },
        onMouseLeave: () => {
          if (onDateMouseLeave) {
            onDateMouseLeave()
          }
        },
      }

      const quarterCls = classnames(
        `${prefixCls}-quarter-item`,
        {
          [`${prefixCls}-quarter-item-disabled`]: disabledDate && disabledDate(quarter, disabledInfo),
        },
        getRangeCls(quarter),
      )
      const originNode = (
        <div className={getQuarterClassNames(i + 1)} {..._props}>
          {n}
        </div>
      )
      return (
        <div key={n} className={quarterCls}>
          {typeof cellRender === 'function'
            ? cellRender(i + 1, { originNode, panelType: 'quarter', range, date: quarter }) || originNode
            : originNode}
        </div>
      )
    })
  }

  const quarterCls = classnames(`${prefixCls}-quarter`)
  const quarterWarpperCls = classnames(`${prefixCls}-quarter-warpper`)
  return (
    <div className={quarterCls}>
      <div className={quarterWarpperCls}>{renderQuarter()}</div>
    </div>
  )
}

export default Quarter
