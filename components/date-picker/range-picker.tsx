import React, {
  FunctionComponentElement,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
  useMemo,
  forwardRef,
  Ref,
  FocusEventHandler,
  CSSProperties,
} from 'react'
import isSameWeek from 'date-fns/isSameWeek'

import {
  DateType,
  InnerLocale,
  RangeValue,
  EventValue,
  DisabledTimes,
  PanelMode,
  SharedTimeProps,
  PickerMode,
  TimeUnit,
} from './interface'
import ConfigContext from '../config-provider/ConfigContext'
import { useMergedState } from '../_utils/hooks'
import { getCompProps } from '../_utils'
import Context, { ISelectType } from './context'
import Panel from './date-panel'
import InputDate, { InputRangeProps } from './range/input-range'
import {
  generateUnits,
  getClosingViewDate,
  getDataOrAriaProps,
  getDefaultFormat,
  getValue,
  updateValues,
} from './utils'
import useValueTexts from './hooks/use-value-texts'
import useHoverValue from './hooks/use-hover-value'
import {
  formatDate,
  isAfter,
  newDate,
  parseDate,
  isEqual,
  isSameQuarter,
  isSameDay,
  isValid,
  getHours,
  getMinutes,
  getSeconds,
  isDate,
} from './utils/date-fns'
import useTextValueMapping from './hooks/use-text-value-mapping'
import useRangeViewDates from './hooks/use-range-view-dates'
import useRangeDisabled from './hooks/use-range-disabled'
import { IInnerPicker, mergeDateLocale, PickerBaseProps, PickerDateProps, PickerTimeProps } from './date-picker'
import getExtraFooter from './utils/get-extra-footer'
import getRanges from './utils/get-ranges'
import classNames from 'classnames'
import usePopper from '../_utils/usePopper'

// type RangePickerProps = RangeDateProps | RangeMonthProps | RangeWeekProps | RangeQuarterProps | RangeYearProps

export type RangeType = 'start' | 'end'

export interface RangeInfo {
  range: RangeType
}

export type RangeDateRender = (currentDate: DateType, today: DateType, info: RangeInfo) => ReactNode

export interface RangePickerSharedProps {
  id?: string
  value?: RangeValue
  defaultValue?: RangeValue
  defaultPickerValue?: [DateType, DateType]
  placeholder?: [string, string]
  disabled?: boolean | [boolean, boolean]
  disabledTimePanel?: (date: EventValue, type: RangeType) => DisabledTimes
  ranges?: Record<string, DateType[] | (() => DateType[])>
  separator?: ReactNode
  allowEmpty?: [boolean, boolean]
  suffixIcon?: ReactNode
  clearIcon?: ReactNode
  mode?: [PanelMode, PanelMode]
  onChange?: (values: RangeValue, formatString: [string | null, string | null]) => void
  onCalendarChange?: (values: RangeValue, formatString: [string | null, string | null], info: RangeInfo) => void
  onPanelChange?: (values: RangeValue, modes: [PanelMode, PanelMode]) => void
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  onOk?: (dates: RangeValue) => void
  activePickerIndex?: 0 | 1
  dateRender?: RangeDateRender
  panelRender?: (originPanel: ReactNode) => ReactNode
  getPopupContainer?: (node: HTMLElement) => HTMLElement
  popupRef?: Ref<any>
  popupStyle?: CSSProperties
  dropdownClassName?: string
}

type OmitPickerProps<Props> = Omit<
  Props,
  | 'value'
  | 'defaultValue'
  | 'defaultPickerValue'
  | 'placeholder'
  | 'disabled'
  | 'disabledTimePanel'
  | 'showToday'
  | 'showTime'
  | 'mode'
  | 'onChange'
  | 'onSelect'
  | 'onPanelChange'
  | 'pickerValue'
  | 'onPickerValueChange'
  | 'onOk'
  | 'dateRender'
>

export type RangeShowTimeObject = Omit<SharedTimeProps, 'defaultValue'> & {
  defaultValue?: DateType[]
}

export interface RangePickerBaseProps extends RangePickerSharedProps, OmitPickerProps<PickerBaseProps> {}

export interface RangePickerDateProps extends RangePickerSharedProps, OmitPickerProps<PickerDateProps> {
  showTime?: boolean | RangeShowTimeObject
}

export interface RangePickerTimeProps extends RangePickerSharedProps, OmitPickerProps<PickerTimeProps> {
  order?: boolean
}

export type RangePickerProps = RangePickerBaseProps | RangePickerDateProps | RangePickerTimeProps

// TMP type to fit for ts 3.9.2
type OmitType = Omit<RangePickerBaseProps, 'picker'> &
  Omit<RangePickerDateProps, 'picker'> &
  Omit<RangePickerTimeProps, 'picker'>

interface MergedRangePickerProps extends OmitType {
  picker?: PickerMode
}

export type RangeArray = { key: string; newValue: RangeValue }[]

// 范围时间顺序错误时重新排序
function reorderValues(values: RangeValue): RangeValue {
  if (values && values[0] && values[1] && isAfter(values[0] as DateType, values[1] as DateType)) {
    return [values[1], values[0]]
  }

  return values
}

// 是否可以切换选择器
function canValueTrigger(
  value: EventValue,
  index: number,
  disabled: [boolean, boolean],
  allowEmpty?: [boolean, boolean] | null,
): boolean {
  if (value) {
    return true
  }

  if (allowEmpty && allowEmpty[index]) {
    return true
  }

  if (disabled[(index + 1) % 2]) {
    return true
  }

  return false
}

const InternalRangePicker = (
  props: Partial<RangePickerProps>,
  ref: unknown,
): FunctionComponentElement<Partial<RangePickerProps>> => {
  const { prefixCls: customPrefixcls } = props

  const {
    getPrefixCls,
    prefixCls,
    compDefaultProps: userDefaultProps,
    locale: globalLocale,
  } = useContext(ConfigContext)
  const datePickerProps = getCompProps('RangePicker', userDefaultProps, props)
  const datePickerPrefixCls = getPrefixCls!(prefixCls, 'date-picker', customPrefixcls)

  const {
    allowClear,
    value,
    defaultValue,
    mode,
    picker = 'date',
    defaultOpen,
    open,
    disabled,
    inputReadOnly,
    size,
    placeholder,
    allowEmpty,
    className,
    style,
    popupStyle,
    dropdownClassName,
    popupRef,
    borderType,
    separator,
    ranges,

    format,
    showTime,
    yearItemNumber,
    use12Hours,
    defaultPickerValue,
    order,
    locale,
    components,
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    suffixIcon,
    clearIcon,
    panelRender,
    renderExtraFooter,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    disabledDate,
    onOpenChange,
    // onPanelChange,
    onChange,
    onCalendarChange,
    onFocus,
    onBlur,
    onOk,
    getPopupContainer,
    status,
    cellRender,
  } = datePickerProps as MergedRangePickerProps

  const needConfirmButton: boolean = (picker === 'date' && !!showTime) || picker === 'time'

  const datePickerLang: InnerLocale = mergeDateLocale(
    globalLocale.getCompLangMsg({ componentName: 'DatePicker' }),
    locale || {},
  )
  // ref
  const panelDivRef = useRef<HTMLDivElement>(null)
  const defaultRef = useRef<HTMLInputElement>(null)
  const inputDivRef = (ref as any) || defaultRef
  const startInputDivRef = useRef<HTMLDivElement>(null)
  const endInputDivRef = useRef<HTMLDivElement>(null)
  const separatorRef = useRef<HTMLDivElement>(null)
  const startInputRef = useRef<HTMLInputElement>(null)
  const endInputRef = useRef<HTMLInputElement>(null)
  const defaultPopupRef = useRef<HTMLInputElement>(null)
  const popperRef = popupRef || defaultPopupRef

  const openRecordsRef = useRef<Record<number, boolean>>({})

  const mergedDisabled = useMemo<[boolean, boolean]>(() => {
    if (Array.isArray(disabled)) {
      return disabled
    }

    return [disabled || false, disabled || false]
  }, [disabled])

  const _format = getDefaultFormat(format, picker, showTime, use12Hours)

  // Active picker
  const [mergedActivePickerIndex, setMergedActivePickerIndex] = useMergedState<0 | 1>(0, {
    // value: activePickerIndex,
  })
  // 原始数据
  const [dateValue, setInnerValue] = useMergedState<RangeValue>(null, {
    value,
    defaultValue,
  })

  // 选中的数据
  const [selectedValue, setSelectedValue] = useMergedState<RangeValue>(null, {
    defaultValue: dateValue,
    postState: (values) => {
      let postValues = values

      if (mergedDisabled[0] && mergedDisabled[1]) {
        return postValues
      }

      // Fill disabled unit
      for (let i = 0; i < 2; i++) {
        const v = getValue(postValues, i)
        if (mergedDisabled[i] && !v && !getValue(allowEmpty, i)) {
          postValues = updateValues(postValues, newDate(), i)
        } else if (v && !isValid(v)) {
          postValues = updateValues(postValues, null, i)
        }
      }
      return postValues
    },
  })

  let hours: TimeUnit[]
  let minutes: TimeUnit[]
  let seconds: TimeUnit[]
  let originHour: number
  let minute: number
  let second: number
  let disabledTimePanel = false

  if (picker === 'time' || (picker === 'date' && showTime)) {
    originHour = -1
    minute = -1
    second = -1
    if (selectedValue && selectedValue[mergedActivePickerIndex]) {
      originHour = getHours(selectedValue[mergedActivePickerIndex] as DateType)
      minute = selectedValue ? getMinutes(selectedValue[mergedActivePickerIndex] as DateType) : -1
      second = selectedValue ? getSeconds(selectedValue[mergedActivePickerIndex] as DateType) : -1
    }
    hours = generateUnits(0, 23, hourStep, disabledHours && disabledHours())
    minutes = generateUnits(0, 59, minuteStep, disabledMinutes && disabledMinutes(originHour))
    seconds = generateUnits(0, 59, secondStep, disabledSeconds && disabledSeconds(originHour, minute))
    if (
      (hours && !hours.find((n) => !n.disabled)) ||
      (minutes && !minutes.find((n) => !n.disabled)) ||
      (seconds && !seconds.find((n) => !n.disabled))
    ) {
      disabledTimePanel = true
    }
  }

  // 面板展示日期
  const [getViewDate, setViewDate] = useRangeViewDates({
    values: dateValue,
    picker,
    defaultDates: defaultPickerValue,
  })

  // text
  const startValueTexts = useValueTexts(getValue(selectedValue, 0), { format: _format })

  const endValueTexts = useValueTexts(getValue(selectedValue, 1), { format: _format })

  const onTextChange = (newText: string, index: 0 | 1) => {
    let inputTempDate
    if (newText === '') {
      triggerChange(updateValues(selectedValue, null, index), index)
    } else if (newText && newText.length >= _format.length) {
      inputTempDate = parseDate(newText, _format)

      const disabledFunc = index === 0 ? disabledStartDate : disabledEndDate
      if (inputTempDate && (!disabledFunc || !disabledFunc(inputTempDate))) {
        if (picker !== 'year') {
          triggerChange(updateValues(selectedValue, inputTempDate, index), index)
          setViewDate(inputTempDate, index)
        } else if (isValid(inputTempDate)) {
          triggerChange(updateValues(selectedValue, inputTempDate, index), index)
          setViewDate(inputTempDate, index)
        }
      }
    }
  }

  // input 展示
  const [startText, triggerStartTextChange, resetStartText] = useTextValueMapping({
    valueText: startValueTexts,
    onTextChange: (newText) => onTextChange(newText, 0),
  })

  const [endText, triggerEndTextChange, resetEndText] = useTextValueMapping({
    valueText: endValueTexts,
    onTextChange: (newText) => onTextChange(newText, 1),
  })

  const [hoverRangedValue, setHoverRangedValue] = useState<RangeValue>([null, null])

  const [startHoverValue, onStartEnter, onStartLeave] = useHoverValue(startText, {
    format: _format,
  })

  const [endHoverValue, onEndEnter, onEndLeave] = useHoverValue(endText, {
    format: _format,
  })

  const [mergedOpen, triggerInnerOpen] = useMergedState(false, {
    value: open,
    defaultValue: defaultOpen,
    postState: (postOpen) => (mergedDisabled[mergedActivePickerIndex] ? false : postOpen),
    onChange: (newOpen) => {
      if (onOpenChange) {
        onOpenChange(newOpen)
      }
    },
  })

  const startOpen = mergedOpen && mergedActivePickerIndex === 0
  const endOpen = mergedOpen && mergedActivePickerIndex === 1

  const [mergedModes, setInnerModes] = useMergedState<[PanelMode, PanelMode]>([picker, picker], {
    value: mode,
  })

  const [innerPicker, setInnerPicker] = useState<IInnerPicker>(undefined)

  useEffect(() => {
    setInnerModes([picker, picker])
  }, [picker])

  const [disabledStartDate, disabledEndDate] = useRangeDisabled(
    {
      picker,
      selectedValue,
      disabled: mergedDisabled,
      disabledDate,
    },
    openRecordsRef.current[1],
    openRecordsRef.current[0],
  )

  const triggerRef = useRef<any>()
  const triggerOpen = (newOpen: boolean, index: 0 | 1) => {
    if (newOpen) {
      clearTimeout(triggerRef.current)
      openRecordsRef.current[index] = true

      setMergedActivePickerIndex(index)
      triggerInnerOpen(newOpen)

      // Open to reset view date
      if (!mergedOpen) {
        setViewDate(null, index)
      }
    } else if (mergedActivePickerIndex === index) {
      triggerInnerOpen(newOpen)
      const openRecords = openRecordsRef.current
      triggerRef.current = setTimeout(() => {
        if (openRecords === openRecordsRef.current) {
          openRecordsRef.current = {}
        }
      })
    }
  }

  const triggerOpenAndFocus = (index: 0 | 1) => {
    triggerOpen(true, index)
    // Use setTimeout to make sure panel DOM exists
    setTimeout(() => {
      const inputRef = [startInputRef, endInputRef][index]
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  const triggerChangeInner = (values: RangeValue) => {
    if (typeof value === 'undefined') {
      setInnerValue(values)
    }
    if (
      onChange &&
      (!isEqual(getValue(dateValue, 0)!, getValue(values, 0)) || !isEqual(getValue(dateValue, 1)!, getValue(values, 1)))
    ) {
      onChange(values, [
        values && values[0] ? formatDate(values[0], _format) : '',
        values && values[1] ? formatDate(values[1], _format) : '',
      ])
    }
  }

  const triggerChange = (newValue: RangeValue, sourceIndex: 0 | 1) => {
    let values = newValue
    let startValue = getValue(values, 0)
    let endValue = getValue(values, 1)

    if (startValue && endValue && isAfter(startValue, endValue)) {
      if (
        (picker === 'week' && !isSameWeek(startValue, endValue)) ||
        (picker === 'quarter' && !isSameQuarter(startValue, endValue)) ||
        (picker === 'time' && !isEqual(startValue, endValue)) ||
        (picker !== 'week' && picker !== 'quarter' && picker !== 'time' && !isSameDay(startValue, endValue))
      ) {
        if (sourceIndex === 0) {
          values = [startValue, null]
          endValue = null
        } else {
          startValue = null
          values = [null, endValue]
        }

        openRecordsRef.current = {
          [sourceIndex]: true,
        }
      }
    }

    setSelectedValue(values)
    const startStr = values && values[0] ? formatDate(values[0], _format) : ''
    const endStr = values && values[1] ? formatDate(values[1], _format) : ''

    if (onCalendarChange) {
      const info: RangeInfo = { range: sourceIndex === 0 ? 'start' : 'end' }
      onCalendarChange(values, [startStr, endStr], info)
    }

    const canStartValueTrigger = canValueTrigger(startValue, 0, mergedDisabled, allowEmpty)
    const canEndValueTrigger = canValueTrigger(endValue, 1, mergedDisabled, allowEmpty)

    const canTrigger = values === null || (canStartValueTrigger && canEndValueTrigger)

    if (canTrigger) {
      if (order) {
        triggerChangeInner(reorderValues(values))
      } else {
        triggerChangeInner(values)
      }
    }

    const curValue = getValue(values, sourceIndex)
    let nextOpenIndex: 0 | 1 | null = null
    if (sourceIndex === 0 && !mergedDisabled[1]) {
      nextOpenIndex = 1
    } else if (sourceIndex === 1 && !mergedDisabled[0]) {
      nextOpenIndex = 0
    }

    if (
      nextOpenIndex !== null &&
      nextOpenIndex !== mergedActivePickerIndex &&
      (!openRecordsRef.current[nextOpenIndex] || !getValue(values, nextOpenIndex)) &&
      curValue
    ) {
      triggerOpenAndFocus(nextOpenIndex)
    } else if (curValue) {
      triggerOpen(false, sourceIndex)
    }
  }

  const onSelect = (date: DateType, type: ISelectType) => {
    const values = updateValues(selectedValue, date, mergedActivePickerIndex)
    if (type === 'inner') {
      if (values && values[mergedActivePickerIndex] && isDate(values[mergedActivePickerIndex])) {
        setViewDate(values[mergedActivePickerIndex], mergedActivePickerIndex)
      }
    } else {
      if (type === 'submit' || (type !== 'key' && !needConfirmButton)) {
        triggerChange(values, mergedActivePickerIndex)

        if (mergedActivePickerIndex === 0) {
          onStartLeave()
        } else {
          onEndLeave()
        }
      } else {
        setSelectedValue(values)
      }
    }
  }

  const onDateMouseEnter = (date: DateType) => {
    setHoverRangedValue(updateValues(selectedValue, date, mergedActivePickerIndex))
    if (mergedActivePickerIndex === 0) {
      onStartEnter(date)
    } else {
      onEndEnter(date)
    }
  }

  const onDateMouseLeave = () => {
    if (mergedActivePickerIndex === 0) {
      onStartLeave()
    } else {
      onEndLeave()
    }
    setHoverRangedValue([null, null])
  }

  const startStr = dateValue && dateValue[0] ? formatDate(dateValue[0], 'YYYYMMDDHHmmss') : ''
  const endStr = dateValue && dateValue[1] ? formatDate(dateValue[1], 'YYYYMMDDHHmmss') : ''

  useEffect(() => {
    if (!mergedOpen) {
      setSelectedValue(dateValue)
      setViewDate(null, 0)
      setViewDate(null, 1)
      resetStartText()
      resetEndText()
      setHoverRangedValue([null, null])
    } else {
      setInnerPicker(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedOpen, startValueTexts, endValueTexts])

  // Sync innerValue with control mode
  useEffect(() => {
    setSelectedValue(dateValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startStr, endStr])

  const renderPanel = () => {
    const panelProps = {
      ...datePickerProps,
      mergedActivePickerIndex,
      disabledDate: mergedActivePickerIndex === 0 ? disabledStartDate : disabledEndDate,
    }
    let panelNode: ReactNode = <Panel {...panelProps} />
    if (panelRender) {
      panelNode = panelRender(panelNode)
    }
    return panelNode
  }

  const extraNode = getExtraFooter(datePickerPrefixCls, mergedModes[mergedActivePickerIndex], renderExtraFooter)

  const rangesNode = getRanges({
    prefixCls: datePickerPrefixCls,
    components,
    needConfirmButton,
    okDisabled:
      !getValue(selectedValue, mergedActivePickerIndex) ||
      !!(
        selectedValue &&
        selectedValue[mergedActivePickerIndex] &&
        disabledDate &&
        disabledDate(selectedValue![mergedActivePickerIndex]!, {
          range: mergedActivePickerIndex === 0 ? 'start' : 'end',
        })
      ),
    locale: datePickerLang,
    // rangeList,
    onOk: () => {
      if (getValue(selectedValue, mergedActivePickerIndex)) {
        // triggerChangeOld(selectedValue);
        triggerChange(selectedValue, mergedActivePickerIndex)
        if (onOk) {
          onOk(selectedValue)
        }
      }
    },
  })

  // 渲染日期选择表盘
  const renderPanels = () => {
    let panels: ReactNode
    const viewDate = getViewDate(mergedActivePickerIndex)
    if (picker !== 'time' && !showTime) {
      const nextViewDate = getClosingViewDate(viewDate, picker, 1, yearItemNumber)
      const leftPanel = (
        <Context.Provider
          value={{
            hoverRangedValue,
            panelPosition: 'left',
            prefixCls: datePickerPrefixCls,
            rangeValue: selectedValue,
            viewDate: viewDate,
            locale: datePickerLang,
            open: mergedOpen,
            onSelect,
            setViewDate,
            onDateMouseEnter: onDateMouseEnter,
            onDateMouseLeave: onDateMouseLeave,
            innerPicker,
            setInnerPicker,
            cellRender,
            range: mergedActivePickerIndex === 0 ? 'start' : 'end',
          }}
        >
          {renderPanel()}
        </Context.Provider>
      )
      const rightPanel = (
        <Context.Provider
          value={{
            hoverRangedValue,
            panelPosition: 'right',
            prefixCls: datePickerPrefixCls,
            rangeValue: selectedValue,
            viewDate: nextViewDate,
            locale: datePickerLang,
            open: mergedOpen,
            onSelect,
            setViewDate,
            onDateMouseEnter: onDateMouseEnter,
            onDateMouseLeave: onDateMouseLeave,
            innerPicker,
            setInnerPicker,
            cellRender,
            range: mergedActivePickerIndex === 0 ? 'start' : 'end',
          }}
        >
          {renderPanel()}
        </Context.Provider>
      )
      panels = (
        <div className={classNames(`${datePickerPrefixCls}-container-date`)}>
          {leftPanel}
          {innerPicker === undefined ? rightPanel : null}
        </div>
      )
    } else {
      panels = (
        <Context.Provider
          value={{
            hours,
            minutes,
            seconds,
            originHour,
            minute,
            second,
            disabledTimePanel,
            rangeValue: selectedValue,
            prefixCls: datePickerPrefixCls,
            dateValue: selectedValue ? selectedValue[mergedActivePickerIndex] : null,
            viewDate: viewDate,
            locale: datePickerLang,
            open: mergedOpen,
            onSelect,
            setViewDate,
            onDateMouseEnter: onDateMouseEnter,
            onDateMouseLeave: onDateMouseLeave,
            innerPicker,
            setInnerPicker,
            cellRender,
            range: mergedActivePickerIndex === 0 ? 'start' : 'end',
          }}
        >
          {renderPanel()}
        </Context.Provider>
      )
    }
    return panels
  }

  // 箭头偏移(不展示箭头也需要计算)
  let arrowLeft = 0
  if (mergedActivePickerIndex && startInputDivRef.current && separatorRef.current) {
    // Arrow offset
    arrowLeft = startInputDivRef.current.offsetWidth + separatorRef.current.offsetWidth - 10
  }

  // input active Bar 宽度 偏移
  let activeBarLeft = -10
  let activeBarWidth = 0

  if (startInputDivRef.current && endInputDivRef.current && separatorRef.current) {
    if (mergedActivePickerIndex === 0) {
      activeBarWidth = startInputDivRef.current.offsetWidth
    } else {
      activeBarLeft = arrowLeft
      activeBarWidth = endInputDivRef.current.offsetWidth
    }
  }
  const activeBarPositionStyle = { left: activeBarLeft }

  const inputProps: InputRangeProps = {
    startInputRef,
    endInputRef,
    startInputDivRef,
    endInputDivRef,
    separatorRef,
    panelDivRef,

    activeBarWidth,
    activeBarPositionStyle,
    allowClear,
    picker,
    borderType,
    className,
    style,
    size,
    placeholder,
    startText,
    endText,
    dateValue,
    selectedValue,
    startHoverValue,
    endHoverValue,
    mergedDisabled,
    mergedActivePickerIndex,
    separator,
    startOpen,
    endOpen,
    needConfirmButton,
    suffixIcon,
    clearIcon,
    format: _format,
    open: mergedOpen,
    readOnly: inputReadOnly,
    prefixCls: datePickerPrefixCls,
    locale: datePickerLang,
    dataOrAriaProps: getDataOrAriaProps(datePickerProps),

    resetStartText,
    resetEndText,
    triggerStartTextChange,
    triggerEndTextChange,
    triggerOpen,
    setSelectedValue,
    setMergedActivePickerIndex,
    setHoverRangedValue,
    triggerOpenAndFocus,
    triggerChange,
    onFocus,
    onBlur,
    status,
  }

  const renderConfig = () => {
    if (ranges) {
      const rangeArray: RangeArray = []
      Object.keys(ranges).forEach((key) => {
        let range = ranges[key]
        if (typeof range === 'function') {
          range = range()
        }
        if (Array.isArray(range) && range.length === 2 && range[0] && range[1]) {
          rangeArray.push({ key, newValue: [new Date(range[0]), new Date(range[1])] })
        }
      })

      if (rangeArray.length) {
        return (
          <div className={classNames(`${datePickerPrefixCls}-ranges`)}>
            {rangeArray.map(({ key, newValue }) => {
              return (
                <div
                  className={classNames(`${datePickerPrefixCls}-ranges-item`)}
                  key={key}
                  onClick={() => {
                    triggerChange(newValue, 1)
                    if (onOk) {
                      onOk(newValue)
                    }
                    triggerInnerOpen(false)
                  }}
                >
                  {key}
                </div>
              )
            })}
          </div>
        )
      }
    }
    return null
  }

  return usePopper(
    <InputDate ref={inputDivRef} {...inputProps} />,
    <div
      ref={popperRef}
      onMouseDown={(e) => {
        e.preventDefault()
      }}
      className={classNames(`${datePickerPrefixCls}-container`)}
    >
      <div>
        {renderPanels()}
        {extraNode || rangesNode ? (
          <div className={`${datePickerPrefixCls}-footer`}>
            {extraNode}
            {rangesNode}
          </div>
        ) : null}
      </div>
      <div>{renderConfig()}</div>
    </div>,
    {
      trigger: 'click',
      prefixCls: `${datePickerPrefixCls}-panel`,
      arrow: false,
      popperStyle: popupStyle,
      popperClassName: dropdownClassName,
      visible: mergedOpen,
      placement: 'bottomLeft',
      getPopupContainer,
    },
  )
}

const RangePicker = forwardRef<unknown, Partial<RangePickerProps>>(InternalRangePicker)
RangePicker.displayName = 'RangePicker'
export default RangePicker
