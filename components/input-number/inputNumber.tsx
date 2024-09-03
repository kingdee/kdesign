import React, {
  FunctionComponentElement,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  useMemo,
} from 'react'
import Input, { InputProps } from '../input'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { serialization } from '../_utils/numberUtil'
import { formatEditNumber, formatNumber, FormatParam } from '../_utils/formatUtil'
import devWarning from '../_utils/devwarning'
import Big from 'big.js'
import classNames from 'classnames'
import useSelectionRange from './useSelectionRange'

export type StepType = 'embed' | 'base'

interface RefObject<T> {
  // immutable
  readonly current: T | null
}
export interface StepOption {
  type?: StepType
  step?: number
  stepBtnClassName?: string
}
export interface InputNumberProps extends InputProps {
  digitLength?: number // 数字的位数
  decimalLength?: number // 小数点后位数
  zeroShow?: boolean // 为零是否显示
  showDecimalTailZero?: boolean // 是否显示小数尾部0
  mask?: string // 掩码
  min?: number // 最小值
  minMark?: string // 最小值比较符
  max?: number // 最大值
  maxMark?: string // 最大值比较符
  symbol?: string // 货币符号
  mustInScope?: boolean // 输入内容是否必须在设定的数字范围内(不在范围内则不允许输入)
  mustInPrecisionScope?: boolean // 输入限制在精度范围 默认-true
  stepOption?: StepOption
  stepperrref?: any
  formatter?: (value: string | undefined) => string
  numberMode?: boolean
}

const InternalInputNumber = (props: InputNumberProps, ref: unknown): FunctionComponentElement<InputNumberProps> => {
  const { compDefaultProps: userDefaultProps, getPrefixCls, prefixCls } = useContext(ConfigContext)
  const inputNumberProps = getCompProps('InputNumber', userDefaultProps, props)
  const {
    value,
    defaultValue,
    mustInScope,
    decimalLength,
    mustInPrecisionScope,
    digitLength,
    onChange,
    symbol,
    zeroShow,
    showDecimalTailZero,
    code,
    roundMethod,
    mask,
    stepOption,
    min,
    minMark,
    max,
    maxMark,
    numberMode,
    prefix,
    suffix,
    formatter,
    className,
    onKeyDown,
    ...others
  } = inputNumberProps
  const initVal = value === undefined ? defaultValue : value
  const [inputValue, setInputValue] = useState(serialization(initVal !== undefined ? initVal + '' : ''))
  const [forceUpdate, setForceUpdate] = useState(1)
  const [compositionValue, setCompositionValue] = useState('')
  const inputStatus = useRef({ isHandleChange: false, inputFocused: false })
  const inputPrefixCls = getPrefixCls!(prefixCls, 'inputNumber', inputNumberProps.prefixCls)
  const thisInputNumberRef = useRef<HTMLElement>()
  const inputNumberRef = (ref as any) || thisInputNumberRef
  const stepMouseDownDelayTimer = useRef<any>(null)
  const stepMouseDownIntervalTimer = useRef<any>(null)
  const refIszComposition = useRef(false)

  const isScopeValid = (value: string) => {
    if (value === '') return true
    const numberValue = parseFloat(value) || 0
    if (min >= 0 && value.substr(0, 1) === '-') return false // 数值范围>=0时,不允许输入负号
    if (
      (minMark === '[' && numberValue < min) ||
      (minMark === '(' && numberValue <= min) ||
      (maxMark === ']' && numberValue > max) ||
      (maxMark === ')' && numberValue >= max)
    )
      return false
    return true
  }

  useEffect(() => {
    if (typeof value === 'undefined') {
      return
    }
    setInputValue(serialization(value + ''))
  }, [value])

  const handleEventAttachValue = (
    event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
    value: string | number,
  ) => {
    return Object.assign({}, event, { target: { value: value } })
  }

  const verifiValue = (initValue: string): false | string => {
    // 将 value 进行数字序列化 剔除非数字输入-复制粘贴的情况
    let value = serialization(initValue)

    // 校验数字合法性
    if (!/^-?\d*\.?\d*$/.test(value)) return false

    // 输入内容超出数字范围不允许输入
    if (mustInScope && !isScopeValid(value)) {
      return false
    }

    // 整数字段不允许输入小数点
    if (decimalLength === 0 && value.includes('.')) {
      return false
    }

    if (mustInPrecisionScope) {
      value = handleNumericalAccuracy(value)
      if (value === inputValue) return false
    }
    return value
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputStatus.current.isHandleChange = true
    const newValue = event.target.value
    if (!refIszComposition.current) {
      compositionValue && setCompositionValue('')
      const legalNumber = verifiValue(newValue)
      if (legalNumber === false) {
        setForceUpdate(forceUpdate + 1)
        return false
      }
      value === undefined && setInputValue(legalNumber)
      onChange && onChange(handleEventAttachValue(event, numberMode ? Number(legalNumber) : legalNumber))
      updateSelectionRangePosition(event)
    } else {
      setCompositionValue(newValue)
    }
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    inputStatus.current.inputFocused = true
    const { onFocus } = inputNumberProps
    const formatValue = formatEditNumber(inputValue, {
      zeroShow,
      decimalLength,
      showDecimalTailZero,
      roundMethod,
      symbol,
    })
    value === undefined && setInputValue(formatValue)
    onFocus && onFocus(handleEventAttachValue(event, formatValue))
  }

  const handleFormatValue = (value: string | number, param: FormatParam): string => {
    if (!value && value !== 0) return ''
    return formatNumber(value, param)
  }

  const handleNumericalAccuracy = (numerical: string): string => {
    let resultNumerical = ''
    let [integerValue, decimalValue = ''] = numerical.split('.')
    let sign = ''
    if (integerValue.includes('-')) {
      integerValue = integerValue.replace('-', '')
      sign = '-'
    }
    const integerValueLength = integerValue.length
    const decimalValueLength = decimalValue.length

    if (typeof decimalLength === 'number' && typeof digitLength === 'number') {
      if (decimalValueLength <= decimalLength && integerValueLength <= digitLength - decimalLength) {
        resultNumerical = numerical
      } else if (integerValueLength > digitLength - decimalLength) {
        resultNumerical = mustInPrecisionScope
          ? inputValue
          : `${sign}${integerValue.substr(0, digitLength - decimalLength)}${decimalValue ? '.' + decimalValue : ''}`
      } else if (decimalValueLength > decimalLength) {
        resultNumerical = mustInPrecisionScope
          ? inputValue
          : `${sign}${integerValue}.${decimalValue.substr(0, decimalLength)}`
      }
    } else if (typeof decimalLength !== 'number' && typeof digitLength === 'number') {
      if (integerValueLength >= digitLength) {
        resultNumerical = `${sign}${integerValue.substr(0, digitLength)}`
      } else {
        resultNumerical = decimalValueLength
          ? `${sign}${integerValue}.${decimalValue.substr(0, digitLength - integerValueLength)}`
          : `${sign}${integerValue}`
      }
    } else if (typeof decimalLength === 'number' && typeof digitLength !== 'number') {
      resultNumerical = decimalValueLength
        ? `${sign}${integerValue}.${decimalValue.substr(0, decimalLength)}`
        : `${sign}${integerValue}`
    } else {
      resultNumerical = numerical
    }
    if (
      inputStatus.current.inputFocused &&
      resultNumerical.indexOf('.') === -1 &&
      numerical.indexOf('.') > -1 &&
      numerical.indexOf('.') === numerical.length - 1
    ) {
      resultNumerical += '.'
    }
    return resultNumerical
  }

  type StepBtnType = 'plus' | 'minus'
  const handleStepChang = (type: StepBtnType) => {
    const step = stepOption.step === undefined ? 1 : parseFloat(stepOption.step)
    if (typeof step !== 'number') {
      devWarning(true, 'inputNumber', `stepOption.step must be a number.`)
      return false
    }
    const startingNumber = parseFloat(inputNumberRef.current?.input?.value) || 0
    const calculationResults = new Big(startingNumber)[type](step).valueOf()
    const legalNumber = verifiValue(calculationResults)
    if (legalNumber === false) {
      return false
    }
    setInputValue(legalNumber)
    onChange && onChange({ target: { value: legalNumber } })
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    onKeyDown?.(event)
    if (!stepOption || props.disabled || props.readOnly) {
      return
    }
    const keyCode = event.keyCode
    if ([38, 40].includes(keyCode)) {
      event.preventDefault()
      handleStepChang(keyCode === 38 ? 'plus' : 'minus')
    }
  }

  const clearAllTimer = useCallback(() => {
    stepMouseDownDelayTimer.current && clearTimeout(stepMouseDownDelayTimer.current)
    stepMouseDownIntervalTimer.current && clearInterval(stepMouseDownIntervalTimer.current)
    document.removeEventListener('mouseup', clearAllTimer)
    return false
  }, [stepMouseDownDelayTimer, stepMouseDownIntervalTimer])

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    inputStatus.current.isHandleChange = false
    inputStatus.current.inputFocused = false
    const { min, max, onBlur } = inputNumberProps
    let _inputValue = inputValue
    if (_inputValue === '-' || _inputValue === '.') {
      _inputValue = ''
    }
    const bigValue = new Big(Number(_inputValue))
    // 还原最小值
    if (typeof min === 'number' && bigValue.lt(min)) {
      _inputValue = min.toString()
      onChange?.(handleEventAttachValue(event, numberMode ? Number(_inputValue) : _inputValue))
    }
    // 还原最大值
    if (typeof max === 'number' && bigValue.gt(max)) {
      _inputValue = max.toString()
      onChange?.(handleEventAttachValue(event, numberMode ? Number(_inputValue) : _inputValue))
    }
    // 超过精度位数直接截断
    _inputValue = handleNumericalAccuracy(_inputValue)
    const formatValue = handleFormatValue(_inputValue, {
      mask,
      zeroShow,
      decimalLength,
      showDecimalTailZero,
      symbol,
      code,
    })
    setInputValue(formatValue)
    onBlur && onBlur(handleEventAttachValue(event, _inputValue))
    inputStatus.current.isHandleChange = false
    inputStatus.current.inputFocused = false
  }

  useEffect(() => {
    if (typeof value === 'undefined') {
      return
    }
    const { isHandleChange, inputFocused } = inputStatus.current
    if (isHandleChange) {
      return
    }
    setInputValue((_inputValue) => {
      const isValueChange =
        value !==
        (inputFocused
          ? _inputValue
          : formatEditNumber(_inputValue, { zeroShow, decimalLength, showDecimalTailZero, roundMethod, symbol }))
      if (!inputFocused || isValueChange) {
        if (value === '' || value === null) {
          return ''
        } else {
          const formatValue = inputFocused
            ? formatEditNumber(value, { zeroShow, decimalLength, showDecimalTailZero })
            : handleFormatValue(value, { mask, zeroShow, decimalLength, showDecimalTailZero, symbol, code })
          return formatValue
        }
      }
      return _inputValue
    })
  }, [value, zeroShow, decimalLength, showDecimalTailZero, symbol, code, roundMethod, mask])

  useEffect(() => {
    return () => {
      clearAllTimer()
    }
  }, [clearAllTimer])

  useImperativeHandle(props.stepperrref as RefObject<unknown>, () => ({
    value: inputValue,
    handleNumericalAccuracy,
    verifiValue,
    setValue: (value: any) => setInputValue(value),
  }))

  const displayedInputValue = useMemo<string>(() => {
    return formatter ? formatter(inputValue) : inputValue
  }, [inputValue, formatter])

  const updateSelectionRangePosition = useSelectionRange({
    inputElement: inputNumberRef.current?.input,
    inputValue: displayedInputValue,
    forceUpdate,
  })

  const handleComposition = (e: any) => {
    refIszComposition.current = e.type !== 'compositionend'
    if (!refIszComposition.current) {
      setCompositionValue('')
      handleChange(e)
    }
  }

  return (
    <Input
      {...others}
      onCompositionStart={handleComposition}
      onCompositionUpdate={handleComposition}
      onCompositionEnd={handleComposition}
      ref={inputNumberRef}
      value={compositionValue || displayedInputValue}
      prefix={prefix}
      suffix={suffix}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={classNames(inputPrefixCls, className)}
    />
  )
}
const InputNumber = React.forwardRef<unknown, InputNumberProps>(InternalInputNumber)
InputNumber.displayName = 'InputNumber'
export default InputNumber
