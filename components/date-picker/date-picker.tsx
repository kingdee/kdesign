import React, { FunctionComponentElement, useContext, useEffect, useState } from 'react'
import classnames from 'classnames'

import { DateType, InnerLocale, PickerMode, TimeUnit } from './interface'
import ConfigContext from '../config-provider/ConfigContext'
import { useMergedState, useOnClickOutside } from '../_utils/hooks'
import { getCompProps } from '../_utils'
import Context, { ISelectType } from './context'
import Panel, { PickerPanelBaseProps, PickerPanelDateProps, PickerPanelTimeProps } from './date-panel'
import InputDate, { InputDateProps } from './single/input-date'
import { getDefaultFormat, getDataOrAriaProps, getInternalNextMode, generateUnits } from './utils'
import useValueTexts from './hooks/use-value-texts'
import useHoverValue from './hooks/use-hover-value'
import {
  formatDate,
  getHours,
  getLowerBoundTime,
  getMinutes,
  getSeconds,
  isEqual,
  isValid,
  newDate,
  parseDate,
  setTime,
  isDate,
} from './utils/date-fns'
import useTextValueMapping from './hooks/use-text-value-mapping'
import { BorderType, InputSiteType } from '../input/input'
import getExtraFooter from './utils/get-extra-footer'
import getRanges from './utils/get-ranges'
import usePopper from '../_utils/usePopper'

export interface PickerSharedProps extends React.AriaAttributes {
  dropdownClassName?: string
  popupStyle?: React.CSSProperties
  popupRef?: React.Ref<any>
  transitionName?: string
  placeholder?: string
  allowClear?: boolean
  autoFocus?: boolean
  disabled?: boolean
  tabIndex?: number
  open?: boolean
  defaultOpen?: boolean
  inputReadOnly?: boolean
  id?: string
  borderType: BorderType
  size: InputSiteType

  // Value
  format?: string

  // Render
  suffixIcon?: React.ReactNode
  clearIcon?: React.ReactNode
  prevIcon?: React.ReactNode
  nextIcon?: React.ReactNode
  superPrevIcon?: React.ReactNode
  superNextIcon?: React.ReactNode
  getPopupContainer?: (node: HTMLElement) => HTMLElement
  panelRender?: (originPanel: React.ReactNode) => React.ReactNode

  // Events
  onChange?: (value: DateType | null, dateString: string) => void
  onOpenChange?: (open: boolean) => void
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
  onClick?: React.MouseEventHandler<HTMLDivElement>
  onContextMenu?: React.MouseEventHandler<HTMLDivElement>
  status?: 'error'
}

type OmitPanelProps<Props> = Omit<Props, 'onChange' | 'hideHeader' | 'pickerValue' | 'onPickerValueChange'>

export interface PickerBaseProps extends PickerSharedProps, OmitPanelProps<PickerPanelBaseProps> {}

export interface PickerDateProps extends PickerSharedProps, OmitPanelProps<PickerPanelDateProps> {}

export interface PickerTimeProps extends PickerSharedProps, Omit<OmitPanelProps<PickerPanelTimeProps>, 'format'> {
  picker: 'time'
  defaultOpenValue?: DateType
}

export type PickerProps = PickerBaseProps | PickerDateProps | PickerTimeProps

type OmitType = Omit<PickerBaseProps, 'picker'> & Omit<PickerDateProps, 'picker'> & Omit<PickerTimeProps, 'picker'>

interface MergedPickerProps extends OmitType {
  picker?: PickerMode
}

export type IInnerPicker = undefined | 'year' | 'month'

const InternalDatePicker = (
  props: Partial<PickerProps>,
  ref: unknown,
): FunctionComponentElement<Partial<PickerProps>> => {
  const { prefixCls: customPrefixcls } = props

  const {
    getPrefixCls,
    prefixCls,
    compDefaultProps: userDefaultProps,
    locale: globalLocale,
  } = useContext(ConfigContext)
  const datePickerProps: MergedPickerProps = getCompProps('DatePicker', userDefaultProps, props)

  const datePickerPrefixCls = getPrefixCls!(prefixCls, 'date-picker', customPrefixcls)

  const {
    id,
    style,
    className,
    dropdownClassName,
    popupStyle,
    popupRef,
    locale,
    inputReadOnly,
    allowClear,
    autoFocus,
    picker = 'date',
    mode,
    format,
    value,
    defaultValue,
    defaultPickerValue,
    open,
    defaultOpen,
    suffixIcon,
    clearIcon,
    disabled,
    placeholder,
    borderType,
    size,
    showToday,
    showTime,
    showNow,
    use12Hours,
    components,
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,

    disabledDate,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    getPopupContainer,
    panelRender,
    renderExtraFooter,
    onChange,
    onSelect,
    onOpenChange,
    onFocus,
    onBlur,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onContextMenu,
    onClick,
    onOk,
    status,
  } = datePickerProps

  const inputDivRefDefault = React.useRef<HTMLElement>(null)
  const inputDivRef = (ref as any) || inputDivRefDefault
  const popperRefDefault = React.useRef<HTMLDivElement>(null)
  const popperRef = (popupRef as any) || popperRefDefault
  const inputRef = React.useRef<HTMLInputElement>(null)

  const isHourStepValid = 24 % hourStep === 0
  const isMinuteStepValid = 60 % minuteStep === 0
  const isSecondStepValid = 60 % secondStep === 0

  const needConfirmButton: boolean = (picker === 'date' && !!showTime) || picker === 'time'

  const datePickerLang: InnerLocale = Object.assign(
    {},
    globalLocale.getCompLangMsg({ componentName: 'DatePicker' }),
    locale || {},
  )

  const [dateValue, setDateValue] = useMergedState(null, {
    value,
    defaultValue,
  })

  const [selectedValue, setSelectedValue] = React.useState<DateType | null>(dateValue)

  let hours: TimeUnit[]
  let minutes: TimeUnit[]
  let seconds: TimeUnit[]
  let originHour: number
  let minute: number
  let second: number
  let disabledTimePanel = false

  if (picker === 'time' || (picker === 'date' && showTime)) {
    originHour = selectedValue ? getHours(selectedValue) : -1
    minute = selectedValue ? getMinutes(selectedValue) : -1
    second = selectedValue ? getSeconds(selectedValue) : -1
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

  const _format = getDefaultFormat(format, picker, showTime && !disabledTimePanel, use12Hours)

  const [viewDate, setInnerViewDate] = useState<DateType>(defaultPickerValue || dateValue || new Date())

  const setViewDate = (date: any) => {
    setInnerViewDate(isDate(date) ? date : new Date())
  }

  useEffect(() => {
    setViewDate(dateValue)
  }, [dateValue])

  const valueText = useValueTexts(selectedValue, { format: _format })

  const [text, triggerTextChange, resetText] = useTextValueMapping({
    valueText,
    onTextChange: (newText: string) => {
      if (newText === '') {
        triggerChange(null)
        setViewDate(null)
      } else if (newText && newText.length === _format.length) {
        const inputTempDate = parseDate(newText, _format)
        if (inputTempDate && (!disabledDate || !disabledDate(inputTempDate))) {
          if (picker !== 'year') {
            triggerChange(inputTempDate)
            setViewDate(inputTempDate)
          } else if (isValid(inputTempDate)) {
            triggerChange(inputTempDate)
            setViewDate(inputTempDate)
          }
        }
      }
    },
  })

  const [hoverValue, onEnter, onLeave] = useHoverValue(text, {
    format: _format,
  })

  const [openValue, triggerInnerOpen] = useMergedState(false, {
    value: open,
    defaultValue: defaultOpen,
    postState: (postOpen) => (disabled ? false : postOpen),
    onChange: (newOpen) => {
      if (onOpenChange) {
        onOpenChange(newOpen)
      }
      // if (!newOpen && operationRef.current && operationRef.current.onClose) {
      //   operationRef.current.onClose()
      // }
    },
  })

  const [mergedMode, setInnerMode] = useMergedState(
    () => {
      if (picker === 'time') {
        return 'time'
      }
      return getInternalNextMode('date', picker)
    },
    {
      value: mode,
    },
  )

  const [innerPicker, setInnerPicker] = useState<IInnerPicker>(undefined)

  useEffect(() => {
    setInnerMode(picker)
  }, [picker])

  useEffect(() => {
    if (!openValue) {
      setSelectedValue(dateValue)
      if (valueText !== text) {
        resetText()
      }
    } else {
      setInnerPicker(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openValue, valueText])

  useEffect(() => {
    if (!openValue) {
      resetText()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picker])

  useEffect(() => {
    setSelectedValue(dateValue)
  }, [dateValue])

  useOnClickOutside([popperRef, inputDivRef], () => {
    setViewDate(selectedValue || newDate()!)
    triggerOpen(false)
  })

  const triggerChange = (newValue: DateType | null) => {
    if (onSelect) {
      onSelect(newValue!)
    }

    if (onChange && !isEqual(dateValue, newValue)) {
      onChange(newValue, (newValue ? formatDate(newValue, _format) : '') as string)
    }
    setSelectedValue(newValue)
    setDateValue(newValue)
  }

  const triggerOpen = (newOpen: boolean) => {
    if (disabled && newOpen) {
      return
    }

    triggerInnerOpen(newOpen)
  }

  const onContextSelect = (date: DateType, type: ISelectType) => {
    if (type === 'inner') {
      setViewDate(date)
    } else {
      if (type === 'submit' || (type !== 'key' && !needConfirmButton)) {
        setViewDate(date)
        triggerChange(date)
        triggerOpen(false)
      } else {
        setViewDate(date)
        triggerChange(date)
      }
    }
  }

  const onNow = () => {
    const now = newDate()!
    const lowerBoundTime = getLowerBoundTime(
      getHours(now),
      getMinutes(now),
      getSeconds(now),
      isHourStepValid ? hourStep : 1,
      isMinuteStepValid ? minuteStep : 1,
      isSecondStepValid ? secondStep : 1,
    )
    const adjustedNow = setTime(now, {
      hour: lowerBoundTime[0],
      minute: lowerBoundTime[1],
      second: lowerBoundTime[2],
    })
    if ((disabledDate && disabledDate(adjustedNow)) || disabledTimePanel) {
      return
    }
    onContextSelect(adjustedNow, 'submit')
  }

  const extraFooter = getExtraFooter(datePickerPrefixCls, mergedMode, renderExtraFooter)
  const rangesNode = getRanges({
    prefixCls: datePickerPrefixCls,
    components,
    needConfirmButton,
    okDisabled: !selectedValue || (disabledDate && disabledDate(selectedValue)),
    locale: datePickerLang,
    showNow,
    onNow: needConfirmButton && onNow,
    onOk: () => {
      if (selectedValue) {
        onContextSelect(selectedValue, 'submit')
        if (onOk) {
          onOk(selectedValue)
        }
      }
    },
  })

  let todayNode: React.ReactNode

  if (showToday && mergedMode === 'date' && picker === 'date' && !showTime) {
    const now = newDate()!
    const todayCls = `${datePickerPrefixCls}-today-btn`
    const disabled = disabledDate && disabledDate(now)
    todayNode = (
      <div
        className={classnames(todayCls, disabled && `${datePickerPrefixCls}-btn-disabled`)}
        aria-disabled={disabled}
        onClick={() => {
          if (!disabled) {
            onContextSelect(now, 'mouse')
          }
        }}
      >
        {datePickerLang.today}
      </div>
    )
  }

  const panelProps = {
    ...(datePickerProps as Omit<MergedPickerProps, 'picker' | 'format'>),
    format: _format,
    onChange: setSelectedValue,
  }

  const renderPanel = () => {
    let panelNode: React.ReactNode = <Panel {...panelProps} />

    if (panelRender) {
      panelNode = panelRender(panelNode)
    }
    return (
      <Context.Provider
        value={{
          hours,
          minutes,
          seconds,
          originHour,
          minute,
          second,
          disabledTimePanel,
          prefixCls: datePickerPrefixCls,
          dateValue: selectedValue,
          viewDate,
          open: openValue,
          locale: datePickerLang,
          onSelect: onContextSelect,
          setViewDate,
          onDateMouseEnter: onEnter,
          onDateMouseLeave: onLeave,
          innerPicker,
          setInnerPicker,
        }}
      >
        {panelNode}
        {(extraFooter || rangesNode || todayNode) && innerPicker === undefined ? (
          <div className={`${datePickerPrefixCls}-footer`}>
            {extraFooter}
            {rangesNode}
            {todayNode}
          </div>
        ) : null}
      </Context.Provider>
    )
  }

  const inputProps: InputDateProps = {
    inputRef,
    panelDivRef: popperRef,

    id,
    autoFocus,
    allowClear,
    className,
    borderType,
    disabled,
    hoverValue,
    picker,
    placeholder,
    style,
    size,
    text,
    needConfirmButton,
    suffixIcon,
    clearIcon,
    dateValue,
    selectedValue,
    format: _format,
    open: openValue,
    readOnly: inputReadOnly,
    prefixCls: datePickerPrefixCls,
    locale: datePickerLang,
    dataOrAriaProps: getDataOrAriaProps(datePickerProps),

    disabledDate,
    onFocus,
    onBlur,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onContextMenu,
    onClick,
    setSelectedValue,
    triggerTextChange,
    triggerOpen,
    triggerChange,
    resetText,
    status,
  }

  return usePopper(
    <InputDate ref={inputDivRef} {...inputProps} />,
    <div
      ref={popperRef}
      onMouseDown={(e) => {
        e.preventDefault()
      }}
    >
      {renderPanel()}
    </div>,
    {
      trigger: 'click',
      prefixCls: `${datePickerPrefixCls}-panel`,
      arrow: false,
      popperClassName: dropdownClassName,
      popperStyle: popupStyle,
      visible: openValue,
      placement: 'bottomLeft',
      getPopupContainer,
    },
  )
}

const DatePicker = React.forwardRef<unknown, Partial<PickerProps>>(InternalDatePicker)
DatePicker.displayName = 'DatePicker'
export default DatePicker
