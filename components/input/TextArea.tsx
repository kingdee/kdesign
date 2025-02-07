import React, { FunctionComponentElement, useContext, useState, useEffect, useCallback, useRef } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import ClearableInput from './ClearableLabeledInput'
import { InputSiteType, BorderType, BorderTypes, fixControlledValue, ValueType } from './input'
import calculateNodeHeight from './calculateNodeHeight'
import { useResizeObserver, useMergedState } from '../_utils/hooks'
import devWarning from '../_utils/devwarning'

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLInputElement>, 'value'> {
  allowClear?: boolean | React.ReactNode
  borderType?: BorderType
  defaultValue?: string
  count?: boolean
  countPosition?: string
  value?: ValueType
  canResize?: boolean
  disabled?: boolean
  maxLength?: number
  placeholder?: string
  style?: Record<string, unknown>
  size?: InputSiteType
  autoSize?: AutoSizeType | boolean
  status?: 'error'
}

export interface AutoSizeType {
  minRows?: number
  maxRows?: number
}

const InternalTextarea = (props: TextAreaProps, ref: unknown): FunctionComponentElement<TextAreaProps> => {
  const thisTextareaRef = useRef<HTMLElement>()
  const textareaRef = (ref as any) || thisTextareaRef
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, direction } = useContext(ConfigContext)
  const textAreaProps = getCompProps('TextArea', userDefaultProps, props)
  const [textareaStyles, setTextareaStyles] = useState({})
  const {
    value: propsValue,
    allowClear,
    borderType,
    defaultValue,
    count,
    countPosition,
    autoSize,
    className,
    prefixCls: customPrefixcls,
    canResize,
    maxLength,
    disabled,
    onBlur,
    onFocus,
    onChange,
    placeholder,
    style,
    size,
    status,
    prefix,
    suffix,
    addonAfter,
    addonBefore,
    ...others
  } = textAreaProps
  const textAreaPrefixCls = getPrefixCls!(prefixCls, 'input', customPrefixcls)
  const rtlCls = direction === 'rtl' ? `${textAreaPrefixCls}-rtl` : null
  devWarning(BorderTypes.indexOf(borderType) === -1, 'textarea', `cannot found textarea borderType '${borderType}'`)

  const [value, setValue] = useMergedState('', {
    value: propsValue,
    defaultValue,
  })

  const [focused, setFocused] = useState(false)
  const [showNumberMark, setShowNumberMark] = useState(false)
  const [numberMarkError, setNumberMarkError] = useState<boolean>(false)

  const resizeTextarea = useCallback(() => {
    if (!autoSize || !textareaRef.current) {
      return
    }
    const { minRows, maxRows } = autoSize as AutoSizeType
    const textareaStyles = calculateNodeHeight(textareaRef.current!, minRows, maxRows)
    if (style) {
      const height = style.height || Number.MAX_SAFE_INTEGER
      const maxHeight = style.maxHeight || Number.MAX_SAFE_INTEGER
      if (Math.min(height, maxHeight) > textareaStyles.height) {
        textareaStyles.overflowY = 'hidden'
      } else {
        textareaStyles.overflowY = ''
      }
    }
    setTextareaStyles(textareaStyles)
  }, [autoSize, textareaRef, style])

  useResizeObserver(textareaRef.current, resizeTextarea)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    propsValue === undefined && setValue(e.target.value)
    onChange && onChange(e)
  }

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    setFocused(true)
    onFocus && onFocus(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    setFocused(false)
    onBlur && onBlur(e)
  }

  const handleReset = () => {
    setValue('')
    const event = { target: { value: '' } }
    if (textareaRef.current) {
      textareaRef.current.value = ''
      textareaRef.current.focus()
      event.target = textareaRef.current
    }
    onChange && onChange(event)
  }

  const renderNumberMark = () => {
    if (count && (showNumberMark || numberMarkError) && !disabled && maxLength !== '' && maxLength >= 0) {
      const countClass = classNames(`${textAreaPrefixCls}-textarea-mark`, {
        [`${textAreaPrefixCls}-textarea-mark-inner`]: countPosition === 'inner',
        [`${textAreaPrefixCls}-textarea-mark-error`]: numberMarkError,
      })
      return (
        <div className={countClass}>
          {value ? value.length : 0}/{maxLength}
        </div>
      )
    }
    return null
  }

  useEffect(() => {
    resizeTextarea()
  }, [value, resizeTextarea])

  useEffect(() => {
    if (value && maxLength && value.length > maxLength) {
      setNumberMarkError(true)
    } else {
      setNumberMarkError(false)
    }
  }, [value])

  useEffect(() => {
    if (focused && !showNumberMark) {
      setShowNumberMark(true)
    }
    if (!focused && showNumberMark) {
      setShowNumberMark(false)
    }
  }, [focused])

  const renderTextArea = (prefixCls: string) => {
    const hadCount = count && !disabled && !allowClear
    const { width, margin, marginLeft, marginRight, marginTop, marginBottom, ...otherStyles } = style || {}
    const wrapperStyle = style ? { width, margin, marginLeft, marginRight, marginTop, marginBottom } : {}
    for (const key in wrapperStyle) {
      if (wrapperStyle[key as keyof typeof wrapperStyle] === undefined) {
        delete wrapperStyle[key as keyof typeof wrapperStyle]
      }
    }
    const textarea = (
      <textarea
        ref={textareaRef}
        disabled={disabled}
        style={Object.assign({}, textareaStyles, hadCount || !!allowClear ? otherStyles : style)}
        className={classNames(
          `${prefixCls}-textarea`,
          rtlCls,
          {
            [`${prefixCls}-size-${size}`]: size,
            [`${prefixCls}-borderless`]: borderType === 'none',
            [`${prefixCls}-underline`]: borderType === 'underline',
            [`${prefixCls}-no-resize`]: canResize !== true,
            [`${prefixCls}-allowClear-spacing`]: !!allowClear,
            [`${prefixCls}-error`]: status === 'error' || numberMarkError,
            [`${prefixCls}-disabled`]: disabled,
          },
          { [className!]: className && !allowClear && !hadCount },
        )}
        onChange={handleChange}
        onFocus={!disabled ? handleFocus : undefined}
        onBlur={!disabled ? handleBlur : undefined}
        value={fixControlledValue(value)}
        placeholder={placeholder}
        maxLength={maxLength}
        {...others}
      />
    )
    return hadCount ? (
      <span
        style={wrapperStyle}
        className={classNames(rtlCls, `${prefixCls}-countWrapper ${className && !allowClear ? className : ''}`)}
      >
        {textarea}
        {renderNumberMark()}
      </span>
    ) : (
      textarea
    )
  }

  return (
    <ClearableInput
      {...textAreaProps}
      allowClear={allowClear}
      prefix={prefix}
      suffix={suffix}
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      handleReset={handleReset}
      value={value}
      inputType="text"
      prefixCls={textAreaPrefixCls}
      element={renderTextArea(textAreaPrefixCls)}
      numberMark={renderNumberMark()}
      direction={direction}
    />
  )
}
const TextArea = React.forwardRef<unknown, TextAreaProps>(InternalTextarea)
TextArea.displayName = 'TextArea'
export default TextArea
