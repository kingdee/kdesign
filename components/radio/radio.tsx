import React, { useEffect, MutableRefObject } from 'react'
import classNames from 'classnames'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import ConfigContext from '../config-provider/ConfigContext'
import { IRadioProps } from './interface'
import { getCompProps } from '../_utils'
import RadioGroupContext from './context'
import devWarning from '../_utils/devwarning'

const InternalRadio: React.ForwardRefRenderFunction<HTMLElement, IRadioProps> = (props, ref) => {
  const context = React.useContext(RadioGroupContext)
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)
  const innerRef = React.useRef<HTMLElement>()
  const mergedRef = ref || innerRef

  const {
    style,
    checked,
    children,
    className,
    radioType,
    value,
    disabled,
    defaultChecked,
    prefixCls: customPrefixcls,
    ...restProps
  } = getCompProps('Radio', userDefaultProps, props) // 属性需要合并一遍用户定义的默认属性

  devWarning(
    !(isNumber(value) || isString(value)) && value !== '',
    'radio',
    'radio `value` type must string or number ',
  )
  devWarning(value === '', 'radio', 'radio value type is not empty string ')

  const mergedDisabled = context?.disabled || restProps.disabled
  const initValue = context ? value === context.value : isBoolean(checked) ? checked : defaultChecked

  const getPrefix = (radioType: string) => `radio${radioType === 'square' ? `-${radioType}` : ''}`
  const radioPrefixCls = getPrefixCls?.(prefixCls, getPrefix(radioType), customPrefixcls) // 样式前缀
  const [isChecked, setIsChecked] = React.useState(initValue)

  React.useEffect(() => {
    const checkedValue = context ? value === context.value : isBoolean(checked) ? checked : defaultChecked
    setIsChecked(checkedValue)
  }, [checked, defaultChecked, context?.value])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    if (typeof context?.value === 'undefined') {
      setIsChecked(e.target.checked)
    }

    if (props.onChange) {
      props.onChange(e)
    }

    if (context?.onChange) {
      context.onChange(e, value)
    }
  }

  const classString = classNames(
    {
      [`${radioPrefixCls}`]: true,
      [`${radioPrefixCls}-disabled`]: disabled,
      [`${radioPrefixCls}-checked`]: isChecked,
    },
    className,
  ) // 单选包裹元素class名称

  useEffect(() => {
    const handleRepeatClick = function (e: any) {
      const element = e.target as HTMLElement
      if (element.tagName !== 'INPUT') {
        e.stopPropagation()
      }
    }
    const radioRef = mergedRef as MutableRefObject<HTMLElement>
    radioRef?.current?.addEventListener('click', handleRepeatClick)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      radioRef?.current?.removeEventListener('click', handleRepeatClick)
    }
  }, [])

  return (
    // eslint-disable-next-line
    <label className={classString} style={style} ref={mergedRef as any}>
      <input
        type="radio"
        className={`${radioPrefixCls}-input`}
        checked={isChecked}
        onChange={onChange}
        value={value}
        name={context?.name}
        disabled={mergedDisabled}
        {...restProps}
      />
      {children !== undefined ? <span className={`${radioPrefixCls}-text`}>{children}</span> : null}
    </label>
  )
}

const Radio = React.forwardRef<unknown, IRadioProps>(InternalRadio)
Radio.displayName = 'Radio'

export default Radio
