import React, { useContext } from 'react'
import classNames from 'classnames'
import { getCompProps } from '../_utils'
import { ConfigContext } from '../config-provider'
import { testBrowserType } from '../_utils/testBrowserType'
import { GapContext } from './row'

interface ColBase {
  span?: number
  pull?: number
  push?: number
  order?: number
  offset?: number
}

export interface ColProps extends ColBase {
  className?: string
  flex?: string | number
  xs?: number | ColBase
  sm?: number | ColBase
  md?: number | ColBase
  lg?: number | ColBase
  xl?: number | ColBase
  children?: React.ReactNode
  style?: React.CSSProperties
}

const Col: React.FC<ColProps> = (props) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)
  // 属性需要合并一遍用户定义的默认属性
  const {
    xs,
    sm,
    md,
    lg,
    xl,
    flex,
    span,
    pull,
    push,
    style,
    order,
    offset,
    children,
    className,
    prefixCls: customPrefixcls,
    ...others
  } = getCompProps('Col', userDefaultProps, props)

  const rowGroup = useContext(GapContext)
  const mergedWinWidth = rowGroup!.winWidth
  const gap = rowGroup!.gap

  // 浏览器名称
  const isSogouOrIE = testBrowserType(/^sogou/i, 0) || /Trident|MSIE/.test(navigator.userAgent)
  const colGapStyle: Record<string, any> = {
    padding: `0 ${gap.h / 2}px`,
  }
  if (isSogouOrIE && gap.v) colGapStyle.marginBottom = gap.v

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'col', customPrefixcls)
  const columns = 24

  let base = { span, pull, push, offset, order }

  if (xs && mergedWinWidth > 0) {
    if (xs.constructor === Number) base.span = xs
    if (xs.constructor === Object) base = { ...base, ...xs }
  }
  if (sm && mergedWinWidth >= 600) {
    if (sm.constructor === Number) base.span = sm
    if (sm.constructor === Object) base = { ...base, ...sm }
  }
  if (md && mergedWinWidth >= 1024) {
    if (md.constructor === Number) base.span = md
    if (md.constructor === Object) base = { ...base, ...md }
  }
  if (lg && mergedWinWidth >= 1280) {
    if (lg.constructor === Number) base.span = lg
    if (lg.constructor === Object) base = { ...base, ...lg }
  }
  if (xl && mergedWinWidth >= 1920) {
    if (xl.constructor === Number) base.span = xl
    if (xl.constructor === Object) base = { ...base, ...xl }
  }

  const width = base.span ? (base.span / columns) * 100 + '%' : '100%'

  let flexstr = `0 0 ${width}`

  if (flex) {
    if (flex.constructor === Number) {
      flexstr = `${flex} ${flex} auto`
    }
    if (flex.constructor === String) {
      const flexArr = flex.split(' ')
      if (flexArr.length === 1 && /px/.test(flexArr[0])) {
        flexstr = `0 0 ${flexArr[0]}`
      } else {
        flexstr = flex as string
      }
    }
  }

  const styleString = {
    flex: flexstr,
    maxWidth: width,
    order: base.order,
    left: base.push && (base.push / columns) * 100 + '%',
    right: base.pull && (base.pull / columns) * 100 + '%',
    marginLeft: base.offset && (base.offset / columns) * 100 + '%',
    ...colGapStyle,
    ...style,
  }

  return (
    <div className={classNames(prefixCls, className)} style={styleString} {...others}>
      {children}
    </div>
  )
}

Col.displayName = 'Col'

export default Col
