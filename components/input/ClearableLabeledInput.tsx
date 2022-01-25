import React, { CSSProperties } from 'react'
import { Icon } from '../index'
import classNames from 'classnames'
import { tuple } from '../_utils/type'
import { InputSiteType, BorderType } from './input'
const ClearableInputType = tuple('input', 'text')
export function hasPrefixSuffix(props: ClearableInputProps) {
  return !!(props.prefix || props.suffix || props.allowClear)
}
interface ClearableInputProps {
  prefixCls: string
  inputType: typeof ClearableInputType[number]
  value?: any
  allowClear?: boolean
  element: React.ReactElement
  handleReset?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  className?: string
  style?: CSSProperties
  disabled?: boolean
  focused?: boolean
  borderType?: BorderType
  size?: InputSiteType
  suffix?: React.ReactNode
  prefix?: React.ReactNode
  addonBefore?: React.ReactNode
  addonAfter?: React.ReactNode
  numberMark?: React.ReactNode
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
  } = props

  const renderClearIcon = () => {
    if (!allowClear) {
      return null
    }
    const needClear = !disabled && value
    const clearIconclasses = classNames({
      [`${prefixCls}-textarea-clear-icon`]: inputType === ClearableInputType[1],
      [`${prefixCls}-clear-icon`]: inputType === ClearableInputType[0],
      [`${prefixCls}-clear-icon-hidden`]: !needClear,
      [`${prefixCls}-clear-icon-rightSpace`]: suffix,
    })
    return (
      <span onClick={handleReset} className={clearIconclasses}>
        <Icon type="close" />
      </span>
    )
  }

  const renderSuffix = () => {
    if (!suffix && !allowClear) {
      return null
    }
    return (
      <span className={`${prefixCls}-suffix`}>
        {renderClearIcon()}
        {suffix}
      </span>
    )
  }

  const renderInputWithFixNode = (originElement: React.ReactElement) => {
    if (!hasPrefixSuffix(props)) {
      return originElement
    }
    const suffixNode = renderSuffix()
    const prefixNode = prefix ? <span className={`${prefixCls}-prefix`}>{prefix}</span> : null
    const inputWrapperClasses = classNames(
      {
        [`${prefixCls}-wrapper`]: true,
        [`${prefixCls}-wrapper-focused`]: focused && !disabled,
        [`${prefixCls}-wrapper-disabled`]: disabled,
        [`${prefixCls}-wrapper-size-${size}`]: size,
        [`${prefixCls}-wrapper-borderless`]: borderType === 'none',
        [`${prefixCls}-wrapper-underline`]: borderType === 'underline',
      },
      { [className!]: className && !addonBefore && !addonAfter },
    )
    return (
      <span className={inputWrapperClasses} style={style}>
        {prefixNode}
        {React.cloneElement(originElement, { style: null })}
        {suffixNode}
      </span>
    )
  }

  const renderInputWithLabel = (originElement: React.ReactElement) => {
    if (!addonBefore && !addonAfter) {
      return originElement
    }
    const addonClassName = classNames(`${prefixCls}-group-addon`, {
      [`${prefixCls}-group-addon-borderless`]: borderType === 'none',
      [`${prefixCls}-group-addon-underline`]: borderType === 'underline',
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
            className: `${originElement.props.className || ''} ${prefixCls}-wrapper`,
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
      <span className={textAreaWrapperClasses} style={wrapperStyle}>
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
