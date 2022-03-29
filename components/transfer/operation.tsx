import React from 'react'
import Button from '../button'
import Icon from '../icon'

export interface TransferOperationProps {
  className?: string
  leftArrowText?: string
  rightArrowText?: string
  moveToLeft?: React.MouseEventHandler<HTMLButtonElement>
  moveToRight?: React.MouseEventHandler<HTMLButtonElement>
  leftActive?: boolean
  rightActive?: boolean
  style?: React.CSSProperties
  disabled?: boolean
  direction?: 'ltr' | 'rtl'
  oneWay?: boolean
}

const Operation = ({
  disabled,
  moveToLeft,
  moveToRight,
  leftArrowText = '',
  rightArrowText = '',
  leftActive,
  rightActive,
  className,
  style,
  direction,
  oneWay,
}: TransferOperationProps) => (
  <div className={className} style={style}>
    <Button
      type={disabled || !rightActive ? 'ghost' : 'primary'}
      size="small"
      disabled={disabled || !rightActive}
      onClick={moveToRight}
      icon={direction !== 'rtl' ? <Icon type="arrow-right" /> : <Icon type="arrow-left" />}
    >
      {rightArrowText}
    </Button>
    {!oneWay && (
      <Button
        type={disabled || !leftActive ? 'ghost' : 'primary'}
        size="small"
        disabled={disabled || !leftActive}
        onClick={moveToLeft}
        icon={direction !== 'rtl' ? <Icon type="arrow-left" /> : <Icon type="arrow-right" />}
      >
        {leftArrowText}
      </Button>
    )}
  </div>
)

export default Operation
