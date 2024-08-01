import * as React from 'react'
import Radio from './radio'
import { IRadioProps } from './interface'
import { ConfigContext } from '../config-provider'
import RadioGroupContext from './context'
import { getCompProps } from '../_utils'

const RadioButton = (props: IRadioProps, ref: React.Ref<any>) => {
  const radioGroupContext = React.useContext(RadioGroupContext)
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)

  let { prefixCls: customPrefixcls, title, children, ...radioProps } = getCompProps('Radio', userDefaultProps, props)

  if (typeof children === 'string' && typeof title === 'undefined') {
    title = children
  }

  const radioButtonPrefixCls = getPrefixCls?.(prefixCls, `radio-button`, customPrefixcls)
  if (radioGroupContext) {
    radioProps.checked = props.value === radioGroupContext.value
    radioProps.disabled = props.disabled || radioGroupContext.disabled
  }
  return (
    <Radio title={title} prefixCls={radioButtonPrefixCls} {...radioProps} type="radio" ref={ref}>
      {children}
    </Radio>
  )
}

export default React.forwardRef(RadioButton)
