import React, { useContext, useEffect, useState } from 'react'
import {
  KeyType,
  MenuMode,
  MenuTheme,
  MenuClickEventHandler,
  TriggerSubMenuAction,
  SubMenuChangeEventHandler,
} from './interface'
import { toArray } from '../_utils/react-children'
import { ConfigContext } from '../config-provider'
import { getCompProps } from '../_utils'
import classNames from 'classnames'
import devWarning from '../_utils/devwarning'

import MenuItem from './menuItem'
import SubMenu from './subMenu'

export interface MenuProps extends React.HTMLAttributes<HTMLElement> {
  mode?: MenuMode
  collapsed?: boolean
  inlineIndent?: number
  forceSubMenuRender?: boolean
  defaultOpenKeys?: string[]
  openKeys?: string[]
  defaultSelectedKey?: string
  selectedKey?: string
  triggerSubMenuAction?: TriggerSubMenuAction
  additionalTools?: React.ReactNode
  onOpenChange?: SubMenuChangeEventHandler
  theme?: MenuTheme
  accordion?: boolean
}

interface MenuType extends React.FC<MenuProps> {
  Item: typeof MenuItem
  SubMenu: typeof SubMenu
}

const isFunction = (fn: any): boolean => {
  return fn && typeof fn === 'function'
}

const openSubMenuSet = new Set<string>()

const Menu: MenuType = (props) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)

  const { selectedKey: userSelectedKey, openKeys: userOpenKeys } = props
  const {
    prefixCls: customPrefixcls,
    mode,
    inlineIndent,
    forceSubMenuRender,
    additionalTools,
    onClick,
    onOpenChange,
    children,
    className,
    theme,
    collapsed,
    accordion,
    defaultOpenKeys,
    ...restProps
  } = getCompProps('Menu', userDefaultProps, props)

  const prefixCls = getPrefixCls!(pkgPrefixCls, 'menu', customPrefixcls)

  devWarning(['inline', 'vertical', undefined].indexOf(mode!) === -1, 'menu', `cannot found menu mode '${mode}'`)
  devWarning(mode !== 'inline' && accordion !== undefined, 'menu', `'accordion' is valid only in mode='inline'`)

  const [selectedKey, setSelectedKey] = useState<KeyType>('')
  const [selectedKeyPath, setSelectedKeyPath] = useState<KeyType[]>([])
  const [openKeys, setOpenKeys] = useState<KeyType[]>([])

  if (mode === 'inline') {
    restProps.triggerSubMenuAction = 'click'
  }

  useEffect(() => {
    setOpenKeys([])
    setSelectedKey('')
    setSelectedKeyPath([])
    openSubMenuSet.clear()
  }, [mode])

  useEffect(() => {
    if (userSelectedKey !== undefined) {
      setSelectedKey(userSelectedKey)
    }
  }, [userSelectedKey])

  useEffect(() => {
    if (Array.isArray(defaultOpenKeys)) {
      setOpenKeys(defaultOpenKeys)
      defaultOpenKeys.forEach((d) => {
        openSubMenuSet.add(d)
      })
    }
  }, [])

  useEffect(() => {
    if (userOpenKeys !== undefined && Array.isArray(userOpenKeys)) {
      setOpenKeys(userOpenKeys)
      openSubMenuSet.clear()
      userOpenKeys.forEach((d) => {
        openSubMenuSet.add(d)
      })
    }
  }, [userOpenKeys])

  const handleOnClick: MenuClickEventHandler = (info) => {
    if (userSelectedKey === undefined) {
      setSelectedKey(info.key)
    }

    if (mode !== 'inline' && openKeys.length > 0) {
      setOpenKeys([])
      openSubMenuSet.clear()
    }

    onClick && onClick(info)
  }

  const handleMouseEnterMenu = () => {
    if (isFunction(restProps.onMouseEnter)) {
      restProps.onMouseEnter()
    }
  }

  const handleMouseLeaveMenu = () => {
    if (isFunction(restProps.onMouseLeave)) {
      restProps.onMouseLeave()
    }
  }

  // 子菜单展开关闭的回调
  const handleOnOpenChange = (openKey: string, isAdd: boolean, clean = false) => {
    if (clean) {
      openSubMenuSet.clear()
    } else {
      if (mode === 'inline' && accordion) {
        openSubMenuSet.clear()
      }
      if (isAdd) {
        openSubMenuSet.add(openKey)
      } else {
        openSubMenuSet.delete(openKey)
      }
    }

    if (userOpenKeys === undefined) {
      setOpenKeys([...openSubMenuSet])
    }

    onOpenChange && onOpenChange([...openSubMenuSet])
  }

  const renderMenu = (): React.ReactElement => {
    return (
      <ul>
        {toArray(children).map((item: React.ReactElement, i) => {
          if (!item) return
          const key = item?.key || i
          return React.cloneElement(item, {
            key,
            keyValue: key,
            collapsed,
            mode,
            openKeys,
            selectedKey,
            selectedKeyPath,
            setSelectedKeyPath,
            theme,
            triggerSubMenuAction: restProps.triggerSubMenuAction,
            forceSubMenuRender,
            handleOnOpenChange,
            handleOnClick,
            inlineIndent,
            userOpenKeys,
            userSelectedKey,
          })
        })}
      </ul>
    )
  }

  const style: React.CSSProperties = {
    ...restProps.style,
    width: !collapsed && restProps.style?.width,
    transition: 'width 0.2s cubic-bezier(0,.4,.4,1)',
  }

  const mouseEvent = {
    onMouseLeave: handleMouseLeaveMenu,
    onMouseEnter: handleMouseEnterMenu,
  }

  return (
    <div
      className={classNames(prefixCls, className, {
        [`${prefixCls}-inline`]: mode === 'inline',
        [`${prefixCls}-vertical`]: mode !== 'inline',
        [`${prefixCls}-collapsed`]: collapsed,
        [`${prefixCls}-${theme === 'light' ? 'light' : 'dark'}`]: true,
      })}
      role="menu"
      style={style}
      {...mouseEvent}
    >
      {children && renderMenu()}
      {additionalTools}
    </div>
  )
}

Menu.displayName = 'Menu'

Menu.Item = MenuItem

Menu.SubMenu = SubMenu

export default Menu
