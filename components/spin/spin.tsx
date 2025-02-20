import React, { useContext, useRef } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { tuple } from '../_utils/type'
import { getCompProps } from '../_utils'
import devWarning from '../_utils/devwarning'

export const SpinTypes = tuple('page', 'container', 'component')
export type SpinType = typeof SpinTypes[number]

export interface ISpinProps {
  children?: React.ReactNode
  className?: string
  indicator?: React.ReactNode
  spinning?: boolean
  tip?: string
  type?: SpinType
}

// remove this line and code Spin component here
const InteranalSpin = (props: ISpinProps, ref: unknown) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, direction } = useContext(ConfigContext)
  const spinProps = getCompProps('Spin', userDefaultProps, props)
  const {
    children,
    className,
    indicator,
    spinning,
    style,
    tip,
    type,
    prefixCls: customPrefixcls,
    ...others
  } = spinProps

  devWarning(SpinTypes.indexOf(type) === -1, 'spin', `cannot found spin type '${type}'`)

  const spinPrefixCls = getPrefixCls!(prefixCls, 'spin', customPrefixcls)
  const rtlCls = direction === 'rtl' ? `${spinPrefixCls}-rtl` : null
  const spinClasses = classNames(spinPrefixCls, rtlCls, className, {
    [`${spinPrefixCls}-${type}`]: type,
    [`${spinPrefixCls}-indicator-container`]: true,
    [`${spinPrefixCls}-has-children`]: children,
  })

  // ref
  const thisSpinRef = useRef<HTMLElement>()
  const spinRef = (ref as any) || thisSpinRef

  const handleIndicator = (indicator: React.ReactNode) => {
    if (indicator) {
      return indicator
    }
    switch (type) {
      case 'page':
        return (
          <div className={`${spinPrefixCls}-dot-spin`}>
            <i className={`${spinPrefixCls}-dot-item`}></i>
            <i className={`${spinPrefixCls}-dot-item`}></i>
            <i className={`${spinPrefixCls}-dot-item`}></i>
            <i className={`${spinPrefixCls}-dot-item`}></i>
          </div>
        )
      case 'container':
        return (
          <div className={`${spinPrefixCls}-dot-spin`}>
            <i className={`${spinPrefixCls}-dot-item`}></i>
            <i className={`${spinPrefixCls}-dot-item`}></i>
            <i className={`${spinPrefixCls}-dot-item`}></i>
            <i className={`${spinPrefixCls}-dot-item`}></i>
          </div>
        )
      case 'component':
        return (
          <div className={`${spinPrefixCls}-dot-spin`}>
            <i className={`${spinPrefixCls}-dot-item`}></i>
          </div>
        )
    }
  }

  const indicatorNode = handleIndicator(indicator)

  const hasChildrenStyle = children ? style : null
  const singleStyle = children ? null : style
  const hasChildrenRef = children ? spinRef : null
  const singleRef = children ? null : spinRef

  const spinNode = spinning ? (
    <div className={spinClasses} ref={singleRef} style={singleStyle} {...others}>
      {indicatorNode}
      {tip || ''}
    </div>
  ) : null

  const childrenParentClasses = classNames({
    [`${spinPrefixCls}-children-container`]: children && spinning,
  })

  const spinHasChildren = children ? (
    <div className={`${spinPrefixCls}-children-wrapper`} style={hasChildrenStyle} ref={hasChildrenRef}>
      {spinNode}
      <div className={childrenParentClasses}>{children}</div>
    </div>
  ) : (
    spinNode
  )

  return spinHasChildren
}

const Spin = React.forwardRef<unknown, ISpinProps>(InteranalSpin)
Spin.displayName = 'Spin'
export default Spin
