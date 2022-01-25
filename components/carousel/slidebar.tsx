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
    for (let i = 0; i <= number - 1; i++) {
      const dotClassName = isObject(dotsClassName)
        ? classNames({
            [`${dotsClassName.dotsClassName}`]: true,
            [`${dotsClassName.activeDotsClassName}`]: i === currentIndex,
          })
        : classNames({
            [`${slideBarPrefixCls}-dot`]: true,
            [`${slideBarPrefixCls}-dot-active`]: i === currentIndex,
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
