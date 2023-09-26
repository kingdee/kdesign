import React, { createContext } from 'react'
import classNames from 'classnames'
import { getCompProps } from '../_utils'
import { ConfigContext } from '../config-provider'
import throttle from 'lodash/throttle'
import { testBrowserType } from '../_utils/testBrowserType'

type Align = 'top' | 'middle' | 'bottom' | 'stretch'
type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between'
interface gutterObject {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

export interface RowProps {
  align?: Align
  wrap?: boolean
  justify?: Justify
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  gutter?: number | gutterObject | Array<number | gutterObject>
}

export interface GridContext {
  gap: { v: number; h: number }
  winWidth: number
}

function getGap(gutter: gutterObject, width: number) {
  const { xs, sm, md, lg, xl } = gutter
  let gap = 0
  if (xs && width > 0) gap = xs
  if (sm && width >= 600) gap = sm
  if (md && width >= 1024) gap = md
  if (lg && width >= 1280) gap = lg
  if (xl && width >= 1920) gap = xl
  return gap
}

export const GapContext = createContext<GridContext>({
  gap: { h: 0, v: 0 },
  winWidth: window.innerWidth,
})

const Row: React.FC<RowProps> = (props) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)
  // 属性需要合并一遍用户定义的默认属性
  const {
    style,
    className,
    children,
    wrap,
    gutter,
    align,
    justify,
    prefixCls: customPrefixcls,
  } = getCompProps('Row', userDefaultProps, props)

  // 浏览器名称
  const isSogouOrIe = testBrowserType(/^sogou/i, 0) || /Trident|MSIE/.test(navigator.userAgent)

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'row', customPrefixcls)

  const [winWidth, setWinWidth] = React.useState(window.innerWidth)
  const updateWidth = throttle(() => setWinWidth(window.innerWidth), 500)
  window.addEventListener('resize', updateWidth)

  const gap: any = { h: 0, v: 0 }

  if (gutter.constructor === Number) gap.h = gutter as number
  if (gutter.constructor === Object) {
    gap.h = getGap(gutter, winWidth)
  }
  if (Array.isArray(gutter)) {
    if (gutter[0].constructor === Object) {
      gap.h = getGap(gutter[0], winWidth)
    } else {
      gap.h = gutter[0]
    }
    if (gutter[1].constructor === Object) {
      gap.v = getGap(gutter[1], winWidth)
    } else {
      gap.v = gutter[1]
    }
  }

  const rowStyle: Record<string, any> = {
    'row-gap': `${gap.v}px`,
    margin: `0 ${(-1 * gap.h) / 2}px`,
  }
  if (gap.v && isSogouOrIe) rowStyle['margin-bottom'] = `${-1 * gap.v}px`

  const toalign: Record<string, string> = {
    top: 'flex-start',
    middle: 'center',
    bottom: 'flex-end',
  }

  const tojustify: Record<string, string> = {
    start: 'flex-start',
    end: 'flex-end',
  }

  const styleString = {
    ...rowStyle,
    ...style,
    alignItems: toalign[align] || align,
    justifyContent: tojustify[justify] || justify,
  }

  return (
    <GapContext.Provider value={{ gap: gap, winWidth: winWidth }}>
      <div className={classNames(prefixCls, className, { nowrap: !wrap })} style={styleString}>
        {children}
      </div>
    </GapContext.Provider>
  )
}

Row.displayName = 'Row'

export default Row
