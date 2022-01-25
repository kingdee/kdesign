import * as React from 'react'
import { ConfigContext } from '../config-provider'
import { getCompProps } from '../_utils'
import classNames from 'classnames'
import { MenuInfo } from './interface'
import { renderReactNodeFunction, DEFAUTL_PADDING } from './util'
import devWarning from '../_utils/devwarning'

export interface MenuItemProps extends React.HTMLAttributes<HTMLElement> {
  disabled?: boolean
  icon?: React.ReactNode
  key?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

const renderItemChildren = (children: React.ReactNode) => {
  if (typeof children === 'string') {
    return <span>{children}</span>
  }

  return renderReactNodeFunction(children)
}

const InternalMenuItem: React.ForwardRefRenderFunction<unknown, MenuItemProps> = (props, ref) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)

  // 属性需要合并一遍用户定义的默认属性
  const {
    prefixCls: customPrefixcls,
    icon,
    mode,
    level = 1,
    disabled,
    children,
    collapsed,
    keyValue,
    selectedKey,
    subMenuMode,
    inlineIndent,
    className,
    handleOnClick,
    paddingLeft = 0,
    style,
    ...restProps
  } = getCompProps('MenuItem', userDefaultProps, props)

  devWarning(!keyValue && keyValue !== 0, 'menuitem', 'cannot found children in Menu.Item')

  const prefixCls = getPrefixCls!(pkgPrefixCls, 'menu-item', customPrefixcls)

  const menuItemRef = (ref as any) || React.createRef<HTMLElement>()

  const preventClick = (): boolean => {
    if (disabled || mode === 'inline') return true
    return false
  }

  const handleOnMouseEnter = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (preventClick()) return

    restProps.onMouseEnter && restProps.onMouseEnter(e)
  }

  const handleOnMouseLeave = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (preventClick()) return

    restProps.onMouseLeave && restProps.onMouseLeave(e)
  }

  const handleOnClickItem = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (disabled) return

    e.stopPropagation()

    const info: MenuInfo = {
      key: keyValue,
      keyPath: [keyValue],
      domEvent: e.nativeEvent,
    }

    handleOnClick(info)
  }

  const getPaddingLeft = (): number => {
    if (icon || subMenuMode === 'horizontal') {
      return 0
    }

    if (level > 1 && mode !== 'inline') {
      return DEFAUTL_PADDING
    }

    // if (level === 1 && icon) {
    //   return 0
    // }

    // 无图标显示首个字符不需要paddingleft
    if (!icon && collapsed && level === 1 && typeof children === 'string') {
      return 0
    }

    return inlineIndent + paddingLeft
  }

  const mouseEvent = {
    onClick: handleOnClickItem,
    onMouseLeave: handleOnMouseLeave,
    onMouseEnter: handleOnMouseEnter,
  }

  const titleStyle = {
    paddingLeft: `${getPaddingLeft()}px`,
    paddingRight: mode !== 'inline' && level > 1 ? `${DEFAUTL_PADDING}px` : 0,
  }

  const renderTitle = (): React.ReactNode => {
    if (!icon && collapsed && level === 1 && typeof children === 'string') {
      return <p>{children.charAt(0)}</p>
    }

    return renderItemChildren(children)
  }

  return (
    <li
      ref={menuItemRef}
      className={classNames(className, {
        [prefixCls]: subMenuMode !== 'horizontal',
        [`${prefixCls}-collapsed`]: collapsed && level === 1,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-active`]: selectedKey === keyValue,
      })}
      role="menuitem"
      style={style}
      key={keyValue}
      title={children}
      {...mouseEvent}
    >
      <div className={classNames(`${prefixCls}-title`)} style={titleStyle}>
        {icon &&
          React.cloneElement(renderReactNodeFunction(icon), {
            className: classNames(`${prefixCls}-icon`),
          })}
        {renderTitle()}
      </div>
    </li>
  )
}

const MenuItem = React.forwardRef<unknown, MenuItemProps>(InternalMenuItem)

MenuItem.displayName = 'MenuItem'

export default MenuItem
