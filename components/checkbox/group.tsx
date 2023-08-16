import React, { useContext } from 'react'
// import { Icon } from '../index'
import classnames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { tuple } from '../_utils/type'
import { isArrayValueRepeat } from '../_utils/arrayUtil'
import Checkbox from './checkbox'
import devWarning from '../_utils/devwarning'

export const CheckboxTypes = tuple('default', 'square')
export type CheckboxType = typeof CheckboxTypes[number]

export const CheckboxSizes = tuple('large', 'middle', 'small')
export type CheckboxSize = typeof CheckboxSizes[number]

export type CheckboxValueType = string | number
export interface CheckboxGroupContext {
  name?: string
  isControlled?: boolean
  size?: CheckboxSize // 大小，只对按钮样式生效
  groupValue?: Array<CheckboxValueType>
  checkboxType?: CheckboxType
  disabled?: boolean
  onCheckboxGroupChange?: (
    checkedValue: CheckboxValueType,
    isChecked: boolean,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void
}

export const GroupContext = React.createContext<CheckboxGroupContext | null>(null)

export interface CheckboxGroupProps {
  name?: string // CheckboxGroup下所有 input[type="checkbox"] 的 name 属性
  size?: CheckboxSize // 大小，只对按钮样式生效
  value?: Array<CheckboxValueType> // 用于设置当前选中的值
  checkboxType?: CheckboxType // 多选框类型（默认类型/标签类型）
  disabled?: boolean // 设置整个多选组不可用
  defaultValue?: Array<CheckboxValueType> // 默认选中的值
  options?: string[] | Array<{ label?: string; value: string; disabled?: boolean }> // 以配置形式设置子元素
  style?: Record<string, unknown> // 内联样式
  className?: string // 样式名
  prefixCls?: string // 样式前缀
  children?: React.ReactNode // 子元素
  onChange?: React.MouseEventHandler<HTMLElement> // 点击事件
}
const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>((props, ref) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const CheckboxProps = getCompProps('CheckboxGroup', userDefaultProps, props) // 多选组属性需要合并一遍用户定义的默认属性
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
    ...rest
  } = CheckboxProps

  const initData =
    value || (Array.isArray(defaultValue) ? defaultValue : typeof defaultValue !== 'undefined' ? [defaultValue] : [])

  const [groupValue, setGroupValue] = React.useState([])

  const innerValue = React.useRef(initData)

  React.useEffect(() => {
    innerValue.current =
      value || (Array.isArray(defaultValue) ? defaultValue : typeof defaultValue !== 'undefined' ? [defaultValue] : [])
    setGroupValue(innerValue.current)
  }, [value, defaultValue])

  const isControlled = typeof value !== 'undefined'

  const checkboxGroupPrefixCls = getPrefixCls!(prefixCls, 'checkbox-group', customPrefixcls) // 按钮样式前缀

  devWarning(isArrayValueRepeat(groupValue), 'checkboxGroup', `variable value's value should be unique `)

  const getReduceItem = (targetValue: CheckboxValueType) => {
    return innerValue.current.filter((d: CheckboxValueType) => d !== targetValue)
  }
  const getAddItem = (targetValue: CheckboxValueType) => {
    return innerValue.current.indexOf(targetValue) > -1 ? innerValue.current : innerValue.current.concat(targetValue)
  }

  const onCheckboxChange = (
    checkedValue: CheckboxValueType,
    isChecked: boolean,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let newVal: Array<any> = []
    if (isChecked) {
      newVal = getAddItem(checkedValue)
    } else {
      newVal = getReduceItem(checkedValue)
    }
    if (!isControlled) {
      innerValue.current = newVal
    }
    onChange && onChange(newVal, e)
  }

  const context = {
    groupValue: groupValue,
    disabled: disabled,
    name: name,
    size: size,
    isControlled,
    checkboxType: checkboxType,
    onCheckboxGroupChange: (
      checkedValue: CheckboxValueType,
      isChecked: boolean,
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      onCheckboxChange(checkedValue, isChecked, e)
    },
  }

  const renderByOptions = (): React.ReactNode => {
    return options.map((option: any, index: number) => {
      return (
        <Checkbox
          size={size}
          disabled={option.disabled}
          key={index}
          name={name}
          defaultChecked={option.defaultValue}
          checked={option.checked}
          checkboxType={checkboxType}
          value={option?.value || option}
          onChange={option.onChange}
        >
          {option.label || option}
        </Checkbox>
      )
    })
  }
  return (
    <ul className={classnames(checkboxGroupPrefixCls, className)} style={style} ref={ref as any} {...rest}>
      <GroupContext.Provider value={context}>
        {options && options.length > 0 ? renderByOptions() : children}
      </GroupContext.Provider>
    </ul>
  )
})
CheckboxGroup.displayName = 'CheckboxGroup'
export default React.memo(CheckboxGroup)
