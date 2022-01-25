import React, { useRef } from 'react'
import Tooltip, { TooltipProps } from '../tooltip'
import classNames from 'classnames'

interface ISliderTooltipProps extends TooltipProps {
  reverse: boolean
  vertical: boolean
  min: number
  max: number
  bound: number
}

const SliderTooltip = React.forwardRef<unknown, ISliderTooltipProps>((props: ISliderTooltipProps, ref: unknown) => {
  const { visible, prefixCls, reverse, vertical, min, max, bound, ...others } = props
  const thisTooltipRef = useRef<HTMLElement>(null)
  const tooltipRef = (ref as any) || thisTooltipRef

  const sliderHandleClass = classNames(`${prefixCls}-handle`, {
    [`${prefixCls}-reverse`]: reverse,
  })

  const range = max - min
  const offset = `${(Math.abs(bound - min) / range) * 100}%`
  const handleStyle = vertical
    ? {
        [reverse ? 'top' : 'bottom']: offset,
        [reverse ? 'bottom' : 'top']: 'auto',
      }
    : {
        [reverse ? 'right' : 'left']: offset,
        [reverse ? 'left' : 'right']: 'auto',
      }
  const placement = vertical ? 'right' : 'top'

  return (
    <Tooltip ref={tooltipRef} {...others} tip={bound} visible={visible} placement={placement}>
      <div className={sliderHandleClass} style={handleStyle}></div>
    </Tooltip>
  )
})

export default SliderTooltip
