import React, { useContext, cloneElement, ReactElement } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import devWarning from '../_utils/devwarning'
import { toArray } from '../_utils/react-children'
import { Icon } from '../index'
import { Directions, Direction, Statuses, Status, LabelPlacements, LabelPlacement, Icons } from './interface'
export interface StepsProps {
  direction?: Direction
  initial?: number
  current?: number
  icons?: Icons
  status?: Status
  className?: string
  style?: React.CSSProperties
  labelPlacement?: LabelPlacement
  onChange?: (current: number) => void
  canClickCurrentStep?: boolean
}

const Steps: React.FC<StepsProps> = (props) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const stepsProps = getCompProps('Steps', userDefaultProps, props)
  const {
    direction,
    initial,
    current = 0,
    status = 'process',
    labelPlacement,
    prefixCls: customPrefixcls,
    className,
    style = {},
    onChange,
    children,
    icons,
    canClickCurrentStep,
    ...others
  } = stepsProps
  devWarning(Directions.indexOf(direction) === -1, 'steps', `cannot found steps direction '${direction}'`)
  devWarning(Statuses.indexOf(status) === -1, 'steps', `cannot found steps status '${status}'`)
  devWarning(
    LabelPlacements.indexOf(labelPlacement) === -1,
    'steps',
    `cannot found steps labelPlacement '${labelPlacement}'`,
  )
  const stepsPrefixCls = getPrefixCls!(prefixCls, 'steps', customPrefixcls) // 按钮样式前缀

  const stepsClassName = classNames(stepsPrefixCls, `${stepsPrefixCls}-${direction}`, className, {
    [`${stepsPrefixCls}-leftLable`]: labelPlacement === 'left',
    [`${stepsPrefixCls}-rightLable`]: labelPlacement === 'right',
    [`${stepsPrefixCls}-bottomLable`]: labelPlacement === 'bottom',
    [`${stepsPrefixCls}-topLable`]: labelPlacement === 'top',
  })

  const onStepClick = (next: number) => {
    if (canClickCurrentStep || (onChange && current !== next)) {
      onChange(next)
    }
  }

  const getIcons = () => {
    const actualIcons: Icons = {}
    actualIcons.finish = (icons && icons.finish) || <Icon type="right-bold" className={`${stepsPrefixCls}-iconSize`} />
    actualIcons.error = (icons && icons.error) || <Icon type="exclamatory" className={`${stepsPrefixCls}-iconSize`} />
    return actualIcons
  }

  const stepIcons = getIcons()

  return (
    <div className={stepsClassName} style={style} {...others}>
      {toArray(children).map((child: ReactElement, index: number) => {
        if (!child) return null
        const stepNumber = initial + index
        const childProps = {
          stepNumber: `${stepNumber + 1}`,
          stepIndex: stepNumber,
          key: stepNumber,
          prefixCls: stepsPrefixCls,
          icons: stepIcons,
          onStepClick: onChange && onStepClick,
          current,
          ...child.props,
        }
        if (!child.props.status) {
          if (stepNumber === current) {
            childProps.status = status
          } else if (stepNumber < current) {
            childProps.status = 'finish'
          } else {
            childProps.status = 'wait'
          }
        }
        return cloneElement(child, childProps)
      })}
    </div>
  )
}

Steps.displayName = 'Steps'
export default Steps
