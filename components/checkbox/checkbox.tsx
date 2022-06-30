import React, { useCallback, useContext, useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { tuple } from '../_utils/type'
import isBoolean from 'lodash/isBoolean'
import Icon from '../icon'
import devWarning from '../_utils/devwarning'

export const CheckboxTypes = tuple('default', 'square')
export type CheckboxType = typeof CheckboxTypes[number]

export const CheckboxSizes = tuple('large', 'middle', 'small')
export type CheckboxSize = typeof CheckboxSizes[number]

export interface CheckboxProps {
  checked?: boolean // 指定当前是否选中
  defaultChecked?: boolean // 初始是否选中
  checkboxType?: CheckboxType // 按钮类型
  indeterminate?: boolean // 半选状态
  value?: any // 根据 value 进行比较，判断是否选中
  size?: CheckboxSize // 尺寸
  style?: Record<string, unknown> // 内联样式
  className?: string // 样式名
  prefixCls?: string // 样式前缀
  disabled?: boolean // 是否禁用
  children?: React.ReactNode // 子元素
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void // 点击事件
}

const InternalCheckbox: React.ForwardRefRenderFunction<unknown, CheckboxProps> = (props, ref) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const CheckboxProps = getCompProps('Checkbox', userDefaultProps, props)
  const {
    checkboxType,
    className,
    prefixCls: customPrefixcls,
    defaultChecked,
    checked,
    size,
    onChange,
    disabled,
    children,
    style,
    value,
    indeterminate,
    name,
  } = CheckboxProps

  const getChecked = () => {
    return isBoolean(checked) ? checked : defaultChecked
  }

  const [selected, setSelected] = useState(getChecked())
  const labelRef = useRef<any>(null)

  devWarning(CheckboxTypes.indexOf(checkboxType) === -1, 'checkbox', `cannot found checkbox type '${checkboxType}'`)

  devWarning(CheckboxSizes.indexOf(size) === -1, 'checkbox', `cannot found size type '${size}'`)

  const checkboxPrefixCls = getPrefixCls!(prefixCls, 'checkbox', customPrefixcls)

  const isDefaultType = () => {
    return checkboxType === 'default'
  }

  const getIndeterminate = (): boolean => {
    return selected ? false : indeterminate
  }

  const getDefaultClassName = classNames(className, {
    [`${checkboxPrefixCls}`]: true,
    [`${checkboxPrefixCls}-no-child`]: !children,
    [`${checkboxPrefixCls}-${size}`]: true && !!children,
    [`${checkboxPrefixCls}-${checkboxType}`]: true,
    [`${checkboxPrefixCls}-${checkboxType}-disabled`]: disabled,
    checked: selected,
  })

  const getSquareClassName = classNames(className, {
    [`${checkboxPrefixCls}`]: true,
    [`${checkboxPrefixCls}-${checkboxType}`]: true,
    [`${checkboxPrefixCls}-${checkboxType}-disabled`]: disabled,
    [`${checkboxPrefixCls}-${checkboxType}-checked`]: selected && !disabled,
    checked: selected,
  })

  const getRootClassName = isDefaultType() ? getDefaultClassName : getSquareClassName

  const inputClassName = classNames({
    [`${checkboxPrefixCls}-input`]: true,
  })

  const checkedWrapperClassName = classNames({
    [`${checkboxPrefixCls}-${checkboxType}-no-child`]: !children,
    [`${checkboxPrefixCls}-${checkboxType}-wrapper`]: true,
    [`${checkboxPrefixCls}-${checkboxType}-wrapper-size`]: !!children,
    [`${checkboxPrefixCls}-${checkboxType}-margin`]: !!children,
    [`${checkboxPrefixCls}-${checkboxType}-checked`]: selected,
    [`${checkboxPrefixCls}-${checkboxType}-indeterminate`]: getIndeterminate(),
    [`${checkboxPrefixCls}-${checkboxType}-disabled`]: disabled && !selected,
    [`${checkboxPrefixCls}-${checkboxType}-checked-disabled`]: disabled && selected,
  })

  const triangleClassName = classNames({
    [`${checkboxPrefixCls}-${checkboxType}-triangle`]: !selected,
    [`${checkboxPrefixCls}-${checkboxType}-triangle-checked`]: selected,
    [`${checkboxPrefixCls}-${checkboxType}-triangle-disabled`]: disabled,
  })
  const innerIconClassName = classNames({
    [`${checkboxPrefixCls}-${checkboxType}-inner`]: true,
  })

  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e)
      setSelected(e.target.checked)
    },
    [onChange],
  )

  useEffect(() => {
    isBoolean(checked) && checked !== selected && setSelected(checked)
  }, [checked, selected])

  useEffect(() => {
    const handleRepeatClick = function (e: React.MouseEvent<HTMLElement>) {
      const element = e.target as HTMLElement
      if (element.tagName !== 'INPUT') {
        e.stopPropagation()
      }
    }
    labelRef?.current?.addEventListener('click', handleRepeatClick)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      labelRef?.current?.removeEventListener('click', handleRepeatClick)
    }
  }, [])

  const getDefaultCheckbox = () => {
    return (
      // eslint-disable-next-line
      <label className={getRootClassName} style={style} ref={labelRef}>
        <span className={checkedWrapperClassName}>
          {selected && (
            <span className={innerIconClassName}>
              <Icon type="right-bold" className={`${checkboxPrefixCls}-${checkboxType}-inner-icon`} />
            </span>
          )}
          <input
            type="checkbox"
            className={inputClassName}
            onChange={handleChange}
            ref={ref as any}
            value={value}
            checked={selected}
            disabled={disabled}
            name={name}
          />
        </span>
        {children && <span className={`${checkboxPrefixCls}-children`}>{children}</span>}
        {!isDefaultType() && (
          <span className={triangleClassName}>
            <span className={innerIconClassName}>
              <Icon type="right-bold" className={`${checkboxPrefixCls}-${checkboxType}-inner-icon`} />
            </span>
          </span>
        )}
      </label>
    )
  }

  return getDefaultCheckbox()
}

const Checkbox = React.forwardRef<unknown, CheckboxProps>(InternalCheckbox)
Checkbox.displayName = 'Checkbox'
export default Checkbox
