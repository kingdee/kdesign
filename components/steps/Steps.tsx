import React, { useContext, cloneElement, ReactElement, useEffect, useRef, useCallback, useMemo } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import devWarning from '../_utils/devwarning'
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
    style,
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
  const stepsPrefixCls = getPrefixCls!(prefixCls, 'steps', customPrefixcls)

  const stepsClassName = classNames(stepsPrefixCls, `${stepsPrefixCls}-${direction}`, className, {
    [`${stepsPrefixCls}-leftLable`]: labelPlacement === 'left',
    [`${stepsPrefixCls}-rightLable`]: labelPlacement === 'right',
    [`${stepsPrefixCls}-bottomLable`]: labelPlacement === 'bottom',
    [`${stepsPrefixCls}-topLable`]: labelPlacement === 'top',
  })

  const innerCurrentRef = useRef<number>(current)
  useEffect(() => {
    if (typeof current !== 'undefined') {
      innerCurrentRef.current = current
    }
  }, [current])

  const onStepClick = useCallback(
    (next: number) => {
      if (canClickCurrentStep || (onChange && innerCurrentRef.current !== next)) {
        onChange(next)
      }
    },
    [canClickCurrentStep, onChange],
  )

  const stepIcons = useMemo(() => {
    return {
      finish: (icons && icons.finish) || <Icon type="right-bold" className={`${stepsPrefixCls}-iconSize`} />,
      error: (icons && icons.error) || <Icon type="exclamatory" className={`${stepsPrefixCls}-iconSize`} />,
    }
  }, [icons, stepsPrefixCls])

  const renderStep = useMemo(() => {
    return React.Children.map(children, (child: ReactElement, index: number) => {
      if (!child) return null
      const stepNumber = initial + index
      const childProps = {
        stepNumber: `${stepNumber + 1}`,
        stepIndex: stepNumber,
        key: stepNumber,
        prefixCls: stepsPrefixCls,
        icons: stepIcons,
        onStepClick: onChange && onStepClick,
        finished: current > stepNumber,
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
    })
  }, [children, current, initial, onChange, onStepClick, status, stepIcons, stepsPrefixCls])

  return (
    <div className={stepsClassName} style={style} {...others}>
      {renderStep}
    </div>
  )
}

Steps.displayName = 'Steps'
export default Steps
