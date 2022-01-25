import React from 'react'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import classNames from 'classnames'
import { tuple } from '../_utils/type'
import { PanelProps } from './panel'
import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
import devwarning from '../_utils/devwarning'
export const IconPositionTypes = tuple('left', 'right')
export type IconPositionType = typeof IconPositionTypes[number]
export type keyType = string[] | string | number[] | number | NONE_KEY_TYPE
export type NONE_KEY_TYPE = undefined
const NONE_KEY = undefined
export interface CollapseProps {
  accordion?: boolean // 是否手风琴模式
  activeKey?: keyType // 当前激活 tab 面板的 key
  bordered?: boolean // 是否边框风格折叠面板
  defaultActiveKey?: string[] | string | number[] | number // 初始化选中面板的 key
  expandIcon?: React.ReactNode | ((props: PanelProps) => React.ReactNode) // 自定义切换图标
  expandIconPosition?: IconPositionType // 设置切换图标位置
  onChange?: () => void // 切换面板时的回调
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

  const getDefaultActivePanelKey = () => {
    // const _defaultActiveKey =
    //   defaultActiveKey !== NONE_KEY
    //     ? defaultActiveKey
    //     : React.Children.map(children, (item, index) => {
    //         if (index === 0) return item.props?.panelKey
    //       })
    // return isBoolean(activeKey) ? activeKey : _defaultActiveKey
    return isBoolean(activeKey) ? activeKey : defaultActiveKey
  }

  const [activePanelKey, setActivePanelKey] = React.useState(getDefaultActivePanelKey())

  const getPanelExpand = (panelKey: any, accordion: boolean, activeKey: number): boolean => {
    const _activeKey = getActiveKey(accordion, activeKey)
    return isInclude(_activeKey, panelKey)
  }

  const getActiveKey = (accordion: boolean, activeKey: number): number | string => {
    let _activeKey = activeKey
    if (accordion) {
      if (isArray(activeKey)) {
        _activeKey = activeKey[0] // accordion 模式下默认第一个元素
      }
    }
    return _activeKey
  }

  const isInclude = (activePanelKey: keyType, key: keyType): boolean => {
    if (isArray(activePanelKey)) {
      return activePanelKey.includes(key as never) || activePanelKey.includes(String(key) as never)
    } else {
      return String(activePanelKey) === String(key)
    }
  }

  const getRemoveKey = (key: keyType): keyType => {
    if (isArray(activePanelKey)) {
      return activePanelKey.filter((element) => {
        return element !== key
      })
    }
    return NONE_KEY
  }

  const getAddKey = (key: keyType): keyType => {
    if (isArray(activePanelKey)) {
      return [...activePanelKey, key]
    }
    return activePanelKey ? [activePanelKey, key] : key
  }

  const getNewActiveKey = (key: keyType): keyType => {
    if (isInclude(activePanelKey, key)) {
      if (accordion) {
        return NONE_KEY
      }
      return getRemoveKey(key)
    } else {
      if (accordion) {
        return key
      }
      return getAddKey(key)
    }
  }

  const onPanelChange = React.useCallback(
    (key: keyType | NONE_KEY_TYPE) => {
      key = getNewActiveKey(key)
      setActivePanelKey(key)
      onChange && onChange()
    },
    [onChange, activePanelKey, accordion],
  )

  const renderPanel = () => {
    return React.Children.map(children, (item: any) => {
      if (item?.type?.displayName !== 'Panel') {
        devwarning(true, 'Collapse', 'children必须为Collapse.Panel')
        return item
      }
      const expand = getPanelExpand(item.props?.panelKey, accordion, activePanelKey)
      const defaultExpand = getPanelExpand(item.props?.panelKey, accordion, defaultActiveKey)
      return React.cloneElement(item, {
        expandIcon,
        expandIconPosition,
        onChange: onPanelChange,
        bordered,
        expand,
        defaultExpand,
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
