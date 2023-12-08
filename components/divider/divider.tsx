import React, { FunctionComponentElement, useContext, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import devWarning from '../_utils/devwarning'
import { tuple } from '../_utils/type'

export const DividerTypes = tuple('horizontal', 'vertical')
export type DividerType = typeof DividerTypes[number]

export const DividerOrientations = tuple('left', 'center', 'right')
export type DividerOrientation = typeof DividerOrientations[number]

export const DividerBorderStyles = tuple('solid', 'dashed', 'dotted')
export type DividerBorderStyle = typeof DividerBorderStyles[number]

export interface IDividerProps {
  style?: Record<string, unknown> // 内联样式
  className?: string // 样式名
  prefixCls?: string // 样式前缀
  children?: React.ReactNode // 子元素
  borderStyle?: DividerBorderStyle // 线段样式
  type?: DividerType // 线段类型
  orientation?: DividerOrientation // 内嵌子元素布局
  orientationMargin?: number | string // 内嵌子元素具体位置
}

const Divider = (props: IDividerProps): FunctionComponentElement<IDividerProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const dividerProps = getCompProps('Divider', userDefaultProps, props)
  const {
    className,
    prefixCls: customPrefixcls,
    children,
    type,
    orientationMargin,
    orientation,
    borderStyle,
    ...others
  } = dividerProps
  const dividerPrefixCls = getPrefixCls!(prefixCls, 'divider', customPrefixcls)
  const orientationPrefix = orientation.length > 0 ? `-${orientation}` : orientation
  const hasChildren = !!children
  const isHorizontal = type === 'horizontal'
  const isVertical = type === 'vertical'
  const optimizedOrientationMargin = useMemo<string | number>(() => {
    if (/^[0-9]+$/.test(orientationMargin)) {
      return orientationMargin + 'px'
    }
    return ''
  }, [orientationMargin])
  const dividerClass = classNames(dividerPrefixCls, className, {
    [`${dividerPrefixCls}-with-text`]: hasChildren && isHorizontal,
    [`${dividerPrefixCls}-with-text${orientationPrefix}`]: hasChildren && isHorizontal,
    [`${dividerPrefixCls}-solid`]: borderStyle === 'solid',
    [`${dividerPrefixCls}-dashed`]: borderStyle === 'dashed',
    [`${dividerPrefixCls}-dotted`]: borderStyle === 'dotted',
    [`${dividerPrefixCls}-vertical`]: isVertical,
    [`${dividerPrefixCls}-margin-left`]: isHorizontal && orientation === 'left' && optimizedOrientationMargin,
    [`${dividerPrefixCls}-margin-right`]: isHorizontal && orientation === 'right' && optimizedOrientationMargin,
  })
  const innerTextClass = classNames(`${dividerPrefixCls}-inner-text`)

  const innerTextStyle: React.CSSProperties = {
    ...(orientation === 'left' && { marginLeft: optimizedOrientationMargin }),
    ...(orientation === 'right' && { marginRight: optimizedOrientationMargin }),
  }

  useEffect(() => {
    devWarning(isVertical && children, 'divider', '`children` not working in `vertical` mode.')
  }, [children, isVertical])

  return (
    <div className={dividerClass} {...others}>
      {isHorizontal && hasChildren && (
        <div className={innerTextClass} style={innerTextStyle}>
          {children}
        </div>
      )}
    </div>
  )
}

Divider.displayName = 'Divider'
export default Divider
