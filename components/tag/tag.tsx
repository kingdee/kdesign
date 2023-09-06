import React, { FunctionComponentElement, useContext, useRef } from 'react'
import { Icon } from '../index'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { tuple } from '../_utils/type'
import { getCompProps } from '../_utils'
import devWarning from '../_utils/devwarning'

export const TagTypes = tuple('status', 'attribute', 'text', 'edit')
export type TagType = typeof TagTypes[number]
export const TagColors = tuple('process', 'success', 'warning', 'error', 'end', 'expired')
export type TagColor = typeof TagColors[number]
export const TagSizes = tuple('small', 'middle', 'large')
export type TagSize = typeof TagSizes[number]

export interface ITagProps {
  className?: string // 样式名
  clickable?: boolean // 是否可点击
  closable?: boolean // 是否可关闭
  closeIcon?: React.ReactNode // 关闭按钮
  color?: TagColor | string // 标签颜色 process success warning error end expired 也可以传入色值
  disabled?: boolean
  icon?: React.ReactNode // 设置图标
  size?: TagSize
  style?: React.CSSProperties
  type?: TagType // 标签类型
  onClick?: React.MouseEventHandler<HTMLElement> // 点击时的回调
  onClose?: React.MouseEventHandler<HTMLElement> // 关闭时的回调
  children?: React.ReactNode // 子元素
  title?: string
}

// remove this line and code Tag component here
const InteranalTag = (props: ITagProps, ref: unknown): FunctionComponentElement<any> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const tagProps = getCompProps('Tag', userDefaultProps, props)
  const {
    className,
    clickable,
    closable,
    closeIcon,
    color,
    disabled,
    icon,
    size,
    type,
    onClick,
    onClose,
    style,
    prefixCls: customPrefixcls,
    children,
    ...others
  } = tagProps

  devWarning(TagTypes.indexOf(type) === -1, 'tag', `cannot found tag type '${type}'`)
  devWarning(TagSizes.indexOf(size) === -1, 'tag', `cannot found tag size '${size}'`)

  const tagPrefixCls = getPrefixCls!(prefixCls, 'tag', customPrefixcls)

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (!clickable) return
    onClick && onClick(e)
  }

  const handleClose = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    onClose && onClose(e)
    if (e.defaultPrevented) {
      return
    }
    // 删除标签
    const tagWrapper = e.currentTarget.parentNode
    tagWrapper?.parentNode?.removeChild(tagWrapper)
  }

  // ref
  const thisTagRef = useRef<HTMLElement>()
  const tagRef = (ref as any) || thisTagRef

  // 对children进行进一步处理 当标签包含图标时 文本内容需要用标签包裹设置外边距
  const handleChild = function (child: React.ReactChild) {
    if (!child) return null
    if (typeof child === 'string' && icon) {
      return <span className={`${tagPrefixCls}-text`}>{child}</span>
    }
    return <span className={`${tagPrefixCls}-ellipsis`}>{child}</span>
  }

  // 预设的颜色值
  const isPresetColor = ['process', 'success', 'warning', 'error', 'end', 'expired'].indexOf(color) > -1

  const tagClasses = classNames(tagPrefixCls, className, {
    [`${tagPrefixCls}-shape-${type}`]: type,
    [`${tagPrefixCls}-${color}`]: isPresetColor,
    [`${tagPrefixCls}-has-color`]: !isPresetColor && color && type === 'attribute',
    [`${tagPrefixCls}-clickable`]: clickable,
    [`${tagPrefixCls}-closable`]: closable,
    [`${tagPrefixCls}-size-${size}`]: size,
    [`${tagPrefixCls}-closable-disabled`]: type === 'edit' && disabled,
  })

  // 设置自定义颜色值的样式
  const tagColorStyle =
    !isPresetColor && color && type === 'attribute'
      ? {
          backgroundColor: color,
        }
      : {}

  const tagStyle = {
    ...tagColorStyle,
    ...style,
  }

  // 图标
  const iconNode = icon || null

  const tagChild = handleChild(children)

  // 关闭按钮
  const closeIconNode = closeIcon || <Icon type="close" className={`${tagPrefixCls}-close-icon`} />
  const closeNode =
    closable && type === 'edit' ? (
      disabled ? (
        <span className={`${tagPrefixCls}-closeWrapper`}>{closeIconNode}</span>
      ) : (
        <span className={`${tagPrefixCls}-closeWrapper`} onClick={handleClose}>
          {closeIconNode}
        </span>
      )
    ) : null

  return (
    <span ref={tagRef} onClick={handleClick} className={tagClasses} style={tagStyle} {...others}>
      {iconNode}
      {tagChild}
      {closeNode}
    </span>
  )
}

const Tag = React.forwardRef<unknown, ITagProps>(InteranalTag)
Tag.displayName = 'Tag'
export default Tag
