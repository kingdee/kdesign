import React, { useContext, useEffect } from 'react'
import classnames from 'classnames'
import { ConfigContext } from '../config-provider'
import { getCompProps } from '../_utils'
import { Callbacks, FormLayout, FormInstance, LabelAlign, Store } from './interface'
import useForm, { INTERNAL_HOOK_KEY } from './hooks/useForm'
import FormContext from './FormContext'
import FieldContext from './FieldContext'

type BaseFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>

export interface FormProps<Values = any> extends BaseFormProps {
  children?: React.ReactNode
  defaultValues?: Store // 默认值
  disabled?: boolean // 是否禁用
  className?: string // 类名
  form?: FormInstance<Values> // 表格引用
  labelAlign?: LabelAlign // 标签对齐方式
  labelWidth?: string | number // 标签宽度
  layout?: FormLayout // 布局
  name?: string // 表单名称
  wrapperWidth?: string | number // 输入区域宽度
  onFinish?: Callbacks<Values>['onFinish'] // 表单提交且数据验证通过
  onFinishFailed?: Callbacks<Values>['onFinishFailed'] // 表单提交且数据验证失败
  onValuesChange?: Callbacks<Values>['onValuesChange'] // 字段值更新
}

const Form: React.ForwardRefRenderFunction<FormInstance, FormProps> = (props: FormProps, ref) => {
  const {
    getPrefixCls,
    prefixCls,
    compDefaultProps: userDefaultProps,
    locale: globalLocale,
    direction,
  } = useContext(ConfigContext)
  const formProps = getCompProps('Form', userDefaultProps, props)

  const formLang = globalLocale.getCompLangMsg({ componentName: 'Form' })

  const {
    children,
    defaultValues,
    className,
    form,
    labelAlign,
    labelWidth,
    layout,
    name,
    prefixCls: customizePrefixCls,
    wrapperWidth,
    onFinish,
    onFinishFailed,
    onValuesChange,
    disabled,
    ...restProps
  } = formProps

  const formPrefixCls = getPrefixCls!(prefixCls, 'form', customizePrefixCls)
  const rtlCls = direction === 'rtl' ? `${formPrefixCls}-rtl` : null
  const formClassName = classnames(
    rtlCls,
    {
      [`${formPrefixCls}`]: true,
      [`${formPrefixCls}-${layout}`]: true,
    },
    className,
  )

  const formContext = useContext(FormContext)
  const [formInstance] = useForm(form)

  // 注册
  useEffect(() => {
    formContext.registerForm(name, formInstance)
    return () => {
      formContext.unregisterForm(name)
    }
  }, [name, formInstance, formContext])

  // 暴露 formInstance
  React.useImperativeHandle(ref, () => formInstance)

  // 设置默认值及回调函数
  const { setDefaultValues, setCallbacks } = formInstance.getInternalHooks(INTERNAL_HOOK_KEY)
  setDefaultValues(defaultValues)
  setCallbacks({
    onFinish,
    onFinishFailed,
    onValuesChange,
  })

  const formContextValue = React.useMemo(
    () => ({
      ...formInstance,
      labelAlign,
      labelWidth,
      wrapperWidth,
      local: formLang,
      disabled,
      vertical: layout === 'vertical',
    }),
    [formInstance, labelAlign, labelWidth, wrapperWidth, layout, formLang],
  )

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    evt.stopPropagation()

    formInstance.submit()
  }

  const handleReset = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    evt.stopPropagation()

    formInstance.resetFields()
  }

  return (
    <form className={formClassName} {...restProps} onSubmit={handleSubmit} onReset={handleReset}>
      <FieldContext.Provider value={formContextValue}>{children}</FieldContext.Provider>
    </form>
  )
}

export default Form
