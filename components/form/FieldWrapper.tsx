import React, { useContext } from 'react'
import classnames from 'classnames'
import { ConfigContext } from '../config-provider'
import { getCompProps } from '../_utils'

export interface FieldWrapperProps {
  children?: React.ReactNode
  width?: string | number
  validateMessage?: string
}

const FieldWrapper: React.FC<FieldWrapperProps> = (props: FieldWrapperProps) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const wrapperProps = getCompProps('Form', userDefaultProps, props)
  const { children, prefixCls: customizePrefixCls, width, validateMessage } = wrapperProps

  const wrapperPrefixCls = getPrefixCls?.(prefixCls, 'form-field-wrapper', customizePrefixCls)
  const wrapperClassName = classnames([`${wrapperPrefixCls}`])
  const messageClassName = classnames([`${wrapperPrefixCls}-message`])

  return (
    <div className={wrapperClassName} style={{ width }}>
      {children}
      {validateMessage && (
        <p className={messageClassName} title={validateMessage}>
          {validateMessage}
        </p>
      )}
    </div>
  )
}

export default FieldWrapper
