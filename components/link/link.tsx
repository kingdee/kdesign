import React, { FunctionComponentElement, useContext, useMemo } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { tuple } from '../_utils/type'

export const LinkSizes = tuple('large', 'middle', 'small')
export type LinkSize = typeof LinkSizes[number]

export interface ILinkProps {
  size?: LinkSize // 尺寸
  style?: Record<string, unknown> // 内联样式
  className?: string // 样式名
  target?: string // 相当于 a 链接的 target 属性，按钮类型为link时生效
  href?: string // 相当于 a 链接的 href 属性，按钮类型为link时生效
  underscore?: boolean // 是否有下划线
  disabled?: boolean // 是否禁用
  children?: React.ReactNode // 子元素
  prefix?: React.ReactNode // 链接前缀图标
  suffix?: React.ReactNode // 链接后缀图标
  onClick?: React.MouseEventHandler<HTMLElement> // 点击事件
}

const InternalLink = (props: ILinkProps, ref: unknown): FunctionComponentElement<ILinkProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, direction } = useContext(ConfigContext)
  const linkProps = getCompProps('Link', userDefaultProps, props)
  const {
    size,
    style,
    className,
    target,
    href,
    underscore,
    children,
    prefix,
    suffix,
    disabled,
    onClick,
    prefixCls: customPrefixcls,
    ...others
  } = linkProps

  // ref
  const linkRef = (ref as React.RefObject<HTMLDivElement>) || React.createRef<HTMLElement>()

  const linkPrefixCls = getPrefixCls!(prefixCls, 'link', customPrefixcls) // 按钮样式前缀
  const rtlCls = direction === 'rtl' ? `${linkPrefixCls}-rtl` : null // 文字方向
  const wrapperClasses = classNames(rtlCls, {
    [`${linkPrefixCls}`]: true,
    [`${linkPrefixCls}-size-${size}`]: size, // 尺寸样式
  })

  const linkClasses = classNames(className, {
    [`${linkPrefixCls}-text`]: true, // 链接文字
    [`${linkPrefixCls}-underscore`]: underscore, // 下划线
    [`${linkPrefixCls}-disabled`]: disabled, // 下划线
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    // 禁用状态 不跳转
    disabled && e.preventDefault()
    onClick && onClick?.(e)
  }

  const prefixNode = useMemo(
    () => (prefix ? <span className={`${linkPrefixCls}-prefix`}>{prefix}</span> : null),
    [prefix, linkPrefixCls],
  )

  const suffixNode = useMemo(
    () => (suffix ? <span className={`${linkPrefixCls}-suffix`}>{suffix}</span> : null),
    [suffix, linkPrefixCls],
  )

  return (
    <div style={style} className={wrapperClasses}>
      {prefixNode}
      <a
        ref={linkRef}
        target={target}
        disabled={disabled}
        href={href}
        className={linkClasses}
        onClick={handleClick}
        {...others}
      >
        {children}
      </a>
      {suffixNode}
    </div>
  )
}

const Link = React.forwardRef<unknown, ILinkProps>(InternalLink)
Link.displayName = 'Link'
export default Link
