import * as React from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { IRadioProps } from './interface'
import { getCompProps } from '../_utils'
import RadioGroupContext from './context'

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
    defaultChecked,
    prefixCls: customPrefixcls,
    ...restProps
  } = getCompProps('Radio', userDefaultProps, props) // 属性需要合并一遍用户定义的默认属性

  const getPrefix = (radioType: string) => `radio${radioType === 'square' ? `-${radioType}` : ''}`
  const radioPrefixCls = getPrefixCls?.(prefixCls, getPrefix(radioType), customPrefixcls) // 样式前缀

  const [isChecked, setIsChecked] = React.useState(checked || defaultChecked)
  React.useEffect(() => {
    checked !== undefined && setIsChecked(checked)
  }, [checked])

  const radioProps = { ...restProps }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
    if (props.onChange) {
      props.onChange(e)
    }

    if (context?.onChange) {
      context.onChange(e)
    }
  }

  radioProps.onChange = onChange

  if (context) {
    radioProps.name = context.name
    radioProps.checked = String(props.value) === String(context.value)
    radioProps.disabled = props.disabled || context.disabled
  }

  const classString = classNames(
    {
      [`${radioPrefixCls}`]: true,
      [`${radioPrefixCls}-disabled`]: radioProps.disabled,
      [`${radioPrefixCls}-checked`]: context ? radioProps.checked : isChecked,
    },
    className,
  ) // 单选包裹元素class名称

  const handleRepeatClick = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.target as HTMLElement
    if (element.tagName !== 'INPUT') {
      e.stopPropagation()
    }
  }

  return (
    // eslint-disable-next-line
    <label className={classString} style={style} ref={mergedRef as any} onClick={handleRepeatClick}>
      <input type="radio" className={`${radioPrefixCls}-input`} {...radioProps} />
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  )
}

const Radio = React.forwardRef<unknown, IRadioProps>(InternalRadio)
Radio.displayName = 'Radio'

export default Radio
