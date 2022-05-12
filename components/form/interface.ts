// field name path
export type NamePath = string | number

// form layout, default is `vertical`
export type FormLayout = 'horizontal' | 'vertical' | 'inline'

// label text align, default is `left`
export type LabelAlign = 'left' | 'right'

// Store
export type StoreValue = any
export interface Store {
  [name: string]: StoreValue
}

export interface FieldError {
  [name: string]: string
}

export interface Fields {
  [name: string]: FieldInstance
}

// FormInstance, use for external
export interface FormInstance<Values = any> {
  getFieldError: (name: NamePath) => string | undefined
  getFieldsError: (namePathList?: NamePath[]) => FieldError
  getFieldValue: (name: NamePath) => any
  getDefaultValue: (name: NamePath) => any
  getFieldsValue: (namePathList?: NamePath[]) => any
  resetFields: (fields?: NamePath[]) => void
  setFieldsValue: (value: Values) => void
  setFieldValue: (name: NamePath, value: Values) => void
  validateFields: (namePathList?: NamePath[]) => Promise<Values>
  submit: () => void
  getInternalHooks: (secret: string) => InternalHooks | null
}

export interface InnerLocale {
  locale: string
  requiredMessage: string
}

// Internal form instance
export interface InternalFormInstance extends FormInstance {
  labelWidth?: string | number
  labelAlign?: LabelAlign
  wrapperWidth?: string | number
  vertical?: boolean
  local?: InnerLocale
  getInternalHooks: (key: string) => InternalHooks | null
}

// Field instance
export type Stores = {
  prev: Store
  curr: Store
}
export interface FieldInstance {
  onStoreChange: (stores: Stores, namePathList: NamePath[] | null, source: NotifySource) => void
  meta: {
    name?: NamePath
    rules?: Rule[]
    defaultValue?: any
    trigger?: string | string[]
  }
}

// Form Instance callbacks
export interface Callbacks<Values = any> {
  onValuesChange?: (changedValues: any, values: Values) => void
  onFinish?: (value: Values) => void
  onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void
}

// Actions
export interface UpdateAction {
  type: 'updateValue'
  namePath: NamePath
  value: StoreValue
}

export interface ValidateAction {
  type: 'validateField'
  namePath: NamePath
}

export type ReducerAction = UpdateAction | ValidateAction

// Internal hooks, use for every field
export interface InternalHooks {
  dispatch: (action: ReducerAction) => void
  setDefaultValues: (values: Store) => void
  setCallbacks: (callbacks: Callbacks) => void
  registerField: (name: NamePath, field: FieldInstance) => void
}

export type NotifySource =
  | 'externalUpdateValue' // 外部调用方法更新字段值
  | 'updateValue' // 内部更新字段值
  | 'reset' // 重置字段值
  | 'validateField' // 校验
  | 'validateFinish' // 校验结束

// export type FieldNotifyInfo = NotifyInfo & {
//   store: Store
//   errorMessages: FieldError
// }

export interface ValidateErrorEntity<Values = any> {
  values: Values
  errorFields: { name: NamePath; errors: string[] }[]
}

// Rule
type Validator = (rule: RuleObject, value: StoreValue, callback: (error?: string) => void) => Promise<void | any> | void
export type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email'

export interface ValidatorRule {
  message?: string | React.ReactElement
  validator: Validator
}
interface BaseRule {
  enum?: StoreValue[]
  len?: number
  max?: number
  message?: string | React.ReactElement
  min?: number
  pattern?: RegExp
  required?: boolean
  transform?: (value: StoreValue) => StoreValue
  type?: RuleType
  whitespace?: boolean

  /** Customize rule level `validateTrigger`. Must be subset of Field `validateTrigger` */
  validateTrigger?: string | string[]
}
type AggregationRule = BaseRule & Partial<ValidatorRule>
interface ArrayRule extends Omit<AggregationRule, 'type'> {
  type: 'array'
  defaultField?: RuleObject
}
export type RuleRender = (form: FormInstance) => RuleObject
export type RuleObject = AggregationRule | ArrayRule
export type Rule = RuleObject | RuleRender
