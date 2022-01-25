import React, { useContext } from 'react'
// import { Icon } from '../index'
import classnames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { tuple } from '../_utils/type'
import { isArrayValueRepeat } from '../_utils/arrayUtil'
import isArray from 'lodash/isArray'
import Checkbox from './checkbox'
import isBoolean from 'lodash/isBoolean'
import devWarning from '../_utils/devwarning'

export const CheckboxTypes = tuple('default', 'square')
export type CheckboxType = typeof CheckboxTypes[number]

export const CheckboxSizes = tuple('large', 'middle', 'small')
export type CheckboxSize = typeof CheckboxSizes[number]

export interface CheckboxGroupProps {
  name?: string // CheckboxGroup下所有 input[type="checkbox"] 的 name 属性
  size?: CheckboxSize // 大小，只对按钮样式生效
  value?: string[] // 用于设置当前选中的值
  checkboxType?: CheckboxType // 多选框类型（默认类型/标签类型）
  disabled?: boolean // 设置整个多选组不可用
  defaultValue?: string[] | string // 默认选中的值
  options?: string[] | Array<{ label?: string; value: string; disabled?: boolean }> // 以配置形式设置子元素
  style?: Record<string, unknown> // 内联样式
  className?: string // 样式名
  prefixCls?: string // 样式前缀
  children?: React.ReactNode // 子元素
  onChange?: React.MouseEventHandler<HTMLElement> // 点击事件
}
const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>((props, ref) => {
  // const CheckboxGroup = (props: CheckboxGroupProps): FunctionComponentElement<CheckboxGroupProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const CheckboxProps = getCompProps('Checkbox', userDefaultProps, props) // 按钮属性需要合并一遍用户定义的默认属性
  const {
    checkboxType,
    className,
    style,
    prefixCls: customPrefixcls,
    options,
    size,
    onChange,
    disabled,
    children,
    defaultValue,
    value,
    name,
  } = CheckboxProps
  const [groupValue, setGroupValue] = React.useState(defaultValue)
  React.useEffect(() => {
    if (value) {
      setGroupValue(value)
    }
  }, [value])
  const checkboxGroupPrefixCls = getPrefixCls!(prefixCls, 'checkbox-group', customPrefixcls) // 按钮样式前缀

  devWarning(isArrayValueRepeat(value), 'checkboxGroup', `variable value's value should be unique `)

  const getDisabled = (optionDisabled: boolean) => {
    return isBoolean(optionDisabled) ? optionDisabled : disabled
  }

  const getChecked = (props: any, value: any[]) => {
    return isArray(value)
      ? value.includes(props?.value || props) || value.includes(String(props?.value || props))
      : String(value) === String(props?.value || props)
  }

  const getReduceItem = (targetValue: any) => {
    const index = value.indexOf(targetValue)
    value.splice(index, 1)
    return value
  }
  const getAddItem = (targetValue: any) => {
    return value.concat(targetValue)
  }

  const onCheckboxChange = (ev: React.ChangeEvent<HTMLInputElement>, item: any) => {
    const val = ev.target.value
    const checked = ev.target.checked
    let newVal: Array<any> = []
    if (checked) {
      newVal = getAddItem(val)
    } else {
      newVal = getReduceItem(val)
    }
    setGroupValue(newVal)
    onChange && onChange(newVal)
    item.props?.onChange && item.props.onChange(ev)
  }

  const renderByOptions = (): React.ReactNode => {
    return options.map((option: any, index: number) => {
      return (
        <Checkbox
          size={size}
          disabled={getDisabled(option.disabled)}
          key={index}
          name={name}
          defaultChecked={getChecked(option, defaultValue)}
          checked={getChecked(option, groupValue)}
          checkboxType={checkboxType}
          value={option?.value || option}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheckboxChange(e, option)}
        >
          {option.label || option}
        </Checkbox>
      )
    })
  }

  const renderChildren = (): React.ReactNode => {
    return React.Children.map(children, (item: any) => {
      let groupProps = {}
      groupProps = {
        name,
        size,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => onCheckboxChange(e, item),
        checkboxType: checkboxType || item.props?.checkboxType,
        disabled: isBoolean(disabled) ? disabled : item.props?.disabled,
        checked: getChecked(item.props, groupValue),
        defaultChecked: getChecked(item.props, defaultValue),
      }

      return React.cloneElement(item, {
        ...item.props,
        ...groupProps,
      })
    })
  }

  const renderCheckbox = (): React.ReactNode => {
    if (isArray(options)) {
      return renderByOptions()
    } else if (children) {
      return renderChildren()
    }
  }
  return (
    <ul className={classnames(checkboxGroupPrefixCls, className)} style={style} ref={ref as any}>
      {renderCheckbox()}
    </ul>
  )
})
export default React.memo(CheckboxGroup)
