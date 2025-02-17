import React, { useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { IconTypes } from './interface'

export type IconType = typeof IconTypes[number]

export interface IIconProps extends React.HTMLAttributes<HTMLElement> {
  type: IconType
  spin?: boolean
  style?: React.CSSProperties
  prefix?: string
  className?: string
  rotate?: number
  onClick?: React.MouseEventHandler<HTMLElement> // 点击事件
  onMouseEnter?: React.MouseEventHandler<HTMLElement> // 点击事件
  onMouseLeave?: React.MouseEventHandler<HTMLElement> // 点击事件
}

const InternalIcon: React.ForwardRefRenderFunction<HTMLElement, IIconProps> = (props: IIconProps, ref: unknown) => {
  const { getPrefixCls, compDefaultProps: userDefaultProps, prefixCls, direction } = useContext(ConfigContext)
  const iconProps = getCompProps('Icon', userDefaultProps, props)
  const {
    type,
    spin,
    style,
    prefix: customPrefixcls,
    className,
    rotate,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...others
  } = iconProps

  const innerRef = React.useRef<HTMLElement>()
  const iconRef = (ref as any) || innerRef

  const iconPrefix = getPrefixCls!(prefixCls, 'icon', customPrefixcls)
  const rtlCls = direction === 'rtl' ? `${iconPrefix}-rtl` : null
  const lastDashIndex = iconPrefix.lastIndexOf('-')
  const iconPrefixCls =
    lastDashIndex > -1 ? iconPrefix.slice(0, lastDashIndex) + iconPrefix.slice(lastDashIndex + 1) : iconPrefix
  // 兼容之前的类名写法 将kd-icon改为kdicon
  const iconClass = classNames(iconPrefixCls, rtlCls, className, {
    [`${iconPrefixCls}-${type}`]: type,
    [`icon-spin`]: spin,
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    onClick && onClick(e)
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    onMouseEnter && onMouseEnter(e)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    onMouseLeave && onMouseLeave(e)
  }

  const iconStyle = {
    ...style,
  }
  if (rotate !== undefined) {
    iconStyle.transform = `rotate(${rotate}deg)`
  }

  return (
    <i
      className={iconClass}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={iconStyle}
      {...others}
      ref={iconRef}
    />
  )
}

const Icon = React.forwardRef<unknown, IIconProps>(InternalIcon)
Icon.displayName = 'Icon'

export default Icon
