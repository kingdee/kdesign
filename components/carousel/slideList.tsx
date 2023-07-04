import classNames from 'classnames'
import React from 'react'

type ItemType = {
  key: string
  item: React.ReactNode
}
export interface SlideListProps {
  parentPrefixCls: string
  items: ItemType[]
  currentIndex: number
}
export const SlideList = React.forwardRef((props: SlideListProps, ref: unknown) => {
  const { items, parentPrefixCls, currentIndex } = props
  const slideListPrefixCls = `${parentPrefixCls}-list-slide`
  const listPrefixCls = `${parentPrefixCls}-list`
  const renderItems = () => {
    const _items = items.slice(-1).concat(items, items.slice(0, 1)) // 首位分别添加一项
    return _items.map((item, index) => {
      return (
        <li
          className={classNames(`${listPrefixCls}-item`, {
            [`${listPrefixCls}-item-active`]: currentIndex === index - 1,
          })}
          key={index}
        >
          {item}
        </li>
      )
    })
  }
  return (
    <ul className={`${listPrefixCls} ${slideListPrefixCls}`} ref={ref as any}>
      {renderItems()}
    </ul>
  )
})
