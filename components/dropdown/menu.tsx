import * as React from 'react'
import { ConfigContext } from '../config-provider'
import { getCompProps } from '../_utils'
import classNames from 'classnames'

export interface MenuProps {
  selectedKey?: string
  className?: string
  selectable?: boolean
  style?: React.CSSProperties
  children?: React.ReactNode
  onClick?: (key: string) => void
}

export interface ItemProps {
  key?: string | number
  danger?: boolean
  divided?: boolean
  disabled?: boolean
  selected?: boolean
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

const Menu = React.forwardRef<unknown, MenuProps>((props, ref) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)

  // 属性需要合并一遍用户定义的默认属性
  const {
    prefixCls: customPrefixcls,
    children,
    selectable,
    selectedKey,
    className,
    ...restProps
  } = getCompProps('DropdownMenu', userDefaultProps, props)

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'dropdown-menu', customPrefixcls)

  const cloneItem = (item: React.ReactElement, index?: number) => {
    if (!React.isValidElement(item)) {
      return item
    }
    const key = item.key || index
    const selected = selectable && String(selectedKey) === String(key)
    return React.cloneElement(item as any, { key, selected, defaultKey: key })
  }

  return (
    <ul className={classNames(prefixCls, className)} role="menu" {...restProps} ref={ref}>
      {React.Children.map(children, cloneItem)}
    </ul>
  )
})

const Item: React.FC<ItemProps> = (props) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)

  // 属性需要合并一遍用户定义的默认属性
  const {
    prefixCls: customPrefixcls,
    danger,
    divided,
    disabled,
    children,
    selected,
    defaultKey,
    className,
    ...restProps
  } = getCompProps('DropdownItem', userDefaultProps, props)

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'dropdown-menu-item', customPrefixcls)

  const childrenIsLink = children.type === 'a'

  const linkChildren = <span>{children.props?.children}</span>

  const itemRef = React.useRef()

  return (
    <li
      ref={itemRef}
      data-key={defaultKey}
      title={(itemRef.current as any)?.textContent}
      className={classNames(prefixCls, className, {
        danger,
        divided,
        disabled,
        selected,
      })}
      role="menuitem"
      {...restProps}
    >
      {childrenIsLink ? (
        disabled ? (
          linkChildren
        ) : (
          React.cloneElement(children, { children: linkChildren })
        )
      ) : (
        <span>{children}</span>
      )}
    </li>
  )
}

Menu.displayName = 'DropdownMenu'
Item.displayName = 'DropdownMenuItem'

export { Menu, Item }
