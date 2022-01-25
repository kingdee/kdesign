import React from 'react'
import classNames from 'classnames'

type ItemType = {
  key: string
  item: React.ReactNode
}
interface displayListProps {
  parentPrefixCls: string
  items: ItemType[]
  currentIndex: number
}
export const DisplayList = React.forwardRef((props: displayListProps, ref: any) => {
  const { items, parentPrefixCls, currentIndex } = props
  const itemRef = React.useRef<HTMLElement>(null)
  const displayListPrefixCls = `${parentPrefixCls}-displaylist`
  const renderItems = () => {
    return items.map((item, index) => {
      const opacityClassName =
        index === currentIndex ? `${displayListPrefixCls}-item-not-hidden` : `${displayListPrefixCls}-item-hidden`
      return (
        <li className={classNames(`${displayListPrefixCls}-item`, opacityClassName)} key={index} ref={itemRef as any}>
          {item}
        </li>
      )
    })
  }
  return (
    <ul className={displayListPrefixCls} ref={ref as any}>
      {renderItems()}
    </ul>
  )
})
