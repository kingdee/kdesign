import React, { CSSProperties, useRef, useState } from 'react'
import { Icon } from '../index'
import classNames from 'classnames'
import { tuple } from '../_utils/type'
import { InputSiteType, BorderType } from './input'
const ClearableInputType = tuple('input', 'text')
export function hasPrefixSuffix(props: ClearableInputProps) {
  return !!(props.prefix || props.suffix || props.allowClear || !!props.inputCount)
}
interface ClearableInputProps {
  prefixCls: string
  inputType: typeof ClearableInputType[number]
  value?: any
  allowClear?: boolean | React.ReactNode
  element: React.ReactElement
  handleReset?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  className?: string
  style?: CSSProperties
  disabled?: boolean
  focused?: boolean
  count?: boolean
  borderType?: BorderType
  size?: InputSiteType
  suffix?: React.ReactNode
  prefix?: React.ReactNode
  addonBefore?: React.ReactNode
  addonAfter?: React.ReactNode
  numberMark?: React.ReactNode
  inputCount?: React.ReactNode
  status?: 'error'
}
const ClearableInput: React.FC<ClearableInputProps> = (props) => {
  const {
    prefixCls,
    prefix,
    suffix,
    allowClear,
    value,
    disabled,
    inputType,
    handleReset,
    element,
    className,
    size,
    borderType,
    style,
    addonBefore,
    addonAfter,
    focused,
    numberMark,
    inputCount,
    count,
    status,
  } = props

  const fixRef = useRef(null)
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false)

  const mouseEnterHandle: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsMouseEnter(true)
  }

  const mouseLeaveHandle: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsMouseEnter(false)
  }

  const mouseDownHandle: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const clickHandle: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation()
    ;(fixRef.current as any as HTMLElement)?.querySelector('input')?.focus()
  }

  const renderClearIcon = () => {
    if (!allowClear) {
      return null
    }
    const needClear = !disabled && value && isMouseEnter
    const clearIconclasses = classNames({
      [`${prefixCls}-textarea-clear-icon`]: inputType === ClearableInputType[1],
      [`${prefixCls}-clear-icon`]: inputType === ClearableInputType[0],
      [`${prefixCls}-clear-icon-hidden`]: !needClear,
      [`${prefixCls}-clear-icon-rightSpace`]: suffix,
    })
    return (
      <span onMouseDown={mouseDownHandle} onClick={handleReset} className={clearIconclasses}>
        {typeof allowClear === 'boolean' ? <Icon type="close-solid" /> : allowClear}
      </span>
    )
  }

  const renderSuffix = () => {
    if (suffix || inputCount) {
      return (
        <span className={`${prefixCls}-suffix`} onMouseDown={mouseDownHandle}>
          {inputCount && <span style={{ marginRight: suffix ? 9 : 0 }}>{inputCount}</span>}
          {suffix}
        </span>
      )
    }
    return null
  }

  const renderInputWithFixNode = (originElement: React.ReactElement) => {
    if (!hasPrefixSuffix(props) && !count) {
      return originElement
    }
    const suffixNode = renderSuffix()
    const prefixNode = prefix ? (
      <span className={`${prefixCls}-prefix`} onMouseDown={mouseDownHandle}>
        {prefix}
      </span>
    ) : null
    const inputWrapperClasses = classNames(
      {
        [`${prefixCls}-wrapper`]: true,
        [`${prefixCls}-wrapper-focused`]: focused && !disabled,
        [`${prefixCls}-wrapper-size-${size}`]: size,
        [`${prefixCls}-wrapper-borderless`]: borderType === 'none',
        [`${prefixCls}-wrapper-underline`]: borderType === 'underline',
        [`${prefixCls}-error`]: status === 'error',
        [`${prefixCls}-wrapper-disabled`]: disabled,
      },
      { [className!]: className && !addonBefore && !addonAfter },
    )
    return (
      <span
        className={inputWrapperClasses}
        ref={fixRef}
        style={style}
        onClick={clickHandle}
        onMouseEnter={mouseEnterHandle}
        onMouseLeave={mouseLeaveHandle}
      >
        {prefixNode}
        {React.cloneElement(originElement, { style: null })}
        {renderClearIcon()}
        {suffixNode}
      </span>
    )
  }

  const renderInputWithLabel = (originElement: React.ReactElement) => {
    if (!addonBefore && !addonAfter && !count) {
      return originElement
    }
    const addonClassName = classNames(`${prefixCls}-group-addon`, {
      [`${prefixCls}-group-addon-borderless`]: borderType === 'none',
      [`${prefixCls}-group-addon-underline`]: borderType === 'underline',
      [`${prefixCls}-error`]: status === 'error',
      [`${prefixCls}-group-addon-disabled`]: disabled,
    })
    const addonBeforeNode = addonBefore ? <span className={addonClassName}>{addonBefore}</span> : null
    const addonAfterNode = addonAfter ? <span className={addonClassName}>{addonAfter}</span> : null
    const inputGroupClasses = classNames(className, {
      [`${prefixCls}-group`]: true,
      [`${prefixCls}-group-size-${size}`]: size,
    })
    return (
      <span className={`${prefixCls}-group-wrapper`}>
        <span className={inputGroupClasses} style={style}>
          {addonBeforeNode}
          {React.cloneElement(originElement, {
            style: null,
          })}
          {addonAfterNode}
        </span>
      </span>
    )
  }

  const renderTextAreaWithLabel = (originElement: React.ReactElement) => {
    if (!allowClear) {
      return originElement
    }
    const { width, margin, marginLeft, marginRight, marginTop, marginBottom } = style || {}
    const wrapperStyle = style ? { width, margin, marginLeft, marginRight, marginTop, marginBottom } : {}
    for (const key in wrapperStyle) {
      if (wrapperStyle[key as keyof typeof wrapperStyle] === undefined) {
        delete wrapperStyle[key as keyof typeof wrapperStyle]
      }
    }
    const textAreaWrapperClasses = classNames(className, {
      [`${prefixCls}-wrapper-textarea`]: true,
    })
    return (
      <span
        className={textAreaWrapperClasses}
        style={wrapperStyle}
        onMouseEnter={mouseEnterHandle}
        onMouseLeave={mouseLeaveHandle}
      >
        {originElement}
        {renderClearIcon()}
        {numberMark && numberMark}
      </span>
    )
  }

  if (inputType === ClearableInputType[0]) {
    return renderInputWithLabel(renderInputWithFixNode(element))
  }
  return renderTextAreaWithLabel(element)
}
export default ClearableInput
