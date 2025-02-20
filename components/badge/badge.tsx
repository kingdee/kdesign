import React, { FunctionComponentElement, useContext, useRef, useMemo } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { cloneElement } from '../_utils/reactNode'
import { tuple } from '../_utils/type'

export const PresetStatusColorTypes = tuple('success', 'processing', 'error', 'default', 'warning')
export type PresetStatusColorType = typeof PresetStatusColorTypes[number]

export const BadgeSizes = tuple('default', 'small')
export type BadgeSize = typeof BadgeSizes[number]
export interface RibbonProps {
  className?: string
  prefixCls?: string
  style?: React.CSSProperties
  text?: React.ReactNode
  // color?: LiteralUnion<PresetColorType, string>
  color?: string
  children?: React.ReactNode
}

export interface BadgeProps extends RibbonProps {
  count?: React.ReactNode
  showZero?: boolean
  overflowCount?: number
  dot?: boolean
  style?: React.CSSProperties
  prefixCls?: string
  scrollNumberPrefixCls?: string
  className?: string
  status?: PresetStatusColorType
  color?: string
  text?: React.ReactNode
  size?: BadgeSize
  offset?: [number | string, number | string]
  title?: string
}

const Badge = (props: BadgeProps): FunctionComponentElement<BadgeProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, direction } = useContext(ConfigContext)
  const badgeProps = getCompProps('Badge', userDefaultProps, props)
  const {
    prefixCls: customPrefixcls,
    children,
    status,
    text,
    color,
    count = null,
    overflowCount = 99,
    dot = false,
    size = 'default',
    title,
    offset,
    style,
    className,
    showZero = false,
    ...restProps
  } = badgeProps

  const badgePrefixCls = getPrefixCls!(prefixCls, 'badge', customPrefixcls) // 徽标数样式前缀
  const rtlCls = direction === 'rtl' ? `${badgePrefixCls}-rtl` : null
  // ================================ Misc ================================

  const numberedDisplayCount = count > overflowCount ? `${overflowCount}+` : count

  const hasStatus = (status !== null && status !== undefined) || (color !== null && color !== undefined)

  const isZero = numberedDisplayCount === '0' || numberedDisplayCount === 0

  const isSingleNumber = !count || typeof count !== 'object'

  const showAsDot = hasStatus || (!isZero && dot)

  const mergedCount = showAsDot ? '' : numberedDisplayCount

  const isHidden = useMemo(() => {
    const isEmpty = mergedCount === null || mergedCount === undefined || mergedCount === ''
    return (isEmpty || (isZero && !showZero)) && !showAsDot
  }, [mergedCount, isZero, showZero, showAsDot])

  const isDotRef = useRef(showAsDot)
  if (!isHidden) {
    isDotRef.current = showAsDot
  }

  // =============================== Styles ===============================
  const mergedStyle = useMemo<React.CSSProperties>(() => {
    if (!offset) {
      return { ...style }
    }
    const offsetStyle: React.CSSProperties = { marginTop: offset[1] }
    direction === 'rtl'
      ? (offsetStyle.left = -parseInt(offset[0] as string, 10))
      : (offsetStyle.right = -parseInt(offset[0] as string, 10))
    return {
      ...offsetStyle,
      ...style,
    }
  }, [offset, style])

  // =============================== Render ===============================

  const badgeClassName = classNames(
    badgePrefixCls,
    rtlCls,
    {
      [`${badgePrefixCls}-status`]: hasStatus,
      [`${badgePrefixCls}-not-a-wrapper`]: !children,
    },
    className,
  )

  const isDot = isDotRef.current

  const scrollNumberCls = classNames({
    [`${badgePrefixCls}-dot`]: isDot,
    [`${badgePrefixCls}-count`]: !isDot,
    [`${badgePrefixCls}-count-sm`]: size === 'small',
    [`${badgePrefixCls}-multiple-words`]: !isDot && mergedCount && mergedCount.toString().length > 1,
    [`${badgePrefixCls}-status-${status}`]: !!status,
    // [`${badgePrefixCls}-status-${color}`]: isPresetColor(color),
  })

  const statusCls = classNames({
    [`${badgePrefixCls}-status-dot`]: hasStatus,
    [`${badgePrefixCls}-status-${status}`]: !!status,
    // [`${prefixCls}-status-${color}`]: isPresetColor(color),
  })

  const statusStyle: React.CSSProperties = {}
  if (color) {
    statusStyle.background = color
  }

  // Title
  const titleNode = title ?? (typeof count === 'string' || typeof count === 'number' ? count : undefined)

  // Status Text
  const statusTextNode = isHidden || !text ? null : <span className={`${prefixCls}-status-text`}>{text}</span>

  // Display Component
  const displayNode = isSingleNumber ? (
    <sup className={scrollNumberCls} style={{ ...mergedStyle, backgroundColor: color }} title={titleNode}>
      {mergedCount}
    </sup>
  ) : (
    cloneElement(count, (oriProps: { style?: any; className?: any }) => ({
      style: {
        ...mergedStyle,
        ...oriProps.style,
      },
      className: classNames(`${badgePrefixCls}-custom-component`, oriProps?.className),
    }))
  )

  if (!children && hasStatus) {
    const statusTextColor = mergedStyle.color
    return (
      <span {...restProps} className={badgeClassName} style={mergedStyle}>
        {/* style={statusStyle} */}
        <span className={statusCls} style={statusStyle} />
        <span style={{ color: statusTextColor }} className={`${badgePrefixCls}-status-text`}>
          {text}
        </span>
      </span>
    )
  }

  return (
    <span {...restProps} className={badgeClassName}>
      {children}
      {!isHidden && displayNode}
      {statusTextNode}
    </span>
  )
}

Badge.displayName = 'Badge'
export default Badge
