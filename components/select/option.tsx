import React, { useContext, useRef, useEffect, useState } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { Checkbox } from '../index'
import { SelectValue } from './interface'

export interface ISelectOptionProps {
  disabled?: boolean
  values?: any
  value?: string | number
  title?: string
  children?: any // update
  className?: string
  index?: number
  activeIndex?: number
  style?: React.CSSProperties
  isMultiple?: boolean
  onChangeSelect?: (key: SelectValue, label: string | undefined, isSelected: boolean) => void
  onChangeActiveIndex?: (index: any) => void
}

const InternalOption: React.ForwardRefRenderFunction<unknown, ISelectOptionProps> = (props, ref: unknown) => {
  const optionRef = useRef<HTMLDivElement>(null) || (ref as any)
  const [isSelected, setSelected] = useState<boolean>(false)
  const {
    className,
    children,
    value = null,
    disabled,
    values,
    isMultiple,
    onChangeSelect,
    onChangeActiveIndex,
    title,
    activeIndex,
    index,
  } = props
  const optionProps: ISelectOptionProps = { ...props }
  const { getPrefixCls, prefixCls } = useContext(ConfigContext)
  const selectOptionPrefixCls = getPrefixCls!(prefixCls, 'select-item')
  useEffect(() => {
    if (isMultiple) {
      setSelected(values?.indexOf(value) > -1)
    } else {
      setSelected(value !== undefined ? value === values : false)
    }
  })
  const optionCls = classNames(selectOptionPrefixCls, className, {
    [`${selectOptionPrefixCls}-option`]: true,
    [`${selectOptionPrefixCls}-option-active`]: activeIndex === index,
    [`${selectOptionPrefixCls}-option-selected`]: isSelected,
    [`${selectOptionPrefixCls}-option-disabled`]: disabled,
  })

  const contentCls = classNames({
    [`${selectOptionPrefixCls}-option-content`]: true,
  })
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (optionProps.disabled || value === undefined) return
    if (isMultiple) {
      setSelected(!isSelected)
    }
    onChangeSelect && onChangeSelect(value, children, isSelected)
  }
  const handleOnMouseEnter = () => {
    onChangeActiveIndex && onChangeActiveIndex(index)
  }
  const handleOnMouseLeave = () => {
    onChangeActiveIndex && onChangeActiveIndex(-1)
  }
  const titleText = title || (typeof children !== 'object' ? children : null)

  const checkStyle = {
    minHeight: '22px',
    background: 'none',
  }

  return (
    <>
      <div
        ref={optionRef}
        className={optionCls}
        title={titleText}
        onClick={handleClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <div className={contentCls}>
          {/* {children} */}
          {isMultiple ? (
            <Checkbox style={checkStyle} value={value} disabled={disabled} checked={isSelected}>
              {children}
            </Checkbox>
          ) : (
            children
          )}
        </div>
      </div>
    </>
  )
}

const Option = React.forwardRef<unknown, ISelectOptionProps>(InternalOption)
Option.displayName = 'Option'

export default Option
