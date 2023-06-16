import * as React from 'react'
import { FormInstance } from './interface'
import Item from './Field'
import useForm from './hooks/useForm'
import FieldForm, { FormProps } from './Form'
import { FormProvider } from './FormContext'

const InternalForm = React.forwardRef<FormInstance, FormProps>(FieldForm) as <Values = any>(
  props: React.PropsWithChildren<FormProps<Values>> & { ref?: React.Ref<FormInstance<Values>> },
) => React.ReactElement

type InternalForm = typeof InternalForm
interface RefForm extends InternalForm {
  FormProvider: typeof FormProvider
  Item: typeof Item
  useForm: typeof useForm
  displayName: string
}

const RefForm: RefForm = InternalForm as RefForm

RefForm.FormProvider = FormProvider
RefForm.Item = Item
RefForm.Item.displayName = 'Item'
RefForm.useForm = useForm
RefForm.displayName = 'Form'

export { FormInstance, Item, FormProvider, FormProps }

export default RefForm
