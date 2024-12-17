import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

  const innerKeyRef = useRef<PanelKeyType[]>(innerKey)

  const convertActiveKey = useCallback(
    (newKey: keyType) => {
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
    },
    [accordion],
  )
  useEffect(() => {
    if (typeof activeKey !== 'undefined') {
      setInnerKey(convertActiveKey(activeKey))
    } else if (typeof defaultActiveKey !== 'undefined') {
      setInnerKey(convertActiveKey(defaultActiveKey))
    }
  }, [activeKey, convertActiveKey, defaultActiveKey])

  useEffect(() => {
    innerKeyRef.current = innerKey
  }, [innerKey])

  const onPanelChange = useCallback(
    (key: PanelKeyType) => {
      let newKey: PanelKeyType[] = []
      if (accordion) {
        if (innerKeyRef.current.includes(key)) {
          newKey = []
        } else {
          newKey = [key]
        }
      } else {
        if (innerKeyRef.current.includes(key)) {
          newKey = innerKeyRef.current.filter((d) => d !== key)
        } else {
          newKey = [...innerKeyRef.current, key]
        }
      }

      if (typeof activeKey === 'undefined') {
        setInnerKey(newKey)
      }
      onChange && onChange(newKey)
    },
    [accordion, activeKey, onChange],
  )

  const renderPanel = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      if (item?.type?.displayName !== 'Panel') {
        devwarning(true, 'Collapse', 'children must be Collapse.Panel')
        return item
      }
      const isExpand = innerKey.includes(item?.props?.panelKey)
      return React.cloneElement(item, {
        expandIcon,
        expandIconPosition,
        onChange: onPanelChange,
        bordered,
        isExpand,
        ...item.props,
      })
    })
  }, [bordered, children, expandIcon, expandIconPosition, innerKey, onPanelChange])

  const rootClassName = classNames(className, {
    [`${CollapsePrefixCls}`]: true,
  })

  const collapseRef = (ref as any) || React.createRef<HTMLElement>()

  return (
    <div className={rootClassName} style={style} ref={collapseRef}>
      {renderPanel}
    </div>
  )
})

InternalCollapse.displayName = 'Collapse'
export default InternalCollapse
