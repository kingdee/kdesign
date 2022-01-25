import React from 'react'

type ItemType = {
  key: string
  item: React.ReactNode
}
export interface SlideListProps {
  parentPrefixCls: string
  items: ItemType[]
}
export const SlideList = React.forwardRef((props: SlideListProps, ref: unknown) => {
  const { items, parentPrefixCls } = props
  const slideListPrefixCls = `${parentPrefixCls}-slidelist`
  const renderItems = () => {
    const _items = items.slice(-1).concat(items, items.slice(0, 1)) // 首位分别添加一项
    return _items.map((item, index) => {
      return (
        <li className={`${slideListPrefixCls}-item`} key={index}>
          {item}
        </li>
      )
    })
  }
  return (
    <ul className={slideListPrefixCls} ref={ref as any}>
      {renderItems()}
    </ul>
  )
})
