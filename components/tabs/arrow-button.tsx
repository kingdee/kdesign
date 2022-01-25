import React, { useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import TabsContext from './context'
import Icon from '../icon'

export type DirectionType = 'left' | 'right'
export type ArrowClickEventHandler = (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>) => void
export interface ArrowButtonProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  direction?: DirectionType
  disabled?: boolean
  onClick?: ArrowClickEventHandler
}

const ArrowButton: React.FC<ArrowButtonProps> = (props) => {
  const context = useContext(TabsContext)
  const { getPrefixCls, prefixCls } = useContext(ConfigContext)
  const { className, direction, disabled, onClick } = props

  const arrowButtonPrefixCls = getPrefixCls!(prefixCls, 'arrow-button')

  const arrowButtonClasses = classNames(arrowButtonPrefixCls, className, {
    [`${arrowButtonPrefixCls}-dynamic`]: context?.type === 'dynamic',
    [`${arrowButtonPrefixCls}-${direction}`]: direction,
    [`${arrowButtonPrefixCls}-line`]: context?.type === 'line',
    [`${arrowButtonPrefixCls}-disabled`]: disabled,
  })

  return (
    <span className={arrowButtonClasses} onClick={onClick}>
      {direction === 'left' ? <Icon type="arrow-left" /> : <Icon type="arrow-right" />}
    </span>
  )
}

ArrowButton.displayName = 'ArrowButton'

export default ArrowButton
