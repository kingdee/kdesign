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
  htmlFor?: string
  prefixCls?: string // 控件前置类名
  required?: boolean // 必填，不设置的话根据校验规则生成
  rules?: Rule[] // 校验规则
  validateTrigger?: string | string[] // 字段校验的时机
  wrapperWidth?: string | number
  valuePropName?: string
  extra?: React.ReactNode
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

export const INNER_VALUE_PROPS_LIST = [
  { name: 'Radio', propName: 'checked' },
  { name: 'Checkbox', propName: 'checked' },
  { name: 'Switch', propName: 'checked' },
  { name: 'Upload', propName: 'fileList' },
  { name: 'Transfer', propName: 'targetKeys' },
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
  const { registerField, dispatch, setDefaultValues, deleteField } = getInternalHooks(INTERNAL_HOOK_KEY)!

  const {
    name,
    htmlFor: customizeHtmlFor,
    children,
    className,
    disabled,
    prefixCls: customizePrefixcls,
    hidden,
    label,
    labelWidth,
    labelAlign,
    required,
    rules,
    wrapperWidth,
    validateTrigger,
    defaultValue,
    valuePropName,
    extra,
  } = props

  const htmlFor = customizeHtmlFor || (name ? `form_${name}_${(Math.random() * 100).toFixed(0)}` : undefined)
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

  const mergedRequired =
    required ||
    rules?.some((rule) => {
      if (rule && typeof rule === 'object' && rule.required) {
        return true
      }
      if (typeof rule === 'function') {
        const ruleEntity = rule(fieldContext)
        return ruleEntity && ruleEntity.required
      }
      return false
    })

  const mergeRule = () => {
    let mergeRules = Array.isArray(rules) ? [...rules] : []

    if (!mergeRules.some((rule) => Object.prototype.hasOwnProperty.call(rule, 'required')) && required) {
      mergeRules.push({ required: true, message: `${local && local.requiredMessage}${label}` })
    }
    if (mergeRules.length) {
      mergeRules = mergeRules.map((r) => {
        if (typeof r === 'function') {
          return r(fieldContext)
        }
        return r
      })
    }

    return mergeRules
  }

  const item = {
    onStoreChange: onStoreChange,
    meta: {
      rules: mergeRule(),
      name,
      trigger: validateTrigger,
    },
  }

  const itemRef = React.useRef(item)
  itemRef.current = item

  useEffect(() => {
    registerField(name, itemRef)
    if (defaultValue !== undefined) {
      setDefaultValues({ [name]: defaultValue })
    }
  }, [name, registerField])

  useEffect(() => {
    return () => {
      deleteField(name)
    }
  }, [])

  const formPrefixCls = getPrefixCls?.(prefixCls, 'form', customizePrefixcls)
  const formItemClassName = classnames(
    {
      [`${formPrefixCls}`]: true,
      [`${formPrefixCls}-field`]: true,
      [`${formPrefixCls}-field-hidden`]: hidden,
      [`${formPrefixCls}-field-vertical`]: vertical,
      [`${formPrefixCls}-field-extra`]: extra,
    },
    className,
  )

  const value = getFieldValue(name)
  const validateMessage = getFieldError(name)
  const getInputValueFormProp = (evt: any, payload: any = undefined) => {
    let inputValue

    if (innerDisplayName === 'RadioGroup' && payload) {
      inputValue = payload[1]
    } else if (
      evt &&
      Object.prototype.hasOwnProperty.call(evt, 'target') &&
      FormEventValuePropNames.includes(innerValuePropName)
    ) {
      inputValue = evt.target?.[innerValuePropName as FormEventValuePropNamesType]
    } else {
      inputValue = evt
    }

    return inputValue
  }

  const handleValueValidate = React.useCallback(() => {
    dispatch({ type: 'validateField', namePath: name })
  }, [name])

  const mergeProps = (fa: { [x: string]: any }, ch: React.ReactElement) => {
    if (!ch) {
      return {}
    }

    const { ...faRest } = fa
    const {
      onChange: chChange,
      [innerValuePropName]: chValue,
      disabled: chDisabled,
      defaultValue: chDefaultValue,
    } = ch.props

    const onChange = (...evt: any) => {
      const iv = getInputValueFormProp(evt[0], evt)
      if (chValue === undefined) {
        setFieldValue(iv)
      }

      dispatch({ type: 'updateValue', namePath: name, value: iv })

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

    const mergeResult: any = {
      ...faRest,
      onChange,
      defaultValue,
      [innerValuePropName]: fieldValue,
      disabled: chDisabled !== undefined ? chDisabled : disabled !== undefined ? disabled : formDisabled,
    }

    const mergeEventArray = []

    if (validateTrigger) {
      if (Array.isArray(validateTrigger)) {
        mergeEventArray.push(...validateTrigger.filter((v) => v !== DEFAULT_TRIGGER))
      } else if (validateTrigger !== DEFAULT_TRIGGER) {
        mergeEventArray.push(validateTrigger)
      }
    }

    mergeEventArray.forEach((eventName) => {
      mergeResult[eventName] = () => {
        if (fa?.[eventName] && typeof fa[eventName] === 'function') {
          fa[eventName]()
        }
        if (ch.props?.[eventName] && typeof ch.props[eventName] === 'function') {
          ch.props[eventName]()
        }
      }
    })

    return mergeResult
  }

  return (
    <div className={formItemClassName}>
      <FieldLabel
        htmlFor={htmlFor}
        value={label}
        width={labelWidth}
        textAlign={labelAlign}
        requiredMark={mergedRequired}
      />
      <FieldWrapper width={wrapperWidth} validateMessage={validateMessage} extra={extra}>
        {childrenArray.map((child: React.ReactElement, index) => {
          const keys = mergeProps(
            {
              ...generateEventHandler(handleValueValidate, validateTrigger),
              key: index,
              status: typeof validateMessage !== 'undefined' ? 'error' : undefined,
              id: customizeHtmlFor ? undefined : htmlFor,
            },
            child,
          )
          return child ? React.cloneElement(child, keys) : child
        })}
      </FieldWrapper>
    </div>
  )
}

export default Field
