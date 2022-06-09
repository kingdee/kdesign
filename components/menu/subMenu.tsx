import * as React from 'react'
import { ConfigContext } from '../config-provider'
import { getCompProps } from '../_utils'
import { toArray } from '../_utils/react-children'
import classNames from 'classnames'
import { MenuClickEventHandler } from './interface'
import {
  isString,
  getWrapWidth,
  getItemWidth,
  renderReactNodeFunction,
  isElementInViewport,
  DEFAUTL_PADDING,
} from './util'
import { useOnClickOutside } from '../_utils/hooks'
import { Icon } from '../index'
import devWarning from '../_utils/devwarning'

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

  const [isVisible, setIsVisible] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (openKeys.length > 0) {
      setIsVisible(openKeys.includes(keyValue))
    }
  }, [keyValue])

  React.useEffect(() => {
    if (!isVisible) return

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
        height: isVisible && !collapsed ? `${height}px` : '0px',
        overflow: 'hidden',
        opacity: isVisible && !collapsed ? 1 : 0,
        transition: 'all 0.2s cubic-bezier(0,.4,.4,1)',
      }
    }

    const style: React.CSSProperties = {
      visibility: forceSubMenuRender && !isVisible ? 'visible' : 'hidden',
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
  }, [subMenuRef, restProps.popupOffset, forceSubMenuRender, isVisible, mode, restProps.subMenuMode])

  const closeSubMenu = () => {
    setIsVisible(false)
    handleOnOpenChange(keyValue)
  }

  // 点击区域外的地方关闭
  useOnClickOutside([subMenuRef], () => {
    if (triggerSubMenuAction === 'click' && mode === 'vertical') {
      closeSubMenu()
    }
  })

  // 缩略模式自动关闭子菜单
  if (triggerSubMenuAction === 'click' && mode === 'vertical' && collapsed) {
    closeSubMenu()
  }

  const handleMouseEvent = (status: boolean) => {
    if (disabled || triggerSubMenuAction === 'click') return

    handleOnOpenChange(keyValue)
    setIsVisible(status)
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
  const handleOnClickSubMenu = (e: React.MouseEvent) => {
    if (disabled || triggerSubMenuAction === 'hover') return

    e.stopPropagation()

    handleOnOpenChange(keyValue)

    setIsVisible(!isVisible)
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
          [`${prefixCls}-arrow-${isVisible ? 'up' : 'down'}`]: true,
        })}
      />
    )
  }

  const renderSubMenu = (): React.ReactNode => {
    const style: React.CSSProperties = getCurrentStyle()

    // 展开收缩动画。针对二级三级菜单目前使用单一的样式去区分了
    const motionClassName: any = {}

    if (mode !== 'inline') {
      const prefixClsMotion = `${prefixCls}-sub`
      if (isVisible) {
        motionClassName[`${prefixClsMotion}-second`] = restProps.level === 1
        motionClassName[`${prefixClsMotion}-third`] = restProps.level === 2
      } else {
        motionClassName[`${prefixClsMotion}-hide`] = true
      }
    }

    return (
      <div style={style} ref={subMenuWrapperRef}>
        <ul className={classNames(`${prefixCls}-sub`, restProps.popupClassName, motionClassName)}>
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
    )
  }

  const renderThridMenu = (): React.ReactNode => {
    const style: React.CSSProperties = getCurrentStyle()

    return (
      <div style={style}>
        <div
          className={classNames(`${prefixCls}-thrid`)}
          onClick={(e) => {
            e.stopPropagation()
          }}
          style={{ width: getWrapWidth(children) }}
        >
          {toArray(children).map((item: React.ReactElement, i) => {
            return React.cloneElement(item, {
              level: restProps.level + 1,
              subMenuMode: restProps.subMenuMode,
              keyValue: item.key || i,
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
        </div>
      </div>
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

  return (
    <li
      ref={subMenuRef}
      className={classNames(prefixCls, className, {
        [`${prefixCls}-collapsed`]: collapsed,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-hover`]: !disabled && isVisible,
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
      {restProps.subMenuMode === 'horizontal' ? renderThridMenu() : renderSubMenu()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
