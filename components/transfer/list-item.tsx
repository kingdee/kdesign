import React from 'react'
import classNames from 'classnames'
import Icon from '../icon'
import { TransferItem } from './interface'
import Checkbox from '../checkbox'

type ListItemProps = {
  renderedText?: string | number
  renderedEl: React.ReactNode
  disabled?: boolean
  checked?: boolean
  prefixCls: string
  onClick: (item: TransferItem) => void
  onRemove: (item: TransferItem) => void
  item: TransferItem
  showRemove?: boolean
}

const ListItem: React.FC<ListItemProps> = (props: ListItemProps) => {
  const { renderedText, renderedEl, item, checked, disabled, prefixCls, onClick, showRemove, onRemove } = props

  const className = classNames({
    [`${prefixCls}-content-item`]: true,
    [`${prefixCls}-content-item-disabled`]: disabled || item.disabled,
    [`${prefixCls}-content-item-checked`]: checked,
  })

  let title: string | undefined
  if (typeof renderedText === 'string' || typeof renderedText === 'number') {
    title = String(renderedText)
  }

  const liProps: React.HTMLAttributes<HTMLLIElement> = { className, title }
  const labelNode = <span className={`${prefixCls}-content-item-text`}>{renderedEl}</span>

  if (showRemove) {
    return (
      <li {...liProps}>
        {labelNode}
        <span className={`${prefixCls}-content-item-remove`} onClick={() => onRemove && onRemove(item)}>
          <Icon type="close-solid" />
        </span>
      </li>
    )
  }

  // Default click to select
  liProps.onClick = (e: React.MouseEvent) => {
    if (disabled || item.disabled) return
    e.preventDefault()
    onClick(item)
  }
  return (
    <li {...liProps}>
      <Checkbox checked={checked} disabled={disabled || item.disabled} />
      {labelNode}
    </li>
  )
}

export default React.memo(ListItem)
