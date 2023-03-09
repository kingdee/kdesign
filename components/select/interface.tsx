import * as React from 'react'
import { tuple } from '../_utils/type'
import { PopperProps } from '../_utils/usePopper'
import { AvailableVirtualListProps } from '../virtual-list'
export const SelectSizes = tuple('large', 'middle', 'small') // 选择框大小
export type SelectSize = typeof SelectSizes[number]

export const BorderTypes = tuple('none', 'underline', 'bordered')
export type BorderType = typeof BorderTypes[number]

export const Modes = tuple('multiple', 'single')
export type Mode = typeof Modes[number]
export interface AbstractSelectProps extends PopperProps {
  prefixCls?: string // 样式前缀
  className?: string // 样式名
  size?: SelectSize // 尺寸
  borderType?: BorderType // 边框类型
  notFoundContent?: React.ReactNode | null // 列表为空时文本
  showSearch?: boolean // 可搜索
  showArrow?: boolean // 显示下拉小箭头
  defaultOpen?: boolean // 默认是否展开下拉列表
  allowClear?: boolean // 允许清除内容
  disabled?: boolean // 禁用
  style?: React.CSSProperties // 内联样式
  placeholder?: string | React.ReactNode // 选择框默认文字
  dropdownClassName?: string // 下拉样式名
  dropdownStyle?: React.CSSProperties // 下拉样式
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement // 菜单渲染父节点
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement // 自定义下拉框渲染内容
  id?: string
  children?: React.ReactNode
  options?: OptionsType[]
  clearIcon?: React.ReactNode // 清除图标
  searchIcon?: React.ReactNode // 搜索图标
  suffixIcon?: React.ReactNode // 选择框后缀图标
  maxTagCount?: number // 最多显示tag数
  listHeight?: number // 下拉列表滚动高度
  labelInValue?: boolean // 每个选项的 label 包装到 value 中
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: LabeledValue[]) => React.ReactNode) // 隐藏 tag 时显示的内容
  filterOption?: boolean | ((inputValue: string, option?: OptionsType) => boolean)
  optionFilterProp?: string
  optionLabelProp?: string
  virtualListProps?: AvailableVirtualListProps | boolean
}

export interface LabeledValue {
  key?: string
  label?: React.ReactNode
}

export interface OptionsType {
  value?: string
  label?: React.ReactNode
}

export type SelectValue = string | string[] | number | number[] | LabeledValue | LabeledValue[] | null | undefined
export interface ISelectProps<T extends SelectValue> extends AbstractSelectProps {
  value?: T
  defaultValue?: T
  mode?: Mode
  autoFocus?: boolean
  onChange?: (value?: T, option?: React.ReactElement<any> | React.ReactElement<any>[]) => void
  onSelect?: (value?: T extends (infer I)[] ? I : T, option?: React.ReactElement<any>) => void
  onDeselect?: (value?: T extends (infer I)[] ? I : T, option?: React.ReactElement<any>) => void
  onBlur?: (value?: T) => void
  onFocus?: () => void
  onSearch?: (value?: string) => void
  onClear?: () => void
  onDropdownVisibleChange?: (value?: T) => void
  tagRender?: (props: TagProps) => void
}

export interface TagProps {
  value?: string
  label?: React.ReactNode
  disabled: boolean
  size: SelectSize
  onClose: () => void
}
