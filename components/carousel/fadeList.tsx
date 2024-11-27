import React from 'react'
import classNames from 'classnames'

export type ItemType = {
  key: string
  item: React.ReactNode
}
interface FadeListProps {
  parentPrefixCls: string
  items: ItemType[]
  needAnimation: boolean
  currentIndex: number
  itemWidth: number
}
export const FadeList = React.forwardRef((props: FadeListProps, ref: React.RefObject<HTMLUListElement>) => {
  const { items, parentPrefixCls, needAnimation, currentIndex, itemWidth } = props
  const itemRef = React.useRef<HTMLLIElement>(null)
  const fadeListPrefixCls = `${parentPrefixCls}-list-fade`
  const listPrefixCls = `${parentPrefixCls}-list`

  const renderItems = () => {
    return items.map((item, index) => {
      const opacityClassName =
        index === currentIndex ? `${listPrefixCls}-item-not-hidden` : `${listPrefixCls}-item-hidden`
      const animationClassName = needAnimation
        ? `${listPrefixCls}-item-animation`
        : `${listPrefixCls}-item-none-animation`
      const posx = -1 * index * itemWidth
      return (
        <li
          className={classNames(`${listPrefixCls}-item`, opacityClassName, animationClassName)}
          key={index}
          ref={itemRef}
          style={{ left: `${posx}px` }}
        >
          {item}
        </li>
      )
    })
  }
  return (
    <ul className={`${listPrefixCls} ${fadeListPrefixCls}`} ref={ref}>
      {renderItems()}
    </ul>
  )
})
