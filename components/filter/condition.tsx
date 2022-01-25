import * as React from 'react'
import classNames from 'classnames'

import { TOption, ICondition, IConditionProps } from './interface'

const ConditionFilter: React.FC<IConditionProps> = (props) => {
  const { value, prefixCls, conditions, FilterLangMsg, onConditionRemove, onConditionChange } = props

  const handleConditionFilter = (condition: ICondition, option: TOption) => {
    if (!option.component) {
      const conditionValue = value[condition.key] as string[]
      const optionValue = option.value as string
      const optionIndex = conditionValue?.indexOf(optionValue)

      const nextValue = Object.assign({}, value)
      delete nextValue.scheme
      const isSingleReSelect = !condition.multiple && conditionValue && conditionValue[0] === optionValue
      if (conditionValue && condition.multiple) {
        if (optionIndex > -1) {
          const isRequiredLastOptionReSelect =
            condition.required && conditionValue.length === 1 && conditionValue[0] === optionValue
          if (!isRequiredLastOptionReSelect) {
            conditionValue.length === 1
              ? delete nextValue[condition.key]
              : (nextValue[condition.key] as string[]).splice(optionIndex, 1)
          }
        } else {
          ;(nextValue[condition.key] as string[]).push(optionValue)
        }
      } else if (!isSingleReSelect) {
        nextValue[condition.key] = [optionValue]
      }
      onConditionChange && onConditionChange(nextValue, condition, option)
    }
  }

  return (
    <ul className={classNames(`${prefixCls}-body-conditions`, { active: props.tab === 'condition' })}>
      {conditions?.map((condition: ICondition) => {
        const conditionValue = value[condition.key] as string[]
        return (
          <li className={`${prefixCls}-body-condition`} key={condition.key}>
            <span className={`${prefixCls}-body-condition-label`}>{condition.label}:</span>
            <div className={`${prefixCls}-body-condition-options`}>
              {!condition.required && (
                <span
                  className={classNames(`${prefixCls}-body-condition-option`, {
                    active: !conditionValue,
                  })}
                  onClick={onConditionRemove.bind(null, condition.key)}
                >
                  {FilterLangMsg.unlimited}
                </span>
              )}
              {condition.options.map((option: TOption) =>
                option.component ? (
                  <React.Fragment key={option.label}>
                    <span
                      title={option.label}
                      className={classNames(`${prefixCls}-body-condition-option`, {
                        active: conditionValue?.some(
                          (filterValue: string) =>
                            !condition.options.find((option: TOption) => option.value === filterValue),
                        ),
                      })}
                    >
                      {option.label}
                    </span>
                    <span className={`${prefixCls}-body-condition-option-customer`}>{option.component}</span>
                  </React.Fragment>
                ) : (
                  <span
                    key={option.value}
                    title={option.label || option.value}
                    className={classNames(`${prefixCls}-body-condition-option`, {
                      active: conditionValue?.includes(option.value as string),
                    })}
                    onClick={handleConditionFilter.bind(null, condition, option)}
                  >
                    {option.label || option.value}
                  </span>
                ),
              )}
            </div>
            <div className={`${prefixCls}-body-condition-addition`}>{condition.addition}</div>
          </li>
        )
      })}
    </ul>
  )
}

export default ConditionFilter
