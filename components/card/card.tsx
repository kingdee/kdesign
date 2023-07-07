import * as React from 'react'
import classNames from 'classnames'
import Checkbox, { CheckboxProps } from '../checkbox'
import { getCompProps } from '../_utils'
import { ConfigContext } from '../config-provider'

export interface Avatar {
  src: string
  title?: string
  square?: boolean
  description?: string
}
export interface CardProps {
  avatar?: Avatar
  className?: string
  hoverable?: boolean
  selectable?: boolean
  title?: React.ReactNode
  children?: React.ReactNode
  style?: React.CSSProperties
  checkboxProps?: CheckboxProps
  tags?: Array<React.ReactNode>
  headStyle?: React.CSSProperties
  bodyStyle?: React.CSSProperties
  actions?: Array<React.ReactNode>
  extra?: Array<React.ReactNode>
  ref?: React.ForwardedRef<HTMLDivElement>
}

const Card: React.FC<CardProps> = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)
  // 属性需要合并一遍用户定义的默认属性
  const {
    tags,
    style,
    title,
    avatar,
    actions,
    extra,
    children,
    className,
    hoverable,
    headStyle,
    bodyStyle,
    selectable,
    checkboxProps,
    prefixCls: customPrefixcls,
    ...others
  } = getCompProps('Card', userDefaultProps, props)

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'card', customPrefixcls)

  const cardClassName = classNames(prefixCls, { hoverable }, className)

  return (
    <div ref={ref} className={cardClassName} style={style} {...others}>
      {title && !avatar && (
        <header className={`${prefixCls}-header`} style={headStyle}>
          {title}
        </header>
      )}
      {avatar && (
        <header className={`${prefixCls}-avatar`}>
          <div className={classNames(`${prefixCls}-avatar-img`, { circle: !avatar.square })}>
            <img src={avatar.src} />
          </div>
          <div>
            <h4 className={`${prefixCls}-avatar-title`}>{avatar.title}</h4>
            <span className={`${prefixCls}-avatar-desc`}>{avatar.description}</span>
          </div>
        </header>
      )}
      {selectable && <Checkbox {...checkboxProps} />}
      {tags && <div className={`${prefixCls}-tags`}>{tags}</div>}
      <div className={`${prefixCls}-body`} style={bodyStyle}>
        {children}
      </div>
      {actions && <div className={`${prefixCls}-actions`}>{actions}</div>}
      {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
    </div>
  )
})

Card.displayName = 'Card'

export default Card
