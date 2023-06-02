import React, { useContext, useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { TabsContextProvider } from './context'
import { getCompProps } from '../_utils'
import { omit } from '../_utils/omit'
import { tuple } from '../_utils/type'
import TabPane, { ITabPaneProps } from './tab-pane'
import Line from './active-line'
import Icon from '../icon'
import ArrowButton from './arrow-button'
import Dropdown from '../dropdown'
import Carousel from '../carousel'

export const TabsTypes = tuple('line', 'card', 'grid', 'dynamic')
export type TabsType = typeof TabsTypes[number]
export const TabsSizes = tuple('middle', 'small')
export type TabsSize = typeof TabsSizes[number]
export const TabsPositions = tuple('top', 'left', 'right', 'bottom')
export type TabsPosition = typeof TabsPositions[number]
export const EffectTypes = tuple('scrollx', 'fade', 'none') // 滑动，渐显， 无动画
export type EffectType = typeof EffectTypes[number]
export type TabChangeEventHandler = (
  id: string | number,
  event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>,
) => void

export interface ITabsProps {
  type?: TabsType
  size?: TabsSize
  style?: Record<string, unknown> // 内联样式
  className?: string // 样式名
  disabled?: boolean
  noContainer?: boolean
  showScrollArrow?: boolean
  effect?: EffectType // 内置走马灯的动画效果
  position?: TabsPosition
  activeKey?: string | number
  defaultActiveKey?: string | number
  children?: React.ReactElement<ITabPaneProps> | Array<React.ReactElement<ITabPaneProps>>
  onChange?: TabChangeEventHandler
  getActiveLinePosition?: (left: number, width: number) => void
  getTriggerKey?: (key: any) => void
}

function getDefaultActiveKey(props: ITabsProps) {
  let activeKey: any
  React.Children.forEach(props.children, function (child) {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.key
    }
  })
  return activeKey
}

const Tabs: React.FC<ITabsProps> = (props) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const tabsProps = getCompProps('Tabs', userDefaultProps, props)
  const {
    type,
    size,
    className,
    prefixCls: customPrefixcls,
    position,
    disabled,
    noContainer,
    defaultActiveKey,
    showScrollArrow,
    effect = 'none',
    children,
    onChange,
  } = tabsProps

  const tabsPrefixCls = getPrefixCls!(prefixCls, 'tabs', customPrefixcls)

  let activeKey: any
  if (tabsProps.activeKey) {
    activeKey = tabsProps.activeKey
  } else if (defaultActiveKey) {
    activeKey = defaultActiveKey
  } else {
    activeKey = getDefaultActiveKey(tabsProps)
  }

  let carouselData: any = []
  const [curActiveKey, setCurActiveKey] = useState(activeKey)
  const [triggerKey, setTriggerKey] = useState(null)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [boxWidth, setBoxWidth] = useState(0)
  const [ListWidth, setListWidth] = useState(0)
  const [ListPostion, setListPosition] = useState(0)
  const tabRef = useRef<HTMLDivElement>(null)
  const tabListRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<any>(null)

  const handleActive = (id: string | number, e?: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>) => {
    setCurActiveKey(id)
    onChange && onChange(id, e)
  }

  const getActiveLinePosition = (left: any, width: any) => {
    setLeft(left)
    setWidth(width)
  }

  const getTriggerKey = (key: any) => {
    setTriggerKey(key)
  }

  useEffect(() => {
    setCurActiveKey(activeKey)
  }, [activeKey])

  useEffect(() => {
    const index = carouselData.findIndex((data: any) => String(curActiveKey) === String(data.key))
    if (index !== -1) {
      carouselRef.current?.jumpTo(index, true)
    }
  }, [curActiveKey, carouselRef, carouselData])

  useEffect(() => {
    if (tabListRef.current) {
      setListWidth(tabListRef.current?.offsetWidth || 0)
    }
  }, [tabListRef, children])

  useEffect(() => {
    if (tabRef.current) {
      setBoxWidth(tabRef.current?.offsetWidth || 0)
    }
    let offset = 0
    // TODO margin需要是变量的形式，不能写死
    const margin = type === 'line' ? 24 : 0
    const curOffset: number = tabListRef.current?.offsetLeft || 0
    const boxWidth = tabRef.current?.offsetWidth || 0
    if (left + width + margin + curOffset >= boxWidth) {
      offset = ListWidth - left - width - margin > 48 ? boxWidth - left - width - margin - 48 : boxWidth - ListWidth
      setListPosition(offset)
      return
    }
    if (left + curOffset < 48 && curOffset) {
      offset = left > 48 ? 48 - left : 0
      setListPosition(offset)
      // return
    }
  }, [tabRef, left, width, type, ListWidth])

  const tabsClasses = classNames(tabsPrefixCls, className, {
    [`${tabsPrefixCls}-${position}`]: position,
    [`${tabsPrefixCls}-noContainer`]: noContainer,
  })

  const tabNavsClasses = classNames(`${tabsPrefixCls}-navs`, {
    [`${tabsPrefixCls}-navs-${type}`]: type,
    [`${tabsPrefixCls}-navs-${position}`]: position,
    [`${tabsPrefixCls}-navs-${size}`]: size,
    [`${tabsPrefixCls}-navs-disabled`]: disabled,
  })

  let leftOperations: any
  let rightOperations: any
  let contextMenuList: any
  let containerPanes: Array<any> = []
  const fomatChildren: Array<any> =
    Object.prototype.toString.call(children) === '[object Object]' ? [children] : children

  fomatChildren?.forEach((child: any) => {
    if (Object.prototype.toString.call(child) === '[object Object]' && child.type.displayName === 'TabPane') {
      if (child.props.specialPane === 'left') {
        leftOperations = child
        return
      }

      if (child.props.specialPane === 'right') {
        rightOperations = child
        return
      }

      if (child.props.specialPane === 'contextMenu') {
        contextMenuList = child
        return
      }

      containerPanes.push(child)
      return
    }
    if (Object.prototype.toString.call(child) === '[object Array]') {
      containerPanes = containerPanes.concat([], child)
    }
  })

  const formatTabPane = (child: any) => {
    if (Object.prototype.toString.call(child) === '[object Object]' && child.type.displayName === 'TabPane') {
      return <TabPane {...child.props} key={child.key} id={child.key} onChange={handleActive} />
    }
    return null
  }

  const renderActiveLine = () => {
    return ['line', 'dynamic'].indexOf(type) > -1 && !disabled ? <Line left={left} width={width} /> : null
  }

  const renderLeftArrow = () => {
    if (!showScrollArrow || position === 'left' || ListWidth < boxWidth) return null
    const leftClasses = classNames(`${tabsPrefixCls}-left-arrows`, {
      [`${tabsPrefixCls}-left-arrows-${type}`]: type,
      [`${tabsPrefixCls}-left-arrows-noshadow`]: ListPostion === 0,
    })

    const handleLeft = () => {
      if (!ListPostion) return
      const offset = ListPostion + boxWidth > 0 ? 0 : ListPostion + boxWidth
      setListPosition(offset)
    }
    return (
      <div className={leftClasses}>
        <ArrowButton direction="left" disabled={ListPostion === 0} onClick={handleLeft} />
      </div>
    )
  }

  const renderRightArrows = (nodes: any) => {
    if (ListWidth < boxWidth || ['left', 'right'].includes(position)) return null

    const rightClasses = classNames(`${tabsPrefixCls}-right-arrows`, {
      [`${tabsPrefixCls}-right-arrows-${type}`]: type,
      [`${tabsPrefixCls}-right-arrows-noshadow`]: ListWidth + ListPostion === boxWidth,
    })

    const menu = nodes.map((node: any) => {
      const tmp = {
        label: '',
        key: 0,
        disabled: false,
      }
      tmp.label = node.props.tab
      tmp.key = node.props.id
      tmp.disabled = node.props.disabled
      return tmp
    })

    const handleRight = () => {
      if (ListPostion === boxWidth - ListWidth) return
      const offset = ListPostion - boxWidth > boxWidth - ListWidth ? ListPostion - boxWidth : boxWidth - ListWidth
      setListPosition(offset)
    }

    const handleSelectItem = (value: any) => {
      handleActive(value)
    }

    if (type === 'grid') {
      return (
        <div className={rightClasses}>
          <Dropdown menu={menu} trigger={['click']} onItemClick={handleSelectItem}>
            <span className={`${tabsPrefixCls}-more-btn`}>
              <Icon type="more" />
            </span>
          </Dropdown>
        </div>
      )
    }

    return (
      <div className={rightClasses}>
        {showScrollArrow ? (
          <ArrowButton direction="right" disabled={ListWidth + ListPostion === boxWidth} onClick={handleRight} />
        ) : null}
        <Dropdown menu={menu} trigger={['click']} onItemClick={handleSelectItem}>
          <span className={`${tabsPrefixCls}-more-btn`}>
            <Icon type="arrow-down" />
          </span>
        </Dropdown>
      </div>
    )
  }

  const renderLeftOperations = () => {
    if (type !== 'dynamic' || !leftOperations || !leftOperations.props.children) return null

    const classes = classNames(`${tabsPrefixCls}-left-operations`, {})

    const children =
      Object.prototype.toString.call(leftOperations.props.children) === '[object Array]'
        ? leftOperations.props.children
        : [leftOperations.props.children]

    return (
      <div className={classes}>
        {children.map((child: any, index: number) => {
          const event = () => {
            child.props.onClick && child.props.onClick()
          }
          return (
            <span className={`${tabsPrefixCls}-left-operations-item`} key={index}>
              <span onClick={event}>{child}</span>
            </span>
          )
        })}
      </div>
    )
  }

  const renderRightOperations = () => {
    if (type !== 'dynamic' || !rightOperations || !rightOperations.props.children) return null

    const classes = classNames(`${tabsPrefixCls}-right-operations`, {})

    const children =
      Object.prototype.toString.call(rightOperations.props.children) === '[object Array]'
        ? rightOperations.props.children
        : [rightOperations.props.children]

    return (
      <div className={classes}>
        {children.map((child: any, index: number) => {
          const event = () => {
            child.props.onClick && child.props.onClick()
          }
          return (
            <span className={`${tabsPrefixCls}-right-operations-item`} key={index}>
              <span onClick={event}>{child}</span>
            </span>
          )
        })}
      </div>
    )
  }

  const renderTabPane = () => {
    const { disabled } = tabsProps
    let childrenToRender: any = []
    const unDisabledTabs: Array<any> = []
    const disabledTabs: Array<any> = []
    childrenToRender = containerPanes.map((child: any) => {
      const tmp = formatTabPane(child)
      if (child.props?.disabled) {
        disabledTabs.push(tmp)
      } else {
        unDisabledTabs.push(tmp)
      }
      return tmp
    })
    if (!disabled) childrenToRender = unDisabledTabs.concat(disabledTabs)

    const renderTabWrap = () => {
      const listPositionStyle = {
        left: `${ListPostion}px`,
      }

      const renderWrap = (
        <div ref={tabListRef} className={`${tabsPrefixCls}-tab-list`} style={listPositionStyle}>
          {childrenToRender}
          {renderActiveLine()}
        </div>
      )
      if (!contextMenuList) return renderWrap

      const children =
        Object.prototype.toString.call(contextMenuList.props.children) === '[object Array]'
          ? contextMenuList.props.children
          : [contextMenuList.props.children]

      const eventMap: Array<any> = []
      const menu = (
        <Dropdown.Menu>
          {children.map((child: any, index: number) => {
            eventMap.push(child.props.onClick)
            return (
              <Dropdown.Item key={index}>
                <span>{child}</span>
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      )

      const handleItemClick = (key: any) => {
        const event = eventMap[key]
        event && event(triggerKey)
      }

      return (
        <Dropdown menu={menu} trigger={['contextMenu']} onItemClick={handleItemClick}>
          {renderWrap}
        </Dropdown>
      )
    }

    return (
      <div
        {...omit(tabsProps, ['activeKey', 'defaultActiveKey', 'showScrollArrow', 'noContainer'])}
        className={tabNavsClasses}
      >
        {renderLeftOperations()}
        {renderLeftArrow()}
        <div ref={tabRef} className={`${tabsPrefixCls}-tab-wrap`}>
          {renderTabWrap()}
        </div>
        {renderRightArrows(childrenToRender)}
        {renderRightOperations()}
      </div>
    )
  }

  const renderContainer = () => {
    if (noContainer) return null
    carouselData = []
    containerPanes.map((pane: any) => {
      const { props, key } = pane
      // 如果没有children传入那就以tab为准
      const item: any = { key }
      if (!props.children) {
        item.content = props.tab
      } else {
        item.content = props.children
      }
      carouselData.push(item)
    })

    return (
      <Carousel ref={carouselRef} dots={false} autoplay={false} effect={effect}>
        {carouselData.map((item: any) => (
          <React.Fragment key={item.key}>{item.content}</React.Fragment>
        ))}
      </Carousel>
    )
  }

  return (
    <TabsContextProvider
      value={{
        type,
        size,
        position,
        disabled,
        activeKey: curActiveKey,
        getActiveLinePosition,
        getTriggerKey,
      }}
    >
      <div className={tabsClasses}>
        {renderTabPane()}
        {renderContainer()}
      </div>
    </TabsContextProvider>
  )
}

Tabs.displayName = 'Tabs'

export default Tabs
