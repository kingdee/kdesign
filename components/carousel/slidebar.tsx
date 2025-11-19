import React from 'react'
import classNames from 'classnames'
import isObject from 'lodash/isObject'
export interface slideProps {
  currentIndex: number
  dotPosition?: string
  number: number
  dotsClassName?: boolean | { dotsClassName: string; activeDotsClassName: string }
  parentPrefixCls?: string
  onClick: (index: number) => void
}
export const Slidebar = (props: slideProps) => {
  const { number, currentIndex, dotPosition, dotsClassName, parentPrefixCls, onClick } = props
  const slideBarPrefixCls = `${parentPrefixCls}-slidebar`

  const slideClassName = classNames({
    [`${slideBarPrefixCls}`]: true,
    [`${slideBarPrefixCls}-${dotPosition}`]: true,
  })
  const renderDot = () => {
    const element: React.ReactNodeArray = []
    // 归一化当前索引，避免在 scrollx 效果过渡到克隆项时出现 -1 或 number
    const normalizedIndex = currentIndex < 0 ? number - 1 : currentIndex >= number ? 0 : currentIndex
    for (let i = 0; i <= number - 1; i++) {
      const dotClassName = isObject(dotsClassName)
        ? classNames({
            [`${dotsClassName.dotsClassName}`]: true,
            [`${dotsClassName.activeDotsClassName}`]: i === normalizedIndex,
          })
        : classNames({
            [`${slideBarPrefixCls}-dot`]: true,
            [`${slideBarPrefixCls}-dot-active`]: i === normalizedIndex,
          })
      const li: React.ReactNode = (
        <li key={i} className={dotClassName}>
          <button onClick={() => onClick(i)}></button>
        </li>
      )
      element.push(li)
    }
    return element
  }
  return <ul className={slideClassName}>{renderDot()}</ul>
}
