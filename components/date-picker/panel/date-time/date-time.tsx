import * as React from 'react'
import classNames from 'classnames'

import Context from '../../context'
import Calendar, { CalendarProps } from '../../calendar'
import TimePanel, { SharedTimeProps } from '../time/time'
import { DateType, DisabledTime, PanelSharedProps } from '../../interface'

export interface DatetimePanelProps
  extends PanelSharedProps,
    Omit<CalendarProps, 'disabledHours' | 'disabledMinutes' | 'disabledSeconds'> {
  dateHeader: React.ReactNode
  disabledTimePanel?: DisabledTime
  showTime?: boolean | SharedTimeProps
  defaultValue?: DateType
}

function DatetimePanel(props: DatetimePanelProps) {
  const context = React.useContext(Context)

  const { prefixCls, panelPosition, dateValue, rangeValue } = context

  const { disabledTimePanel, showTime, dateHeader } = props

  let value: DateType | undefined | null = dateValue
  if (panelPosition === 'left') {
    value = rangeValue![0]
  } else if (panelPosition === 'right') {
    value = rangeValue![1]
  }

  const timeProps = typeof showTime === 'object' ? { ...showTime } : {}

  const disabledTimes = disabledTimePanel ? disabledTimePanel(value || null) : {}

  return (
    <div
      className={classNames(`${prefixCls}-datetime-panel`, {
        // [`${panelPrefixCls}-active`]: activePanel,
      })}
    >
      <div className={classNames(`${prefixCls}-date`)}>
        {dateHeader}
        <Calendar {...props} />
      </div>
      <TimePanel {...props} format={undefined} {...timeProps} {...disabledTimes} defaultValue={undefined} />
    </div>
  )
}

export default DatetimePanel
