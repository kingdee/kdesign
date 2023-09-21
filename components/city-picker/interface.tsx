import * as React from 'react'
import { tuple } from '../_utils/type'

export type City = {
  id?: string | number
  country?: string
  province?: string
  name?: string
  type?: 'domestic' | 'foreign'
  [key: string]: any
}

export const BorderTypes = tuple('none', 'underline', 'bordered')
export type BorderType = typeof BorderTypes[number]

export const Sizes = tuple('large', 'middle', 'small') // 选择框大小
export type Size = typeof Sizes[number]

export type Type = 'domestic' | 'foreign'

export type CityList = Array<City>

export interface CityPickerProps {
  prefixCls?: string // 样式前缀
  size?: Size // 尺寸
  borderType?: BorderType // 边框类型
  notFoundContent?: React.ReactNode // 列表为空时文本
  showArrow?: boolean // 显示下拉小箭头
  defaultOpen?: boolean // 默认是否展开下拉列表
  allowClear?: boolean // 允许清除内容
  placeholder?: React.ReactNode // 选择框默认文字
  type?: Type
  loading?: boolean
  domesticList?: CityList
  foreignList?: CityList
  commonList?: CityList
  className?: string
  disabled?: boolean
  style?: React.CSSProperties
  title?: string
  clearIcon?: React.ReactNode // 清除图标
  suffixIcon?: React.ReactNode // 选择框后缀图标
  optionHighlightProps?: string // 搜索时 根据该属性值高亮城市名
  value?: string | number | City
  defaultValue?: string | number
  description?: React.ReactNode
  showDescription?: boolean
  onChange?: (value: string | number, city: City) => void
  onBlur?: (e: React.ChangeEvent<HTMLSpanElement>) => void
  onFocus?: () => void
  onSearch?: (value: string) => void
  onClear?: () => void
  itemRender?: (city: City) => React.ReactNode
  onTabPaneChange?: (id: Type) => void
}

export interface ICityPickerOptionProps {
  disabled?: boolean
  city?: City
  value?: string | number
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  activeIndex?: number
  index: number
  onChangeSelect?: (city: City | null) => void
  renderCityInfo?: (city: City, flag?: boolean, symbol?: string) => React.ReactNode
  itemRender?: (city: City) => React.ReactNode
  onChangeActiveIndex?: (index: number) => void
}
