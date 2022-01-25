import classnames from 'classnames'
import { DateType, EventValue, RangeValue } from '../interface'
import { isAfter, isSameDay } from '../utils/date-fns'

type InterRangeValue = [EventValue, EventValue]

export default function useRangeCls({
  prefixCls,
  isRange,
  rangeValue,
  hoverRangedValue,
  isCurrentMonth,
  isAfterStart,
  isBeforeEnd,
  isStart,
  isEnd,
}: {
  prefixCls: string
  isRange: boolean
  rangeValue?: RangeValue
  hoverRangedValue?: RangeValue
  isCurrentMonth?: (date: DateType) => boolean
  isAfterStart: (date: DateType, rangeValue: InterRangeValue) => boolean
  isBeforeEnd: (date: DateType, rangeValue: InterRangeValue) => boolean
  isStart: (date: DateType, rangeValue: InterRangeValue) => boolean
  isEnd: (date: DateType, rangeValue: InterRangeValue) => boolean
}) {
  function getClassName(date: DateType) {
    if (isRange) {
      let _rangeValue = rangeValue || [null, null]
      if (hoverRangedValue?.find((n) => n)) {
        _rangeValue = hoverRangedValue
      }
      if (_rangeValue.filter((n) => n).length !== _rangeValue.length) return {}
      if (isSameDay(_rangeValue[0], _rangeValue[1])) return {}
      if (isCurrentMonth && !isCurrentMonth(date)) return {}
      if (_rangeValue[0] && _rangeValue[1] && isAfter(_rangeValue[0], _rangeValue[1])) return {}
      return classnames({
        [`${prefixCls}-range-view`]: isAfterStart(date, _rangeValue) && isBeforeEnd(date, _rangeValue),
        [`${prefixCls}-range-start`]: isStart(date, _rangeValue),
        [`${prefixCls}-range-end`]: isEnd(date, _rangeValue),
      })
    }
    return {}
  }
  return getClassName
}
