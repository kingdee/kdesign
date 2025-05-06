import React, { useContext } from 'react'
import classNames from 'classnames'

import { Status, Icons } from './interface'
import ConfigContext from '../config-provider/ConfigContext'

export interface StepProps {
  style?: React.CSSProperties
  stepNumber?: number
  stepIndex?: number
  prefixCls?: string
  status?: Status
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  icons?: Icons
  onClick?: React.MouseEventHandler<HTMLElement>
  onStepClick?: (index: number) => void
  className?: string
  current?: number
}

function isString(str: any): str is string {
  return typeof str === 'string'
}
const Step: React.FC<StepProps> = (props) => {
  const { direction } = useContext(ConfigContext)
  const {
    stepNumber = 1,
    stepIndex = 0,
    prefixCls,
    status,
    className,
    title = '',
    description,
    icon,
    icons,
    current = 0,
    onClick,
    style,
    onStepClick,
    ...others
  } = props

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onClick && onClick(e)
    onStepClick && onStepClick(stepIndex || 0)
  }

  const stepClassName = classNames(`${prefixCls}-item`, `${prefixCls}-item-${status}`, className, {
    [`${prefixCls}-item-clickable`]: onClick || onStepClick,
  })

  const renderIconNode = () => {
    let iconNode
    if (icon && !isString(icon)) {
      iconNode = icon
    } else if (icons && icons.finish && !isString(icons.finish) && status === 'finish') {
      iconNode = icons.finish
    } else if (icons && icons.wait && !isString(icons.wait) && status === 'wait') {
      iconNode = icons.wait
    } else if (icons && icons.error && !isString(icons.error) && status === 'error') {
      iconNode = icons.error
    } else if (icons && icons.process && !isString(icons.process) && status === 'process') {
      iconNode = icons.process
    } else {
      iconNode = stepNumber
    }
    return <span className={`${prefixCls}-icon`}>{iconNode}</span>
  }

  const iconContainerClassName = classNames(`${prefixCls}-item-iconContainer`, {
    [`${prefixCls}-item-iconContainer-finish`]: current > stepIndex,
  })

  return (
    <div {...others} className={stepClassName} style={style} onClick={handleClick}>
      <div onClick={onClick} className={`${prefixCls}-item-container`}>
        <div className={iconContainerClassName}>
          <div className={`${prefixCls}-item-iconContainer-icon`}>{renderIconNode()}</div>
        </div>
        <div className={`${prefixCls}-item-content`}>
          <div
            className={`${prefixCls}-item-title`}
            title={isString(title) ? title : ''}
            dir={direction === 'rtl' ? 'auto' : undefined}
          >
            {title}
          </div>
          {description && (
            <div
              className={`${prefixCls}-item-description`}
              title={isString(description) ? description : ''}
              dir={direction === 'rtl' ? 'auto' : undefined}
            >
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

Step.displayName = 'Step'
export default Step
