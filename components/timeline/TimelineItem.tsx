import * as React from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'

export interface TimeLineItemProps {
  color?: string
  pending?: boolean
  prefixCls?: string
  className?: string
  labelWidth?: number
  lineHeight?: number
  dot?: React.ReactNode
  label?: React.ReactNode
  style?: React.CSSProperties
  mode?: 'left' | 'alternate' | 'right'
}

const TimelineItem: React.FC<TimeLineItemProps> = (props) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)
  const {
    prefixCls: customizePrefixCls,
    className,
    color,
    children,
    pending,
    dot,
    mode,
    label,
    labelWidth,
    lineHeight,
    ...restProps
  } = getCompProps('TimelineItem', userDefaultProps, props)

  const prefixCls = getPrefixCls!(pkgPrefixCls, 'timeline-item', customizePrefixCls)
  const itemClassName = classNames(
    {
      [prefixCls]: true,
      pending: pending,
    },
    className,
  )

  const hasColorClass = /blue|red|green|gray/.test(color || '')
  const dotClassName = classNames({
    [`${prefixCls}-dot`]: true,
    custom: dot,
    [color]: hasColorClass,
  })

  const dotStyle = {
    top: lineHeight / 2,
    backgroundColor: color && !hasColorClass ? color : undefined,
  }

  const labelStyle =
    mode !== 'alternate'
      ? {
          width: `${labelWidth}px`,
          [`margin${mode?.substring(0, 1).toUpperCase()}${mode?.substring(1)}`]: `-${labelWidth}px`,
        }
      : {}

  const marginDistance = pending ? Math.round(lineHeight / 2 + 12 / 2 + 2) : Math.round(lineHeight / 2 + 9 / 2 + 2)

  return (
    <li {...restProps} className={itemClassName}>
      {label && (
        <div className={`${prefixCls}-label`} style={{ ...labelStyle, lineHeight: lineHeight + 'px' }}>
          {label}
        </div>
      )}
      <div className={`${prefixCls}-tail`} style={{ marginTop: marginDistance }} />
      <div className={dotClassName} style={dotStyle}>
        {dot}
      </div>
      <div className={`${prefixCls}-content`} style={{ lineHeight: lineHeight + 'px' }}>
        {children}
      </div>
    </li>
  )
}

export default TimelineItem
