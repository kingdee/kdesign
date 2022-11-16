import React from 'react'
import Schema from 'async-validator'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import merge from 'lodash/merge'
import set from 'lodash/set'
import {
  Callbacks,
  FieldError,
  FieldInstance,
  Fields,
  FormInstance,
  InternalHooks,
  NamePath,
  NotifySource,
  ReducerAction,
  Store,
  StoreValue,
} from '../interface'

import devwarning from '../../_utils/devwarning'

export const INTERNAL_HOOK_KEY = '__KD_INTERNAL_FORM_HOOK__'

class FormStore {
  private isMounted = false

  private defaultValues: Store = {}

  private store: Store = {}

  private fields: Fields = {}

  private errorMessages: FieldError = {}

  private callbacks: Callbacks = {}

  public getForm = (): FormInstance => ({
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    getDefaultValue: this.getDefaultValue,
    getFieldError: this.getFieldError,
    getFieldsError: this.getFieldsError,
    resetFields: this.resetFields,
    setFieldValue: this.setFieldValue,
    setFieldsValue: this.setFieldsValue,
    validateFields: this.validateFields,
    submit: this.submit,
    getInternalHooks: this.getInternalHooks,
  })

  private getInternalHooks = (key: string): InternalHooks | null => {
    if (key !== INTERNAL_HOOK_KEY) {
      devwarning(false, 'Form', '`getInternalHooks` is internal usage.')
      return null
    }

    this.isMounted = true
    return {
      dispatch: this.dispatch,
      setDefaultValues: this.setDefaultValues,
      setCallbacks: this.setCallbacks,
      registerField: this.registerField,
      deleteField: this.deleteField,
    }
  }

  private warningUnhooked = () => {
    !this.isMounted &&
      devwarning(
        false,
        'Form',
        'Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?',
      )
  }

  /**
   * Dispath. 用于 Field 触发数据变更
   * @param action
   */
  private dispatch = (action: ReducerAction) => {
    this.warningUnhooked()

    const { namePath } = action
    switch (action.type) {
      case 'updateValue':
        this.updateValue(namePath, action.value)
        break
      case 'validateField':
        this.validateFields([namePath])
        break
      default:
        break
    }
  }

  private setDefaultValues = (values: Store) => {
    this.warningUnhooked()

    if (!values) return
    const copyDefaultValues = cloneDeep(this.defaultValues)
    const copyValues = cloneDeep(values)
    this.defaultValues = { ...copyDefaultValues, ...copyValues }
    this.store = merge(this.store, values)
  }

  private getDefaultValue = (name: NamePath): StoreValue => {
    this.warningUnhooked()

    return get(this.defaultValues, name)
  }

  private getFieldValue = (name: NamePath): StoreValue => {
    this.warningUnhooked()

    return get(this.store, name)
  }

  private setFieldValue = (name: NamePath, value: StoreValue) => {
    this.warningUnhooked()

    this.setFieldsValue({ [name]: value })
  }

  private getFieldsValue = (namePathList?: NamePath[]) => {
    this.warningUnhooked()

    if (!namePathList) {
      return cloneDeep(this.store)
    }

    const fieldsValue: Store = {}
    namePathList.forEach((name) => {
      fieldsValue[name] = get(this.store, name)
    })
    return fieldsValue
  }

  private setFieldsValue = (store: Store) => {
    this.warningUnhooked()

    if (!store) return
    const prevStore = cloneDeep(this.store)
    this.store = merge(this.store, store)
    this.notifyObservers(prevStore, null, 'externalUpdateValue')
  }

  private getFieldError = (name: NamePath): string | undefined => {
    this.warningUnhooked()

    return get(this.errorMessages, name)
  }

  private getFieldsError = (namePathList?: NamePath[]): FieldError => {
    this.warningUnhooked()
    if (!namePathList) {
      return cloneDeep(this.errorMessages)
    }

    const result: FieldError = {}
    namePathList.forEach((name) => {
      result[name] = this.errorMessages[name]
    })
    return result
  }

  private getRules = (namePathList?: NamePath[]) => {
    this.warningUnhooked()

    let list = cloneDeep(namePathList)
    if (!list) {
      list = Object.keys(this.fields)
    }
    const rules: any = {}
    list.forEach((name) => {
      const { current } = this.fields[name]
      if (current?.meta?.rules) {
        rules[name] = cloneDeep(current?.meta?.rules)
      }
    })
    return Object.keys(rules).length === 0 ? null : rules
  }

  private setCallbacks = (callbacks: Callbacks) => {
    this.warningUnhooked()

    this.callbacks = cloneDeep(callbacks)
  }

  private resetFields = () => {
    this.warningUnhooked()

    const prevStore = cloneDeep(this.store)
    // 重置时，无默认值的 field value 不能设置为 undefined
    // 部分控件 undefined 的话不会生效
    const newStore: Store = {}
    for (const key in this.store) {
      newStore[key] = this.defaultValues[key] ? this.defaultValues[key] : ''
    }
    this.store = newStore
    this.errorMessages = {}
    this.notifyObservers(prevStore, null, 'reset')
  }

  private updateValue = (name: NamePath, value: Store) => {
    this.warningUnhooked()

    const prevStore = cloneDeep(this.store)
    set(this.store, name, value)

    const trigger = get(this.fields, [name, 'meta', 'trigger'])

    // 默认是 onChange 触发校验
    if (trigger === undefined || trigger === 'onChange' || trigger.includes('onChange')) {
      this.validateFields([name])
    } else {
      this.notifyObservers(prevStore, [name], 'updateValue')
    }

    const { onValuesChange } = this.callbacks
    if (onValuesChange) {
      onValuesChange({ [name]: value }, cloneDeep(this.store))
    }
  }

  private registerField = (name: NamePath, field: { current: FieldInstance }) => {
    this.warningUnhooked()

    this.fields[name] = field
  }

  private deleteField = (name: NamePath) => {
    this.warningUnhooked()

    Object.hasOwnProperty.call(this.fields, name) && delete this.fields[name]
    Object.hasOwnProperty.call(this.errorMessages, name) && delete this.errorMessages[name]
    Object.hasOwnProperty.call(this.store, name) && delete this.store[name]
  }

  private validateFields = (namePathList?: NamePath[]): Promise<any> => {
    this.warningUnhooked()

    const rules = this.getRules(namePathList)
    // 没有设置校验规则的情况下，不做校验
    if (!rules) return Promise.resolve({ values: cloneDeep(this.store) })

    const validator = new Schema(rules)
    const validatePromise = new Promise((resolve, reject) => {
      validator
        .validate(this.store)
        .then(() => {
          resolve({ values: cloneDeep(this.store) })
        })
        .catch(({ errors, fields }) => {
          // eslint-disable-next-line
          console.log(errors)
          // eslint-disable-next-line  prefer-promise-reject-errors
          reject({
            errors,
            errorInfos: {
              values: cloneDeep(this.store),
              fields,
            },
          })
        })
    })

    /**
     * 内部校验用
     */
    validatePromise
      .then(() => {
        namePathList?.forEach((name) => {
          this.errorMessages[name] && delete this.errorMessages[name]
        })

        this.notifyObservers(this.store, namePathList || [], 'validateFinish')
      })
      .catch(({ errorInfos }) => {
        if (!namePathList) {
          this.errorMessages = {}
        }

        const { fields = {} } = errorInfos
        Object.keys(fields).forEach((name) => {
          this.errorMessages[name] = fields[name][0].message
        })
        this.notifyObservers(this.store, namePathList || [], 'validateFinish')
      })

    return validatePromise
  }

  private submit = () => {
    this.warningUnhooked()

    this.validateFields()
      .then((values) => {
        const { onFinish } = this.callbacks
        if (onFinish) {
          try {
            onFinish(values)
          } catch (err) {
            console.error(err)
          }
        }
      })
      .catch(({ errorInfos }) => {
        const { onFinishFailed } = this.callbacks
        if (onFinishFailed) {
          onFinishFailed(errorInfos)
        }
      })
  }

  private notifyObservers = (prevStore: Store, namePathList: NamePath[] | null, source: NotifySource) => {
    this.warningUnhooked()

    Object.values(this.fields).forEach(({ current: { onStoreChange } }) => {
      const stores = {
        prev: prevStore,
        curr: this.store,
      }
      onStoreChange(stores, namePathList, source)
    })
  }
}

function useForm(form?: any): [any] {
  const formRef = React.useRef<FormInstance>()

  if (!formRef.current) {
    if (form) {
      formRef.current = form
    } else {
      const formStore: FormStore = new FormStore()
      formRef.current = formStore.getForm()
    }
  }

  return [formRef.current]
}

export default useForm
