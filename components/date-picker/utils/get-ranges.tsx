import React from 'react'
import classnames from 'classnames'
import { Components, RangeList, InnerLocale } from '../interface'

export interface RangesProps {
  prefixCls: string
  rangeList?: RangeList
  components?: Components
  needConfirmButton: boolean
  onNow?: null | (() => void) | false
  onOk?: null | (() => void) | false
  okDisabled?: boolean
  showNow?: boolean
  locale: InnerLocale
}

export default function getRanges({
  prefixCls,
  rangeList = [],
  components = {},
  needConfirmButton,
  onNow,
  onOk,
  okDisabled,
  showNow,
  locale,
}: RangesProps) {
  let presetNode: React.ReactNode
  let okNode: React.ReactNode

  if (rangeList.length) {
    const Item = (components.rangeItem || 'span') as any

    presetNode = (
      <>
        {rangeList.map(({ label, onClick, onMouseEnter, onMouseLeave }) => (
          <li key={label} className={`${prefixCls}-preset`}>
            <Item onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              {label}
            </Item>
          </li>
        ))}
      </>
    )
  }

  if (needConfirmButton) {
    const Button = (components.button || 'div') as any

    if (onNow && !presetNode && showNow !== false) {
      presetNode = (
        <li className={`${prefixCls}-now`}>
          <span className={`${prefixCls}-now-btn`} onClick={onNow}>
            {locale.now}
          </span>
        </li>
      )
    }

    okNode = needConfirmButton && (
      <li className={`${prefixCls}-ok`}>
        <Button onClick={onOk} className={classnames(`${prefixCls}-ok-btn`, okDisabled && `${prefixCls}-btn-disabled`)}>
          {locale.confrim}
        </Button>
      </li>
    )
  }

  if (!presetNode && !okNode) {
    return null
  }

  return (
    <ul className={`${prefixCls}-btns`}>
      {presetNode}
      {okNode}
    </ul>
  )
}
