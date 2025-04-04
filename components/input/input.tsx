import React, {
  FunctionComponentElement,
  useContext,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { Omit, tuple } from '../_utils/type'
import ClearableInput, { hasPrefixSuffix } from './ClearableLabeledInput'
import devWarning from '../_utils/devwarning'
import { useMergedState } from '../_utils/hooks'

export const InputSiteTypes = tuple('large', 'middle', 'small')
export type InputSiteType = typeof InputSiteTypes[number]
export const BorderTypes = tuple('none', 'underline', 'bordered')
export type BorderType = typeof BorderTypes[number]

export function fixControlledValue(value: ValueType): InputHTMLAttributes<HTMLInputElement>['value'] {
  if (typeof value === 'undefined' || value === null) {
    return ''
  }
  return value as InputHTMLAttributes<HTMLInputElement>['value']
}

export type ValueType = InputHTMLAttributes<HTMLInputElement>['value'] | bigint | null | undefined

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type' | 'value'> {
  type?: string
  size?: InputSiteType
  defaultValue?: string
  disabled?: boolean
  allowClear?: boolean | React.ReactNode
  placeholderTobeValue?: boolean
  addonAfter?: React.ReactNode
  addonBefore?: React.ReactNode
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  placeholder?: string
  borderType?: BorderType
  onPressEnter?: (_: string, event: React.KeyboardEvent<HTMLInputElement>) => void
  value?: ValueType
  readonly?: 'readonly'
  count?: boolean
  status?: 'error'
  style?: Record<string, unknown>
}

const InternalInput = (props: InputProps, ref: unknown): FunctionComponentElement<InputProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, direction } = useContext(ConfigContext)
  const inputProps = getCompProps('Input', userDefaultProps, props)
  const {
    type,
    size,
    disabled,
    onPressEnter,
    borderType,
    prefixCls: customPrefixcls,
    onFocus,
    onBlur,
    onChange,
    placeholderTobeValue,
    defaultValue,
    value: propsValue,
    className,
    maxLength,
    count,
    status,
    allowClear,
    prefix,
    suffix,
    addonAfter,
    addonBefore,
    ...others
  } = inputProps
  devWarning(InputSiteTypes.indexOf(size) === -1, 'input', `cannot found input size '${size}'`)
  devWarning(BorderTypes.indexOf(borderType) === -1, 'input', `cannot found input borderType '${borderType}'`)
  const [value, setValue] = useMergedState('', {
    value: propsValue,
    defaultValue,
  })
  const [focused, setFocused] = useState(false)
  const [showNumberMark, setShowNumberMark] = useState(true)
  const inputRef: any = useRef<HTMLElement>()
  const inputPrefixCls = getPrefixCls!(prefixCls, 'input', customPrefixcls)
  const rtlCls = direction === 'rtl' ? `${inputPrefixCls}-rtl` : null
  const inputClasses = classNames(
    inputPrefixCls,
    rtlCls,
    {
      [`${inputPrefixCls}-size-${size}`]: size,
      [`${inputPrefixCls}-borderless`]: borderType === 'none',
      [`${inputPrefixCls}-underline`]: borderType === 'underline',
      [`${inputPrefixCls}-error`]: status === 'error',
      [`${inputPrefixCls}-disabled`]: disabled,
    },
    { [className!]: className && !hasPrefixSuffix(inputProps) && !addonBefore && !addonAfter },
  )

  const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(true)
    onFocus && onFocus(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(false)
    onBlur && onBlur(event)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    propsValue === undefined && setValue(event.target.value)
    onChange && onChange(event)
  }

  const handleReset = () => {
    setValue('')
    const event = { target: { value: '' } }
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
      event.target = inputRef.current
    }
    onChange && onChange(event as ChangeEvent<HTMLInputElement>)
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (onPressEnter && event.key === 'Enter') {
      const newValue = placeholderTobeValue && !value && !defaultValue ? inputProps.placeholder : value || defaultValue
      onPressEnter && onPressEnter(`${newValue}` || '', event)
    }
    inputProps.onKeyUp && inputProps.onKeyUp(event)
  }

  const renderCount = () => {
    let enteredLength = value ? (value as string).length : 0
    if (maxLength !== undefined && enteredLength >= maxLength) {
      enteredLength = maxLength
    }
    if (count && showNumberMark && !disabled) {
      return (
        <div className={classNames(`${inputPrefixCls}-input-mark-inner`)}>
          {enteredLength}
          {maxLength !== undefined ? `/${maxLength}` : null}
        </div>
      )
    }
    return null
  }

  const renderInput = () => {
    return (
      <input
        ref={inputRef}
        type={type}
        disabled={disabled}
        className={inputClasses}
        value={fixControlledValue(value)}
        maxLength={maxLength}
        {...others}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    )
  }

  useEffect(() => {
    if (focused && !showNumberMark) {
      setShowNumberMark(true)
    }
    if (!focused && showNumberMark) {
      setShowNumberMark(false)
    }
  }, [focused])

  useImperativeHandle(ref as any, () => {
    return {
      input: inputRef.current,
      focus: () => {
        setFocused(true)
        inputRef.current?.focus()
      },
      blur: () => {
        setFocused(false)
        inputRef.current?.blur()
      },
      select: () => {
        inputRef.current?.select()
      },
    }
  })

  return (
    <ClearableInput
      {...inputProps}
      allowClear={allowClear}
      prefix={prefix}
      suffix={suffix}
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      handleReset={handleReset}
      value={value}
      inputType="input"
      prefixCls={inputPrefixCls}
      element={renderInput()}
      focused={focused}
      count={count}
      inputCount={renderCount()}
      direction={direction}
    />
  )
}

const Input = React.forwardRef<unknown, InputProps>(InternalInput)
Input.displayName = 'Input'
export default Input
