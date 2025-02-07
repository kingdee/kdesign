import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import Icon from '../icon'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { tuple } from '../_utils/type'
import { useMergedState } from '../_utils/hooks'

// type SwitchSize = 'large' | 'middle' | 'small'
export const SwitchSizes = tuple('large', 'small')
export type SwitchSize = typeof SwitchSizes[number]
export type SwitchChangeEventHandler = (checked: boolean, event: MouseEvent) => void
export type SwitchClickEventHandler = SwitchChangeEventHandler
export interface ISwitchProps {
  size?: SwitchSize
  style?: Record<string, unknown> // 内联样式
  className?: string // 样式名
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  loading?: boolean
  checkedChildren?: React.ReactNode
  unCheckedChildren?: React.ReactNode
  onClick?: SwitchClickEventHandler // 点击事件
  onChange?: SwitchChangeEventHandler // 变化事件
}

const Switch: FC<ISwitchProps> = (props) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, direction } = useContext(ConfigContext)
  const switchProps = getCompProps('Switch', userDefaultProps, props)
  const {
    size,
    className,
    prefixCls: customPrefixcls,
    checked,
    defaultChecked,
    checkedChildren,
    unCheckedChildren,
    loading,
    disabled,
    onClick,
    onChange,
    ...others
  } = switchProps

  const [newChecked, setChecked] = useMergedState(false, {
    value: checked,
    defaultValue: defaultChecked,
  })
  const switchPrefixCls = getPrefixCls!(prefixCls, 'switch', customPrefixcls)
  const rtlCls = direction === 'rtl' ? `${switchPrefixCls}-rtl` : null
  const handleClick = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>) => {
    const newV = triggerChange(!newChecked, e)
    onClick && onClick(newV, e)
  }

  function triggerChange(newV: boolean, e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>) {
    const isDisabled = disabled || loading
    let afterChangedChecked = newChecked
    if (!isDisabled) {
      afterChangedChecked = newV
      setChecked(afterChangedChecked)
      onChange?.(afterChangedChecked, e)
    }

    return afterChangedChecked
  }
  // ref
  const switchClasses = classNames(switchPrefixCls, rtlCls, className, {
    [`${switchPrefixCls}-size-${size}`]: size, // 尺寸样式
    [`${switchPrefixCls}-disabled`]: disabled || loading, // 禁用态样式
    [`${switchPrefixCls}-loading`]: loading, // 加载中样式
    [`${switchPrefixCls}-checked`]: newChecked, // 选中样式
  })

  const loadingIcon = loading ? (
    <span className={`${switchPrefixCls}-loading-icon`}>
      <Icon type="loadding-circle" spin />
    </span>
  ) : null

  return (
    <span className={switchClasses} {...others} onClick={handleClick}>
      <div className={`${switchPrefixCls}-inner`}>
        {loadingIcon}
        {newChecked ? checkedChildren : unCheckedChildren}
      </div>
    </span>
  )
}

Switch.displayName = 'Switch'
export default Switch
