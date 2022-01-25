import React from 'react'
import devwarning from '../_utils/devwarning'
import { InternalFormInstance } from './interface'

const warningFunc: any = () => {
  devwarning(false, 'Form', 'Can not find FormContext. Please make sure you wrap Field under Form.')
}

const context = React.createContext<InternalFormInstance>({
  getFieldError: warningFunc,
  getFieldsError: warningFunc,
  getFieldsValue: warningFunc,
  getDefaultValue: warningFunc,
  getFieldValue: warningFunc,
  resetFields: warningFunc,
  setFieldsValue: warningFunc,
  setFieldValue: warningFunc,
  submit: warningFunc,
  validateFields: warningFunc,
  getInternalHooks: () => {
    warningFunc()

    return {
      dispatch: warningFunc,
      setDefaultValues: warningFunc,
      registerField: warningFunc,
      setCallbacks: warningFunc,
    }
  },
})

export default context
