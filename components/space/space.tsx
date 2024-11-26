import * as React from 'react'
import classNames from 'classnames'
import { getCompProps } from '../_utils'
import { ConfigContext } from '../config-provider'

type Align = 'start' | 'end' | 'center' | 'baseline'

type Direction = 'vertical' | 'horizontal'

type Size = 'small' | 'middle' | 'large' | number

export interface SpaceProps {
  align?: Align
  className?: string
  direction?: Direction
  children?: React.ReactNode
  size?: Size | Size[]
  split?: React.ReactNode
  style?: React.CSSProperties
  wrap?: boolean
}

const Space: React.FC<SpaceProps> = (props) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)
  // 属性需要合并一遍用户定义的默认属性
  const {
    style,
    className,
    children,
    direction,
    align,
    size,
    split,
    wrap,
    prefixCls: customPrefixcls,
  } = getCompProps('Space', userDefaultProps, props)

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'space', customPrefixcls)

  const mapSize: Record<string, number> = {
    small: 8,
    middle: 16,
    large: 24,
  }

  const getGap = (size: Size) => (mapSize[size] || size || 0) as number

  const gap: Record<string, number> = { col: 0 }

  if (Array.isArray(size)) {
    const [col, row] = size
    gap.col = getGap(col)
    gap.row = getGap(row)
  } else {
    gap.col = getGap(size)
  }

  const styleString = {
    '--cgap': gap.col + 'px',
    '--rgap': gap.row && gap.row + 'px',
    ...style,
  }

  const spaceClass = classNames(prefixCls, className, `${prefixCls}-${direction}`, `${prefixCls}-align-${align}`, {
    [`${prefixCls}-wrap`]: wrap,
  })

  const renderItems: (children: React.ReactNode) => React.ReactNode[] = (children) => {
    const result: React.ReactNode[] = []
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (typeof child.type === 'symbol') {
          result.push(...renderItems(child.props.children))
        } else {
          result.push(child)
        }
      } else if (child) {
        result.push(<span>{child}</span>)
      }
    })
    return result
  }

  const Items = renderItems(children)

  if (split) {
    for (let i = 1; i < Items.length; i += 2) {
      Items.splice(i, 0, React.cloneElement(split?.type ? split : <span>{split}</span>, { key: i }))
    }
  }

  return (
    <div className={spaceClass} style={styleString}>
      {Items}
    </div>
  )
}

Space.displayName = 'Space'

export default Space
