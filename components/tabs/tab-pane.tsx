import React, { useContext, useRef, useEffect } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import TabsContext from './context'
import { tuple } from '../_utils/type'

export type TabChangeEventHandler = (
  id: string | number | undefined,
  event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>,
) => void

export const TabPaneTypes = tuple('line', 'card', 'grid', 'dynamic')
export type TabPaneType = typeof TabPaneTypes[number]
export type TabPaneSize = 'middle' | 'small'
export type TabPanePosition = 'top' | 'left' | 'right' | 'bottom'

export interface ITabPaneProps {
  style?: Record<string, unknown> // 内联样式
  className?: string // 样式名
  type?: TabPaneType
  tab?: React.ReactNode
  size?: TabPaneSize
  position?: TabPanePosition
  disabled?: boolean
  specialPane?: string
  operations?: React.ReactNode[]
  id?: string | number
  activeKey?: string | number
  children?: any
  customTitleProps?: any
  onChange?: TabChangeEventHandler
}

const TabPane: React.FC<ITabPaneProps> = (props) => {
  const context = useContext(TabsContext)
  const tabPaneRef = useRef<HTMLDivElement>(null)
  const { getPrefixCls, prefixCls, isMobile } = useContext(ConfigContext)

  const { tab, id, className, disabled, operations, customTitleProps, onChange } = props

  const tabPaneProps: ITabPaneProps = { ...props }

  if (context) {
    tabPaneProps.activeKey = context.activeKey
    tabPaneProps.type = context.type
    tabPaneProps.position = context.position
    tabPaneProps.size = context.size
    tabPaneProps.disabled = context.disabled || disabled
  }

  const tabPanePrefixCls = getPrefixCls!(prefixCls, 'tab-pane')

  const tabPaneBoxClasses = classNames(tabPanePrefixCls, className, {
    [`${tabPanePrefixCls}-box-active`]: String(tabPaneProps.activeKey) === String(id) && !tabPaneProps.disabled,
    [`${tabPanePrefixCls}-type-dynamic-notMobile`]: !isMobile,
    [`${tabPanePrefixCls}-type-${tabPaneProps.type}`]: tabPaneProps.type,
    [`${tabPanePrefixCls}-${tabPaneProps.position}`]: tabPaneProps.position,
    [`${tabPanePrefixCls}-${tabPaneProps.size}`]: tabPaneProps.size,
    [`${tabPanePrefixCls}-disabled`]: tabPaneProps.disabled,
    [`${tabPanePrefixCls}-notMobile`]: !isMobile,
    [`${tabPanePrefixCls}-isMobile`]: isMobile,
  })

  const tabPaneTextClasses = classNames(`${tabPanePrefixCls}-text`, {
    [`${tabPanePrefixCls}-text-active`]: String(tabPaneProps.activeKey) === String(id) && !tabPaneProps.disabled,
    [`${tabPanePrefixCls}-text-disabled`]: tabPaneProps.disabled,
    [`${tabPanePrefixCls}-text-notMobile`]: !isMobile,
  })

  const operationsClasses = classNames(`${tabPanePrefixCls}-operations`, {
    [`${tabPanePrefixCls}-operations-active`]: String(tabPaneProps.activeKey) === String(id) && !tabPaneProps.disabled,
  })

  const handleClick = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>) => {
    if (tabPaneProps.disabled) return
    onChange && onChange(id, e)
  }

  useEffect(() => {
    if (String(tabPaneProps.activeKey) === String(id)) {
      context?.getActiveLinePosition!(tabPaneRef.current?.offsetLeft || 0, tabPaneRef.current?.offsetWidth || 0)
    }
  }, [tabPaneRef, tabPaneProps.activeKey, id, context])

  const renderOperations = () => {
    if (!operations?.length) return null

    return operations?.map((op: any, index: number) => {
      const event = () => {
        op.props.onClick && op.props.onClick(id)
      }
      return (
        <span key={index} onClick={event}>
          {op}
        </span>
      )
    })
  }

  const handleContextMenu = (e: any) => {
    if (tabPaneProps.type !== 'dynamic') return
    e.preventDefault()
    context?.getTriggerKey!(id)
  }

  if (tabPaneProps.type !== 'dynamic') {
    return (
      <span ref={tabPaneRef} className={tabPaneBoxClasses} onClick={handleClick}>
        <span className={tabPaneTextClasses} {...customTitleProps}>
          {tab}
        </span>
      </span>
    )
  }

  return (
    <span className={tabPaneBoxClasses} onContextMenu={handleContextMenu}>
      <span ref={tabPaneRef} className={tabPaneTextClasses} onClick={handleClick} {...customTitleProps}>
        {tab}
      </span>
      <span className={operationsClasses}>{renderOperations()}</span>
    </span>
  )
}

TabPane.displayName = 'TabPane'

export default TabPane
