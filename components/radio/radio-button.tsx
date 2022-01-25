import * as React from 'react'
import Radio from './radio'
import { IRadioProps } from './interface'
import { ConfigContext } from '../config-provider'
import RadioGroupContext from './context'
import { getCompProps } from '../_utils'

const RadioButton = (props: IRadioProps, ref: React.Ref<any>) => {
  const radioGroupContext = React.useContext(RadioGroupContext)
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)

  const { prefixCls: customPrefixcls, ...radioProps } = getCompProps('Radio', userDefaultProps, props)

  const radioButtonPrefixCls = getPrefixCls?.(prefixCls, `radio-button`, customPrefixcls)
  if (radioGroupContext) {
    radioProps.checked = props.value === radioGroupContext.value
    radioProps.disabled = props.disabled || radioGroupContext.disabled
  }
  return <Radio prefixCls={radioButtonPrefixCls} {...radioProps} type="radio" ref={ref} />
}

export default React.forwardRef(RadioButton)
