import React, { useContext, useRef } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { City, ICityPickerOptionProps } from './interface'

const InternalOption: React.ForwardRefRenderFunction<unknown, ICityPickerOptionProps> = (props, ref: unknown) => {
  const optionRef = useRef<HTMLDivElement>(null) || (ref as any)
  const { children, value, disabled, className, onChangeSelect, city = {}, renderCityInfo, itemRender } = props
  const { id, name } = city as City
  const { getPrefixCls, prefixCls } = useContext(ConfigContext)
  const selectOptionPrefixCls = getPrefixCls!(prefixCls, 'city-picker-list-item')

  const isSelected = id !== undefined ? id === value : false
  const optionCls = classNames(selectOptionPrefixCls, className, {
    [`${selectOptionPrefixCls}-selected`]: isSelected,
    [`${selectOptionPrefixCls}-disabled`]: disabled,
  })

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (disabled || id === undefined) return
    onChangeSelect?.(city)
  }

  return (
    <>
      <div ref={optionRef} className={optionCls} title={name} onClick={handleClick}>
        {typeof itemRender === 'function' ? (
          itemRender(city)
        ) : (
          <>
            <span className={`${selectOptionPrefixCls}-content`}>{children}</span>
            <span className={`${selectOptionPrefixCls}-info`}>{renderCityInfo?.(city, true)}</span>
          </>
        )}
      </div>
    </>
  )
}

const Option = React.forwardRef<unknown, ICityPickerOptionProps>(InternalOption)
Option.displayName = 'CityPickerOption'

export default Option
