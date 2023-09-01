import React, { useContext } from 'react'
import classnames from 'classnames'
import { ConfigContext } from '../config-provider'
import { getCompProps } from '../_utils'

export interface FieldWrapperProps {
  extra?: React.ReactNode
  children?: React.ReactNode
  width?: string | number
  validateMessage?: string
}

const FieldWrapper: React.FC<FieldWrapperProps> = (props: FieldWrapperProps) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const wrapperProps = getCompProps('Form', userDefaultProps, props)
  const { children, prefixCls: customizePrefixCls, width, validateMessage, extra } = wrapperProps

  const wrapperPrefixCls = getPrefixCls?.(prefixCls, 'form-field-wrapper', customizePrefixCls)
  const wrapperClassName = classnames([`${wrapperPrefixCls}`])
  const messageClassName = classnames([`${wrapperPrefixCls}-message`])

  const validate = validateMessage ? (
    <p className={messageClassName} title={validateMessage}>
      {validateMessage}
    </p>
  ) : null

  return (
    <div className={wrapperClassName} style={{ width }}>
      {children}
      {extra ? (
        <div className={`${wrapperPrefixCls}-extra`}>
          <div className={`${wrapperPrefixCls}-extra-message`}>{validateMessage}</div>
          <div className={`${wrapperPrefixCls}-extra-text`}>{extra}</div>
        </div>
      ) : (
        <>{validate}</>
      )}
    </div>
  )
}

export default FieldWrapper
