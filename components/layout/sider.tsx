import * as React from 'react'
import { useContext, useRef, useState, useEffect } from 'react'
import classNames from 'classnames'
import { omit } from '../_utils/omit'
import Icon from '../icon'
import { getCompProps } from '../_utils'
import { LayoutContext } from './layout'
import { ConfigContext } from '../config-provider'

const dimensionMaxMap: Record<string, string> = {
  xs: '479.98px',
  sm: '599.98px',
  md: '1023.98px',
  lg: '1279.98px',
  xl: '1919.98px',
}

export interface SiderContextProps {
  siderCollapsed?: boolean
  collapsedWidth?: number | string
}

export const SiderContext: React.Context<SiderContextProps> = React.createContext({})

export type CollapseType = 'clickTrigger' | 'responsive'

export type SiderTheme = 'light' | 'dark'

export interface SiderProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string
  collapsible?: boolean
  collapsed?: boolean
  defaultCollapsed?: boolean
  reverseArrow?: boolean
  onCollapse?: (collapsed: boolean, type: CollapseType) => void
  zeroWidthTriggerStyle?: React.CSSProperties
  trigger?: React.ReactNode
  width?: number | string
  collapsedWidth?: number | string
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  theme?: SiderTheme
  onBreakpoint?: (broken: boolean) => void
}

export interface SiderState {
  collapsed?: boolean
  below: boolean
}

const generateId = (() => {
  let i = 0
  return (prefix: string) => {
    i += 1
    return `${prefix}${i}`
  }
})()

const Sider = React.forwardRef<HTMLDivElement, SiderProps>((props, ref) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)
  // 属性需要合并一遍用户定义的默认属性
  const {
    prefixCls: customPrefixcls,
    className,
    trigger,
    children,
    defaultCollapsed = false,
    theme = 'dark',
    style = {},
    collapsible = false,
    reverseArrow = false,
    width = 200,
    collapsedWidth = 50,
    zeroWidthTriggerStyle,
    breakpoint,
    onCollapse,
    onBreakpoint,
    ...other
  } = getCompProps('Layout', userDefaultProps, props)

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'layout-sider', customPrefixcls)

  const { siderHook } = useContext(LayoutContext)

  const [collapsed, setCollapsed] = useState('collapsed' in props ? props.collapsed : defaultCollapsed)
  const [below, setBelow] = useState(false)

  useEffect(() => {
    if ('collapsed' in other) {
      setCollapsed(props.collapsed)
    }
  }, [props.collapsed])

  const handleSetCollapsed = (value: boolean, type: CollapseType) => {
    if (!('collapsed' in props)) {
      setCollapsed(value)
    }
    onCollapse?.(value, type)
  }

  // Responsive
  const responsiveHandlerRef = useRef<(mql: MediaQueryListEvent | MediaQueryList) => void>()
  responsiveHandlerRef.current = (mql: MediaQueryListEvent | MediaQueryList) => {
    setBelow(mql.matches)
    onBreakpoint?.(mql.matches)

    if (collapsed !== mql.matches) {
      handleSetCollapsed(mql.matches, 'responsive')
    }
  }

  useEffect(() => {
    function responsiveHandler(mql: MediaQueryListEvent | MediaQueryList) {
      return responsiveHandlerRef.current!(mql)
    }

    let mql: MediaQueryList
    if (typeof window !== 'undefined') {
      const { matchMedia } = window
      if (matchMedia! && breakpoint && breakpoint in dimensionMaxMap) {
        mql = matchMedia(`(max-width: ${dimensionMaxMap[breakpoint]})`)
        try {
          mql.addEventListener('change', responsiveHandler)
        } catch (error) {
          mql.addListener(responsiveHandler)
        }
        responsiveHandler(mql)
      }
    }
    return () => {
      try {
        mql?.removeEventListener('change', responsiveHandler)
      } catch (error) {
        mql?.removeListener(responsiveHandler)
      }
    }
  }, [])

  useEffect(() => {
    const uniqueId = generateId('kd-sider-')
    siderHook.addSider(uniqueId)
    return () => siderHook.removeSider(uniqueId)
  }, [])

  const toggle = () => {
    handleSetCollapsed(!collapsed, 'clickTrigger')
  }

  const getWidth = (rawWidth: number | string) => {
    return rawWidth.constructor === Number ? `${rawWidth}px` : String(rawWidth)
  }

  const renderSider = () => {
    const siderWidth = getWidth(collapsed ? collapsedWidth : width)

    const zeroWidthTrigger =
      parseFloat(String(collapsedWidth || 0)) === 0 ? (
        <span
          onClick={toggle}
          className={classNames(
            `${prefixCls}-zero-width-trigger`,
            `${prefixCls}-zero-width-trigger-${reverseArrow ? 'right' : 'left'}`,
          )}
          style={zeroWidthTriggerStyle}
        >
          {trigger || <Icon type="project" />}
        </span>
      ) : null
    const iconObj = {
      expanded: reverseArrow ? <Icon type="foldmenu" /> : <Icon type="unfoldmenu" />,
      collapsed: reverseArrow ? <Icon type="unfoldmenu" /> : <Icon type="foldmenu" />,
    }
    const status = collapsed ? 'collapsed' : 'expanded'
    const defaultTrigger = iconObj[status]
    const triggerDom =
      trigger !== null
        ? zeroWidthTrigger || (
            <div className={`${prefixCls}-trigger`} onClick={toggle} style={{ width: '100%' }}>
              {trigger || defaultTrigger}
            </div>
          )
        : null
    const divStyle = {
      flex: `0 0 ${siderWidth}`,
      maxWidth: siderWidth,
      minWidth: siderWidth,
      width: siderWidth,
    }
    const siderCls = classNames(
      prefixCls,
      `${prefixCls}-${theme}`,
      {
        [`${prefixCls}-collapsed`]: !!collapsed,
        [`${prefixCls}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
        [`${prefixCls}-below`]: !!below,
        [`${prefixCls}-zero-width`]: parseFloat(siderWidth) === 0,
      },
      className,
    )

    const siderProps = {
      ...omit(props, ['collapsed', 'collapsible', 'onCollapse', 'onBreakpoint', 'collapsedWidth']),
      className: siderCls,
      style: { ...style, ...divStyle },
      ref,
    }

    return (
      <aside {...siderProps}>
        <div className={`${prefixCls}-children`}>{children}</div>
        {collapsible || (below && zeroWidthTrigger) ? triggerDom : null}
      </aside>
    )
  }

  return (
    <SiderContext.Provider
      value={{
        siderCollapsed: collapsed,
        collapsedWidth,
      }}
    >
      {renderSider()}
    </SiderContext.Provider>
  )
})

Sider.displayName = 'Sider'

export default Sider
