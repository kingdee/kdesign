import * as React from 'react'
import classNames from 'classnames'
import Icon from '../icon'

import TimelineItem from './TimelineItem'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'

export interface TimelineProps {
  reverse?: boolean
  prefixCls?: string
  className?: string
  labelWidth?: number
  lineHeight?: number
  pending?: React.ReactNode
  style?: React.CSSProperties
  pendingDot?: React.ReactNode
  mode?: 'left' | 'alternate' | 'right'
}

interface TimelineType extends React.FC<TimelineProps> {
  Item: typeof TimelineItem
}

const Timeline: TimelineType = (props) => {
  const {
    getPrefixCls,
    prefixCls: pkgPrefixCls,
    compDefaultProps: userDefaultProps,
    direction,
  } = React.useContext(ConfigContext)
  const {
    prefixCls: customizePrefixCls,
    pending = null,
    pendingDot,
    children,
    className,
    reverse,
    mode,
    style,
    lineHeight,
    labelWidth,
    ...restProps
  } = getCompProps('Timeline', userDefaultProps, props)
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'timeline', customizePrefixCls)
  const rtlCls = direction === 'rtl' ? `${prefixCls}-rtl` : null
  const pendingNode = typeof pending === 'boolean' ? null : pending

  const pendingItem = pending ? (
    <TimelineItem pending={!!pending} dot={pendingDot || <Icon type="loadding" spin />}>
      {pendingNode}
    </TimelineItem>
  ) : null

  const timeLineItems = reverse
    ? [pendingItem, ...React.Children.toArray(children).reverse()]
    : [...React.Children.toArray(children), pendingItem]

  const truthyItems = timeLineItems.filter((item) => !!item)
  const itemsCount = React.Children.count(truthyItems)
  const items = React.Children.map(truthyItems, (ele: React.ReactElement<any>, index) => {
    const pendingClass = index === itemsCount - 2 ? 'last' : ''
    const readyClass = index === itemsCount - 1 ? 'last' : ''
    return React.cloneElement(ele, {
      className: classNames([ele.props.className, !reverse && !!pending ? pendingClass : readyClass]),
    })
  })

  const hasLabelItem = truthyItems.some((item: React.ReactElement<any>) => !!item.props.label)

  const classString = classNames(
    prefixCls,
    rtlCls,
    {
      pending: !!pending,
      reverse: !!reverse,
      [mode]: mode,
      label: hasLabelItem,
    },
    className,
  )

  const styleString = {
    ...style,
    paddingLeft: hasLabelItem && mode === 'left' ? `${labelWidth}px` : undefined,
    paddingRight: hasLabelItem && mode === 'right' ? `${labelWidth}px` : undefined,
  }

  return (
    <ul {...restProps} className={classString} style={styleString}>
      {items?.map((item: React.ReactElement) => {
        return React.cloneElement(item, {
          mode,
          labelWidth,
          lineHeight,
          label: item.props.label || (hasLabelItem && ' '),
        })
      })}
    </ul>
  )
}

Timeline.displayName = 'Timeline'

Timeline.Item = TimelineItem

export default Timeline
