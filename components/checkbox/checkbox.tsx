import React, { useContext, useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import { GroupContext, CheckboxTypes, CheckboxSizes } from './group'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import isBoolean from 'lodash/isBoolean'
import Icon from '../icon'
import devWarning from '../_utils/devwarning'

import type { CheckboxType, CheckboxSize } from './group'

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
  onClick?: (e: React.MouseEvent) => void
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
    ...rest
  } = CheckboxProps

  const checkboxGroup = React.useContext(GroupContext)

  const mergedDisabled = checkboxGroup?.disabled || disabled
  const mergedCheckboxType = checkboxGroup?.checkboxType || checkboxType
  const mergedName = checkboxGroup?.name || name
  const mergedSize = checkboxGroup?.size || size

  const initChecked = checkboxGroup?.groupValue
    ? checkboxGroup?.groupValue.indexOf(value) > -1
    : isBoolean(checked)
    ? checked
    : defaultChecked
  const [selected, setSelected] = useState(initChecked)
  const labelRef = useRef<any>(null)

  React.useEffect(() => {
    setSelected(
      checkboxGroup?.groupValue
        ? checkboxGroup?.groupValue.indexOf(value) > -1
        : isBoolean(checked)
        ? checked
        : defaultChecked,
    )
  }, [checkboxGroup?.groupValue, checked, defaultChecked])

  devWarning(
    CheckboxTypes.indexOf(mergedCheckboxType) === -1,
    'checkbox',
    `cannot found checkbox type '${mergedCheckboxType}'`,
  )

  devWarning(CheckboxSizes.indexOf(mergedSize) === -1, 'checkbox', `cannot found size type '${mergedSize}'`)

  const checkboxPrefixCls = getPrefixCls!(prefixCls, 'checkbox', customPrefixcls)

  const isDefaultType = () => {
    return mergedCheckboxType === 'default'
  }

  const getIndeterminate = (): boolean => {
    return selected ? false : indeterminate
  }

  const getDefaultClassName = classNames(className, {
    [`${checkboxPrefixCls}`]: true,
    [`${checkboxPrefixCls}-no-child`]: !children,
    [`${checkboxPrefixCls}-${mergedSize}`]: !!children,
    [`${checkboxPrefixCls}-${mergedCheckboxType}`]: true,
    [`${checkboxPrefixCls}-${mergedCheckboxType}-disabled`]: mergedDisabled,
    checked: selected,
  })

  const getSquareClassName = classNames(className, {
    [`${checkboxPrefixCls}`]: true,
    [`${checkboxPrefixCls}-${mergedCheckboxType}`]: true,
    [`${checkboxPrefixCls}-${mergedSize}`]: !!children,
    [`${checkboxPrefixCls}-${mergedCheckboxType}-disabled`]: mergedDisabled,
    [`${checkboxPrefixCls}-${mergedCheckboxType}-checked`]: selected && !mergedDisabled,
    checked: selected,
  })

  const getRootClassName = isDefaultType() ? getDefaultClassName : getSquareClassName

  const inputClassName = classNames({
    [`${checkboxPrefixCls}-input`]: true,
  })

  const checkedWrapperClassName = classNames({
    [`${checkboxPrefixCls}-${mergedCheckboxType}-no-child`]: !children,
    [`${checkboxPrefixCls}-${mergedCheckboxType}-wrapper`]: true,
    [`${checkboxPrefixCls}-${mergedCheckboxType}-wrapper-size`]: !!children,
    [`${checkboxPrefixCls}-${mergedCheckboxType}-margin`]: !!children,
    [`${checkboxPrefixCls}-${mergedCheckboxType}-checked`]: selected,
    [`${checkboxPrefixCls}-${mergedCheckboxType}-indeterminate`]: getIndeterminate(),
    [`${checkboxPrefixCls}-${mergedCheckboxType}-disabled`]: mergedDisabled && !selected,
    [`${checkboxPrefixCls}-${mergedCheckboxType}-checked-disabled`]: mergedDisabled && selected,
  })

  const triangleClassName = classNames({
    [`${checkboxPrefixCls}-${mergedCheckboxType}-triangle`]: !selected,
    [`${checkboxPrefixCls}-${mergedCheckboxType}-triangle-checked`]: selected,
    [`${checkboxPrefixCls}-${mergedCheckboxType}-triangle-disabled`]: mergedDisabled,
  })
  const innerIconClassName = classNames({
    [`${checkboxPrefixCls}-${mergedCheckboxType}-inner`]: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e)
    checkboxGroup?.onCheckboxGroupChange && checkboxGroup?.onCheckboxGroupChange(value, e.target.checked, e)
    if (!checkboxGroup?.isControlled) {
      setSelected(e.target.checked)
    }
  }

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
    const inputProps: any = {
      type: 'checkbox',
      className: inputClassName,
      onChange: handleChange,
      checked: selected,
      disabled: mergedDisabled,
      name: mergedName,
    }
    if ((value ?? '') !== '') {
      inputProps.value = value
    }
    return (
      // eslint-disable-next-line
      <label className={getRootClassName} style={style} ref={labelRef} {...rest}>
        <span className={checkedWrapperClassName}>
          {selected ? (
            <span className={innerIconClassName}>
              <Icon type="right-bold" className={`${checkboxPrefixCls}-${mergedCheckboxType}-inner-icon`} />
            </span>
          ) : null}
          <input type="checkbox" ref={ref as any} {...inputProps} />
        </span>
        {children ? <span className={`${checkboxPrefixCls}-children`}>{children}</span> : null}
        {!isDefaultType() ? (
          <span className={triangleClassName}>
            <span className={innerIconClassName}>
              <Icon type="right-bold" className={`${checkboxPrefixCls}-${mergedCheckboxType}-inner-icon`} />
            </span>
          </span>
        ) : null}
      </label>
    )
  }

  return getDefaultCheckbox()
}

const Checkbox = React.forwardRef<unknown, CheckboxProps>(InternalCheckbox)
Checkbox.displayName = 'Checkbox'
export default Checkbox
