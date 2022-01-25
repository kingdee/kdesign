import React, { FunctionComponentElement, useContext, useCallback, useState, useRef } from 'react'
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

export function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return ''
  }
  return value
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
  type?: string
  size?: InputSiteType // 尺寸
  defaultValue?: string
  disabled?: boolean
  allowClear?: boolean
  placeholderTobeValue?: boolean
  addonAfter?: React.ReactNode
  addonBefore?: React.ReactNode
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  placeholder?: string
  borderType?: BorderType
  onPressEnter?: (_: string, event: React.KeyboardEvent) => void
  value?: any
  readonly?: 'readonly'
}
const InternalInput = (props: InputProps, ref: unknown): FunctionComponentElement<InputProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
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
    ...others
  } = inputProps
  devWarning(InputSiteTypes.indexOf(size) === -1, 'input', `cannot found input size '${size}'`)
  devWarning(BorderTypes.indexOf(borderType) === -1, 'input', `cannot found input borderType '${borderType}'`)
  const [value, setValue] = useMergedState('', {
    value: propsValue,
    defaultValue,
  })
  const [focused, setFocused] = useState(false)
  const thisInputRef = useRef<HTMLElement>()
  const inputRef = (ref as any) || thisInputRef
  const inputPrefixCls = getPrefixCls!(prefixCls, 'input', customPrefixcls) // 按钮样式前缀
  const { addonBefore, addonAfter } = others
  const inputClasses = classNames(
    inputPrefixCls,
    {
      [`${inputPrefixCls}-size-${size}`]: size,
      [`${inputPrefixCls}-borderless`]: borderType === 'none',
      [`${inputPrefixCls}-underline`]: borderType === 'underline',
      [`${inputPrefixCls}-disabled`]: disabled,
    },
    { [className!]: className && !hasPrefixSuffix(inputProps) && !addonBefore && !addonAfter },
  )

  const handleFocus = useCallback(
    (event) => {
      setFocused(true)
      onFocus && onFocus(event)
    },
    [onFocus],
  )

  const handleBlur = useCallback(
    (event) => {
      setFocused(false)
      onBlur && onBlur(event)
    },
    [onBlur],
  )

  const handleChange = useCallback(
    (event) => {
      propsValue === undefined && setValue(event.target.value)
      onChange && onChange(event)
    },
    [onChange],
  )

  const handleReset = () => {
    setValue('')
    const event = { target: { value: '' } }
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
      event.target = inputRef.current
    }
    onChange && onChange(event)
  }

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (onPressEnter && event.key === 'Enter') {
      const newValue = placeholderTobeValue && !value && !defaultValue ? inputProps.placeholder : value || defaultValue
      onPressEnter && onPressEnter(newValue || '', event)
    }
    inputProps.onKeyUp && inputProps.onKeyUp(event)
  }

  const inputDomProps = { ...others }
  delete inputDomProps.allowClear
  delete inputDomProps.suffix
  delete inputDomProps.addonAfter
  delete inputDomProps.addonBefore
  delete inputDomProps.className

  const renderInput = () => {
    return (
      <input
        ref={inputRef}
        type={type}
        disabled={disabled}
        className={inputClasses}
        value={fixControlledValue(value)}
        {...inputDomProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    )
  }

  return (
    <ClearableInput
      {...inputProps}
      handleReset={handleReset}
      value={value}
      inputType="input"
      prefixCls={inputPrefixCls}
      element={renderInput()}
      focused={focused}
    />
  )
}

const Input = React.forwardRef<unknown, InputProps>(InternalInput)
Input.displayName = 'Input'
export default Input
