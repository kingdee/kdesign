import { tuple } from '../_utils/type'
export interface AbstractQuickSearchProps {
  style?: React.CSSProperties // 内联样式
  className?: string // 样式名
  placeholder?: string | React.ReactNode // 选择框默认文字
  prefix?: React.ReactNode // 样式前缀
  notFoundContent?: React.ReactNode | null // 列表为空时文本
  disabled?: boolean
  dropdownStyle?: React.CSSProperties // 下拉样式
  listHeight?: number // 下拉列表滚动高度
  children?: React.ReactNode
}
export interface LabeledValue {
  tag?: string
  value?: string | number
  label?: string
}

export interface TagsType {
  value?: string
  tag?: string
}

export interface nlpSearchResultType {
  value?: string
  label?: string
}

export type SelectValue = string | string[] | number | number[] | LabeledValue | LabeledValue[] | null

export interface IQuickSearchProps<T = SelectValue> extends AbstractQuickSearchProps {
  value?: T
  desc?: string[]
  tags?: TagsType[]
  nlpSearch?: NlpSearchProps
  onBlur?: (value: T) => void
  onFocus?: () => void
  onChange?: (value: T, option: React.ReactElement<any> | React.ReactElement<any>[]) => void
  onSelect?: (value: T, option: React.ReactElement<any> | React.ReactElement<any>[]) => void
  onSearch?: React.ChangeEventHandler<HTMLInputElement>
}

export interface OptionProps {
  className?: string
  children?: React.ReactNode
  index?: number
  selectedIndex?: number
  disabled?: boolean
  searchValue?: string
  value?: string | number
  title?: string
  tag?: string // 标签
  isFormatVal?: boolean
  onChangeSelect?: (key: SelectValue) => void
}

export interface NlpSearchProps {
  isSupportNlpSearch?: boolean
  nlpSearchLoading?: boolean
  onNlpSearch?: () => void
  nlpSearchResult?: nlpSearchResultType
}

export const SearchTypes = tuple('basis', 'quick-search', 'panel')
export type SearchType = typeof SearchTypes[number]

export const BorderTypes = tuple('none', 'underline', 'bordered')
export type BorderType = typeof BorderTypes[number]

export const SearchSizeTypes = tuple('large', 'middle', 'small')
export type SearchSizeType = typeof SearchSizeTypes[number]

export interface ISearchProps extends IQuickSearchProps {
  className?: string
  style?: React.CSSProperties
  type?: SearchType
  size?: SearchSizeType
  prefix?: boolean | React.ReactNode
  suffix?: boolean | React.ReactNode
  borderType?: BorderType
  onPressEnter?: (value: string, event: React.KeyboardEvent) => void
  onSearch?: React.ChangeEventHandler<HTMLInputElement>
}
