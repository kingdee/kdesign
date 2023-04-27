import React, { FunctionComponentElement, useContext, useState, useEffect, useCallback, useRef } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import ClearableInput from './ClearableLabeledInput'
import { InputSiteType, BorderType, BorderTypes, fixControlledValue } from './input'
import calculateNodeHeight from './calculateNodeHeight'
import { useResizeObserver, useMergedState } from '../_utils/hooks'
import devWarning from '../_utils/devwarning'

export interface textAreaProps extends React.TextareaHTMLAttributes<HTMLInputElement> {
  allowClear?: boolean | React.ReactNode // 是否可以点击清除图标删除内容
  borderType?: BorderType // none/underline/bordered
  defaultValue?: string // 输入框默认内容
  count?: boolean // 计数开关
  countPosition?: string // 计数开关位置 inner/outter
  value?: any // 输入框内容
  canResize?: boolean // 是否可调整大小
  disabled?: boolean // 是否锁定
  maxLength?: number // 输入的最多字数
  placeholder?: string // 提示语
  style?: Record<string, unknown> // 内联样式
  size?: InputSiteType
  autoSize?: AutoSizeType | boolean
  status?: 'error'
}

export interface AutoSizeType {
  minRows?: number
  maxRows?: number
}

const InternalTextarea = (props: textAreaProps, ref: unknown): FunctionComponentElement<textAreaProps> => {
  const thisTextareaRef = useRef<HTMLElement>()
  const textareaRef = (ref as any) || thisTextareaRef
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const textAreaProps = getCompProps('TextArea', userDefaultProps, props) // 按钮属性需要合并一遍用户定义的默认属性
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
    ...others
  } = textAreaProps
  const textAreaPrefixCls = getPrefixCls!(prefixCls, 'input', customPrefixcls) // TextArea样式前缀
  devWarning(BorderTypes.indexOf(borderType) === -1, 'textarea', `cannot found textarea borderType '${borderType}'`)

  const [value, setValue] = useMergedState('', {
    value: propsValue,
    defaultValue,
  })

  const [focused, setFocused] = useState(false)
  const [showNumberMark, setShowNumberMark] = useState(false)

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

  const handleChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (value === undefined) return
    setValue(e.target.value)
    onChange && onChange(e)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(true)
    onFocus && onFocus(e)
  }

  const handleBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    let enteredLength = value ? value.length : 0
    if (enteredLength >= maxLength) {
      enteredLength = maxLength
    }
    if (count && showNumberMark && !disabled && maxLength !== '' && maxLength >= 0) {
      const countClass = classNames(`${textAreaPrefixCls}-textarea-mark`, {
        [`${textAreaPrefixCls}-textarea-mark-inner`]: countPosition === 'inner',
      })
      return (
        <div className={countClass}>
          {enteredLength}/{maxLength}
        </div>
      )
    }
    return null
  }

  useEffect(() => {
    resizeTextarea()
  }, [value, resizeTextarea])

  useEffect(() => {
    if (propsValue !== undefined) {
      setValue(propsValue)
    }
  }, [propsValue, setValue])

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
          {
            [`${prefixCls}-size-${size}`]: size,
            [`${prefixCls}-borderless`]: borderType === 'none',
            [`${prefixCls}-underline`]: borderType === 'underline',
            [`${prefixCls}-no-resize`]: canResize !== true,
            [`${prefixCls}-allowClear-spacing`]: !!allowClear,
            [`${prefixCls}-error`]: status === 'error',
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
      <span style={wrapperStyle} className={`${prefixCls}-countWrapper ${className && !allowClear ? className : ''}`}>
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
      handleReset={handleReset}
      value={value}
      inputType="text"
      prefixCls={textAreaPrefixCls}
      element={renderTextArea(textAreaPrefixCls)}
      numberMark={renderNumberMark()}
    />
  )
}
const TextArea = React.forwardRef<unknown, textAreaProps>(InternalTextarea)
TextArea.displayName = 'TextArea'
export default TextArea
