import React, { useContext } from 'react'
import classnames from 'classnames'

import Icon from '../../../icon'
import Context from '../../context'

export interface HeaderProps {
  children: React.ReactNode
  prevIcon?: React.ReactNode
  nextIcon?: React.ReactNode
  superPrevIcon?: React.ReactNode
  superNextIcon?: React.ReactNode
  className?: string
  onPrev?: () => void
  onNext?: () => void
  onSuperPrev?: () => void
  onSuperNext?: () => void
}

function Header(props: HeaderProps) {
  const context = useContext(Context)
  const { prefixCls, direction } = context
  const {
    className,
    children,
    prevIcon,
    nextIcon,
    superPrevIcon,
    superNextIcon,
    onPrev,
    onNext,
    onSuperPrev,
    onSuperNext,
  } = props

  const iconCls = classnames(`${prefixCls}-header-icon`)
  const textCls = classnames(`${prefixCls}-header-text`)

  return (
    <div className={className}>
      {onSuperPrev ? (
        <span className={iconCls} onClick={onSuperPrev}>
          {superPrevIcon || <Icon type={`double-arrow-${direction === 'rtl' ? 'right' : 'left'}`} />}
        </span>
      ) : (
        <span className={iconCls}></span>
      )}
      {onPrev ? (
        <span className={iconCls} onClick={onPrev}>
          {prevIcon || <Icon type={`arrow-${direction === 'rtl' ? 'right' : 'left'}`} />}
        </span>
      ) : (
        <span className={iconCls}></span>
      )}
      <span className={textCls}>{children}</span>
      {onNext ? (
        <span className={iconCls} onClick={onNext}>
          {nextIcon || <Icon type={`arrow-${direction === 'rtl' ? 'left' : 'right'}`} />}
        </span>
      ) : (
        <span className={iconCls}></span>
      )}
      {onSuperNext ? (
        <span className={iconCls} onClick={onSuperNext}>
          {superNextIcon || <Icon type={`double-arrow-${direction === 'rtl' ? 'left' : 'right'}`} />}
        </span>
      ) : (
        <span className={iconCls}></span>
      )}
    </div>
  )
}

export default Header
