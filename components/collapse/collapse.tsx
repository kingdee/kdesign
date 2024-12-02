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
export type KeyType = string[] | string | number[] | number

export interface CollapseProps {
  accordion?: boolean
  activeKey?: KeyType
  bordered?: boolean
  defaultActiveKey?: KeyType
  expandIcon?: React.ReactNode | ((props: PanelProps) => React.ReactNode)
  expandIconPosition?: IconPositionType
  onChange?: (v: KeyType) => void
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
  const CollapsePrefixCls = getPrefixCls!(prefixCls, 'collapse', customPrefixcls)

  const [innerKey, setInnerKey] = useState<PanelKeyType[]>([])
  const convertActiveKey = (newKey: KeyType) => {
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
    return React.Children.map(children, (item) => {
      if (item?.type?.displayName !== 'Panel') {
        devwarning(true, 'Collapse', 'children must be Collapse.Panel')
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

  const collapseRef = (ref as React.RefObject<HTMLDivElement>) || React.createRef<HTMLElement>()

  return (
    <div className={rootClassName} style={style} ref={collapseRef}>
      {renderPanel()}
    </div>
  )
})

InternalCollapse.displayName = 'Collapse'
export default InternalCollapse
