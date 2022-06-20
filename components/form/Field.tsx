import React, { EventHandler, useContext, useEffect, useState } from 'react'
import get from 'lodash/get'
import classnames from 'classnames'
import { ConfigContext } from '../config-provider'
import FieldLabel from './FieldLabel'
import FieldWrapper from './FieldWrapper'
import { NamePath, LabelAlign, Rule, NotifySource, Stores } from './interface'
import useForceUpdate from './hooks/useForceUpdate'
import devwarning from '../_utils/devwarning'
import { toArray } from '../_utils/react-children'
import FieldContext from './FieldContext'
import { INTERNAL_HOOK_KEY } from './hooks/useForm'

const DEFAULT_TRIGGER = 'onChange'

export interface FormItemProps {
  children?: React.ReactNode // Children
  className?: string // 自定义类类名
  defaultValue?: any // 默认值
  disabled?: boolean // 禁用
  hidden?: boolean // 是否隐藏
  label?: string | number
  labelWidth?: string | number
  labelAlign?: LabelAlign
  name: NamePath // 名
  prefixCls?: string // 控件前置类名
  required?: boolean // 必填，不设置的话根据校验规则生成
  rules?: Rule[] // 校验规则
  validateTrigger?: string | string[] // 字段校验的时机
  wrapperWidth?: string | number
  valuePropName?: string
}

const FormEventValuePropNames = ['value', 'checked']
type FormEventValuePropNamesType = 'value' | 'checked'

const generateEventHandler = (handler: EventHandler<any>, validateTrigger?: string | string[]) => {
  const eventHandler: { [key: string]: EventHandler<any> } = {}
  if (validateTrigger) {
    if (typeof validateTrigger === 'string' && validateTrigger !== 'onChange') {
      eventHandler[validateTrigger] = handler
    } else if (Array.isArray(validateTrigger)) {
      validateTrigger.forEach((evt) => {
        if (evt !== 'onChange') {
          eventHandler[evt] = handler
        }
      })
    }
  }
  return eventHandler
}

const INNER_VALUE_PROPS_LIST = [
  { name: 'Radio', propName: 'checked' },
  { name: 'Checkbox', propName: 'checked' },
  { name: 'Switch', propName: 'checked' },
  { name: 'Upload', propName: 'fileList' },
  { name: 'Transfer', propName: 'targetKey' },
  { name: 'RangePicker', propName: 'ranges' },
]

const Field: React.FC<FormItemProps> = (props) => {
  devwarning(!React.isValidElement(props.children), 'Form.Item', 'Children of Form.Item is not a valid element')
  devwarning(!props.name, 'Form.Item', 'Form.Item must have a name')

  const { getPrefixCls, prefixCls } = useContext(ConfigContext)
  const fieldContext = React.useContext(FieldContext)
  const forceUpdate = useForceUpdate()
  const [fieldValue, setFieldValue] = useState<any>(undefined)

  const {
    getFieldValue,
    getFieldError,
    getInternalHooks,
    vertical,
    getDefaultValue,
    local,
    disabled: formDisabled,
  } = fieldContext
  const { registerField, dispatch, setDefaultValues } = getInternalHooks(INTERNAL_HOOK_KEY)!

  const {
    name,
    children,
    className,
    disabled,
    prefixCls: customizePrefixcls,
    hidden,
    label,
    labelWidth,
    labelAlign,
    required,
    rules = [],
    wrapperWidth,
    validateTrigger,
    defaultValue,
    valuePropName,
  } = props

  let childrenNode: any = null
  let innerValuePropName = 'value'
  const childrenArray = toArray(children)
  if (childrenArray.length) {
    devwarning(childrenArray.length > 1, 'Form.Item', 'Form.Item must have only child')
    childrenNode = childrenArray[0] as React.ReactElement
  }
  const innerDisplayName = childrenNode?.type?.displayName
  if (valuePropName !== undefined) {
    innerValuePropName = valuePropName
  } else if (innerDisplayName) {
    const filter = INNER_VALUE_PROPS_LIST.filter((item) => innerDisplayName === item.name)
    if (filter.length) {
      innerValuePropName = filter[0].propName
    }
  }

  const onStoreChange = (stores: Stores, _namePathList: NamePath[] | null, source: NotifySource) => {
    const { prev, curr } = stores
    const prevValue = get(prev, name)
    const currValue = get(curr, name)
    const isValueUpdated = prevValue !== currValue && source === 'updateValue'
    const isExternalAction = source === 'externalUpdateValue'
    const isValidatedFinish = source === 'validateFinish'
    const isReset = source === 'reset'
    if (isValueUpdated || isExternalAction || isValidatedFinish || isReset) {
      forceUpdate()
    }
  }

  const rulesRequired = rules.some((rule) => {
    if (rule && typeof rule === 'object' && rule.required) {
      return true
    }
    if (typeof rule === 'function') {
      const ruleEntity = rule(fieldContext)
      return ruleEntity && ruleEntity.required
    }
    return false
  })

  const mergedRequired = required || !!rulesRequired
  if (
    Array.isArray(rules) &&
    !rules.some((rule) => Object.prototype.hasOwnProperty.call(rule, 'required')) &&
    required
  ) {
    rules.push({ required: true, message: `${local && local.requiredMessage}${label}` })
  }

  let mergeRules = rules
  if (mergeRules.length) {
    mergeRules = rules.map((r) => {
      if (typeof r === 'function') {
        return r(fieldContext)
      }
      return r
    })
  }

  const itemRef = React.useRef({
    onStoreChange: onStoreChange,
    meta: {
      rules: mergeRules,
      name,
      trigger: validateTrigger,
    },
  })

  useEffect(() => {
    registerField(name, itemRef.current)
    if (defaultValue !== undefined) {
      setDefaultValues({ [name]: defaultValue })
    }
  }, [name, registerField])

  const formPrefixCls = getPrefixCls?.(prefixCls, 'form', customizePrefixcls)
  const formItemClassName = classnames(
    {
      [`${formPrefixCls}`]: true,
      [`${formPrefixCls}-field`]: true,
      [`${formPrefixCls}-field-hidden`]: hidden,
      [`${formPrefixCls}-field-vertical`]: vertical,
    },
    className,
  )

  const value = getFieldValue(name)
  const validateMessage = getFieldError(name)
  const getInputValueFormProp = (evt: any) => {
    let inputValue
    if (Object.prototype.hasOwnProperty.call(evt, 'target') && FormEventValuePropNames.includes(innerValuePropName)) {
      inputValue = evt.target?.[innerValuePropName as FormEventValuePropNamesType]
    } else {
      inputValue = evt
    }
    return inputValue
  }
  const handleValueChange = React.useCallback(
    (evt: any) => {
      const inputValue = getInputValueFormProp(evt)
      dispatch({ type: 'updateValue', namePath: name, value: inputValue })
    },
    [name],
  )

  const handleValueValidate = React.useCallback(() => {
    dispatch({ type: 'validateField', namePath: name })
  }, [name])

  const trigger = {
    [DEFAULT_TRIGGER]: handleValueChange,
    ...generateEventHandler(handleValueValidate, validateTrigger),
  }

  const mergeProps = (fa: { [x: string]: any }, ch: React.ReactElement) => {
    if (!ch) {
      return {}
    }
    const { onChange: faChange, disabled: faDisabled, ...rest } = fa
    const {
      onChange: chChange,
      [innerValuePropName]: chValue,
      disabled: chDisabled,
      defaultValue: chDefaultValue,
    } = ch.props

    const onChange = (...evt: any) => {
      if (chValue === undefined) {
        setFieldValue(getInputValueFormProp(evt[0]))
      }
      if (typeof faChange === 'function') {
        faChange(...evt)
      }
      if (typeof chChange === 'function') {
        chChange(...evt)
      }
    }

    const mergeValue = chValue === undefined ? value : chValue
    if (mergeValue !== fieldValue) {
      setFieldValue(mergeValue)
    }
    if (getDefaultValue(name) === undefined && (chDefaultValue !== undefined || chValue !== undefined)) {
      setDefaultValues({ [name]: chValue !== undefined ? chValue : chDefaultValue })
      forceUpdate()
    }

    return {
      ...rest,
      onChange,
      defaultValue,
      [innerValuePropName]: fieldValue,
      disabled: chDisabled !== undefined ? chDisabled : faDisabled !== undefined ? faDisabled : formDisabled,
    }
  }

  return (
    <div className={formItemClassName}>
      <FieldLabel value={label} width={labelWidth} textAlign={labelAlign} requiredMark={mergedRequired} />
      <FieldWrapper width={wrapperWidth} validateMessage={validateMessage}>
        {childrenArray.map((child: React.ReactElement, index) => {
          const keys = mergeProps({ disabled, [innerValuePropName]: value, ...trigger, key: index }, child)
          return child ? React.cloneElement(child, keys) : child
        })}
      </FieldWrapper>
    </div>
  )
}

export default Field
