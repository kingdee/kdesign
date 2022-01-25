import React from 'react'
import classNames from 'classnames'

interface markObjProps {
  style?: React.CSSProperties
  label?: React.ReactNode
}

export interface marksProps {
  marks: Record<number, React.ReactNode | markObjProps>
  prefixCls: string
  vertical: boolean
  reverse: boolean
  min: number
  max: number
  bound: number
  onClickLabel: (e: React.MouseEvent | React.TouchEvent, point: React.ReactNode | markObjProps) => void
}

function Marks(props: marksProps) {
  const { marks, prefixCls, vertical, reverse, min, max, bound, onClickLabel } = props

  const range = max - min

  const elements = Object.keys(marks)
    .map(parseFloat)
    .sort((a, b) => a - b)
    .map((point) => {
      // 判断label元素 可能是reactNode 也可能是{label: reactNode, style: css}
      const markNode = marks[point]
      const isObject = typeof markNode === 'object' && !React.isValidElement(markNode)
      const markLabelElement = isObject ? (markNode as markObjProps).label : markNode
      const markLabelStyle = isObject ? (markNode as markObjProps).style : null
      // 根据vertical和reverse判断mark的样式
      const offset = `${(Math.abs(point - min) / range) * 100}%`
      const markStyle = vertical
        ? { [reverse ? 'top' : 'bottom']: offset, ...markLabelStyle }
        : { [reverse ? 'right' : 'left']: offset, ...markLabelStyle }

      const isActived = bound >= point

      const markClass = classNames({
        [`${prefixCls}-mark-text`]: true,
        [`${prefixCls}-mark-text-actived`]: isActived,
      })

      return (
        <span
          className={markClass}
          key={point}
          style={markStyle}
          onMouseDown={(e) => onClickLabel(e, point)}
          onTouchStart={(e) => onClickLabel(e, point)}
        >
          {markLabelElement}
        </span>
      )
    })

  const marksClass = classNames(`${prefixCls}-mark`, {
    [`${prefixCls}-reverse`]: reverse,
  })
  return <div className={marksClass}>{elements}</div>
}

export default Marks
