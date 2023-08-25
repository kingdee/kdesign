import React, { useRef } from 'react'
import { getCompProps } from '../_utils'
import { isFragment } from '../_utils/reactNode'
import { ConfigContext } from '../config-provider'
import usePopper, { PopperProps } from '../_utils/usePopper'

export type RenderFunction = () => React.ReactNode

export interface TooltipProps extends PopperProps {
  children?: React.ReactNode
  tip?: React.ReactNode | RenderFunction
}

const Tooltip = React.forwardRef<unknown, TooltipProps>((props, ref) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)

  // 属性需要合并一遍用户定义的默认属性
  const allProps = getCompProps('ToolTip', userDefaultProps, props)

  const status = useRef<undefined | boolean>()
  const { tip, children, prefixCls: customPrefixcls } = allProps

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'tooltip', customPrefixcls)

  const tiplocator = React.cloneElement(
    React.isValidElement(children) && !isFragment(children) ? children : <span>{children}</span>,
    {
      ref:
        React.isValidElement(children) && !isFragment(children) && (children as any).ref ? (children as any).ref : ref,
    },
  )
  const onVisibleChange = (v: boolean) => {
    if (status.current === v && allProps.visible === undefined) return
    status.current = v
    props.onVisibleChange && props.onVisibleChange(v)
  }
  const popperProps = {
    ...allProps,
    prefixCls,
    onVisibleChange: onVisibleChange,
    // arrow: true,
  }

  const tipPopper = typeof tip === 'function' ? tip() : tip

  return usePopper(tiplocator, tipPopper, popperProps)
})

Tooltip.displayName = 'Tooltip'

export default Tooltip
