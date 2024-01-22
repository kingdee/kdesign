import React from 'react'
import { getCompProps } from '../_utils'
import { ConfigContext } from '../config-provider'
import Popper, { PopperProps } from '../popper'

export type TooltipProps = PopperProps

const Tooltip = React.forwardRef<unknown, TooltipProps>((props, ref) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps } = React.useContext(ConfigContext)

  const allProps = getCompProps('ToolTip', compDefaultProps, props)

  const prefixCls = getPrefixCls!(pkgPrefixCls, 'tooltip', allProps?.prefixCls)

  const popperProps = { ref, prefixCls, ...allProps }

  return <Popper {...popperProps} />
})

Tooltip.displayName = 'Tooltip'

export default Tooltip
