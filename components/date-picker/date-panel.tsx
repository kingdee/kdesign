import React, { useContext } from 'react'
import classnames from 'classnames'
import {
  DateRender,
  PanelMode,
  CellRender,
  OnPanelChange,
  PickerMode,
  SharedTimeProps,
  DateType,
  DisabledTime,
  InnerLocale,
  Components,
} from './interface'
import Month from './panel/month/month'
import Year from './panel/year/year'
import Quarter from './panel/quarter/quarter'
import Calendar from './calendar'
import Time from './panel/time/time'
import Context from './context'
import Header, { HeaderProps } from './panel/header/header'
import { addMonths, addYears, getMonth, getYear, getYearsPeriod, DEFAULT_YEAR_ITEM_NUMBER } from './utils/date-fns'
import { getClosingViewDate, getTimeProps } from './utils'
import isBoolean from 'lodash/isBoolean'
import DateTime from './panel/date-time/date-time'

export interface PickerPanelSharedProps {
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
  mode?: PanelMode
  tabIndex?: number
  yearItemNumber?: number

  // Locale
  locale: InnerLocale

  // Value
  value?: DateType | null
  defaultValue?: DateType
  pickerValue?: DateType
  defaultPickerValue?: DateType

  prevIcon?: React.ReactNode
  nextIcon?: React.ReactNode
  superPrevIcon?: React.ReactNode
  superNextIcon?: React.ReactNode
  mergedActivePickerIndex?: 0 | 1
  useWeekdaysShort?: boolean
  showWeekNumber?: boolean
  showWeeksTitle?: boolean

  // Date
  disabledDate?: (date: DateType) => boolean

  // Render
  dateRender?: DateRender
  monthCellRender?: CellRender
  renderExtraFooter?: (mode: PanelMode) => React.ReactNode

  // Event
  onSelect?: (value: DateType) => void
  onChange?: (value: DateType) => void
  onPanelChange?: OnPanelChange
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>
  onOk?: (date: DateType) => void

  components?: Components
}

export interface PickerPanelBaseProps extends PickerPanelSharedProps {
  picker: Exclude<PickerMode, 'date' | 'time'>
}

export interface PickerPanelDateProps extends PickerPanelSharedProps {
  picker?: 'date'
  showToday?: boolean
  showNow?: boolean

  // Time
  showTime?: boolean | SharedTimeProps
  disabledTimePanel?: DisabledTime
}

export interface PickerPanelTimeProps extends PickerPanelSharedProps, SharedTimeProps {
  picker: 'time'
}

export type PickerPanelProps = PickerPanelBaseProps | PickerPanelDateProps | PickerPanelTimeProps

type OmitType = Omit<PickerPanelBaseProps, 'picker'> &
  Omit<PickerPanelDateProps, 'picker'> &
  Omit<PickerPanelTimeProps, 'picker'>

interface MergedPickerPanelProps extends OmitType {
  picker?: PickerMode
}

type HeaderOmit = 'className' | 'children'

function Panel(props: MergedPickerPanelProps) {
  const context = useContext(Context)

  const { prefixCls, viewDate, setViewDate, panelPosition, locale, innerPicker, setInnerPicker } = context
  const isInnerPicker = innerPicker !== undefined
  const isPositionLeft = panelPosition === 'left'
  const isPositionRight = panelPosition === 'right'
  const isPositionUnset = typeof panelPosition === 'undefined'

  const {
    picker = 'date',
    format,
    showTime,
    mergedActivePickerIndex,
    useWeekdaysShort,
    showWeekNumber,
    showWeeksTitle,
    disabledDate,
  } = props

  const getHeader = () => {
    return (
      <Header {...headerProps} className={headerObj!.className}>
        {headerObj!.children}
      </Header>
    )
  }

  const renderYearPanel = () => {
    const { yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER } = props
    return <Year {...props} yearItemNumber={yearItemNumber} />
  }

  const renderMonthPanel = () => {
    return <Month {...props} />
  }

  const renderQuarterPanel = () => {
    return <Quarter {...props} />
  }

  const renderDatePanel = () => {
    if (isInnerPicker) {
      if (innerPicker === 'year') {
        return renderYearPanel()
      } else {
        return renderMonthPanel()
      }
    }
    if (!showTime) {
      const dateProps = {
        picker,
        useWeekdaysShort,
        showWeekNumber,
        showWeeksTitle,
        disabledDate,
      }
      return <Calendar {...dateProps} picker={picker} />
    } else {
      const _props = {
        ...props,
        ...(showTime && !isBoolean(showTime) ? getTimeProps({ format, ...showTime, picker }) : {}),
        ...(picker === 'time' ? getTimeProps({ format, ...props, picker }) : {}),
      }
      return <DateTime {..._props} picker={picker} dateHeader={getHeader()} />
    }
  }

  const renderTimePanel = () => {
    const _props = {
      ...props,
      format: undefined,
      ...(showTime && !isBoolean(showTime) ? getTimeProps({ format, ...showTime, picker }) : {}),
      ...(picker === 'time' ? getTimeProps({ format, ...props, picker }) : {}),
    }
    return <Time {..._props} />
  }

  const renderYearHeader = () => {
    const { yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER } = props
    const { startPeriod, endPeriod } = getYearsPeriod(viewDate, yearItemNumber!)
    const headerCls = classnames(`${prefixCls}-header`, `${prefixCls}-header-year`)
    return {
      children: (
        <>
          {startPeriod} - {endPeriod}
        </>
      ),
      className: headerCls,
    }
  }

  const renderMonthHeader = () => {
    const year = getYear(viewDate)
    const headerCls = classnames(`${prefixCls}-header`, `${prefixCls}-header-month`)
    return {
      children: <>{year + locale.year}</>,
      className: headerCls,
    }
  }

  const onHeaderYearClick = () => {
    if (picker === 'date') {
      setInnerPicker('year')
    }
  }

  const onHeaderMonthClick = () => {
    if (picker === 'date') {
      setInnerPicker('month')
    }
  }

  const renderDateHeader = () => {
    const year = getYear(viewDate)
    const month = getMonth(viewDate) + 1
    const headerCls = classnames(`${prefixCls}-header`, `${prefixCls}-header-date`)
    return {
      children: (
        <>
          <span
            className={classnames(`${prefixCls}-header-text-inner`, {
              [`${prefixCls}-header-text-inner-active`]: innerPicker === 'year',
              [`${prefixCls}-header-text-inner-hover`]: picker === 'date',
            })}
            onClick={onHeaderYearClick}
          >
            {year + locale.year}
          </span>
          <span
            className={classnames(`${prefixCls}-header-text-inner`, {
              [`${prefixCls}-header-text-inner-active`]: innerPicker === 'month',
              [`${prefixCls}-header-text-inner-hover`]: picker === 'date',
            })}
            onClick={onHeaderMonthClick}
          >
            {month + locale.month}
          </span>
        </>
      ),
      className: headerCls,
    }
  }

  const onSuperPrev = () => {
    let date
    if (picker === 'year' || innerPicker === 'year') {
      const { yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER } = props
      date = addYears(viewDate, 0 - yearItemNumber)
    } else {
      date = addYears(viewDate, -1)
    }
    setViewDate(date, mergedActivePickerIndex)
  }

  const onSuperNext = () => {
    let date
    if (picker === 'year' || innerPicker === 'year') {
      const { yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER } = props
      let _viewDate = viewDate
      if (panelPosition) {
        _viewDate = getClosingViewDate(viewDate, picker, -1, yearItemNumber)
      }
      date = addYears(_viewDate, yearItemNumber)
    } else {
      let _viewDate = viewDate
      if (panelPosition) {
        _viewDate = getClosingViewDate(viewDate, picker, -1)
      }
      date = addYears(_viewDate, 1)
    }

    setViewDate(date, mergedActivePickerIndex)
  }

  const onPrev = () => {
    const date = addMonths(viewDate, -1)
    setViewDate(date, mergedActivePickerIndex)
  }

  const onNext = () => {
    const date = addMonths(viewDate, 1)
    setViewDate(date, mergedActivePickerIndex)
  }

  let panel
  let headerProps: Omit<HeaderProps, HeaderOmit> = {}
  let headerObj: { className: string; children: React.ReactNode }

  switch (picker) {
    case 'year': {
      panel = renderYearPanel()
      headerObj = renderYearHeader()
      headerProps = {
        onSuperPrev: isPositionRight ? undefined : onSuperPrev,
        onSuperNext: isPositionLeft ? undefined : onSuperNext,
      }
      break
    }
    case 'month': {
      panel = renderMonthPanel()
      headerObj = renderMonthHeader()
      headerProps = {
        onSuperPrev: isPositionRight ? undefined : onSuperPrev,
        onSuperNext: isPositionLeft ? undefined : onSuperNext,
      }
      break
    }
    case 'quarter': {
      panel = renderQuarterPanel()
      headerObj = renderMonthHeader()
      headerProps = {
        onSuperPrev: isPositionRight ? undefined : onSuperPrev,
        onSuperNext: isPositionLeft ? undefined : onSuperNext,
      }
      break
    }
    // 时间面板，4个箭头的显隐，在时间范围时需要判断是否在快捷选择面板下
    case 'date': {
      headerObj = renderDateHeader()
      headerProps = {
        onPrev: (isPositionLeft && !isInnerPicker) || innerPicker === 'month' || isPositionUnset ? onPrev : undefined,
        onNext: (isPositionRight && !isInnerPicker) || innerPicker === 'month' || isPositionUnset ? onNext : undefined,
        onSuperPrev:
          (isPositionLeft && !isInnerPicker) || innerPicker === 'year' || isPositionUnset ? onSuperPrev : undefined,
        onSuperNext:
          (isPositionRight && !isInnerPicker) || innerPicker === 'year' || isPositionUnset ? onSuperNext : undefined,
      }
      panel = renderDatePanel()
      break
    }

    case 'week': {
      panel = renderDatePanel()
      headerObj = renderDateHeader()
      headerProps = {
        onPrev: isPositionRight ? undefined : onPrev,
        onNext: isPositionLeft ? undefined : onNext,
        onSuperPrev: isPositionRight ? undefined : onSuperPrev,
        onSuperNext: isPositionLeft ? undefined : onSuperNext,
      }
      break
    }
    case 'time': {
      panel = renderTimePanel()
      break
    }
    default: {
      break
    }
  }

  const showHeader = !((picker === 'date' && showTime) || picker === 'time') || innerPicker !== undefined

  const containerCls = classnames(`${prefixCls}-warpper`)
  return (
    <div className={containerCls}>
      {showHeader ? getHeader() : null}
      {panel}
    </div>
  )
}

export default Panel
