import * as React from 'react'
import classNames from 'classnames'

import TimeColumn from './time-column'
import { DateType, DisabledTimes, PanelSharedProps, PickerMode, TimeUnit } from '../../interface'
import { formatDate, newDate, setTime as utilSetTime } from '../../utils/date-fns'
import Context from '../../context'
import useStateMemo from '../../hooks/use-state-memo'
import { leftPad } from '../../utils'
import Header from '../header/header'

export interface SharedTimeProps extends DisabledTimes {
  format?: string
  showNow?: boolean
  showHour?: boolean
  showMinute?: boolean
  showSecond?: boolean
  use12Hours?: boolean
  hourStep?: number
  minuteStep?: number
  secondStep?: number
  hideDisabledOptions?: boolean
  defaultValue?: DateType
  // mergedActivePickerIndex?: 0 | 1
}

export interface TimePanelProps extends PanelSharedProps, SharedTimeProps {
  format?: string
  picker?: PickerMode
}

// export interface TimePanelProps extends SharedTimeProps {
//   format?: string
//   // active?: boolean
// }

function shouldUnitsUpdate(prevUnits: TimeUnit[], nextUnits: TimeUnit[]) {
  if (prevUnits.length !== nextUnits.length) return true
  for (let i = 0; i < prevUnits.length; i += 1) {
    if (prevUnits[i].disabled !== nextUnits[i].disabled) return true
  }
  return false
}

function TimePanel(props: TimePanelProps) {
  const context = React.useContext(Context)
  let {
    prefixCls,
    dateValue,
    onSelect,
    originHour = -1,
    minute = -1,
    second = -1,
    hours: rawHours = [],
    minutes = [],
    seconds = [],
    disabledTimePanel,
  } = context

  const {
    picker,
    format = 'HH:mm:ss',
    // active,
    // operationRef,
    showHour,
    showMinute,
    showSecond,
    use12Hours = false,

    // hourStep,
    // minuteStep,
    // secondStep,
    hideDisabledOptions,
    // mergedActivePickerIndex,
    // disabledHours,
    // disabledMinutes,
    // disabledSeconds,
  } = props

  // console.log(rawHours)

  if (disabledTimePanel) {
    originHour = -1
    minute = -1
    second = -1
  }

  // const bodyOperationRef = React.useRef<BodyOperationRef>()

  // ======================= Keyboard =======================
  // const [activeColumnIndex, setActiveColumnIndex] = React.useState(-1)

  // debugger
  const value = dateValue
  // if (mergedActivePickerIndex === 0) {
  //   value = rangeValue![0]
  // } else if (mergedActivePickerIndex === 1) {
  //   value = rangeValue![1]
  // }

  const columns: {
    node: React.ReactElement
    // value: number
    // units: TimeUnit[]
    // onSelect: (diff: number) => void
  }[] = []

  const columnPrefixCls = `${prefixCls}-time`

  let isPM: boolean | undefined
  // const originHour = value ? getHours(value) : -1
  let hour = originHour
  // const minute = value ? getMinutes(value) : -1
  // const second = value ? getSeconds(value) : -1

  const setTime = (isPM: boolean | undefined, newHour: number, newMinute: number, newSecond: number) => {
    let date = value || newDate()!
    let _hour = newHour > -1 ? newHour : rawHours.find((n) => !n.disabled)?.value
    let _minute = newMinute > -1 ? newMinute : minutes.find((n) => !n.disabled)?.value
    let _second = newSecond > -1 ? newSecond : seconds.find((n) => !n.disabled)?.value

    if (!_hour && _hour !== 0) {
      _hour = -1
    }
    if (!_minute && _minute !== 0) {
      _minute = -1
    }
    if (!_second && _second !== 0) {
      _second = -1
    }

    // 所有时或分或秒 disabled 时，返回空（date-time）
    if (_hour > -1 && _minute > -1 && _second > -1) {
      date = utilSetTime(date, {
        hour: !use12Hours || !isPM ? _hour : _hour + 12,
        minute: _minute,
        second: _second,
      })
      return date
    }

    return null
  }

  // const rawHours = generateUnits(0, 23, hourStep, disabledHours && disabledHours())

  const memorizedRawHours = useStateMemo(() => rawHours, rawHours, shouldUnitsUpdate)

  if (use12Hours) {
    isPM = hour >= 12
    hour %= 12
  }

  const [AMDisabled, PMDisabled] = React.useMemo(() => {
    if (!use12Hours) {
      return [false, false]
    }
    const AMPMDisabled = [true, true]
    memorizedRawHours.forEach(({ disabled, value: hourValue }) => {
      if (disabled) return
      if (hourValue >= 12) {
        AMPMDisabled[1] = false
      } else {
        AMPMDisabled[0] = false
      }
    })
    return AMPMDisabled
  }, [use12Hours, memorizedRawHours])

  const hours = React.useMemo(() => {
    if (!use12Hours) return memorizedRawHours
    return memorizedRawHours
      .filter(isPM ? (hourMeta) => hourMeta.value >= 12 : (hourMeta) => hourMeta.value < 12)
      .map((hourMeta) => {
        const hourValue = hourMeta.value % 12
        const hourLabel = hourValue === 0 ? '12' : leftPad(hourValue, 2)
        return {
          ...hourMeta,
          label: hourLabel,
          value: hourValue,
        }
      })
  }, [use12Hours, memorizedRawHours, isPM])

  // const minutes = generateUnits(0, 59, minuteStep, disabledMinutes && disabledMinutes(originHour))

  // const seconds = generateUnits(0, 59, secondStep, disabledSeconds && disabledSeconds(originHour, minute))

  function addColumnNode(
    condition: boolean | undefined,
    node: React.ReactElement,
    columnValue: number,
    units: TimeUnit[],
    onColumnSelect: (diff: number) => void,
  ) {
    if (condition !== false) {
      columns.push({
        node: React.cloneElement(node, {
          prefixCls: columnPrefixCls,
          value: columnValue,
          onSelect: onColumnSelect,
          units,
          selectValue: value,
          hideDisabledOptions,
        }),
      })
    }
  }

  addColumnNode(showHour, <TimeColumn key="hour" />, hour, hours, (num) => {
    const time = setTime(isPM, num, minute, second)
    if (time) {
      onSelect(time, 'mouse')
    }
  })

  addColumnNode(showMinute, <TimeColumn key="minute" />, minute, minutes, (num) => {
    const time = setTime(isPM, hour, num, second)
    if (time) {
      onSelect(time, 'mouse')
    }
  })

  addColumnNode(showSecond, <TimeColumn key="second" />, second, seconds, (num) => {
    const time = setTime(isPM, hour, minute, num)
    if (time) {
      onSelect(time, 'mouse')
    }
  })

  let PMIndex = -1
  if (typeof isPM === 'boolean') {
    PMIndex = isPM ? 1 : 0
  }

  addColumnNode(
    use12Hours === true,
    <TimeColumn key="12hours" />,
    PMIndex,
    [
      { label: 'AM', value: 0, disabled: AMDisabled },
      { label: 'PM', value: 1, disabled: PMDisabled },
    ],
    (num) => {
      const time = setTime(!!num, hour, minute, second)
      if (time) {
        onSelect(time, 'mouse')
      }
    },
  )

  return (
    <div
      className={classNames(`${prefixCls}-time`, {
        // [`${panelPrefixCls}-active`]: active,
      })}
    >
      {picker !== 'time' ? (
        <Header className={`${prefixCls}-time-header`}>
          {!disabledTimePanel && value ? formatDate(value, format) : null}
        </Header>
      ) : null}

      <div
        className={classNames(`${prefixCls}-content`, {
          // [`${panelPrefixCls}-active`]: active,
        })}
      >
        {columns.map(({ node }) => node)}
      </div>
    </div>
  )
}

export default TimePanel
