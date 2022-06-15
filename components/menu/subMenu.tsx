import React from 'react'
import { ConfigContext } from '../config-provider'
import { getCompProps } from '../_utils'
import { toArray } from '../_utils/react-children'
import classNames from 'classnames'
import { MenuClickEventHandler } from './interface'
import { isString, getItemWidth, renderReactNodeFunction, isElementInViewport, DEFAUTL_PADDING } from './util'
import { useOnClickOutside } from '../_utils/hooks'
import { Icon } from '../index'
import usePopper from '../_utils/usePopper'
import devWarning from '../_utils/devwarning'
import { MENU_ITEM_CONTAINER_NAME } from './menuItem'

export interface MenuSubMenuProps extends React.HTMLAttributes<HTMLElement> {
  disabled?: boolean
  icon?: React.ReactNode
  key?: string
  popupOffset?: number[]
  subMenuMode?: string
  children?: React.ReactNode
  popupClassName?: string
  style?: React.CSSProperties
}

const SubMenu: React.FC<MenuSubMenuProps> = (props) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)

  // 属性需要合并一遍用户定义的默认属性
  const {
    prefixCls: customPrefixcls,
    theme,
    mode,
    title,
    icon,
    disabled,
    children,
    collapsed,
    keyValue,
    selectedKey,
    openKeys,
    triggerSubMenuAction,
    forceSubMenuRender,
    inlineIndent,
    className,
    style,
    handleOnOpenChange,
    paddingLeft = 0,
    ...restProps
  } = getCompProps('MenuSubMenu', userDefaultProps, props)

  // 初始化level
  if (!restProps.level) {
    restProps.level = 1
  }

  if (mode === 'inline') {
    restProps.subMenuMode = 'vertical'
    restProps.popupOffset = []
  }

  devWarning(!children, 'submenu', 'cannot found children in Menu.SubMenu')

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'menu-submenu', customPrefixcls)

  const subMenuRef = React.useRef(null)
  const subMenuWrapperRef = React.useRef<HTMLDivElement>(null)

  const subMenuVerticalRef = React.useRef(null)
  const subMenuWrapperVerticalRef = React.useRef<HTMLDivElement>(null)

  const visible = Array.isArray(openKeys) && openKeys.includes(keyValue)

  React.useEffect(() => {
    if (!visible) return

    const subMenuWrapperEle = subMenuWrapperRef.current
    const subMenuEle = subMenuRef.current
    if (subMenuWrapperEle && isElementInViewport(subMenuEle)) {
      const position = subMenuWrapperEle.getBoundingClientRect()
      const windowHeight = document.body.offsetHeight

      if (position.bottom > windowHeight) {
        subMenuWrapperEle.style.transform = `translate(0px,-${position.bottom - windowHeight}px)`
      }
    }
  })

  const getPaddingRight = (): number => {
    if (collapsed && restProps.level === 1) {
      return 0
    }

    return DEFAUTL_PADDING
  }

  const getPaddingLeft = (): number => {
    if (restProps.level > 1 && mode !== 'inline') {
      return DEFAUTL_PADDING
    }

    if (restProps.level === 1 && icon) {
      return 0
    }

    // 无图标显示首个字符不需要paddingleft
    if (!icon && collapsed && restProps.level === 1 && typeof title === 'string') {
      return 0
    }

    return inlineIndent + paddingLeft
  }

  const curPaddingRight = getPaddingRight()
  const curPaddingLeft = getPaddingLeft()

  const getCurrentStyle = React.useCallback(() => {
    // 内嵌模式height主要是用来动画的，必须要设置overflow溢出隐藏
    if (mode === 'inline') {
      const height = subMenuWrapperRef.current?.scrollHeight || 0

      return {
        height: visible && !collapsed ? `${height}px` : '0px',
        overflow: 'hidden',
        opacity: visible && !collapsed ? 1 : 0,
        transition: 'all 0.2s cubic-bezier(0,.4,.4,1)',
      }
    }

    const style: React.CSSProperties = {
      visibility: forceSubMenuRender && !visible ? 'visible' : 'hidden',
    }

    if (restProps.subMenuMode === 'horizontal') {
      style.display = 'flex'
    }

    const { offsetTop } = subMenuRef.current || { offsetTop: 0 }
    let popupOffsetPosition = restProps.popupOffset

    if (!Array.isArray(popupOffsetPosition) || popupOffsetPosition.length === 0) {
      popupOffsetPosition = [0, 0]
    }

    if (popupOffsetPosition.length === 1) {
      popupOffsetPosition = popupOffsetPosition.concat(0)
    }

    return Object.assign(style, {
      position: 'absolute',
      top: `${offsetTop}px`,
      left: '100%',
      paddingLeft: `${popupOffsetPosition[0]}px`,
      paddingTop: `${popupOffsetPosition[1]}px`,
    })
  }, [subMenuRef, restProps.popupOffset, forceSubMenuRender, visible, mode, restProps.subMenuMode])

  const handleVisibleChange = (status: boolean, clean = false) => {
    if (typeof restProps.parentVisibleChange === 'function') {
      restProps.parentVisibleChange(status)
    }

    handleOnOpenChange(keyValue, status, clean)
  }

  const closeSubMenu = () => {
    handleVisibleChange(false, true)
  }

  // 点击区域外的地方关闭
  useOnClickOutside([subMenuVerticalRef, subMenuWrapperVerticalRef], (e: any) => {
    const className = e?.target?.className || ''
    if (!className.includes(MENU_ITEM_CONTAINER_NAME)) {
      closeSubMenu()
    }
  })

  // 缩略模式自动关闭子菜单
  if (triggerSubMenuAction === 'click' && mode === 'vertical' && collapsed) {
    closeSubMenu()
  }

  const handleMouseEvent = (status: boolean) => {
    if (disabled || triggerSubMenuAction === 'click') return
    handleOnOpenChange(keyValue, status)
    handleVisibleChange(status)
  }

  const handleOnMouseEnter = () => {
    handleMouseEvent(true)
  }

  const handleOnMouseLeave = () => {
    handleMouseEvent(false)
  }

  const handleOnClick: MenuClickEventHandler = (info) => {
    // 保存路径
    info.keyPath = info.keyPath.concat([keyValue])
    if (triggerSubMenuAction === 'click' && mode === 'vertical') {
      closeSubMenu()
    }
    restProps.handleOnClick && restProps.handleOnClick(info)
  }

  // 子菜单展开收缩
  const handleOnClickSubMenu = () => {
    if (disabled || triggerSubMenuAction === 'hover') return
    handleVisibleChange(!visible)
  }

  const renderItemTitle = (): React.ReactNode => {
    if (!icon && collapsed && restProps.level === 1 && isString(title)) {
      return <p>{title.charAt(0)}</p>
    }

    if (isString(title)) {
      return <span>{title}</span>
    }

    return renderReactNodeFunction(title)
  }

  const renderItemArrow = (): React.ReactNode => {
    if (mode !== 'inline' || collapsed) return null

    return (
      <Icon
        type="arrow-down"
        className={classNames(`${prefixCls}-arrow`, {
          [`${prefixCls}-arrow-${visible ? 'up' : 'down'}`]: true,
        })}
      />
    )
  }

  if (restProps.subMenuMode === 'horizontal' && restProps.level > 1 && children) {
    const width = getItemWidth(children)
    return (
      <div className={classNames(`${prefixCls}-thrid-item`)} style={{ width }}>
        <div className={classNames(`${prefixCls}-thrid-title`)}>
          <span>{title}</span>
        </div>
        <ul className={classNames(`${prefixCls}-thrid-list`, restProps.popupClassName)}>
          {toArray(children).map((item: React.ReactElement, i) => {
            return React.cloneElement(item, {
              level: restProps.level + 1,
              subMenuMode: restProps.subMenuMode,
              keyValue: (item && item.key) || i,
              collapsed,
              mode,
              selectedKey,
              openKeys,
              forceSubMenuRender,
              triggerSubMenuAction,
              handleOnOpenChange,
              handleOnClick,
            })
          })}
        </ul>
      </div>
    )
  }

  const mouseEvent = {
    onMouseLeave: handleOnMouseLeave,
    onMouseEnter: handleOnMouseEnter,
    onClick: handleOnClickSubMenu,
  }

  const titleStyle = {
    paddingRight: `${curPaddingRight}px`,
    paddingLeft: `${curPaddingLeft}px`,
  }

  if (mode !== 'vertical') {
    return (
      <li
        ref={subMenuRef}
        className={classNames(prefixCls, className, {
          [`${prefixCls}-collapsed`]: collapsed,
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-hover`]: !disabled && visible,
          [`${prefixCls}-active`]: Array.isArray(openKeys) && openKeys.includes(keyValue),
        })}
        key={keyValue}
        {...mouseEvent}
        style={style}
      >
        <div className={classNames(`${prefixCls}-title`)} style={titleStyle}>
          {icon &&
            React.cloneElement(renderReactNodeFunction(icon), {
              className: classNames(`${prefixCls}-icon`),
            })}
          {renderItemTitle()}
          {renderItemArrow()}
        </div>
        <div style={getCurrentStyle()} ref={subMenuWrapperRef}>
          <ul className={classNames(`${prefixCls}-sub`, restProps.popupClassName)}>
            {toArray(children).map((item: React.ReactElement, index) => {
              const key = item.key || index
              return React.cloneElement(item, {
                key,
                level: restProps.level + 1,
                keyValue: key,
                collapsed,
                mode,
                selectedKey,
                openKeys,
                forceSubMenuRender,
                triggerSubMenuAction,
                handleOnOpenChange,
                handleOnClick,
                inlineIndent,
                paddingLeft: curPaddingLeft,
              })
            })}
          </ul>
        </div>
      </li>
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return usePopper(
    <li
      className={classNames(prefixCls, className, {
        [`light`]: theme === 'light',
        [`${prefixCls}-collapsed`]: collapsed,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-hover`]: !disabled && visible,
        [`${prefixCls}-active`]: Array.isArray(openKeys) && openKeys.includes(keyValue),
      })}
      ref={subMenuVerticalRef}
      key={keyValue}
      style={style}
      {...{
        onMouseLeave: handleOnMouseLeave,
        onMouseEnter: handleOnMouseEnter,
        onClick: handleOnClickSubMenu,
      }}
    >
      <div className={classNames(`${prefixCls}-title`)} style={titleStyle}>
        {icon &&
          React.cloneElement(renderReactNodeFunction(icon), {
            className: classNames(`${prefixCls}-icon`),
          })}
        {renderItemTitle()}
        {renderItemArrow()}
      </div>
    </li>,
    <div
      ref={subMenuWrapperVerticalRef}
      onMouseLeave={() => {
        handleOnMouseLeave()
      }}
      onMouseEnter={() => {
        handleOnMouseEnter()
      }}
    >
      <ul
        className={classNames(`${prefixCls}-sub`, restProps.popupClassName, {
          [`${prefixCls}-sub-second`]: restProps.level === 1,
          [`${prefixCls}-sub-third`]: restProps.level === 2,
        })}
      >
        {toArray(children).map((item: React.ReactElement, index) => {
          const key = item.key || index
          return React.cloneElement(item, {
            key,
            level: restProps.level + 1,
            keyValue: key,
            collapsed,
            mode,
            theme,
            selectedKey,
            openKeys,
            forceSubMenuRender,
            triggerSubMenuAction,
            handleOnOpenChange,
            handleOnClick,
            inlineIndent,
            parentVisibleChange: handleVisibleChange,
            paddingLeft: curPaddingLeft,
          })
        })}
      </ul>
    </div>,
    {
      arrow: false,
      placement: 'rightTop',
      gap: 0,
      visible,
      prefixCls: 'kd-menu-popper',
      popperClassName: theme === 'light' ? 'light' : '',
    },
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
