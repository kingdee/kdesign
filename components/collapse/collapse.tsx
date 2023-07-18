import React, { useEffect, useState } from 'react'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import classNames from 'classnames'
import { tuple } from '../_utils/type'
import { PanelProps } from './panel'
import devwarning from '../_utils/devwarning'
export const IconPositionTypes = tuple('left', 'right')
export type IconPositionType = typeof IconPositionTypes[number]
export type PanelKeyType = string | number
export type keyType = string[] | string | number[] | number | undefined
export interface CollapseProps {
  accordion?: boolean // 是否手风琴模式
  activeKey?: keyType // 当前激活 tab 面板的 key
  bordered?: boolean // 是否边框风格折叠面板
  defaultActiveKey?: string[] | string | number[] | number // 初始化选中面板的 key
  expandIcon?: React.ReactNode | ((props: PanelProps) => React.ReactNode) // 自定义切换图标
  expandIconPosition?: IconPositionType // 设置切换图标位置
  onChange?: (v: any) => void // 切换面板时的回调
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}
const InternalCollapse = React.forwardRef<unknown, CollapseProps>((props, ref) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)
  const {
    accordion,
    activeKey,
    bordered,
    defaultActiveKey,
    expandIcon,
    expandIconPosition,
    onChange,
    style,
    className,
    children,
    prefixCls: customPrefixcls,
  } = getCompProps('Collapse', userDefaultProps, props)
  const CollapsePrefixCls = getPrefixCls!(prefixCls, 'collapse', customPrefixcls) // 样式前缀

  const [innerKey, setInnerKey] = useState<PanelKeyType[]>([])
  const convertActiveKey = (newKey: keyType) => {
    let ret: PanelKeyType[] = []
    if (Array.isArray(newKey)) {
      ret = newKey
    } else if (typeof newKey === 'string' || typeof newKey === 'number') {
      ret = [newKey]
    }
    if (accordion && ret.length) {
      ret = [ret[0]]
    }
    return ret
  }
  useEffect(() => {
    if (typeof activeKey !== 'undefined') {
      setInnerKey(convertActiveKey(activeKey))
    }
  }, [activeKey])
  useEffect(() => {
    if (typeof activeKey !== 'undefined' || typeof defaultActiveKey !== 'undefined') {
      setInnerKey(convertActiveKey(typeof activeKey !== 'undefined' ? activeKey : defaultActiveKey))
    }
  }, [])

  const onPanelChange = (key: PanelKeyType) => {
    let newKey: PanelKeyType[] = []
    if (accordion) {
      if (innerKey.includes(key)) {
        newKey = []
      } else {
        newKey = [key]
      }
    } else {
      if (innerKey.includes(key)) {
        newKey = innerKey.filter((d) => d !== key)
      } else {
        newKey = [...innerKey, key]
      }
    }

    if (typeof activeKey === 'undefined') {
      setInnerKey(newKey)
    }
    onChange && onChange(newKey)
  }

  const renderPanel = () => {
    return React.Children.map(children, (item: any) => {
      if (item?.type?.displayName !== 'Panel') {
        devwarning(true, 'Collapse', 'children必须为Collapse.Panel')
        return item
      }

      return React.cloneElement(item, {
        expandIcon,
        expandIconPosition,
        onChange: onPanelChange,
        bordered,
        innerKey,
        ...item.props,
      })
    })
  }

  const rootClassName = classNames(className, {
    [`${CollapsePrefixCls}`]: true,
  })

  const collapseRef = (ref as any) || React.createRef<HTMLElement>()

  return (
    <div className={rootClassName} style={style} ref={collapseRef}>
      {renderPanel()}
    </div>
  )
})

InternalCollapse.displayName = 'Collapse'
export default InternalCollapse
