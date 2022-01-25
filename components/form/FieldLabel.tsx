import React, { useContext } from 'react'
import classnames from 'classnames'
import { ConfigContext } from '../config-provider'
import { getCompProps } from '../_utils'
import FieldContext from './FieldContext'
import { LabelAlign } from './interface'

export interface FieldLabelProps {
  value?: string | number
  width?: string | number
  textAlign?: LabelAlign
  prefixCls?: string
  requiredMark?: boolean
}

const FieldLabel: React.FC<FieldLabelProps> = (props: FieldLabelProps) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const { labelWidth: contextLabelWidth, labelAlign: contextLabelAlign } = useContext(FieldContext)

  const {
    value,
    width,
    textAlign,
    prefixCls: customizePrefixCls,
    requiredMark,
  } = getCompProps('Form', userDefaultProps, props)

  if (value === undefined) return null

  const fieldLabelPrefixCls = getPrefixCls?.(prefixCls, 'form-field-label', customizePrefixCls)
  const mergedLabelWidth = width || contextLabelWidth
  const mergedLabelAlign = textAlign || contextLabelAlign

  const labelWrapperClassName = classnames({
    [`${fieldLabelPrefixCls}`]: true,
    [`${fieldLabelPrefixCls}-right`]: mergedLabelAlign === 'right',
  })
  const labelClassName = classnames({ [`${fieldLabelPrefixCls}-required-mark`]: requiredMark })

  const style = { width: mergedLabelWidth }
  return (
    <div className={labelWrapperClassName} style={style}>
      <label className={labelClassName} title={value}>
        {value}
      </label>
    </div>
  )
}

export default FieldLabel
