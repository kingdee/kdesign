import * as React from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { Menu, Item } from './menu'
import usePopper, { PopperProps } from '../_utils/usePopper'

type MenuItem = {
  key?: string
  label: string
  href?: string
  danger?: boolean
  divided?: boolean
  disabled?: boolean
  selected?: boolean
}

export interface DropDownProps extends PopperProps {
  defaultKey?: string
  selectedKey?: string
  selectable?: boolean
  className?: string
  style?: Record<string, unknown>
  children?: React.ReactNode
  onItemClick?: (key: string) => void
  menu: React.ReactElement | Array<MenuItem>
}

const findItem: (element: any) => any = (element) => {
  const isItem = /dropdown-menu-item/.test(element.className)
  if (isItem) {
    return element
  } else {
    return element.parentNode ? findItem(element.parentNode) : null
  }
}

const Dropdown = React.forwardRef<unknown, DropDownProps>((props, ref) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)

  // 属性需要合并一遍用户定义的默认属性
  const allProps = getCompProps('Dropdown', userDefaultProps, props)

  const {
    menu,
    disabled,
    children,
    selectable,
    onItemClick,
    defaultVisible,
    onVisibleChange,
    prefixCls: customPrefixcls,
  } = allProps

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'dropdown', customPrefixcls)

  const [visible, setVisible] = React.useState(!!props.visible || defaultVisible)
  React.useEffect(() => {
    setVisible(!!props.visible)
  }, [props.visible])

  const child =
    children && children?.type?.displayName === 'Input' ? (
      <span className={classNames(`${prefixCls}-trigger`, `${prefixCls}-trigger-container`)} ref={ref as any}>
        {children}
      </span>
    ) : (
      React.cloneElement(React.Children.only(children), {
        ref: children.ref || ref,
        className: classNames(`${prefixCls}-trigger`, children.props.className, { disabled }),
      })
    )

  const isMenu = menu.type === Menu

  const [selectedKey, setSelectedKey] = React.useState(
    props.selectedKey || menu.props?.defaultKey || props.defaultKey || '',
  )

  React.useEffect(() => {
    if (typeof props.selectedKey !== 'undefined') {
      setSelectedKey(props.selectedKey)
    }
  }, [props.selectedKey])

  const menuSelectable = menu.props?.selectable === undefined ? selectable : menu.props?.selectable

  const handleItemClick = (e: React.MouseEvent) => {
    const item = findItem(e.target)
    const key = item?.dataset?.key
    if (item?.className.indexOf('disabled') === -1 && key) {
      if (isMenu && menu.props.onClick) {
        menu.props.onClick(key)
      } else if (onItemClick) {
        onItemClick(key)
      }
      menuSelectable && setSelectedKey(key)
      props.visible === undefined && setVisible(false)
    }
  }
  const cloneObj = React.cloneElement(menu, {
    selectedKey,
    onClick: handleItemClick,
    selectable: menuSelectable,
  })

  const menuElement = isMenu ? (
    cloneObj
  ) : (
    <ul className={`${prefixCls}-menu`} onClick={handleItemClick} role="menu">
      {menu.map(({ key: itemKey, label, href, danger, divided, disabled }: MenuItem) => {
        const alinkProps = {
          href,
          target: '_blank',
          rel: 'noopener noreferrer',
        }
        const key: string = itemKey || label
        const selected = selectable && String(selectedKey) === String(key)
        return (
          <li
            title={label}
            key={key}
            data-key={key}
            className={classNames(`${prefixCls}-menu-item`, {
              danger,
              divided,
              disabled,
              selected,
            })}
            role="menuitem"
          >
            {href === undefined || disabled ? (
              <span>{label}</span>
            ) : (
              <a {...alinkProps}>
                <span>{label}</span>
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )

  const handleVisibleChange = (visible: boolean) => {
    props.visible === undefined && setVisible(visible)
    onVisibleChange && onVisibleChange(visible)
  }

  const popperProps = {
    ...allProps,
    visible,
    prefixCls,
    onVisibleChange: handleVisibleChange,
  }

  return usePopper(child, menuElement, popperProps)
})

Dropdown.displayName = 'Dropdown'

interface DropdownType extends React.ForwardRefExoticComponent<DropDownProps & React.RefAttributes<HTMLElement>> {
  Menu: typeof Menu
  Item: typeof Item
}

const OuterDropdown = Dropdown as DropdownType

OuterDropdown.Menu = Menu

OuterDropdown.Item = Item

export default OuterDropdown
