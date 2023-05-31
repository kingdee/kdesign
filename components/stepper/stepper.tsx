import React, { FunctionComponentElement, useContext, useRef, useCallback, useState } from 'react'
import classNames from 'classnames'
import Big from 'big.js'
import InputNumber, { InputNumberProps } from '../input-number'
import Icon from '../icon'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import devWarning from '../_utils/devwarning'
import { tuple } from '../_utils/type'
import { omit } from '../_utils/omit'
import { useMergedState } from '../_utils/hooks'
import { isExp } from '../_utils/numberUtil'

Big.PE = 40
Big.NE = -40

export const StepTypes = tuple('embed', 'base')
export type StepType = typeof StepTypes[number]
export interface StepperProps extends InputNumberProps {
  type?: StepType
  step?: number
  stepBtnClassName?: string
}

const InternalStepper = (props: StepperProps, ref: unknown): FunctionComponentElement<StepperProps> => {
  const { compDefaultProps: userDefaultProps, getPrefixCls, prefixCls } = useContext(ConfigContext)
  const inputNumberProps = getCompProps('Stepper', userDefaultProps, props)
  const {
    prefixCls: customPrefixcls,
    onChange,
    step,
    type,
    stepBtnClassName,
    max,
    min,
    disabled,
    value: propsValue,
    defaultValue,
  } = inputNumberProps
  const inputPrefixCls = getPrefixCls!(prefixCls, 'inputNumber', customPrefixcls)

  devWarning(typeof step !== 'number', 'stepper', `step必须为一个数值`)

  const thisInputNumberRef = useRef<any>()
  const stepperrref = useRef<any>()
  const inputNumberRef = (ref as any) || thisInputNumberRef
  const stepMouseDownDelayTimer = useRef<any>(null)
  const stepMouseDownIntervalTimer = useRef<any>(null)

  const [showMinusdisabled, setMinusdisabled] = useState(false)
  const [showPlusdisabled, setPlusdisabled] = useState(false)
  const [value, setValue] = useMergedState(undefined, {
    value: propsValue,
    defaultValue,
  })

  // class
  const getStepBtnClassNames = (stepType: StepType, btnType?: 'decrease' | 'increase', isDisabled = false): string => {
    return classNames({
      [`${inputPrefixCls}-${stepType}Step`]: true,
      [`${inputPrefixCls}-${stepType}Step-disabled`]: isDisabled,
      [`${inputPrefixCls}-${stepType}Step-${btnType}`]: btnType,
      [`${inputPrefixCls}-${stepType}Step-small`]: inputNumberProps.size === 'small',
      [`${inputPrefixCls}-${stepType}Step-middle`]: inputNumberProps.size === 'middle',
      [`${inputPrefixCls}-${stepType}Step-large`]: inputNumberProps.size === 'large',
      [stepBtnClassName]: stepType === 'base' && stepBtnClassName,
    })
  }

  const getStepPrefix = (): React.ReactNode => {
    if (type === 'embed') {
      return null
    }
    const decreaseClassName = getStepBtnClassNames('base', 'decrease', showPlusdisabled || disabled)

    return (
      <span
        className={decreaseClassName}
        onMouseDown={() => {
          if (disabled) return
          handleStepMouseDown('minus')
        }}
      >
        <Icon className={`${inputPrefixCls}-icon`} type="reduce" />
      </span>
    )
  }

  const getStepSuffix = (): React.ReactNode => {
    const increaseClassName = getStepBtnClassNames('base', 'increase', showMinusdisabled || disabled)
    return type === 'embed' ? (
      getEmbedStepView()
    ) : (
      <span
        className={increaseClassName}
        onMouseDown={() => {
          if (disabled) return
          handleStepMouseDown('plus')
        }}
      >
        <Icon className={`${inputPrefixCls}-icon`} type="add" />
      </span>
    )
  }

  const isLegal = (value: any) => {
    const reg = /^[0-9]*\.?[0-9]+$/
    return reg?.test(value)
  }

  type StepBtnType = 'plus' | 'minus'
  const handleStepChang = (type: StepBtnType) => {
    const stepNum = parseFloat(step)
    if (typeof stepNum !== 'number') {
      return false
    }
    const startingNumber = isExp(stepperrref.current.value)
      ? Big(stepperrref.current.value).valueOf()
      : stepperrref.current.value || inputNumberProps.min || 0
    const currentValue = new Big(startingNumber)[type](stepNum)
    const calculationResults = currentValue.valueOf()
    const legalNumber = stepperrref.current.verifiValue(calculationResults)
    if (legalNumber === false) {
      return false
    }
    const nextPlus = new Big(calculationResults).plus(stepNum)
    const nextMinus = new Big(calculationResults).minus(stepNum)
    if (isLegal(max)) {
      const maxBig = new Big(max)
      if (nextPlus.cmp(maxBig) === 1) {
        setMinusdisabled(true)
      } else {
        setMinusdisabled(false)
      }
      if (currentValue.cmp(maxBig) === 1) {
        return false
      }
    } else {
      setMinusdisabled(false)
    }
    if (isLegal(min)) {
      const minBig = new Big(min)
      if (minBig.cmp(nextMinus) === 1) {
        setPlusdisabled(true)
      } else {
        setPlusdisabled(false)
      }
      if (minBig.cmp(currentValue) === 1) {
        return false
      }
    } else {
      setPlusdisabled(false)
    }
    props?.value === undefined && setValue(legalNumber)
    onChange && onChange({ target: { value: legalNumber } })
  }

  const setpLongPress = (type: StepBtnType) => {
    stepMouseDownIntervalTimer.current = setInterval(() => {
      handleStepChang(type)
    }, 300)
  }

  const handleStepMouseDown = (type: StepBtnType) => {
    handleStepChang(type)
    stepMouseDownDelayTimer.current = setTimeout(() => {
      setpLongPress(type)
    }, 300)
    document.addEventListener('mouseup', clearAllTimer, true)
    return false
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = parseFloat(event.target.value)
    if (
      String(value).length &&
      event.target.value?.length >= String(value).length &&
      event.target.value !== '' &&
      props?.value !== undefined &&
      ((max && max < number) || (min && min > number))
    ) {
      return
    }
    props?.value === undefined && setValue(event.target.value)
    props?.value === undefined && stepperrref.current.setValue(event.target.value)
    onChange && onChange(event)
  }

  const clearAllTimer = useCallback(() => {
    stepMouseDownDelayTimer.current && clearTimeout(stepMouseDownDelayTimer.current)
    stepMouseDownIntervalTimer.current && clearInterval(stepMouseDownIntervalTimer.current)
    document.removeEventListener('mouseup', clearAllTimer)
    return false
  }, [stepMouseDownDelayTimer, stepMouseDownIntervalTimer])

  const getEmbedStepView = (): React.ReactNode => {
    const embedStepClassName = getStepBtnClassNames('embed')
    const plusClassName = classNames(`${inputPrefixCls}-embedStep-plus`, {
      [stepBtnClassName]: stepBtnClassName,
      [`${inputPrefixCls}-embedStep-disabled`]: showMinusdisabled || disabled,
    })
    const minusClassName = classNames(`${inputPrefixCls}-embedStep-minus`, {
      [stepBtnClassName]: stepBtnClassName,
      [`${inputPrefixCls}-embedStep-disabled`]: showPlusdisabled || disabled,
    })
    return (
      <span className={embedStepClassName}>
        <span
          className={plusClassName}
          onMouseDown={() => {
            if (disabled) return
            handleStepMouseDown('plus')
          }}
        >
          <Icon className={`${inputPrefixCls}-icon`} type="arrow-up" />
        </span>
        <span
          className={minusClassName}
          onMouseDown={() => {
            if (disabled) return
            handleStepMouseDown('minus')
          }}
        >
          <Icon className={`${inputPrefixCls}-icon`} type="arrow-down" />
        </span>
      </span>
    )
  }

  return (
    <InputNumber
      {...omit(inputNumberProps, ['step', 'type', 'stepBtnClassName', 'value', 'defaultValue'])}
      ref={inputNumberRef}
      className={`${inputPrefixCls}-stepper`}
      stepperrref={stepperrref}
      value={value}
      prefix={getStepPrefix()}
      suffix={getStepSuffix()}
      onChange={handleChange}
    />
  )
}
const Stepper = React.forwardRef<unknown, StepperProps>(InternalStepper)
Stepper.displayName = 'Stepper'
export default Stepper
