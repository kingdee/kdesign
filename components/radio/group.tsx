import * as React from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { IRadioGroupProps, IRadioOptionType, RadioValueType } from './interface'
import { getCompProps } from '../_utils'
import Radio from './radio'
import { RadioGroupContextProvider } from './context'

const RadioGroup = React.forwardRef<HTMLDivElement, IRadioGroupProps>((props, ref) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)

  const initValue = typeof props.value === 'undefined' ? props.defaultValue : props.value
  const [value, setValue] = React.useState(initValue)

  // 从props更新value值
  React.useEffect(() => {
    if (typeof props.value !== 'undefined') {
      setValue(props.value)
    }
  }, [props.value])

  const onRadioChange = (ev: React.ChangeEvent<HTMLInputElement>, checkedValue: RadioValueType) => {
    const lastValue = value
    if (!('value' in props)) {
      setValue(checkedValue)
    }
    const { onChange } = props
    if (onChange && checkedValue !== lastValue) {
      onChange(ev, checkedValue)
    }
  }

  const renderGroup = () => {
    const {
      id,
      style,
      options,
      disabled,
      children,
      className,
      optionType,
      prefixCls: customPrefixcls,
    } = getCompProps('RadioGroup', userDefaultProps, props) // 属性需要合并一遍用户定义的默认属性
    const groupPrefixCls = getPrefixCls?.(prefixCls, `radio-group`, customPrefixcls) // 单选组样式前缀
    const radioPrefixCls = getPrefixCls?.(prefixCls, `radio`, customPrefixcls) // 单选样式前缀
    let childrenToRender = children
    // 如果存在 options, 优先使用
    if (options && options.length > 0) {
      const optionsPrefixCls = optionType === undefined ? radioPrefixCls : `${radioPrefixCls}-${optionType}`
      childrenToRender = options.map((option: IRadioOptionType) => {
        if (typeof option === 'string') {
          // 此处类型自动推导为 string
          return (
            <Radio
              key={option}
              prefixCls={optionsPrefixCls}
              disabled={disabled}
              value={option}
              checked={value === option}
            >
              {option}
            </Radio>
          )
        }
        // 此处类型自动推导为 { label: string value: string }
        return (
          <Radio
            key={`radio-group-value-options-${option.value}`}
            prefixCls={optionsPrefixCls}
            disabled={option.disabled || disabled}
            value={option.value}
            checked={value === option.value}
            style={option.style}
          >
            {option.label}
          </Radio>
        )
      })
    }

    return (
      <div className={classNames(groupPrefixCls, className)} style={style} id={id} ref={ref}>
        {childrenToRender}
      </div>
    )
  }

  return (
    <RadioGroupContextProvider
      value={{
        value,
        name: props.name,
        onChange: onRadioChange,
        disabled: props.disabled,
      }}
    >
      {renderGroup()}
    </RadioGroupContextProvider>
  )
})

export default React.memo(RadioGroup)
